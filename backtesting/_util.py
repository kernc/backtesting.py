import warnings
from typing import Callable, Dict, List, Optional, Sequence, Union, cast
from itertools import chain
from numbers import Number

import numpy as np
import pandas as pd


def try_(lazy_func, default=None, exception=Exception):
    try:
        return lazy_func()
    except exception:
        return default


def static_indicator(func: Callable, *args,
                     name=None, plot=True, overlay=None, color=None, scatter=False, _data=None, data=None,
                     **kwargs) -> np.ndarray:
    """
    Declare indicator. An indicator is just an array of values,
    but one that is revealed gradually in
    `backtesting.backtesting.Strategy.next` much like
    `backtesting.backtesting.Strategy.data` is.
    Returns `np.ndarray` of indicator values.

    `func` is a function that returns the indicator array(s) of
    same length as `backtesting.backtesting.Strategy.data`.

    In the plot legend, the indicator is labeled with
    function name, unless `name` overrides it.

    If `plot` is `True`, the indicator is plotted on the resulting
    `backtesting.backtesting.Backtest.plot`.

    If `overlay` is `True`, the indicator is plotted overlaying the
    price candlestick chart (suitable e.g. for moving averages).
    If `False`, the indicator is plotted standalone below the
    candlestick chart. By default, a heuristic is used which decides
    correctly most of the time.

    `color` can be string hex RGB triplet or X11 color name.
    By default, the next available color is assigned.

    If `scatter` is `True`, the plotted indicator marker will be a
    circle instead of a connected line segment (default).

    Additional `*args` and `**kwargs` are passed to `func` and can
    be used for parameters.

    For example, using simple moving average function from TA-Lib:

        def init():
            self.sma = utils._static_I(ta.SMA, self.data.Close, self.n_sma)

    Do not forget to update the backtesting self indicators property
    """

    if name is None:
        params = ','.join(filter(None, map(_as_str, chain(args, kwargs.values()))))
        func_name = _as_str(func)
        name = (f'{func_name}({params})' if params else f'{func_name}')
    else:
        name = name.format(*map(_as_str, args),
                           **dict(zip(kwargs.keys(), map(_as_str, kwargs.values()))))

    try:
        value = func(*args, **kwargs)
    except Exception as e:
        raise RuntimeError(f'Indicator "{name}" errored with exception: {e}')

    if isinstance(value, pd.DataFrame):
        value = value.values.T

    if value is not None:
        value = try_(lambda: np.asarray(value, order='C'), None)
    is_arraylike = value is not None

    # Optionally flip the array if the user returned e.g. `df.values`
    if is_arraylike and np.argmax(value.shape) == 0:
        value = value.T

    if not is_arraylike or not 1 <= value.ndim <= 2 or value.shape[-1] != len(_data.Close):
        raise ValueError(
            'Indicators must return (optionally a tuple of) numpy.arrays of same '
            f'length as `data` (data shape: {_data.Close.shape}; indicator "{name}"'
            f'shape: {getattr(value, "shape" , "")}, returned value: {value})')

    if plot and overlay is None and np.issubdtype(value.dtype, np.number):
        x = value / _data.Close
        # By default, overlay if strong majority of indicator values
        # is within 30% of Close
        with np.errstate(invalid='ignore'):
            overlay = ((x < 1.4) & (x > .6)).mean() > .6

    value = _Indicator(value, name=name, plot=plot, overlay=overlay,
                       color=color, scatter=scatter,
                       # _Indicator.s Series accessor uses this:
                       index=data.index)

    return value


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


def _data_period(index) -> Union[pd.Timedelta, Number]:
    """Return data index period as pd.Timedelta"""
    values = pd.Series(index[-100:])
    return values.diff().dropna().median()

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
    """
    def __init__(self, df: pd.DataFrame):
        self.__df = df
        self.__i = len(df)
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

    def _set_length(self, i):
        self.__i = i
        self.__cache.clear()

    def _update(self):
        index = self.__df.index.copy()
        self.__arrays = {col: _Array(arr, index=index)
                         for col, arr in self.__df.items()}
        # Leave index as Series because pd.Timestamp nicer API to work with
        self.__arrays['__index'] = index

    def __repr__(self):
        i = min(self.__i, len(self.__df) - 1)
        index = self.__arrays['__index'][i]
        items = ', '.join(f'{k}={v}' for k, v in self.__df.iloc[i].items())
        return f'<Data i={i} ({index}) {items}>'

    def __len__(self):
        return self.__i

    @property
    def df(self) -> pd.DataFrame:
        return (self.__df.iloc[:self.__i]
                if self.__i < len(self.__df)
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
            arr = self.__cache[key] = cast(_Array, self.__arrays[key][:self.__i])
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
