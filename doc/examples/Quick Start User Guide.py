# -*- coding: utf-8 -*-
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

# _Backtesting.py_ Quick Start User Guide
# =======================
#
# This tutorial will show off some of the features of _backtesting.py_, yet another Python package for [backtesting](https://www.investopedia.com/terms/b/backtesting.asp) trading strategies.
#
# Firstly, what _backtesting.py_ is not: It is not a data source — you bring your own data. It does _not_ support strategies that rely on multiple orders, hedging, position sizing, or portfolio rebalancing. Instead, _backtesting.py_ works with a single asset at a time, a single position at a time (long or short), and the position size is (as yet) non-adjustable, corresponding to 100% of available funds. _Backtesting.py_ is not aware of order types and does not properly simulate, nor can be connected to, a broker. 
#
# As a trade-off, _backtesting.py_ is a _blazing fast_, small and lightweight backtesting library that uses state-of-the-art Python data structures and procedures, and whose whole API easily fits into memory of a single human. It's best suited for optimizing position entrence and exit strategies, decisions upon values of technical indicators, and it's also a versatile interactive trading strategy visualization tool.
#
# ### Data
#
# _You bring your own data._ Backtesting ingests data as a [pandas.DataFrame](https://pandas.pydata.org/pandas-docs/stable/10min.html) with columns 'Open', 'High', 'Low', 'Close', and (optionally) 'Volume'. Such data is easily obtainable (see e.g. 
# [pandas-datareader](https://pandas-datareader.readthedocs.io/en/latest/),
# [Quandl](https://www.quandl.com/tools/python),
# [findatapy](https://github.com/cuemacro/findatapy), ...).
# Your data frame can have other columns, but these are necessary.
# DataFrame should ideally be indexed with a datetime index (convert it with [`pd.to_datetime()`](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.to_datetime.html)), otherwise a simple range index will do.
# Let's see it.

# +
# Example OHLC data for Google Inc.
from backtesting.test import GOOG

GOOG.tail()
# -

# ### Strategy
#
# Let's create our first strategy to backtest on these Google data, and let it be a simple [moving average (MA) cross-over strategy](https://en.wikipedia.org/wiki/Moving_average_crossover).
#
# _Backtesting.py_ doesn't contain its own set of technical indicators. In practice, one should probably use functions from their favorite indicator library, such as
# [TA-Lib](https://github.com/mrjbq7/ta-lib),
# [Tulipy](https://tulipindicators.org),
# PyAlgoTrade, ...
# But for this example, let's define a simple helper moving average function. 

# +
import pandas as pd


def SMA(values, n):
    """
    Return simple moving average of `values`, at
    each step taking into account `n` previous values.
    """
    return pd.Series(values).rolling(n).mean()
# -

# Note, this is the exact same helper function as the one used in the project unit tests.

from backtesting.test import SMA

# A custom strategy needs to extend `backtesting.Strategy` class and override two methods:
# [`init()`](https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html#backtesting.backtesting.Strategy.init) and
# [`next()`](https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html#backtesting.backtesting.Strategy.next).
#
# Method `init()` is invoked at the beginning, before the strategy is run. Within it, one ideally precomputes in efficient, vectorized fashion whatever indicators and signals the strategy depends on.
#
# Method `next()` is iteratively called by the backtest instance, once for each data point (data frame row), simulating the incremental availability of each new full candlestick bar. Note, _backtesting.py_ cannot make decisions/trade within candlesticks. If you need to trade within candlesticks, instead start with more fine-grained data.

# +
from backtesting import Strategy
from backtesting.lib import crossover


class SmaCross(Strategy):
    
    # Define the two MA lags as *class variables*
    # for later optimization
    n1 = 10
    n2 = 20
    
    def init(self):
        # Precompute two moving averages
        self.sma1 = self.I(SMA, self.data.Close, self.n1)
        self.sma2 = self.I(SMA, self.data.Close, self.n2)
    
    def next(self):
        # If sma1 crosses above sma2, buy the asset
        if crossover(self.sma1, self.sma2):
            self.buy()

        # Else, if sma1 crosses below sma2, sell it
        elif crossover(self.sma2, self.sma1):
            self.sell()
# -

