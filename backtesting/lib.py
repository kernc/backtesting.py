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

from .backtesting import Strategy
from ._plotting import plot_heatmaps as _plot_heatmaps
from ._util import _Indicator, _as_str


OHLCV_AGG = OrderedDict((
    ('Open', 'first'),
    ('High', 'max'),
    ('Low', 'min'),
    ('Close', 'last'),
    ('Volume', 'sum'),
))
"""Dictionary of rules for aggregating resampled OHLCV data frames,
e.g.

    df.resample('4H', label='right').agg(OHLCV_AGG)
"""


def barssince(condition: Sequence[bool], default=np.inf) -> int:
    """
    Return the number of bars since `condition` sequence was last `True`,
    or if never, return `default`.

        >>> barssince(self.data.Close > self.data.Open)
        3
    """
    return next(compress(range(len(condition)), reversed(condition)), default)


def cross(series1, series2) -> bool:
    """
    Return `True` if `series1` and `series2` just crossed (either
    direction).

        >>> cross(self.data.Close, self.sma)
        True

    """
    return crossover(series1, series2) or crossover(series2, series1)


def crossover(series1, series2) -> bool:
    """
    Return `True` if `series1` just crossed over
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


def plot_heatmaps(heatmap: pd.Series,
                  agg: Union[str, Callable] = 'max',
                  *,
                  ncols: int = 3,
                  plot_width: int = 1200,
                  filename: str = '',
                  open_browser: bool = True):
    """
    Plots a grid of heatmaps, one for every pair of parameters in `heatmap`.

    `heatmap` is a Series as returned by
    `backtesting.backtesting.Backtest.optimize` when its parameter
    `return_heatmap=True`.

    When projecting the n-dimensional heatmap onto 2D, the values are
    aggregated by 'max' function by default. This can be tweaked
    with `agg` parameter, which accepts any argument pandas knows
    how to aggregate by.
    """
    return _plot_heatmaps(heatmap, agg, ncols, filename, plot_width, open_browser)


def quantile(series, quantile=None):
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


def resample_apply(rule: str,
                   func: Callable,
                   series,
                   *args, **kwargs):
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
    """
    if not isinstance(series, pd.Series):
        series = pd.Series(series,
                           index=series._opts['data'].index,
                           name=series.name)

    resampled = series.resample(rule, label='right').agg('last').dropna()
    resampled.name = _as_str(series) + '[' + rule + ']'

    # Check first few stack frames if we are being called from
    # inside Strategy.init, and if so, extract Strategy.I wrapper.
    frame, level = currentframe(), 0
    while frame and level <= 3:
        frame = frame.f_back
        level += 1
        if isinstance(frame.f_locals.get('self'), Strategy):
            strategy_I = frame.f_locals['self'].I
            break
    else:
        def strategy_I(func, *args, **kwargs):
            return func(*args, **kwargs)

    # Resample back to data index
    def wrap_func(resampled, *args, **kwargs):
        ind = func(resampled, *args, **kwargs)
        ind = ind.reindex(index=series.index | ind.index,
                          method='ffill').reindex(series.index)
        return ind

    wrap_func.__name__ = func.__name__

    array = strategy_I(wrap_func, resampled, *args, **kwargs)
    return array


class SignalStrategy(Strategy):
    """
    A simple helper strategy that operates on position entry/exit signals.
    This makes the backtest of the strategy simulate a [vectorized backtest].
    See [tutorials] for usage examples.

    [vectorized backtest]: https://www.google.com/search?q=vectorized+backtest
    [tutorials]: index.html#tutorials

    To use this helper strategy, subclass it, override its
    `backtesting.backtesting.Strategy.init` method,
    and set the signal vector by calling
    `backtesting.lib.SignalStrategy.set_signal` method from within it.

        class ExampleStrategy(SignalStrategy):
            def init(self):
                super().init()
                self.set_signal(sma1 > sma2, sma1 < sma2)

    Remember to call `super().init()` and `super().next()` in your
    overridden methods.
    """
    __entry_signal = (0,)
    __exit_signal = (False,)

    def set_signal(self, entry: Sequence[int], exit: Optional[Sequence[bool]] = None,
                   plot: bool = True):
        """
        Set entry/exit signal vectors (arrays). An long entry signal is considered
        present wherever `entry` is greater than zero. A short entry signal
        is considered present wherever `entry` is less than zero. If `exit`
        is provided, a nonzero value closes the position, if any; otherwise
        the position is held until a reverse signal in `entry`.

        If `plot` is `True`, the signal entry/exit indicators are plotted when
        `backtesting.backtesting.Backtest.plot` is called.
        """
        self.__entry_signal = _Indicator(pd.Series(entry, dtype=float).fillna(0),
                                         name='entry', plot=plot, overlay=False)
        if exit is not None:
            self.__exit_signal = _Indicator(pd.Series(exit, dtype=float).fillna(0),
                                            name='exit', plot=plot, overlay=False)

    def next(self):
        super().next()

        if self.position and self.__exit_signal[-1]:
            self.position.close()

        signal = self.__entry_signal[-1]

        if signal > 0:
            self.buy()
        elif signal < 0:
            self.sell()


class TrailingStrategy(Strategy):
    """
    A strategy with automatic trailing stop-loss, trailing the current
    price at distance of some multiple of average true range (ATR). Call
    `TrailingStrategy.set_trailing_sl()` to set said multiple
    (`6` by default). See [tutorials] for usage examples.

    [tutorials]: index.html#tutorials

    Remember to call `super().init()` and `super().next()` in your
    overridden methods.
    """
    __n_atr = 6
    __atr = None

    def init(self):
        super().init()
        self.set_atr_periods()

    def set_atr_periods(self, periods: int = 100):
        """
        Set the lookback period for computing ATR. The default value
        of 100 ensures a _stable_ ATR.
        """
        h, l, c_prev = self.data.High, self.data.Low, pd.Series(self.data.Close).shift(1)
        tr = np.max([h - l, (c_prev - h).abs(), (c_prev - l).abs()], axis=0)
        atr = pd.Series(tr).rolling(periods).mean().bfill().values
        self.__atr = atr

    def set_trailing_sl(self, n_atr: float = 6):
        """
        Sets the future trailing stop-loss as some multiple (`n_atr`)
        average true bar ranges away from the current price.
        """
        self.__n_atr = n_atr

    def next(self):
        super().next()

        if self.__n_atr and self.position:
            if self.position.is_long:
                self.orders.set_sl(self.data.Close[-1] - self.__atr[-1] * self.__n_atr)
            else:
                self.orders.set_sl(self.data.Close[-1] + self.__atr[-1] * self.__n_atr)


# NOTE: Don't put anything below this __all__ list

__all__ = [getattr(v, '__name__', k)
           for k, v in globals().items()                        # export
           if ((callable(v) and v.__module__ == __name__ or     # callables from this module
                k.isupper()) and                                # or CONSTANTS
               not getattr(v, '__name__', k).startswith('_'))]  # neither marked internal

# NOTE: Don't put anything below here. See above.
