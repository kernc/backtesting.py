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

# Library of Composable Base Strategies
# ======================
#
# This tutorial will show how to reuse composable base strategies that are part of this software distribution.
# It is assumed you're already familiar with
# [basic _backtesting.py_ usage](https://kernc.github.io/backtesting.py/doc/examples/Quick Start User Guide.html).
#
# We'll extend the same moving average cross-over strategy as in
# [Quick Start User Guide](https://kernc.github.io/backtesting.py/doc/examples/Quick Start User Guide.html),
# but we'll rewrite it as a vectorized signal strategy and add trailing stop-loss.
#
# We'll again use a helper moving average function.
# In practice, one can use functions from any indicator library, such as
# [TA-Lib](https://github.com/mrjbq7/ta-lib),
# [Tulipy](https://tulipindicators.org),
# PyAlgoTrade, ...

from backtesting.test import SMA

# _Backtesting.py_ package includes
# [_lib_](https://kernc.github.io/backtesting.py/doc/backtesting/lib.html)
# module that contains various reusable utilities for developing strategies.
# Some of those utilities are composable base strategies one can extend and build upon.
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
    n2 = 20
    
    def init(self):
        # In init() and in next() it is important to call the
        # super method to properly initialize all the classes
        super().init()
        
        # Precompute the two moving averages
        sma1 = self.I(SMA, self.data.Close, self.n1)
        sma2 = self.I(SMA, self.data.Close, self.n2)
        
        # Taking a first difference (`.diff()`) of a boolean
        # series results in +1, 0, and -1 values. In our signal,
        # as expected by SignalStrategy, +1 means buy,
        # -1 means sell, and 0 means to hold whatever current
        # position and wait. See the docs.
        signal = (pd.Series(sma1) > sma2).astype(int).diff().fillna(0)
        
        # Set the signal vector using the method provided
        # by SignalStrategy
        self.set_signal(signal)
        
        # Set trailing stop-loss to 4x ATR
        # using the method provided by TrailingStrategy
        self.set_trailing_sl(4)
# -

# Note, since the strategies in _lib_ may require their own intialization and next-tick logic, be sure to **always call `super().init()` and `super().next()` in your overridden methods**.
#
# Let's see how the example strategy fares on historical Google data.

# +
from backtesting import Backtest
from backtesting.test import GOOG

bt = Backtest(GOOG, SmaCross, commission=.002)

bt.run()
bt.plot()
# -

# Notice how managing risk with a trailing stop-loss severely limits our losses.
#
# For other strategies of the sort, and other reusable utilities in general, see the
# [_lib_ module reference](https://kernc.github.io/backtesting.py/doc/backtesting/lib.html).
