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
# FXMacroData Forex Data
# ======================
#
# This example shows how to load daily FX spot rates from
# [FXMacroData](https://fxmacrodata.com/) into the OHLCV
# [`pandas.DataFrame`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html)
# shape expected by _backtesting.py_.
#
# _Backtesting.py_ can run on a single instrument at a time, so the helper below
# returns one currency pair as a daily data frame with `Open`, `High`, `Low`,
# `Close`, and `Volume` columns. FXMacroData's spot endpoint provides one daily
# reference rate per row, so this example maps that rate to all OHLC prices and
# sets volume to zero.

# %%
from __future__ import annotations

import json
import os
from typing import Iterable
from urllib.parse import urlencode
from urllib.request import Request, urlopen

import pandas as pd


FXMACRODATA_API_BASE_URL = "https://fxmacrodata.com/api/v1"


def split_currency_pair(pair: str) -> tuple[str, str]:
    """Return normalized base and quote currency codes from EURUSD or EUR/USD."""
    normalized = pair.replace("/", "").replace("-", "").replace("_", "").upper()
    if len(normalized) != 6:
        raise ValueError("currency pair must look like 'EURUSD' or 'EUR/USD'")
    return normalized[:3], normalized[3:]


def fxmacrodata_rows_to_ohlc(rows: Iterable[dict]) -> pd.DataFrame:
    """Convert FXMacroData forex rows to a Backtesting.py OHLCV data frame."""
    records = []
    for row in rows:
        date_value = (
            row.get("date")
            or row.get("time")
            or row.get("timestamp")
            or row.get("datetime")
        )
        rate = (
            row.get("value")
            or row.get("val")
            or row.get("rate")
            or row.get("close")
            or row.get("fx_rate")
        )
        if date_value is None or rate is None:
            continue
        records.append({"Date": pd.to_datetime(date_value), "Rate": float(rate)})

    if not records:
        raise ValueError("FXMacroData response did not include dated rate rows")

    data = pd.DataFrame.from_records(records)
    data = data.drop_duplicates(subset="Date").sort_values("Date").set_index("Date")
    data.index.name = None
    data["Open"] = data["High"] = data["Low"] = data["Close"] = data["Rate"]
    data["Volume"] = 0
    return data[["Open", "High", "Low", "Close", "Volume"]]


def fetch_fxmacrodata_ohlc(
    pair: str,
    start_date: str,
    end_date: str,
    *,
    api_key: str | None = None,
    base_url: str = FXMACRODATA_API_BASE_URL,
    timeout: float = 30,
) -> pd.DataFrame:
    """Fetch daily FX spot rates and return Backtesting.py-compatible OHLCV data."""
    base_currency, quote_currency = split_currency_pair(pair)
    params = {"start_date": start_date, "end_date": end_date}
    headers = {}
    api_key = api_key or os.getenv("FXMACRODATA_API_KEY") or os.getenv("FXMD_API_KEY")
    if api_key:
        headers["X-API-Key"] = api_key

    request = Request(
        f"{base_url.rstrip('/')}/forex/{base_currency}/{quote_currency}?{urlencode(params)}",
        headers=headers,
    )
    with urlopen(request, timeout=timeout) as response:
        payload = json.load(response)

    rows = payload.get("data") if isinstance(payload, dict) else payload
    return fxmacrodata_rows_to_ohlc(rows)


# %% [markdown]
# Fetch a pair in your own notebook, then pass the resulting data frame to
# `Backtest`. The API key is optional for public data and can be supplied through
# `FXMACRODATA_API_KEY` or `FXMD_API_KEY`.
#
# ```python
# data = fetch_fxmacrodata_ohlc("EURUSD", "2024-01-01", "2024-12-31")
# ```
#
# To keep this documentation example deterministic, the cells below use a small
# sample shaped like the FXMacroData response.

# %%
sample_rows = [
    {"date": "2024-01-01", "value": 1.1038},
    {"date": "2024-01-02", "value": 1.0943},
    {"date": "2024-01-03", "value": 1.0920},
    {"date": "2024-01-04", "value": 1.0950},
    {"date": "2024-01-05", "value": 1.0944},
    {"date": "2024-01-08", "value": 1.0951},
    {"date": "2024-01-09", "value": 1.0932},
    {"date": "2024-01-10", "value": 1.0970},
    {"date": "2024-01-11", "value": 1.0998},
    {"date": "2024-01-12", "value": 1.0950},
    {"date": "2024-01-15", "value": 1.0946},
    {"date": "2024-01-16", "value": 1.0875},
    {"date": "2024-01-17", "value": 1.0848},
    {"date": "2024-01-18", "value": 1.0873},
    {"date": "2024-01-19", "value": 1.0896},
    {"date": "2024-01-22", "value": 1.0887},
    {"date": "2024-01-23", "value": 1.0854},
    {"date": "2024-01-24", "value": 1.0885},
    {"date": "2024-01-25", "value": 1.0841},
    {"date": "2024-01-26", "value": 1.0853},
    {"date": "2024-01-29", "value": 1.0832},
    {"date": "2024-01-30", "value": 1.0847},
    {"date": "2024-01-31", "value": 1.0819},
    {"date": "2024-02-01", "value": 1.0872},
    {"date": "2024-02-02", "value": 1.0788},
    {"date": "2024-02-05", "value": 1.0743},
    {"date": "2024-02-06", "value": 1.0757},
    {"date": "2024-02-07", "value": 1.0772},
    {"date": "2024-02-08", "value": 1.0778},
    {"date": "2024-02-09", "value": 1.0782},
    {"date": "2024-02-12", "value": 1.0771},
    {"date": "2024-02-13", "value": 1.0708},
    {"date": "2024-02-14", "value": 1.0729},
    {"date": "2024-02-15", "value": 1.0771},
    {"date": "2024-02-16", "value": 1.0778},
    {"date": "2024-02-19", "value": 1.0780},
    {"date": "2024-02-20", "value": 1.0805},
    {"date": "2024-02-21", "value": 1.0822},
    {"date": "2024-02-22", "value": 1.0823},
    {"date": "2024-02-23", "value": 1.0821},
    {"date": "2024-02-26", "value": 1.0851},
    {"date": "2024-02-27", "value": 1.0844},
    {"date": "2024-02-28", "value": 1.0838},
    {"date": "2024-02-29", "value": 1.0808},
    {"date": "2024-03-01", "value": 1.0838},
]

data = fxmacrodata_rows_to_ohlc(sample_rows)
data.tail()

# %% [markdown]
# The returned frame can be used with any single-asset _backtesting.py_ strategy.

# %%
from backtesting import Backtest, Strategy
from backtesting.lib import crossover
from backtesting.test import SMA


class SmaCross(Strategy):
    fast = 10
    slow = 30

    def init(self):
        self.sma_fast = self.I(SMA, self.data.Close, self.fast)
        self.sma_slow = self.I(SMA, self.data.Close, self.slow)

    def next(self):
        if crossover(self.sma_fast, self.sma_slow):
            self.position.close()
            self.buy()
        elif crossover(self.sma_slow, self.sma_fast):
            self.position.close()
            self.sell()


bt = Backtest(data, SmaCross, cash=10_000, commission=0.0002, finalize_trades=True)
stats = bt.run()
stats
