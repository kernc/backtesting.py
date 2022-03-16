"""
Collection of common building blocks, helper auxiliary functions and
composable strategy classes for reuse.

Intended for simple missing-link procedures, not reinventing
of better-suited, state-of-the-art, fast libraries,
such as TA-Lib, Tulipy, PyAlgoTrade, NumPy, SciPy ...

Please raise ideas for additions to this collection on the [issue tracker].

[issue tracker]: https://github.com/kernc/backtesting.py
"""

from collections import OrderedDict
from itertools import compress
from numbers import Number
from inspect import currentframe
from typing import Sequence, Optional, Union, Callable

import numpy as np
import pandas as pd

from ._stats import compute_stats as _compute_stats
from ._util import _Array, _as_str

__pdoc__ = {}


OHLCV_AGG = OrderedDict((
    ('Open', 'first'),
    ('High', 'max'),
    ('Low', 'min'),
    ('Close', 'last'),
    ('Volume', 'sum'),
))
"""Dictionary of rules for aggregating resampled OHLCV data frames,
e.g.

    df.resample('4H', label='right').agg(OHLCV_AGG).dropna()
"""

TRADES_AGG = OrderedDict((
    ('Size', 'sum'),
    ('EntryBar', 'first'),
    ('ExitBar', 'last'),
    ('EntryPrice', 'mean'),
    ('ExitPrice', 'mean'),
    ('PnL', 'sum'),
    ('ReturnPct', 'mean'),
    ('EntryTime', 'first'),
    ('ExitTime', 'last'),
    ('Duration', 'sum'),
))
"""Dictionary of rules for aggregating resampled trades data,
e.g.

    stats['_trades'].resample('1D', on='ExitTime',
                              label='right').agg(TRADES_AGG)
"""

_EQUITY_AGG = {
    'Equity': 'last',
    'DrawdownPct': 'max',
    'DrawdownDuration': 'max',
}


def barssince(condition: Sequence[bool], default=np.inf) -> int:
    """
    Return the number of bars since `condition` sequence was last `True`,
    or if never, return `default`.

        >>> barssince(self.data.Close > self.data.Open)
        3
    """
    return next(compress(range(len(condition)), reversed(condition)), default)


def cross(series1: Sequence, series2: Sequence) -> bool:
    """
    Return `True` if `series1` and `series2` just crossed
    (above or below) each other.

        >>> cross(self.data.Close, self.sma)
        True

    """
    return crossover(series1, series2) or crossover(series2, series1)


def crossover(series1: Sequence, series2: Sequence) -> bool:
    """
    Return `True` if `series1` just crossed over (above)
    `series2`.

        >>> crossover(self.data.Close, self.sma)
        True
    """
    series1 = (
        series1.values if isinstance(series1, pd.Series) else
        (series1, series1) if isinstance(series1, Number) else
        series1)
    series2 = (
        series2.values if isinstance(series2, pd.Series) else
        (series2, series2) if isinstance(series2, Number) else
        series2)
    try:
        return series1[-2] < series2[-2] and series1[-1] > series2[-1]
    except IndexError:
        return False




def quantile(series: Sequence, quantile: Union[None, float] = None):
    """
    If `quantile` is `None`, return the quantile _rank_ of the last
    value of `series` wrt former series values.

    If `quantile` is a value between 0 and 1, return the _value_ of
    `series` at this quantile. If used to working with percentiles, just
    divide your percentile amount with 100 to obtain quantiles.

        >>> quantile(self.data.Close[-20:], .1)
        162.130
        >>> quantile(self.data.Close)
        0.13
    """
    if quantile is None:
        try:
            last, series = series[-1], series[:-1]
            return np.mean(series < last)
        except IndexError:
            return np.nan
    assert 0 <= quantile <= 1, "quantile must be within [0, 1]"
    return np.nanpercentile(series, quantile * 100)


def compute_stats(
        *,
        stats: pd.Series,
        data: pd.DataFrame,
        trades: pd.DataFrame = None,
        risk_free_rate: float = 0.) -> pd.Series:
    """
    (Re-)compute strategy performance metrics.

    `stats` is the statistics series as returned by `backtesting.backtesting.Backtest.run()`.
    `data` is OHLC data as passed to the `backtesting.backtesting.Backtest`
    the `stats` were obtained in.
    `trades` can be a dataframe subset of `stats._trades` (e.g. only long trades).
    You can also tune `risk_free_rate`, used in calculation of Sharpe and Sortino ratios.

        >>> stats = Backtest(GOOG, MyStrategy).run()
        >>> only_long_trades = stats._trades[stats._trades.Size > 0]
        >>> long_stats = compute_stats(stats=stats, trades=only_long_trades,
        ...                            data=GOOG, risk_free_rate=.02)
    """
    equity = stats._equity_curve.Equity
    if trades is None:
        trades = stats._trades
    else:
        # XXX: Is this buggy?
        equity = equity.copy()
        equity[:] = stats._equity_curve.Equity.iloc[0]
        for t in trades.itertuples(index=False):
            equity.iloc[t.EntryBar:] += t.PnL
    return _compute_stats(trades=trades, equity=equity, ohlc_data=data,
                          risk_free_rate=risk_free_rate, strategy_instance=stats._strategy)


