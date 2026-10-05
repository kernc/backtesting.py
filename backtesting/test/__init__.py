"""Data and utilities for testing."""

from __future__ import annotations

import pandas as pd

from backtesting import Strategy
from backtesting.lib import crossover


def _read_file(filename):
    from os.path import dirname, join

    return pd.read_csv(join(dirname(__file__), filename),
                       index_col=0, parse_dates=True)


BTCUSD = _read_file('BTCUSD.csv')
"""DataFrame of monthly BTC/USD histrical index data from 2012 through 2024 (12 years)."""

GOOG = _read_file('GOOG.csv')
"""DataFrame of daily NASDAQ:GOOG (Google/Alphabet) stock price data from 2004 to 2013."""

EURUSD = _read_file('EURUSD.csv')
"""DataFrame of hourly EUR/USD forex data from April 2017 to February 2018."""


def SMA(arr: pd.Series, n: int) -> pd.Series:
    """
    Returns `n`-period simple moving average of array `arr`.
    """
    return pd.Series(arr).rolling(n).mean()


class SmaCross(Strategy):
    """A simple moving average crossover strategy with `fast` and `slow` periods."""
    # NOTE: These values are also used on the website!
    fast = 10
    slow = 30

    def init(self):
        self.sma1 = self.I(SMA, self.data.Close, self.fast)
        self.sma2 = self.I(SMA, self.data.Close, self.slow)

    def next(self):
        if crossover(self.sma1, self.sma2):
            self.position.close()
            self.buy()
        elif crossover(self.sma2, self.sma1):
            self.position.close()
            self.sell()
