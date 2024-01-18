# ---
# jupyter:
#   jupytext:
#     text_representation:
#       extension: .py
#       format_name: light
#       format_version: '1.5'
#       jupytext_version: 1.5.1
#   kernelspec:
#     display_name: Python 3
#     language: python
#     name: python3
# ---

# Multiple Time Frames
# ============
#
# Best trading strategies that rely on technical analysis might take into account price action on multiple time frames.
# This tutorial will show how to do that with _backtesting.py_, offloading most of the work to
# [pandas resampling](http://pandas.pydata.org/pandas-docs/stable/timeseries.html#resampling).
# It is assumed you're already familiar with
# [basic framework usage](https://kernc.github.io/backtesting.py/doc/examples/Quick%20Start%20User%20Guide.html).
#
# We will put to the test this long-only, supposed
# [400%-a-year trading strategy](http://jbmarwood.com/stock-trading-strategy-300/),
# which uses daily and weekly
# [relative strength index](https://en.wikipedia.org/wiki/Relative_strength_index)
# (RSI) values and moving averages (MA).
#
# In practice, one should use functions from an indicator library, such as
# [TA-Lib](https://github.com/mrjbq7/ta-lib) or
# [Tulipy](https://tulipindicators.org),
# but among us, let's introduce the two indicators we'll be using.

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
# * Daily close is more than 2% _below_ MA(10)
# * 8% fixed stop loss is hit
#
# We need to provide bars data in the _lowest time frame_ (i.e. daily) and resample it to any higher time frame (i.e. weekly) that our strategy requires.

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
        
        # To construct weekly RSI, we can use `resample_apply()`
        # helper function from the library
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

# Meager four trades in the span of nine years and with zero return? How about if we optimize the parameters a bit?

# +
# %%time

backtest.optimize(d_rsi=range(10, 35, 5),
                  w_rsi=range(10, 35, 5),
                  level=range(30, 80, 10))
# -

backtest.plot()

# Better. While the strategy doesn't perform as well as simple buy & hold, it does so with significantly lower exposure (time in market).
#
# In conclusion, to test strategies on multiple time frames, you need to pass in OHLC data in the lowest time frame, then resample it to higher time frames, apply the indicators, then resample back to the lower time frame, filling in the in-betweens.
# Which is what the function [`backtesting.lib.resample_apply()`](https://kernc.github.io/backtesting.py/doc/backtesting/lib.html#backtesting.lib.resample_apply) does for you.

# Learn more by exploring further
# [examples](https://kernc.github.io/backtesting.py/doc/backtesting/index.html#tutorials)
# or find more framework options in the
# [full API reference](https://kernc.github.io/backtesting.py/doc/backtesting/index.html#header-submodules).