def resample_apply(rule: str,
                   func: Optional[Callable[..., Sequence]],
                   series: Union[pd.Series, pd.DataFrame, _Array],
                   *args,
                   agg: Union[str, dict] = None,
                   **kwargs):
    """
    Apply `func` (such as an indicator) to `series`, resampled to
    a time frame specified by `rule`. When called from inside
    `backtesting.backtesting.Strategy.init`,
    the result (returned) series will be automatically wrapped in
    `backtesting.backtesting.Strategy.I`
    wrapper method.

    `rule` is a valid [Pandas offset string] indicating
    a time frame to resample `series` to.

    [Pandas offset string]: \
http://pandas.pydata.org/pandas-docs/stable/timeseries.html#offset-aliases

    `func` is the indicator function to apply on the resampled series.

    `series` is a data series (or array), such as any of the
    `backtesting.backtesting.Strategy.data` series. Due to pandas
    resampling limitations, this only works when input series
    has a datetime index.

    `agg` is the aggregation function to use on resampled groups of data.
    Valid values are anything accepted by `pandas/resample/.agg()`.
    Default value for dataframe input is `OHLCV_AGG` dictionary.
    Default value for series input is the appropriate entry from `OHLCV_AGG`
    if series has a matching name, or otherwise the value `"last"`,
    which is suitable for closing prices,
    but you might prefer another (e.g. `"max"` for peaks, or similar).

    Finally, any `*args` and `**kwargs` that are not already eaten by
    implicit `backtesting.backtesting.Strategy.I` call
    are passed to `func`.

    For example, if we have a typical moving average function
    `SMA(values, lookback_period)`, _hourly_ data source, and need to
    apply the moving average MA(10) on a _daily_ time frame,
    but don't want to plot the resulting indicator, we can do:

        class System(Strategy):
            def init(self):
                self.sma = resample_apply(
                    'D', SMA, self.data.Close, 10, plot=False)

    The above short snippet is roughly equivalent to:

        class System(Strategy):
            def init(self):
                # Strategy exposes `self.data` as raw NumPy arrays.
                # Let's convert closing prices back to pandas Series.
                close = self.data.Close.s

                # Resample to daily resolution. Aggregate groups
                # using their last value (i.e. closing price at the end
                # of the day). Notice `label='right'`. If it were set to
                # 'left' (default), the strategy would exhibit
                # look-ahead bias.
                daily = close.resample('D', label='right').agg('last')

                # We apply SMA(10) to daily close prices,
                # then reindex it back to original hourly index,
                # forward-filling the missing values in each day.
                # We make a separate function that returns the final
                # indicator array.
                def SMA(series, n):
                    from backtesting.test import SMA
                    return SMA(series, n).reindex(close.index).ffill()

                # The result equivalent to the short example above:
                self.sma = self.I(SMA, daily, 10, plot=False)

    """
    if func is None:
        def func(x, *_, **__):
            return x

    if not isinstance(series, (pd.Series, pd.DataFrame)):
        assert isinstance(series, _Array), \
            'resample_apply() takes either a `pd.Series`, `pd.DataFrame`, ' \
            'or a `Strategy.data.*` array'
        series = series.s

    if agg is None:
        agg = OHLCV_AGG.get(getattr(series, 'name', ''), 'last')
        if isinstance(series, pd.DataFrame):
            agg = {column: OHLCV_AGG.get(column, 'last')
                   for column in series.columns}

    resampled = series.resample(rule, label='right').agg(agg).dropna()
    resampled.name = _as_str(series) + '[' + rule + ']'

    # Check first few stack frames if we are being called from
    # inside Strategy.init, and if so, extract Strategy.I wrapper.
    frame, level = currentframe(), 0
    while frame and level <= 3:
        frame = frame.f_back
        level += 1
        if isinstance(frame.f_locals.get('self'), Strategy):  # type: ignore
            strategy_I = frame.f_locals['self'].I             # type: ignore
            break
    else:
        def strategy_I(func, *args, **kwargs):
            return func(*args, **kwargs)

    def wrap_func(resampled, *args, **kwargs):
        result = func(resampled, *args, **kwargs)
        if not isinstance(result, pd.DataFrame) and not isinstance(result, pd.Series):
            result = np.asarray(result)
            if result.ndim == 1:
                result = pd.Series(result, name=resampled.name)
            elif result.ndim == 2:
                result = pd.DataFrame(result.T)
        # Resample back to data index
        if not isinstance(result.index, pd.DatetimeIndex):
            result.index = resampled.index
        result = result.reindex(index=series.index.union(resampled.index),
                                method='ffill').reindex(series.index)
        return result

    wrap_func.__name__ = func.__name__  # type: ignore

    array = strategy_I(wrap_func, resampled, *args, **kwargs)
    return array

def random_ohlc_data(example_data: pd.DataFrame, *,
                     frac=1., random_state: int = None) -> pd.DataFrame:
    """
    OHLC data generator. The generated OHLC data has basic
    [descriptive statistics](https://en.wikipedia.org/wiki/Descriptive_statistics)
    similar to the provided `example_data`.

    `frac` is a fraction of data to sample (with replacement). Values greater
    than 1 result in oversampling.

    Such random data can be effectively used for stress testing trading
    strategy robustness, Monte Carlo simulations, significance testing, etc.

    >>> from backtesting.test import EURUSD
    >>> ohlc_generator = random_ohlc_data(EURUSD)
    >>> next(ohlc_generator)  # returns new random data
    ...
    >>> next(ohlc_generator)  # returns new random data
    ...
    """
    def shuffle(x):
        return x.sample(frac=frac, replace=frac > 1, random_state=random_state)

    if len(example_data.columns.intersection({'Open', 'High', 'Low', 'Close'})) != 4:
        raise ValueError("`data` must be a pandas.DataFrame with columns "
                         "'Open', 'High', 'Low', 'Close'")
    while True:
        df = shuffle(example_data)
        df.index = example_data.index
        padding = df.Close - df.Open.shift(-1)
        gaps = shuffle(example_data.Open.shift(-1) - example_data.Close)
        deltas = (padding + gaps).shift(1).fillna(0).cumsum()
        for key in ('Open', 'High', 'Low', 'Close'):
            df[key] += deltas
        yield df