# In `init()` as well as in `next()`, the data we are simulating the strategy on is available as an instance variable
# [`self.data`](https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html#backtesting.backtesting.Strategy.data).
#
# In `init()`, we compute indicators indirectly by wrapping them in 
# [`self.I()`](https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html#backtesting.backtesting.Strategy.I).
# We pass the wrapper a function (here, our `SMA` function) and any additional arguments to call it with (here, our _Close_ values and the MA lag). Indicators wrapped in this way will be plotted, and their names, intelligently inferred, will appear in the plot legend.
#
# In `next()`, we simply check if the faster moving average just crossed over the slower one. If it did and upwards, we go long; if it did and downwards, we sell any open long position and go short. Note, there is no position size to adjust; _Backtesting.py_ always assumes maximal possible position. We use
# [`backtesting.lib.crossover()`](https://kernc.github.io/backtesting.py/doc/backtesting/lib.html#backtesting.lib.crossover)
# function instead of writing more obscure and confusing conditions, such as:

# + {"active": ""}
#     def next(self):
#         if (self.sma1[-2] < self.sma2[-2] and
#             self.sma1[-1] > self.sma2[-1]):
#             self.buy()
#
#         elif (self.sma1[-2] > self.sma2[-2] and
#               self.sma1[-1] < self.sma2[-1]):
#             self.sell()    
# -

# Ugh!
#
# In `init()`, the whole series of points was available, whereas in `next()`, the _length of `self.data` and any indicator arrays is adjusted_ on each `next()` call so that `array[-1]` (e.g. `self.data.Close[-1]` or `self.sma1[-1]`) always contains the most recent value, `array[-2]` the previous value, etc. (ordinary Python indexing of ascending-sorted 1D arrays).
#
# **Note**: `self.data` and any indicators wrapped with `self.I` (e.g. `self.sma1`) are **NumPy arrays** for performance reasons. If you need them to be `pandas.Series`, use, e.g., `pd.Series(self.data.Close, index=self.data.index)`.
#
# Let's see now how our strategy performs on historical Google data. We'll begin with ¤10,000 in cash and set broker's commission to realistic 0.2%.

# +
from backtesting import Backtest

bt = Backtest(GOOG, SmaCross, cash=10000, commission=.002)
bt.run()
# -

# We initialize the
# [`Backtest`](https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html#backtesting.backtesting.Backtest)
# instance with data and strategy _class_ (see API reference for additional options).
#
# As we call
# [`Backtest.run()`](https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html#backtesting.backtesting.Backtest.run)
# method, we instantaneously get returned a pandas Series of results and statistics associated with our strategy. We see that this simple strategy makes 600% return in the period of 9 years, with maximal drawdown 33%, and with longest drawdown period spanning almost two years ...
#
# If we call
# [`Backtest.plot()`](https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html#backtesting.backtesting.Backtest.plot)
# method, we can review these results in a more visual form.

bt.plot()

# ### Optimization
#
# We hard-coded the two lag parameters into our strategy above, but perhaps the strategy works better with 15–30 cross-over, or some other combination. We defined the two parameters as optimizable by making them [class variables](https://docs.python.org/3/tutorial/classes.html#class-and-instance-variables).

# We optimize the two parameters by calling
# [`Backtest.optimize()`](https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html#backtesting.backtesting.Backtest.optimize)
# method with each parameter a keyword argument pointing to its pool of values to test. Parameter `n1` is tested from 5 to 30, and parameter `n2` from 10 to 70. Some combinations of the two parameters are invalid, i.e. we don't ever want `n1` to be _larger than_ or equal to `n2`. We limit admissible parameter combinations with an _ad hoc_ constraint function, which returns `True` (admissible) whenever `n1` is less than `n2`. Additionally, we search for such parameter combination that maximizes final equity (we can choose any key from the returned `stats` series).

# +
# %%time

stats = bt.optimize(n1=range(5, 30, 5),
                    n2=range(10, 70, 5),
                    maximize='Equity Final [$]',
                    constraint=lambda p: p.n1 < p.n2)
# -

stats

# We can look into `stats._strategy` field for the Strategy instance and its optimal parameter values (10 and 15).

bt.plot()

# Optimizing the strategy, we managed to up its initial performance _on in-sample data_ by almost 70% and beat 
# [buy & hold](https://en.wikipedia.org/wiki/Buy_and_hold).
# In real life, however, do take steps to avoid
# [overfitting](https://en.wikipedia.org/wiki/Overfitting)
# before putting real money at risk.
#
# Learn more by reviewing further
# [examples](https://kernc.github.io/backtesting.py/doc/backtesting/index.html#tutorials),
# or find more program options in the
# [full API documentation](https://kernc.github.io/backtesting.py/doc/backtesting/index.html#header-submodules).
