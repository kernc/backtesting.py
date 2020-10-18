# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'

from os import stat
from seaborn.matrix import heatmap
from skopt.plots import plot_objective
from backtesting import Backtest
from backtesting.lib import crossover
from backtesting import Strategy
import pandas as pd
from backtesting.test import GOOG
from IPython import get_ipython

GOOG.tail()


def SMA(values, n):
    """
    Return simple moving average of `values`, at
    each step taking into account `n` previous values.
    """
    return pd.Series(values).rolling(n).mean()


class SmaCross(Strategy):
    # Define the two MA lags as *class variables*
    # for later optimization
    n1 = 20
    n2 = 50

    def init(self):
        # Precompute the two moving averages
        self.sma1 = self.I(SMA, self.data.Close, self.n1)
        self.sma2 = self.I(SMA, self.data.Close, self.n2)

    def next(self):
        # If sma1 crosses above sma2, close any existing
        # short trades, and buy the asset
        if crossover(self.sma1, self.sma2):
            self.position.close()
            self.buy()

        # Else, if sma1 crosses below sma2, close any existing
        # long trades, and sell the asset
        elif crossover(self.sma2, self.sma1):
            self.position.close()
            self.sell()


bt = Backtest(GOOG, SmaCross, cash=10000, commission=.002)
stats = bt.run()
stats

bt.plot()

stats, results = bt.optimize(n1=range(5, 30, 5),
                             n2=range(10, 70, 5),
                             maximize='Equity Final [$]',
                             method='skopt',
                             max_tries=20,
                             return_heatmap=True)
stats
results

_ = plot_objective(results, n_points=10)


stats._strategy


bt.plot(plot_volume=False, plot_pl=False)

stats.tail()


stats['_equity_curve']


stats['_trades']  # Contains individual trade data
