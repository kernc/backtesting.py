[![](https://i.imgur.com/E8Kj69Y.png)](https://kernc.github.io/backtesting.py/)

Backtesting.py
==============
[![Build Status](https://img.shields.io/github/workflow/status/kernc/backtesting.py/CI/master?style=for-the-badge)](https://github.com/kernc/backtesting.py/actions)
[![Code Coverage](https://img.shields.io/codecov/c/gh/kernc/backtesting.py.svg?style=for-the-badge)](https://codecov.io/gh/kernc/backtesting.py)
[![Backtesting on PyPI](https://img.shields.io/pypi/v/backtesting.svg?color=blue&style=for-the-badge)](https://pypi.org/project/backtesting)
[![PyPI downloads](https://img.shields.io/pypi/dd/backtesting.svg?color=skyblue&style=for-the-badge)](https://pypi.org/project/backtesting)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/kernc?color=pink&style=for-the-badge)](https://github.com/sponsors/kernc)

Backtest trading strategies with Python.

[**Project website**][website]

[Documentation]

[website]: https://kernc.github.io/backtesting.py/
[Documentation]: https://kernc.github.io/backtesting.py/doc/backtesting/


Installation
------------

    $ pip install backtesting


Usage
-----
```python
from backtesting import Backtest, Strategy
from backtesting.lib import crossover

from backtesting.test import SMA, GOOG


class SmaCross(Strategy):
    def init(self):
        price = self.data.Close
        self.ma1 = self.I(SMA, price, 10)
        self.ma2 = self.I(SMA, price, 20)

    def next(self):
        if crossover(self.ma1, self.ma2):
            self.buy()
        elif crossover(self.ma2, self.ma1):
            self.sell()


bt = Backtest(GOOG, SmaCross, commission=.002,
              exclusive_orders=True)
stats = bt.run()
bt.plot()
```

Results in:

```text
Start                     2004-08-19 00:00:00
End                       2013-03-01 00:00:00
Duration                   3116 days 00:00:00
Exposure Time [%]                       94.27
Equity Final [$]                     68935.12
Equity Peak [$]                      68991.22
Return [%]                             589.35
Buy & Hold Return [%]                  703.46
Return (Ann.) [%]                       25.42
Volatility (Ann.) [%]                   38.43
Sharpe Ratio                             0.66
Sortino Ratio                            1.30
Calmar Ratio                             0.77
Max. Drawdown [%]                      -33.08
Avg. Drawdown [%]                       -5.58
Max. Drawdown Duration      688 days 00:00:00
Avg. Drawdown Duration       41 days 00:00:00
# Trades                                   93
Win Rate [%]                            53.76
Best Trade [%]                          57.12
Worst Trade [%]                        -16.63
Avg. Trade [%]                           1.96
Max. Trade Duration         121 days 00:00:00
Avg. Trade Duration          32 days 00:00:00
Profit Factor                            2.13
Expectancy [%]                           6.91
SQN                                      1.78
_strategy              SmaCross(n1=10, n2=20)
_equity_curve                          Equ...
_trades                       Size  EntryB...
dtype: object
```
[![plot of trading simulation](https://i.imgur.com/xRFNHfg.png)](https://kernc.github.io/backtesting.py/#example)

Find more usage examples in the [documentation].

Features
--------
* Simple, well-documented API
* Blazing fast execution
* Built-in optimizer
* Library of composable base strategies and utilities
* Indicator-library-agnostic
* Supports _any_ financial instrument with candlestick data
* Detailed results
* Interactive visualizations


-------------------------------------------------

Alternatives
------------
The thing with backtesting is, unless you dug into the dirty details yourself,
you can't rely on execution correctness, and you risk losing your house.
In addition, everyone has their own preconveived ideas about how a mechanical
trading strategy should be conducted, so everyone (and their brother)
just rolls their own backtesting frameworks.

If after reviewing the docs and exmples perchance you find
[_Backtesting.py_][website] not your cup of tea,
kindly have a look at some similar alternative Python backtesting frameworks:

- [bt](http://pmorissette.github.io/bt/) -
  a framework based on reusable and flexible blocks of
  strategy logic that support multiple instruments and
  output detailed statistics and useful charts.
- [vectorbt](https://polakowo.io/vectorbt/) -
  a pandas-based library for quickly analyzing trading strategies at scale.
- [Backtrader](https://www.backtrader.com/) -
  a pure-python feature-rich framework for backtesting
  and live algotrading with a few brokers.
- [PyAlgoTrade](https://gbeced.github.io/pyalgotrade/) -
  event-driven algorithmic trading library with focus on
  backtesting and support for live trading.
- [Zipline](https://www.zipline.io/) -
  the backtesting and live-trading engine powering Quantopian — the
  community-centered, hosted platform for building and executing strategies.
- [Pinkfish](http://fja05680.github.io/pinkfish/) -
  a lightweight backtester for intraday strategies on daily data.
- [finmarketpy](https://github.com/cuemacro/finmarketpy) -
  a library for analyzing financial market data.
- [QuantStart QSTrader](https://github.com/mhallsmoore/qstrader/) -
  a modular schedule-driven backtesting framework for long-short equities
  and ETF-based systematic trading strategies.
- [pysystemtrade](https://github.com/robcarver17/pysystemtrade) -
  the open-source version of Robert Carver's backtesting engine that
  implements systems according to his book _Systematic Trading:
  A unique new method for designing trading and investing systems_.
- [QTPyLib](https://github.com/ranaroussi/qtpylib) -
  a versatile, event-driven algorithmic trading library.
- [Gemini](https://github.com/anfederico/Gemini) -
  a backtester namely focusing on cryptocurrency markets.
- [Quantdom](https://github.com/constverum/Quantdom) -
  a Qt-based framework that lets you focus on modeling financial strategies,
  portfolio management, and analyzing backtests.
- [Clairvoyant](https://github.com/anfederico/Clairvoyant) -
  software for identifying and monitoring social / historical cues
  for short-term stock movement.
- [optopsy](https://github.com/michaelchu/optopsy) -
  a nimble backtesting library for options trading.
- [RQalpha](https://github.com/ricequant/rqalpha) -
  a complete solution for programmatic traders from data acquisition,
  algorithmic trading, backtesting, real-time simulation, live trading
  to mere data analysis. Documentation in Chinese.
- [zvt](https://github.com/zvtvz/zvt) -
  a quant trading platform which includes data recorder, factor calculation,
  stock picking, backtesting, and unified visualization. Documentation in Chinese.
- [AwesomeQuant](https://github.com/wilsonfreitas/awesome-quant#trading--backtesting) -
  A somewhat curated list of libraries, packages, and resources for quants.

#### Obsolete / Unmaintained

The following projects are mainly old, stale, incomplete, incompatible,
abandoned, and here for posterity reference only:

- [AlephNull](https://github.com/CarterBain/AlephNull) -
  extends the features of Zipline, for use within an institutional environment.
- [ProfitPy](https://code.google.com/p/profitpy/) -
  a set of libraries and tools for the development, testing, and execution of
  automated stock trading systems.
- [prophet](https://github.com/Emsu/prophet) -
  a microframework for financial markets, focusing on modeling
  strategies and portfolio management.
- [pybacktest](https://github.com/ematvey/pybacktest) -
  a vectorized pandas-based backtesting framework,
  designed to make backtesting compact, simple and fast.
- [quant](https://github.com/maihde/quant) -
  a technical analysis tool for trading strategies with a particularily
  simplistic view of the market.
- [QuantSoftware Toolkit](https://github.com/QuantSoftware/QuantSoftwareToolkit) -
  a toolkit by the guys that soon after went to form Lucena Research.
- [QuantStart QSForex](https://github.com/mhallsmoore/qsforex) -
  an event-driven backtesting and live-trading platform for use in
  the foreign exchange markets,
- [tia: Toolkit for integration and analysis](https://github.com/PaulMest/tia/) -
  a toolkit providing Bloomberg data access, PDF generation,
  technical analysis and backtesting functionality.
- [TradingWithPython](https://github.com/sjev/trading-with-python) -
  boiler-plate code for the (no longer active) course _Trading With Python_.
- [Ultra-Finance](https://github.com/panpanpandas/ultrafinance) -
  real-time financial data collection, analyzing and backtesting trading strategies.
- [visualize-wealth](https://github.com/benjaminmgross/visualize-wealth) -
  a library to construct, backtest, analyze, and evaluate portfolios
  and their benchmarks, with comprehensive documentation illustrating
  all underlying methodologies and statistics.
