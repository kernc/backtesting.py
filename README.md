[![](https://i.imgur.com/E8Kj69Y.png)](https://kernc.github.io/backtrading.py/)

Backtrading.py
==============
[![Build Status](https://img.shields.io/github/workflow/status/kernc/backtrading.py/CI/master?style=for-the-badge)](https://github.com/kernc/backtrading.py/actions)
[![Code Coverage](https://img.shields.io/codecov/c/gh/kernc/backtrading.py.svg?style=for-the-badge)](https://codecov.io/gh/kernc/backtrading.py)
[![Backtrading on PyPI](https://img.shields.io/pypi/v/backtrading.svg?color=blue&style=for-the-badge)](https://pypi.org/project/backtrading)
[![PyPI downloads](https://img.shields.io/pypi/dd/backtrading.svg?color=skyblue&style=for-the-badge)](https://pypi.org/project/backtrading)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/kernc?color=pink&style=for-the-badge)](https://github.com/sponsors/kernc)

Backtest trading strategies with Python.

[**Project website**](https://kernc.github.io/backtrading.py) + [Documentation]

[Documentation]: https://kernc.github.io/backtrading.py/doc/backtrading/


Installation
------------

    $ pip install backtrading


Usage
-----
```python
from backtrading import Backtest, Strategy
from backtrading.lib import crossover

from backtrading.test import SMA, GOOG


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
[![plot of trading simulation](https://i.imgur.com/xRFNHfg.png)](https://kernc.github.io/backtrading.py/#example)

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

![xkcd.com/1570](https://imgs.xkcd.com/comics/engineer_syllogism.png)


Alternatives
------------
See [alternatives.md] for a list of alternative Python
backtrading frameworks and related packages.

[alternatives.md]: https://github.com/kernc/backtrading.py/blob/master/doc/alternatives.md
