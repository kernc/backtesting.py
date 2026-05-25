from __future__ import annotations

import os
import sys
import warnings
from contextlib import contextmanager
from functools import partial
from itertools import chain
from multiprocessing import resource_tracker as _mprt
from multiprocessing import shared_memory as _mpshm
from numbers import Number
from threading import Lock
from typing import Dict, List, Optional, Sequence, Union, cast

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


def _symbols_from_opts(opts):
    symbols = opts.get('symbols')
    if symbols is not None:
        return frozenset(symbols)
    symbol = opts.get('symbol')
    return frozenset(() if symbol is None else (symbol,))


def _merged_symbols(*values):
    symbols = set()

    def _scan(value):
        if isinstance(value, dict):
            for item in value.values():
                _scan(item)
        elif isinstance(value, (list, tuple)):
            for item in value:
                _scan(item)
        else:
            opts = getattr(value, '_opts', None)
            if opts is not None:
                symbols.update(_symbols_from_opts(opts))

            name = getattr(value, 'name', None)
            opts = getattr(name, '_opts', None)
            if opts is not None:
                symbols.update(_symbols_from_opts(opts))

            attrs = getattr(value, 'attrs', None)
            if attrs:
                symbols.update(_symbols_from_opts({
                    'symbol': attrs.get('backtesting.symbol'),
                    'symbols': attrs.get('backtesting.symbols'),
                }))

    for value in values:
        _scan(value)
    return frozenset(symbols)


def _symbol_from_symbols(symbols):
    return next(iter(symbols)) if len(symbols) == 1 else None

def _strategy_indicators(strategy):
    return ((path, indicator)
            for path, indicator, _ in _strategy_indicator_specs(strategy))


def _strategy_indicator_specs(strategy):
    """
    Return strategy indicators together with setters used to reveal them gradually.

    Historically only direct strategy attributes were supported. Multi-asset
    strategies commonly keep per-symbol indicators in containers, so we scan
    nested dict/list/tuple containers while skipping Strategy._indicators, which
    keeps the full indicator registry.
    """
    specs = []
    container_ids = set()

    def _add(path, indicator, setter):
        specs.append((path, indicator, setter))

    def _scan(getter, setter, path):
        value = getter()
        if isinstance(value, _Indicator):
            _add(path, value, setter)
            return

        if isinstance(value, dict):
            container_id = id(value)
            if container_id in container_ids:
                return
            container_ids.add(container_id)
            for key in list(value):
                def dict_getter(parent_getter=getter, key=key):
                    return parent_getter()[key]

                def dict_setter(newvalue, parent_getter=getter, key=key):
                    parent_getter()[key] = newvalue

                _scan(dict_getter, dict_setter, f'{path}[{key!r}]')
            return

        if isinstance(value, list):
            container_id = id(value)
            if container_id in container_ids:
                return
            container_ids.add(container_id)
            for i in range(len(value)):
                def list_getter(parent_getter=getter, i=i):
                    return parent_getter()[i]

                def list_setter(newvalue, parent_getter=getter, i=i):
                    parent_getter()[i] = newvalue

                _scan(list_getter, list_setter, f'{path}[{i}]')
            return

        if isinstance(value, tuple):
            container_id = id(value)
            if container_id in container_ids:
                return
            container_ids.add(container_id)
            for i in range(len(value)):
                def tuple_getter(parent_getter=getter, i=i):
                    return parent_getter()[i]

                def tuple_setter(newvalue, parent_getter=getter, parent_setter=setter, i=i):
                    parent = parent_getter()
                    items = list(parent)
                    items[i] = newvalue
                    if hasattr(parent, '_fields'):
                        parent_setter(type(parent)(*items))
                    else:
                        parent_setter(tuple(items))

                _scan(tuple_getter, tuple_setter, f'{path}[{i}]')

    for attr in strategy.__dict__:
        if attr == '_indicators':
            continue

        def attr_getter(attr=attr):
            return getattr(strategy, attr)

        def attr_setter(newvalue, attr=attr):
            setattr(strategy, attr, newvalue)

        _scan(attr_getter, attr_setter, attr)

    return tuple(specs)


def _indicator_warmup_nbars(strategy):
    if strategy is None:
        return 0
    nbars = max((np.isnan(indicator.astype(float)).argmin(axis=-1).max()
                 for _, indicator in _strategy_indicators(strategy)
                 if not indicator._opts['scatter']), default=0)
    return nbars


class _SeriesName(str):
    """A string-like pandas Series name carrying backtesting metadata."""
    __slots__ = ('_opts',)

    def __new__(cls, value, opts=None):
        obj = str.__new__(cls, value)
        obj._opts = dict(opts or {})
        return obj


