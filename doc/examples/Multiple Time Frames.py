# ---
# jupyter:
#   jupytext:
#     text_representation:
#       extension: .py
#       format_name: light
#       format_version: '1.3'
#       jupytext_version: 0.8.6
#   kernelspec:
#     display_name: Python 3
#     language: python
#     name: python3
# ---

# Multiple Time Frames
# ============
#
# The best trading strategies relying on technical analysis take into account the price action on multiple time frames.
# This tutorial will show how to do that with _backtesting.py_, offloading most of the work to
# [pandas resampling](http://pandas.pydata.org/pandas-docs/stable/timeseries.html#resampling).
# It is assumed you're already familiar with
# [basic _backtesting.py_ usage](https://kernc.github.io/backtesting.py/doc/examples/Quick Start User Guide.html).
#
# We will test this supposed long-only
# [400%-a-year trading strategy](http://jbmarwood.com/stock-trading-strategy-300/),
# which daily and weekly
# [relative strength index](https://en.wikipedia.org/wiki/Relative_strength_index)
# (RSI) values and moving averages (MA).
#
# Let's introduce the two indicators we'll be using.
# In practice, one can use functions from any indicator library, such as
# [TA-Lib](https://github.com/mrjbq7/ta-lib),
# [Tulipy](https://tulipindicators.org),
# PyAlgoTrade, ...

# +
import pandas as pd


def SMA(array, n):
    """Simple moving average"""
    return pd.Series(array).rolling(n).mean()


def RSI(array, n):
    """Relative strength index"""
    # Approximate; good enough
    gain = pd.Series(array).diff()
    loss = gain.copy()
    gain[gain < 0] = 0
    loss[loss > 0] = 0
    rs = gain.ewm(n).mean() / loss.abs().ewm(n).mean()
    return 100 - 100 / (1 + rs)
# -

# The strategy roughly goes like this:
#
# Buy a position when:
# * weekly RSI(30) $\geq$ daily RSI(30) $>$ 70
# * Close $>$ MA(10) $>$ MA(20) $>$ MA(50) $>$ MA(100)
#
# Close the position when:
# * Close more than 2% _below_ MA(10)
# * 8% fixed stop loss is hit
#
# We need to provide bars data in the _lowest time frame_ (i.e. daily) and resample it to any higher time frames (i.e. weekly) that our strategy requires.

# +
from backtesting import Strategy, Backtest
from backtesting.lib import resample_apply


class System(Strategy):
    d_rsi = 30  # Daily RSI lookback periods
    w_rsi = 30  # Weekly
    level = 70
    
    def init(self):
        # Compute moving averages the strategy demands
        self.ma10 = self.I(SMA, self.data.Close, 10)
        self.ma20 = self.I(SMA, self.data.Close, 20)
        self.ma50 = self.I(SMA, self.data.Close, 50)
        self.ma100 = self.I(SMA, self.data.Close, 100)
        
        # Compute daily RSI(30)
        self.daily_rsi = self.I(RSI, self.data.Close, self.d_rsi)
        
        # To construct weekly RSI, we have to resample
        # the daily values.
        
        # Strategy exposes `self.data` as raw NumPy arrays.
        # Let's make closing prices back a pandas Series.
        
        close = pd.Series(self.data.Close,
                          index=self.data.index,
                          name='Close')
        
        # Resample to weekly resolution, ending weeks on
        # fridays. Aggregate groups using their last value
        # (i.e. week's closing price).
        # Notice `label='right'`. If it were set to 'left' (default),
        # the strategy would exhibit look-ahead bias.
        
        weekly_close = close.resample('W-FRI', label='right').agg('last')
        
        # We apply RSI(30) to weekly close
        # prices, then reindex it back to original daily
        # index, forward-filling the missing values in each
        # week.
        # We make a separate function that returns the final
        # indicator array.
        
        def W_RSI(series, n):
            return RSI(series, n).reindex(close.index).ffill()
        
        self.weekly_rsi = self.I(W_RSI, weekly_close, self.w_rsi)
        
        
        # ... And, now that you know what goes on behind the scenes,
        # we could achieve the whole *exact* same thing with simpler:
        
        self.weekly_rsi = resample_apply(
            'W-FRI', RSI, self.data.Close, self.w_rsi)
        
        
    def next(self):
        price = self.data.Close[-1]
        
        # If we don't already have a position, and
        # if all conditions are satisfied, enter long.
        if (not self.position and
            self.daily_rsi[-1] > self.level and
            self.weekly_rsi[-1] > self.level and
            self.weekly_rsi[-1] > self.daily_rsi[-1] and
            self.ma10[-1] > self.ma20[-1] > self.ma50[-1] > self.ma100[-1] and
            price > self.ma10[-1]):
            
            # Buy at market price on next open, but do
            # set 8% fixed stop loss.
            self.buy(sl=.92 * price)
        
        # If the price closes 2% or more below 10-day MA
        # close the position, if any.
        elif price < .98 * self.ma10[-1]:
            self.position.close()
# -

# Let's see how our strategy fares replayed on nine years of Google stock data.

# +
from backtesting.test import GOOG

backtest = Backtest(GOOG, System, commission=.002)
backtest.run()
# -

# Meager four trades in a span of nine years with effectively zero return? How about if we optimize the parameters a bit?

# +
# %%time

backtest.optimize(d_rsi=range(10, 35, 5),
                  w_rsi=range(10, 35, 5),
                  level=range(30, 80, 10))
# -

backtest.plot()

# Better. While the strategy doesn't perform as well as simple buy & hold, it does so with significantly lower exposure (time in market).
#
# In conclusion, to test strategies on multiple time frames, you need to pass in data in the lowest time frame, then resample it to higher time frames, apply the indicators, then resample back to lower time frame, filling in the in-betweens.
# Or simply use [`backtesting.lib.resample_apply()`](https://kernc.github.io/backtesting.py/doc/backtesting/lib.html#backtesting.lib.resample_apply) function.
