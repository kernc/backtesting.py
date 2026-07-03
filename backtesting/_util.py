from __future__ import annotations

import os
import sys
import warnings
from contextlib import contextmanager
from difflib import get_close_matches
from functools import partial
from itertools import chain
from multiprocessing import resource_tracker as _mprt
from multiprocessing import shared_memory as _mpshm
from numbers import Number
from threading import Lock
from typing import Dict, List, Optional, Sequence, Tuple, Union, cast

import numpy as np
import pandas as pd

try:
    from tqdm.auto import tqdm as _tqdm
    _tqdm = partial(_tqdm, leave=False)
except ImportError:
    def _tqdm(seq, **_):
        return seq


def try_(lazy_func, default=None, exception=Exception):
    try:
        return lazy_func()
    except exception:
        return default


@contextmanager
def patch(obj, attr, newvalue):
    had_attr = hasattr(obj, attr)
    orig_value = getattr(obj, attr, None)
    setattr(obj, attr, newvalue)
    try:
        yield
    finally:
        if had_attr:
            setattr(obj, attr, orig_value)
        else:
            delattr(obj, attr)


def _as_str(value) -> str:
    if isinstance(value, (Number, str)):
        return str(value)
    if isinstance(value, pd.DataFrame):
        return 'df'
    name = str(getattr(value, 'name', '') or '')
    if name in ('Open', 'High', 'Low', 'Close', 'Volume'):
        return name[:1]
    if callable(value):
        name = getattr(value, '__name__', value.__class__.__name__).replace('<lambda>', 'λ')
    if len(name) > 10:
        name = name[:9] + '…'
    return name


def _as_list(value) -> List:
    if isinstance(value, Sequence) and not isinstance(value, str):
        return list(value)
    return [value]


