# ---
# jupyter:
#   jupytext:
#     text_representation:
#       extension: .py
#       format_name: percent
#       format_version: '1.3'
#       jupytext_version: 1.17.1
#   kernelspec:
#     display_name: Python 3
#     language: python
#     name: python3
# ---

# %% [markdown]
# Multi-Asset Bollinger Band Portfolio
# =======================
#
# This tutorial demonstrates how to use `PortfolioBacktest` to trade several
# assets in one shared account.
#
# This is different from `backtesting.lib.MultiBacktest`. `MultiBacktest` runs
# the same single-asset strategy independently on many datasets. `PortfolioBacktest`
# runs one strategy across many symbols with shared cash, margin, orders, trades,
# and portfolio-level equity.
#
# The example below uses a Bollinger Band mean-reversion strategy. For each
# symbol, the strategy buys when price closes below the lower band and closes the
# position when price reverts above the middle band. The strategy is long-only so
# the portfolio mechanics are easy to inspect.

# %% [markdown]
# ## Imports
#
# We will use the bundled `GOOG` sample data as a starting point and derive a few
# synthetic assets from it. This keeps the notebook fully self-contained and
# guarantees that every asset has the same timestamp index.
#
# In real projects, replace the synthetic data dictionary with real OHLCV
# dataframes keyed by symbol, e.g. `{"AAPL": aapl_df, "MSFT": msft_df}`.

# %%
import numpy as np
import pandas as pd

from backtesting import PortfolioBacktest, Strategy
from backtesting.test import GOOG


# %% [markdown]
# ## Prepare Aligned Multi-Asset Data
#
# `PortfolioBacktest` expects a mapping of symbol names to OHLCV dataframes.
# All assets are aligned to a common index. The current implementation uses an
# inner join, so only timestamps present in all assets are traded.
#
# The helper below creates deterministic synthetic assets from `GOOG`. It keeps
# valid OHLC relationships by applying one positive scale factor to every OHLC
# price on the same bar.

# %%
def make_synthetic_asset(base, *, seed, drift=0.0, volatility=1.0, volume_scale=1.0):
    rng = np.random.default_rng(seed)
    base = base.copy(deep=False)

    returns = base.Close.pct_change().fillna(0)
    noise = rng.normal(0, 0.006, len(base))
    synthetic_returns = returns * volatility + drift / 252 + noise
    synthetic_returns = synthetic_returns.clip(-0.25, 0.25)

    synthetic_close = base.Close.iloc[0] * np.cumprod(1 + synthetic_returns)
    scale = synthetic_close / base.Close

    df = base[["Open", "High", "Low", "Close"]].mul(scale, axis=0)
    df["Volume"] = (
        base.Volume
        * volume_scale
        * rng.lognormal(mean=0, sigma=0.15, size=len(base))
    )
    return df


data = {
    "GOOG": GOOG,
    "ALPHA": make_synthetic_asset(GOOG, seed=1, drift=0.05, volatility=0.75, volume_scale=1.2),
    "BETA": make_synthetic_asset(GOOG, seed=2, drift=-0.02, volatility=1.25, volume_scale=0.8),
    "GAMMA": make_synthetic_asset(GOOG, seed=3, drift=0.02, volatility=1.60, volume_scale=0.6),
}

{symbol: frame.shape for symbol, frame in data.items()}

# %% [markdown]
# A quick normalized-close plot helps confirm that the assets share an index but
# behave differently.

# %%
normalized_closes = pd.DataFrame(
    {symbol: frame.Close / frame.Close.iloc[0] for symbol, frame in data.items()}
)
normalized_closes.plot(title="Normalized close prices")


# %% [markdown]
# ## Bollinger Bands
#
# Bollinger Bands consist of:
#
# * a middle band, usually a rolling mean;
# * an upper band, rolling mean plus some number of rolling standard deviations;
# * a lower band, rolling mean minus some number of rolling standard deviations.
#
# This function is causal for an end-of-bar strategy: each band value uses the
# current completed bar and previous bars only. In the default execution model,
# decisions made from bar `t` data fill no earlier than bar `t + 1` open.

