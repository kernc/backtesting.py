"""Data and utilities for testing."""
import pandas as pd


def _read_file(filename):
    from os.path import dirname, join

    return pd.read_csv(join(dirname(__file__), filename),
                       index_col=0, parse_dates=True, infer_datetime_format=True)


GOOG = _read_file('GOOG.csv')
"""DataFrame of daily NASDAQ:GOOG (Google/Alphabet) stock price data from 2004 to 2013."""

EURUSD = _read_file('EURUSD.csv')
"""DataFrame of hourly EUR/USD forex data from April 2017 to February 2018."""


def SMA(arr: pd.Series, n: int) -> pd.Series:
    """
    Returns `n`-period simple moving average of array `arr`.
    """
    return pd.Series(arr).rolling(n).mean()


def standard_deviation(arr: pd.Series, n: int) -> pd.Series:
    """Returns `n`-period standard deviation of array `arr`."""
    return pd.Series(arr).rolling(n).std()


def bollinger_bands(arr: pd.Series, n: int, std_mul: float) -> pd.Series:
    """Returns `n`-period Bollinger bands low and high of array `arr`."""
    rolling_mean = SMA(arr, n)
    std = standard_deviation(arr, n) * std_mul
    low = rolling_mean - std
    high = rolling_mean + std
    return (low, high)


def bollinger_low(arr: pd.Series, n: int, std_mul: float) -> pd.Series:
    """Returns `n`-period Bollinger band low of array `arr`."""
    low, high = bollinger_bands(arr, n, std_mul)
    return low


def bollinger_high(arr: pd.Series, n: int, std_mul: float) -> pd.Series:
    """Returns `n`-period Bollinger band high of array `arr`."""
    low, high = bollinger_bands(arr, n, std_mul)
    return high
