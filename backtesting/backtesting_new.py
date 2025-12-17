"""
Alternative backtesting strategies.

This module contains different trading strategies that complement
the core backtesting framework. These strategies use different
approaches than the standard SMA crossover.
"""

from __future__ import annotations

import numpy as np
import pandas as pd

from backtesting import Backtest, Strategy
from backtesting.lib import crossover
from backtesting.test import GOOG


def calculate_rsi_period(oversold: float = 30, overbought: float = 70,
                         base_period: int = 14, min_period: int = 7,
                         max_period: int = 28) -> int:
    """
    Calculate RSI period based on threshold skewness.

    More extreme (skewed) thresholds require longer periods for reliable signals.
    Standard thresholds (30/70) use the base period.

    Skewness is measured as deviation from standard 30/70 thresholds.
    The further the thresholds are from center (50), the longer the period.

    Parameters
    ----------
    oversold : float
        Oversold threshold (default 30, more extreme would be <30)
    overbought : float
        Overbought threshold (default 70, more extreme would be >70)
    base_period : int
        Period for standard 30/70 thresholds (default 14)
    min_period : int
        Minimum RSI period (default 7)
    max_period : int
        Maximum RSI period (default 28)

    Returns
    -------
    int
        Calculated RSI period
    """
    # Standard thresholds
    standard_oversold = 30
    standard_overbought = 70

    # Calculate skewness as deviation from standard thresholds
    # Lower oversold and higher overbought = more skewed
    oversold_skew = max(0, standard_oversold - oversold)  # e.g., 30-10=20
    overbought_skew = max(0, overbought - standard_overbought)  # e.g., 90-70=20

    # Total skewness (0 for standard, up to 40 for extreme 10/90)
    total_skew = oversold_skew + overbought_skew

    # Scale factor: 0 skew = 1.0, 40 skew = 2.0 (linear interpolation)
    max_skew = 40  # Maximum possible skew (thresholds at 10/90)
    scale_factor = 1.0 + (total_skew / max_skew)

    # Calculate period
    calculated_period = int(round(base_period * scale_factor))

    # Clamp to min/max bounds
    return max(min_period, min(max_period, calculated_period))


def RSI(series: pd.Series, period: int = 14) -> pd.Series:
    """
    Compute Relative Strength Index.

    RSI measures the speed and magnitude of price changes.
    Values above 70 indicate overbought, below 30 indicate oversold.
    """
    delta = series.diff()
    gain = delta.where(delta > 0, 0.0)
    loss = -delta.where(delta < 0, 0.0)

    avg_gain = gain.rolling(window=period).mean()
    avg_loss = loss.rolling(window=period).mean()

    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))
    return rsi


def Bollinger_Bands(series: pd.Series, period: int = 20, std_dev: float = 2.0):
    """
    Compute Bollinger Bands.

    Returns upper band, middle band (SMA), and lower band.
    """
    middle = series.rolling(window=period).mean()
    std = series.rolling(window=period).std()
    upper = middle + (std_dev * std)
    lower = middle - (std_dev * std)
    return upper, middle, lower


def MACD(series: pd.Series, fast: int = 12, slow: int = 26, signal: int = 9):
    """
    Compute MACD (Moving Average Convergence Divergence).

    Returns MACD line, signal line, and histogram.
    """
    ema_fast = series.ewm(span=fast, adjust=False).mean()
    ema_slow = series.ewm(span=slow, adjust=False).mean()
    macd_line = ema_fast - ema_slow
    signal_line = macd_line.ewm(span=signal, adjust=False).mean()
    histogram = macd_line - signal_line
    return macd_line, signal_line, histogram


class RsiStrategy(Strategy):
    """
    RSI Mean Reversion Strategy.

    Buy when RSI drops below oversold threshold.
    Sell when RSI rises above overbought threshold.
    RSI period is dynamically calculated based on threshold skewness -
    more extreme thresholds use longer periods for reliable signals.
    """
    oversold = 30
    overbought = 70
    use_dynamic_period = False  # Standard RSI uses fixed 14-period
    rsi_period = 14  # Industry standard period

    def init(self):
        close = pd.Series(self.data.Close)
        if self.use_dynamic_period:
            period = calculate_rsi_period(self.oversold, self.overbought, self.rsi_period)
        else:
            period = self.rsi_period
        self.rsi = self.I(RSI, close, period, name=f'RSI({period})')

    def next(self):
        if self.rsi[-1] < self.oversold and not self.position:
            self.buy()
        elif self.rsi[-1] > self.overbought and self.position:
            self.position.close()


