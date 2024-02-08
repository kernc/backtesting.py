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

# Library of Composable Base Strategies
# ======================
#
# This tutorial will show how to reuse composable base trading strategies that are part of _backtesting.py_ software distribution.
# It is, henceforth, assumed you're already familiar with
# [basic package usage](https://kernc.github.io/backtesting.py/doc/examples/Quick%20Start%20User%20Guide.html).
#
# We'll extend the same moving average cross-over strategy as in
# [Quick Start User Guide](https://kernc.github.io/backtesting.py/doc/examples/Quick%20Start%20User%20Guide.html),
# but we'll rewrite it as a vectorized signal strategy and add trailing stop-loss.
#
# Again, we'll use our helper moving average function.

from backtesting.test import SMA

# Part of this software distribution is
# [`backtesting.lib`](https://kernc.github.io/backtesting.py/doc/backtesting/lib.html)
# module that contains various reusable utilities for strategy development.
# Some of those utilities are composable base strategies we can extend and build upon.
#
# We import and extend two of those strategies here:
# * [`SignalStrategy`](https://kernc.github.io/backtesting.py/doc/backtesting/lib.html#backtesting.lib.SignalStrategy)
#   which decides upon a single signal vector whether to buy into a position, akin to
#   [vectorized backtesting](https://www.google.com/search?q=vectorized+backtesting)
#   engines, and
# * [`TrailingStrategy`](https://kernc.github.io/backtesting.py/doc/backtesting/lib.html#backtesting.lib.TrailingStrategy)
#   which automatically trails the current price with a stop-loss order some multiple of
#   [average true range](https://en.wikipedia.org/wiki/Average_true_range)
#   (ATR) away.

# +
import pandas as pd
from backtesting.lib import SignalStrategy, TrailingStrategy


class SmaCross(SignalStrategy,
               TrailingStrategy):
    n1 = 10
    n2 = 25
    
    def init(self):
        # In init() and in next() it is important to call the
        # super method to properly initialize the parent classes
        super().init()
        
        # Precompute the two moving averages
        sma1 = self.I(SMA, self.data.Close, self.n1)
        sma2 = self.I(SMA, self.data.Close, self.n2)
        
        # Where sma1 crosses sma2 upwards. Diff gives us [-1,0, *1*]
        signal = (pd.Series(sma1) > sma2).astype(int).diff().fillna(0)
        signal = signal.replace(-1, 0)  # Upwards/long only
        
        # Use 95% of available liquidity (at the time) on each order.
        # (Leaving a value of 1. would instead buy a single share.)
        entry_size = signal * .95
                
        # Set order entry sizes using the method provided by 
        # `SignalStrategy`. See the docs.
        self.set_signal(entry_size=entry_size)
        
        # Set trailing stop-loss to 2x ATR using
        # the method provided by `TrailingStrategy`
        self.set_trailing_sl(2)


# -

# Note, since the strategies in `lib` may require their own intialization and next-tick logic, be sure to **always call `super().init()` and `super().next()` in your overridden methods**.
#
# Let's see how the example strategy fares on historical Google data.

# +
from backtesting import Backtest
from backtesting.test import GOOG

bt = Backtest(GOOG, SmaCross, commission=.002)

bt.run()
bt.plot()
# -

# Notice how managing risk with a trailing stop-loss secures our gains and limits our losses.
#
# For other strategies of the sort, and other reusable utilities in general, see
# [**_backtesting.lib_ module reference**](https://kernc.github.io/backtesting.py/doc/backtesting/lib.html).

# Learn more by exploring further
# [examples](https://kernc.github.io/backtesting.py/doc/backtesting/index.html#tutorials)
# or find more framework options in the
# [full API reference](https://kernc.github.io/backtesting.py/doc/backtesting/index.html#header-submodules).