class _Array(np.ndarray):
    """
    ndarray extended to supply .name and other arbitrary properties
    in ._opts dict.
    """
    def __new__(cls, array, *, name=None, **kwargs):
        obj = np.asarray(array).view(cls)
        obj.name = name or getattr(array, 'name', '')
        opts = dict(kwargs)
        symbols = _symbols_from_opts(opts)
        opts['symbols'] = symbols
        opts['symbol'] = _symbol_from_symbols(symbols)
        obj._opts = opts
        return obj

    def __array_finalize__(self, obj):
        if obj is not None:
            self.name = getattr(obj, 'name', '')
            self._opts = getattr(obj, '_opts', {})

    def __array_ufunc__(self, ufunc, method, *inputs, **kwargs):
        template = next((input for input in inputs if isinstance(input, _Array)), self)
        symbols = set(_merged_symbols(*inputs))
        unwrapped_inputs = tuple(
            np.asarray(input) if isinstance(input, _Array) else input
            for input in inputs)

        if 'out' in kwargs and kwargs['out'] is not None:
            kwargs = dict(kwargs)
            kwargs['out'] = tuple(
                np.asarray(output) if isinstance(output, _Array) else output
                for output in kwargs['out'])

        result = getattr(ufunc, method)(*unwrapped_inputs, **kwargs)
        if result is NotImplemented:
            return NotImplemented

        opts = dict(getattr(template, '_opts', {}))
        symbols.update(_symbols_from_opts(opts))
        symbols = frozenset(symbols)
        opts['symbols'] = symbols
        opts['symbol'] = _symbol_from_symbols(symbols)
        name = getattr(template, 'name', '')
        cls = type(template)

        def _wrap(value):
            if value is None or not isinstance(value, np.ndarray):
                return value
            return cls(value, name=name, **opts)

        if isinstance(result, tuple):
            return tuple(_wrap(value) for value in result)
        return _wrap(result)

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
        name = (_SeriesName(self.name, self._opts)
                if isinstance(self.name, str) else self.name)
        series = pd.Series(values[0], index=index, name=name)
        series.attrs['backtesting.symbol'] = self._opts.get('symbol')
        series.attrs['backtesting.symbols'] = self._opts.get('symbols')
        return series

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
    """
    def __init__(self, df: pd.DataFrame, *, symbol=None):
        self.__df = df
        self.__symbol = symbol
        self.__len = len(df)  # Current length
        self.__pip: Optional[float] = None
        self.__cache: Dict[str, _Array] = {}
        self.__arrays: Dict[str, _Array] = {}
        self._update()

    def __getitem__(self, item):
        return self.__get_array(item)

    def __getattr__(self, item):
        try:
            return self.__get_array(item)
        except KeyError:
            raise AttributeError(f"Column '{item}' not in data") from None

    def _set_length(self, length):
        self.__len = length
        self.__cache.clear()

    def _update(self):
        index = self.__df.index.copy()
        self.__arrays = {col: _Array(arr, index=index, symbol=self.__symbol)
                         for col, arr in self.__df.items()}
        # Leave index as Series because pd.Timestamp nicer API to work with
        self.__arrays['__index'] = index

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
            self.__pip = float(10**-np.median([len(s.partition('.')[-1])
                                               for s in self.__arrays['Close'].astype(str)]))
        return self.__pip

    def __get_array(self, key) -> _Array:
        arr = self.__cache.get(key)
        if arr is None:
            arr = self.__cache[key] = cast(_Array, self.__arrays[key][:self.__len])
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

    @property
    def symbol(self):
        return self.__symbol

    # Make pickling in Backtest.optimize() work with our catch-all __getattr__
    def __getstate__(self):
        return self.__dict__

    def __setstate__(self, state):
        self.__dict__ = state


class _MultiData:
    """
    A synchronized collection of `_Data` accessors, keyed by asset symbol.
    """
    def __init__(self, dfs: Dict[str, pd.DataFrame]):
        if not dfs:
            raise ValueError('Need at least one data frame')
        indexes = [df.index for df in dfs.values()]
        index = indexes[0]
        if any(not index.equals(other) for other in indexes[1:]):
            raise ValueError('All multi-asset data frames must share an aligned index')

        self.__data = {symbol: _Data(df, symbol=symbol) for symbol, df in dfs.items()}
        self.__symbols = tuple(dfs)
        self.__index = index
        self.__len = len(index)

    def __getitem__(self, symbol) -> _Data:
        try:
            return self.__data[symbol]
        except KeyError:
            raise KeyError(f"Symbol {symbol!r} not in data") from None

    def __iter__(self):
        return iter(self.__symbols)

    def __len__(self):
        return self.__len

    def _set_length(self, length):
        self.__len = length
        for data in self.__data.values():
            data._set_length(length)

    def _update(self):
        for data in self.__data.values():
            data._update()

    @property
    def symbols(self):
        return self.__symbols

    @property
    def index(self) -> pd.DatetimeIndex:
        return self.__data[self.__symbols[0]].index

    @property
    def df(self) -> pd.DataFrame:
        return pd.concat({symbol: data.df for symbol, data in self.__data.items()}, axis=1)


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
        df = pd.DataFrame({
            col: SharedMemoryManager.shm2s(shm, shape, dtype)
            for shm, (col, _, shape, dtype) in zip(shm, data_shm)})
        df.set_index(SharedMemoryManager._DF_INDEX_COL, drop=True, inplace=True)
        df.index.name = None
        return df, shm