def _batch(seq):
    # XXX: Replace with itertools.batched
    n = np.clip(int(len(seq) // (os.cpu_count() or 1)), 1, 300)
    for i in range(0, len(seq), n):
        yield seq[i:i + n]


def _data_period(index) -> Union[pd.Timedelta, Number]:
    """Return data index period as pd.Timedelta"""
    values = pd.Series(index[-100:])
    return values.diff().dropna().median()


def _strategy_indicators(strategy):
    """
    Return `[(attr, value), ...]` of strategy attributes to auto-slice in
    `Strategy.next()`, where each value is an `_Indicator` or a flat
    dict/list/tuple thereof. Containers mixing indicators with other values
    raise, lest a full-length (future-containing) array slips through.
    """
    def _items(value):
        if isinstance(value, dict):
            return list(value.values())
        if isinstance(value, (list, tuple)):
            return list(value)
        return None

    pairs = []
    for attr, value in strategy.__dict__.items():
        if attr == '_indicators':  # Strategy-internal registry of all I() results
            continue
        if isinstance(value, _Indicator):
            pairs.append((attr, value))
            continue
        items = _items(value)
        if not items:
            continue
        if all(isinstance(item, _Indicator) for item in items):
            pairs.append((attr, value))
        elif any(isinstance(item, _Indicator)
                 for item in chain(items, *filter(None, map(_items, items)))):
            raise ValueError(
                f'Strategy attribute {attr!r} mixes indicators declared with '
                '`Strategy.I()` with other values and cannot be safely '
                'auto-sliced in `Strategy.next()`. Store indicators in their '
                'own flat dict/list/tuple.')
    return pairs


def _as_indicators(value) -> List['_Indicator']:
    """`_strategy_indicators` value (indicator or container) as a flat list."""
    if isinstance(value, _Indicator):
        return [value]
    return list(value.values() if isinstance(value, dict) else value)


def _indicator_sliced(value, length):
    """`value` (an `_Indicator` or a container from `_strategy_indicators`)
    with each indicator array revealed only up to `length` bars."""
    if isinstance(value, _Indicator):
        return value[..., :length]
    if isinstance(value, dict):
        return {key: indicator[..., :length] for key, indicator in value.items()}
    items = (indicator[..., :length] for indicator in value)
    cls = type(value)
    return cls(*items) if hasattr(cls, '_fields') else cls(items)  # namedtuple or list/tuple


def _indicator_warmup_nbars(strategy):
    """
    Number of leading bars to skip so the backtest starts with valid indicators.

    Single-asset: the first bar on which every (non-scatter) indicator is
    non-NaN. Multi-asset: indicators are grouped by their `Strategy.I(symbol=)`
    tag (untagged indicators belong to every group), and the backtest starts
    as soon as the earliest-ready symbol group is warm; not-yet-warm symbols'
    indicators are simply still NaN in `Strategy.next()`.
    """
    if strategy is None:
        return 0
    indicators = [
        (indicator._opts.get('symbol'), np.isnan(as_float))
        for _, value in _strategy_indicators(strategy)
        for indicator in _as_indicators(value)
        if not indicator._opts['scatter'] and
        # Skip e.g. categorical indicators, which never warm up
        (as_float := try_(lambda: indicator.astype(float),  # noqa: B023
                          exception=(TypeError, ValueError))) is not None]
    symbols = tuple(getattr(strategy._data, 'symbols', ()) or ())
    if not symbols:
        return max((isnan.argmin(axis=-1).max()
                    for _, isnan in indicators), default=0)

    n_data = len(strategy._data)

    def first_valid(isnan):
        # An all-NaN indicator (row) never becomes valid
        return n_data if isnan.all(axis=-1).any() else isnan.argmin(axis=-1).max()

    untagged = max((first_valid(isnan) for symbol, isnan in indicators
                    if symbol is None), default=0)
    group_warmup = [
        max([untagged, *(first_valid(isnan) for ind_symbol, isnan in indicators
                         if ind_symbol == symbol)])
        for symbol in symbols]
    ready = [nbars for nbars in group_warmup if nbars < n_data]
    return min(ready) if ready else n_data


class _Array(np.ndarray):
    """
    ndarray extended to supply .name and other arbitrary properties
    in ._opts dict.
    """
    def __new__(cls, array, *, name=None, **kwargs):
        obj = np.asarray(array).view(cls)
        obj.name = name or array.name
        obj._opts = kwargs
        return obj

    def __array_finalize__(self, obj):
        if obj is not None:
            self.name = getattr(obj, 'name', '')
            self._opts = getattr(obj, '_opts', {})

    # Make sure properties name and _opts are carried over
    # when (un-)pickling.
    def __reduce__(self):
        value = super().__reduce__()
        return value[:2] + (value[2] + (self.__dict__,),)

    def __setstate__(self, state):
        self.__dict__.update(state[-1])
        super().__setstate__(state[:-1])

    def __bool__(self):
        try:
            return bool(self[-1])
        except IndexError:
            return super().__bool__()

    def __float__(self):
        try:
            return float(self[-1])
        except IndexError:
            return super().__float__()

    def to_series(self):
        warnings.warn("`.to_series()` is deprecated. For pd.Series conversion, use accessor `.s`")
        return self.s

    @property
    def s(self) -> pd.Series:
        values = np.atleast_2d(self)
        index = self._opts['index'][:values.shape[1]]
        return pd.Series(values[0], index=index, name=self.name)

    @property
    def df(self) -> pd.DataFrame:
        values = np.atleast_2d(np.asarray(self))
        index = self._opts['index'][:values.shape[1]]
        df = pd.DataFrame(values.T, index=index, columns=[self.name] * len(values))
        return df


class _Indicator(_Array):
    pass


class _Data:
    """
    A data array accessor. Provides access to OHLCV "columns"
    as a standard `pd.DataFrame` would, except it's not a DataFrame
    and the returned "series" are _not_ `pd.Series` but `np.ndarray`
    for performance reasons.

    In multi-asset mode (two-level `(symbol, field)` DataFrame columns),
    `data[symbol]` returns a per-symbol `_Data` view whose revealed length
    is slaved to this parent's, and top-level field access raises.
    """
    def __init__(self, df: pd.DataFrame):
        self.__df = df
        self.__symbols: Tuple[str, ...] = (
            tuple(df.columns.get_level_values(0).unique())
            if isinstance(df.columns, pd.MultiIndex) else ())
        self.__children: Dict[str, _Data] = {}
        self.__len = len(df)  # Current length
        self.__pip: Optional[float] = None
        self.__cache: Dict[str, _Array] = {}
        self.__arrays: Dict[str, _Array] = {}
        self._update()

    def __getitem__(self, item):
        if item is None and not self.__symbols:
            return self  # data[None] is data; allows symbol-generic strategy code
        if isinstance(item, str) and item in self.__symbols:
            child = self.__children.get(item)
            if child is None:
                child = self.__children[item] = _Data(self.__df[item])
                child._set_length(self.__len)
            return child
        return self.__get_array(item)

    def __getattr__(self, item):
        try:
            return self.__get_array(item)
        except KeyError:
            raise AttributeError(f"Column '{item}' not in data") from None

    @property
    def symbols(self) -> Tuple[str, ...]:
        """Asset symbols in multi-asset mode, or an empty tuple."""
        return self.__symbols

    def _set_length(self, length):
        self.__len = length
        self.__cache.clear()
        for child in self.__children.values():
            child._set_length(length)

    def _update(self):
        index = self.__df.index.copy()
        self.__arrays = {col: _Array(arr, index=index)
                         for col, arr in self.__df.items()}
        # Leave index as Series because pd.Timestamp nicer API to work with
        self.__arrays['__index'] = index
        for symbol, child in self.__children.items():
            # Refresh the child's data snapshot, but keep the child object
            # (references captured in `Strategy.init` stay slaved to `_set_length`)
            child.__df = self.__df[symbol]
            child._update()

    def __repr__(self):
        i = min(self.__len, len(self.__df)) - 1
        index = self.__arrays['__index'][i]
        items = ', '.join(f'{k}={v}' for k, v in self.__df.iloc[i].items())
        return f'<Data i={i} ({index}) {items}>'

    def __len__(self):
        return self.__len

    @property
    def df(self) -> pd.DataFrame:
        return (self.__df.iloc[:self.__len]
                if self.__len < len(self.__df)
                else self.__df)

    @property
    def pip(self) -> float:
        if self.__pip is None:
            if self.__symbols:
                raise AttributeError(
                    "'pip' is ambiguous in multi-asset mode; use `data[symbol].pip`. "
                    f'Symbols: {self.__symbols}')
            close = self.__arrays['Close']
            close = close[close == close]  # Drop NaN of multi-asset data gaps
            self.__pip = float(10**-np.median([len(s.partition('.')[-1])
                                               for s in close.astype(str)]))
        return self.__pip

    def __get_array(self, key) -> _Array:
        arr = self.__cache.get(key)
        if arr is None:
            try:
                arr = self.__cache[key] = cast(_Array, self.__arrays[key][:self.__len])
            except KeyError:
                if self.__symbols:
                    if key in ('Open', 'High', 'Low', 'Close', 'Volume', 'pip'):
                        raise AttributeError(
                            f'{key!r} is ambiguous in multi-asset mode; '
                            f'use `data[symbol].{key}`. Symbols: {self.__symbols}') from None
                    suggestions = get_close_matches(str(key), map(str, self.__symbols))
                    hint = (f" Did you mean: {', '.join(map(repr, suggestions))}?"
                            if suggestions else '')
                    raise AttributeError(
                        f'Unknown symbol or column {key!r}; '
                        f'symbols: {self.__symbols}.{hint}') from None
                raise
        return arr

    @property
    def Open(self) -> _Array:
        return self.__get_array('Open')

    @property
    def High(self) -> _Array:
        return self.__get_array('High')

    @property
    def Low(self) -> _Array:
        return self.__get_array('Low')

    @property
    def Close(self) -> _Array:
        return self.__get_array('Close')

    @property
    def Volume(self) -> _Array:
        return self.__get_array('Volume')

    @property
    def index(self) -> pd.DatetimeIndex:
        return self.__get_array('__index')

    # Make pickling in Backtest.optimize() work with our catch-all __getattr__
    def __getstate__(self):
        return self.__dict__

    def __setstate__(self, state):
        self.__dict__ = state


if sys.version_info >= (3, 13):
    SharedMemory = _mpshm.SharedMemory
else:
    class SharedMemory(_mpshm.SharedMemory):
        # From https://github.com/python/cpython/issues/82300#issuecomment-2169035092
        __lock = Lock()

        def __init__(self, *args, track: bool = True, **kwargs):
            self._track = track
            if track:
                return super().__init__(*args, **kwargs)
            with self.__lock:
                with patch(_mprt, 'register', lambda *a, **kw: None):
                    super().__init__(*args, **kwargs)

        def unlink(self):
            if _mpshm._USE_POSIX and self._name:
                _mpshm._posixshmem.shm_unlink(self._name)
                if self._track:
                    _mprt.unregister(self._name, "shared_memory")


class SharedMemoryManager:
    """
    A simple shared memory contextmanager based on
    https://docs.python.org/3/library/multiprocessing.shared_memory.html#multiprocessing.shared_memory.SharedMemory
    """
    def __init__(self, create=False) -> None:
        self._shms: list[SharedMemory] = []
        self.__create = create

    def SharedMemory(self, *, name=None, create=False, size=0, track=True):
        shm = SharedMemory(name=name, create=create, size=size, track=track)
        shm._create = create
        # Essential to keep refs on Windows
        # https://stackoverflow.com/questions/74193377/filenotfounderror-when-passing-a-shared-memory-to-a-new-process#comment130999060_74194875  # noqa: E501
        self._shms.append(shm)
        return shm

    def __enter__(self):
        return self

    def __exit__(self, *args, **kwargs):
        for shm in self._shms:
            try:
                shm.close()
                if shm._create:
                    shm.unlink()
            except Exception:
                warnings.warn(f'Failed to unlink shared memory {shm.name!r}',
                              category=ResourceWarning, stacklevel=2)
                raise

    def arr2shm(self, vals):
        """Array to shared memory. Returns (shm_name, shape, dtype) used for restore."""
        assert vals.ndim == 1, (vals.ndim, vals.shape, vals)
        shm = self.SharedMemory(size=vals.nbytes, create=True)
        # np.array can't handle pandas' tz-aware datetimes
        # https://github.com/numpy/numpy/issues/18279
        buf = np.ndarray(vals.shape, dtype=vals.dtype.base, buffer=shm.buf)
        has_tz = getattr(vals.dtype, 'tz', None)
        buf[:] = vals.tz_localize(None) if has_tz else vals  # Copy into shared memory
        return shm.name, vals.shape, vals.dtype

    def df2shm(self, df):
        return tuple((
            (column, *self.arr2shm(values))
            for column, values in chain([(self._DF_INDEX_COL, df.index)], df.items())
        ))

    @staticmethod
    def shm2s(shm, shape, dtype) -> pd.Series:
        arr = np.ndarray(shape, dtype=dtype.base, buffer=shm.buf)
        arr.setflags(write=False)
        return pd.Series(arr, dtype=dtype)

    _DF_INDEX_COL = '__bt_index'

    @staticmethod
    def shm2df(data_shm):
        shm = [SharedMemory(name=name, create=False, track=False) for _, name, _, _ in data_shm]
        # NOTE: The str _DF_INDEX_COL key coexisting with any tuple column keys
        # (multi-asset data) is what keeps this constructor from prematurely
        # auto-building a MultiIndex
        df = pd.DataFrame({
            col: SharedMemoryManager.shm2s(shm, shape, dtype)
            for shm, (col, _, shape, dtype) in zip(shm, data_shm)})
        df.set_index(SharedMemoryManager._DF_INDEX_COL, drop=True, inplace=True)
        df.index.name = None
        if len(df.columns) and all(isinstance(col, tuple) for col in df.columns):
            # Restore multi-asset (symbol, field) columns flattened by the dict above
            df.columns = pd.MultiIndex.from_tuples(df.columns, names=('Symbol', None))
        return df, shm