# %%
def bollinger_bands(close, lookback, n_std):
    close = pd.Series(close)
    middle = close.rolling(lookback).mean()
    std = close.rolling(lookback).std()
    upper = middle + n_std * std
    lower = middle - n_std * std
    return middle, upper, lower


# %% [markdown]
# ## Define A Portfolio Strategy
#
# In a `PortfolioBacktest` strategy:
#
# * `self.data.symbols` lists all symbols;
# * `self.data[symbol]` returns that symbol's OHLCV data accessor;
# * `self.buy(symbol, ...)` and `self.sell(symbol, ...)` place symbol-specific orders;
# * `self.position[symbol]` inspects or closes one symbol's current position.
#
# The indicator dictionaries below are the main pattern to notice. Each symbol
# gets its own middle, upper, and lower band arrays. `size=.20` requests 20% of
# the same-bar portfolio buying-power snapshot when the order is processed; it
# is not a continuously rebalanced 20% target weight.

# %%
class BollingerPortfolioStrategy(Strategy):
    lookback = 20
    n_std = 2
    allocation = 0.20

    def init(self):
        self.middle = {}
        self.upper = {}
        self.lower = {}

        for symbol in self.data.symbols:
            bands = self.I(
                bollinger_bands,
                self.data[symbol].Close,
                self.lookback,
                self.n_std,
                name=(
                    f"{symbol} middle",
                    f"{symbol} upper",
                    f"{symbol} lower",
                ),
            )
            self.middle[symbol] = bands[0]
            self.upper[symbol] = bands[1]
            self.lower[symbol] = bands[2]

    def next(self):
        for symbol in self.data.symbols:
            close = self.data[symbol].Close
            price = close[-1]
            position = self.position[symbol]

            if not position and price < self.lower[symbol][-1]:
                self.buy(symbol, size=self.allocation)

            elif position.is_long and price > self.middle[symbol][-1]:
                position.close()


# %% [markdown]
# ## Run The Backtest
#
# This is one portfolio-level simulation. Cash is shared across the four symbols,
# and every order competes for the same margin and liquidity. If symbols trade on
# different calendars, `PortfolioBacktest` currently uses the common index and
# warns about any rows that are dropped before the run starts.

# %%
bt = PortfolioBacktest(
    data,
    BollingerPortfolioStrategy,
    cash=100_000,
    commission=0.001,
    finalize_trades=True,
)

stats = bt.run()
stats


# %% [markdown]
# ## Inspect Trades
#
# The result shape is the same as `Backtest.run()`, with one important addition:
# the trades dataframe includes a `Symbol` column.

# %%
trades = stats["_trades"]
trades.head()


# %%
trades.groupby("Symbol").agg(
    Trades=("PnL", "size"),
    TotalPnL=("PnL", "sum"),
    AvgReturnPct=("ReturnPct", "mean"),
    WinRate=("PnL", lambda s: (s > 0).mean()),
)


# %% [markdown]
# The equity curve is portfolio-level. It includes cash plus mark-to-market P/L
# for all open positions.

# %%
stats["_equity_curve"].tail()


# %% [markdown]
# ## Plot One Symbol
#
# A portfolio has one global equity curve but many price charts. `plot()` therefore
# needs a symbol so it knows which candles and symbol-specific trades to display.

# %%
bt.plot(symbol="ALPHA", open_browser=False)


# %% [markdown]
# ## Try Different Parameters
#
# `PortfolioBacktest.run()` accepts strategy parameters the same way `Backtest.run()`
# does. Parameters must be declared as class variables on the strategy.

# %%
stats_tighter = bt.run(lookback=30, n_std=1.5, allocation=0.15)
stats_tighter[["Return [%]", "Max. Drawdown [%]", "# Trades", "Win Rate [%]"]]


# %% [markdown]
# ## Practical Notes
#
# * Use `PortfolioBacktest` when your strategy needs shared capital across assets.
# * Use `MultiBacktest` when you want independent single-asset runs for comparison.
# * Real multi-asset data should be adjusted for splits/dividends when appropriate.
# * Transaction costs matter more in a portfolio strategy because capital can turn
#   over across several symbols at once.
# * Indicators computed in `init()` must remain causal. A rolling mean or rolling
#   standard deviation is safe for an end-of-bar strategy; a future shift such as
#   `shift(-1)` would leak future data.