class BollingerStrategy(Strategy):
    """
    Bollinger Bands Mean Reversion Strategy.

    Buy when price touches lower band (oversold).
    Sell when price touches upper band (overbought).
    """
    bb_period = 20
    bb_std = 2.0

    def init(self):
        close = pd.Series(self.data.Close)
        bb = Bollinger_Bands(close, self.bb_period, self.bb_std)
        self.upper = self.I(lambda: bb[0], name='BB_Upper', overlay=True)
        self.middle = self.I(lambda: bb[1], name='BB_Middle', overlay=True)
        self.lower = self.I(lambda: bb[2], name='BB_Lower', overlay=True)

    def next(self):
        price = self.data.Close[-1]
        if price <= self.lower[-1] and not self.position:
            self.buy()
        elif price >= self.upper[-1] and self.position:
            self.position.close()


class MacdStrategy(Strategy):
    """
    MACD Crossover Strategy.

    Buy when MACD line crosses above signal line.
    Sell when MACD line crosses below signal line.
    """
    fast = 12
    slow = 26
    signal = 9

    def init(self):
        close = pd.Series(self.data.Close)
        macd_line, signal_line, histogram = MACD(close, self.fast, self.slow, self.signal)
        self.macd = self.I(lambda: macd_line, name='MACD')
        self.signal_line = self.I(lambda: signal_line, name='Signal')
        self.histogram = self.I(lambda: histogram, name='Histogram')

    def next(self):
        if crossover(self.macd, self.signal_line):
            if self.position.is_short:
                self.position.close()
            self.buy()
        elif crossover(self.signal_line, self.macd):
            if self.position.is_long:
                self.position.close()
            self.sell()


class CombinedStrategy(Strategy):
    """
    Combined RSI + MACD Strategy.

    Requires both RSI and MACD to confirm before entering.
    More conservative but potentially more reliable signals.
    RSI period is dynamically calculated based on threshold skewness.
    """
    rsi_period = 14  # Base period
    oversold = 30
    overbought = 70
    use_dynamic_period = True  # Set False to use fixed rsi_period
    macd_fast = 12
    macd_slow = 26
    macd_signal = 9

    def init(self):
        close = pd.Series(self.data.Close)

        # RSI with dynamic period based on threshold skewness
        if self.use_dynamic_period:
            period = calculate_rsi_period(self.oversold, self.overbought, self.rsi_period)
        else:
            period = self.rsi_period
        self.rsi = self.I(RSI, close, period, name=f'RSI({period})')

        # MACD
        macd_line, signal_line, _ = MACD(close, self.macd_fast, self.macd_slow, self.macd_signal)
        self.macd = self.I(lambda: macd_line, name='MACD')
        self.signal_line = self.I(lambda: signal_line, name='Signal')

    def next(self):
        rsi_oversold = self.rsi[-1] < self.oversold
        rsi_overbought = self.rsi[-1] > self.overbought
        macd_bullish = self.macd[-1] > self.signal_line[-1]
        macd_bearish = self.macd[-1] < self.signal_line[-1]

        # Buy when RSI oversold AND MACD bullish
        if rsi_oversold and macd_bullish and not self.position:
            self.buy()
        # Sell when RSI overbought AND MACD bearish
        elif rsi_overbought and macd_bearish and self.position:
            self.position.close()


def run_all_strategies(data=None, cash: float = 10000, commission: float = 0.002):
    """
    Run all strategies and compare results.

    Returns a DataFrame with performance metrics for each strategy.
    """
    if data is None:
        data = GOOG

    strategies = [
        ('RSI', RsiStrategy),
        ('Bollinger', BollingerStrategy),
        ('MACD', MacdStrategy),
        ('Combined', CombinedStrategy),
    ]

    results = []
    for name, strategy_cls in strategies:
        bt = Backtest(data, strategy_cls, cash=cash, commission=commission)
        stats = bt.run()
        results.append({
            'Strategy': name,
            'Return [%]': stats['Return [%]'],
            'Sharpe Ratio': stats['Sharpe Ratio'],
            'Max Drawdown [%]': stats['Max. Drawdown [%]'],
            'Win Rate [%]': stats['Win Rate [%]'],
            '# Trades': stats['# Trades'],
        })

    return pd.DataFrame(results)


if __name__ == '__main__':
    # Run a quick demo
    print("Running RSI Strategy on GOOG data...")
    bt = Backtest(GOOG, RsiStrategy, cash=10000, commission=.002)
    stats = bt.run()

    print("\n=== RSI Strategy Results ===")
    print(f"Return: {stats['Return [%]']:.2f}%")
    print(f"Sharpe Ratio: {stats['Sharpe Ratio']:.2f}")
    print(f"Max Drawdown: {stats['Max. Drawdown [%]']:.2f}%")
    print(f"Win Rate: {stats['Win Rate [%]']:.2f}%")
    print(f"Total Trades: {stats['# Trades']}")

    print("\n=== Comparing All Strategies ===")
    comparison = run_all_strategies()
    print(comparison.to_string(index=False))
