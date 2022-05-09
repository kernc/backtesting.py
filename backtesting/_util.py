import warnings
from numbers import Number
from typing import Dict, List, Optional, Sequence, Union, cast

import numpy as np
import pandas as pd


def try_(lazy_func, default=None, exception=Exception):
    try:
        return lazy_func()
    except exception:
        return default


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

    def __init__(self, data: Union[pd.DataFrame, dict[str, pd.DataFrame]]):
        self._is_single_instrument = isinstance(data, pd.DataFrame)
        if self._is_single_instrument:
            # internally, we will always store
            data = {'default_instrument': data}
        index = pd.Index()
        for instrument, instrument_data in data.items():
            data_name = "`data`" if self._is_single_instrument else f"`data[{instrument}]`"
            if not isinstance(instrument_data, pd.DataFrame):
                raise TypeError(' '.join([
                    f"{data_name} must be a pandas.DataFrame",
                    "or a dictionary containing instrument names (`str`) and corresponding instrument data (`pd.DataFrame`)"
                    if self.___is_single_instrument else "",
                    "with columns"
                ]))

            instrument_data = instrument_data.copy(deep=False)

            # Convert index to datetime index
            if (not isinstance(instrument_data.index, pd.DatetimeIndex) and
                    not isinstance(instrument_data.index, pd.RangeIndex) and
                    # Numeric index with most large numbers
                    (instrument_data.index.is_numeric() and
                     (instrument_data.index > pd.Timestamp('1975').timestamp()).mean() > .8)):
                try:
                    instrument_data.index = pd.to_datetime(instrument_data.index, infer_datetime_format=True)
                except ValueError:
                    pass

            if 'Volume' not in instrument_data:
                instrument_data['Volume'] = np.nan

            if len(instrument_data) == 0:
                raise ValueError(f'{instrument_data} OHLC is empty')
            if len(instrument_data.columns.intersection({'Open', 'High', 'Low', 'Close', 'Volume'})) != 5:
                raise ValueError(f"{data_name} must be a pandas.DataFrame with columns "
                                 "'Open', 'High', 'Low', 'Close', and (optionally) 'Volume'")
            if instrument_data[['Open', 'High', 'Low', 'Close']].isnull().values.any():
                raise ValueError('Some OHLC values are missing (NaN). '
                                 'Please strip those lines with `df.dropna()` or '
                                 'fill them in with `df.interpolate()` or whatever.')
            if not instrument_data.index.is_monotonic_increasing:
                warnings.warn(f'{data_name} index is not sorted in ascending order. Sorting.',
                              stacklevel=2)
                instrument_data = instrument_data.sort_index()
            if not isinstance(instrument_data.index, pd.DatetimeIndex):
                if self.__is_single_instrument:
                    warnings.warn(f'{data_name} index is not datetime. Assuming simple periods, '
                                  'but `pd.DateTimeIndex` is advised.',
                                  stacklevel=2)
                else:
                    raise ValueError(f'{data_name} index is not datetime')
            index = self._index.union(instrument_data.index)
            data[instrument] = instrument_data.copy(deep=False)

        df = pd.DataFrame()
        instrument_data: pd.DataFrame
        for instrument, instrument_data in data.items():
            instrument_data.index = index
            # if data for some instruments is available from an earlier date than others
            # fill 0s for the other instruments' data.
            instrument_data = instrument_data.fillna(value=0)
            # rename columns before join
            instrument_data.rename(
                columns={col: col if self._is_single_instrument else f'{instrument}-{col}'
                         for col in 'Open Low High Close Volume'.split()},
                inplace=True
            )
            df = df.join(instrument_data)

        self.__instruments = set(data.keys())
        self.__df: pd.DataFrame = df
        self.__i = len(index)
        self.__pip: Optional[float] = None
        self.__cache: Dict[str, _Array] = {}
        self.__arrays: Dict[str, _Array] = {}
        self._update()

    @property
    def is_single_instrument(self) -> bool:
        return self._is_single_instrument

    @property
    def instruments(self) -> set[str]:
        return self.__instruments

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
        items = ', '.join(f'{k}={v}'
                          for k, v in self.__df.iloc[i].items())
        return f'<Data i={i} ({index}) {items}>'

    def __len__(self):
        return self.__i

    @property
    def df(self) -> pd.DataFrame:
        return (self.__data.iloc[:self.__i]
                if self.__i < len(self.__data)
                else self.__data)

    @property
    def pip(self) -> Union[dict[str, float], float]:
        if self.__pip is None:
            self.__pip = {instrument: float(10 ** -np.median([len(s.partition('.')[-1])
                                                              for s in
                                                              self.__arrays[f'{instrument}-Close'].astype(str)]))
                          for instrument in self.instruments}
        if self.is_single_instrument:
            return self.__pip['default_instrument']
        else:
            return self.__pip

    def __get_array(self, key) -> _Array:
        arr = self.__cache.get(key)
        if arr is None:
            arr = self.__cache[key] = cast(_Array, self.__arrays[key][:self.__i])
        return arr

    @property
    def Open(self) -> Union[_Array, dict[str, _Array]]:
        if self.is_single_instrument:
            return self.__get_array(f'default_instrument-Open')
        else:
            return {instrument: self.__get_array(f'{instrument}-Open') for instrument in self.instruments}

    @property
    def High(self) -> Union[_Array, dict[str, _Array]]:
        if self.is_single_instrument:
            return self.__get_array(f'default_instrument-High')
        else:
            return {instrument: self.__get_array(f'{instrument}-High') for instrument in self.instruments}

    @property
    def Low(self) -> Union[_Array, dict[str, _Array]]:
        if self.is_single_instrument:
            return self.__get_array(f'default_instrument-Low')
        else:
            return {instrument: self.__get_array(f'{instrument}-Low') for instrument in self.instruments}

    @property
    def Close(self) -> Union[_Array, dict[str, _Array]]:
        if self.is_single_instrument:
            return self.__get_array('default_instrument-Close')
        else:
            return {instrument: self.__get_array(f'{instrument}-Close') for instrument in self.instruments}

    @property
    def Volume(self) -> Union[_Array, dict[str, _Array]]:
        if self.is_single_instrument:
            return self.__get_array('default_instrument-Volume')
        else:
            return {instrument: self.__get_array(f'{instrument}-Volume') for instrument in self.instruments}

    @property
    def index(self) -> pd.DatetimeIndex:
        return self.__get_array('__index')

    # Make pickling in Backtest.optimize() work with our catch-all __getattr__
    def __getstate__(self):
        return self.__dict__

    def __setstate__(self, state):
        self.__dict__ = state
