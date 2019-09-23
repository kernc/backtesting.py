[![](https://i.imgur.com/E8Kj69Y.png)](https://kernc.github.io/backtesting.py/)

Backtesting.py
==============
[![Build Status](https://img.shields.io/travis/kernc/backtesting.py.svg?style=for-the-badge)](https://travis-ci.org/kernc/backtesting.py)
[![Code Coverage](https://img.shields.io/codecov/c/gh/kernc/backtesting.py.svg?style=for-the-badge)](https://codecov.io/gh/kernc/backtesting.py)
[![Backtesting on PyPI](https://img.shields.io/pypi/v/backtesting.svg?color=blue&style=for-the-badge)](https://pypi.org/project/backtesting)

Backtest trading strategies with Python.

[**Project website**](https://kernc.github.io/backtesting.py/)

[Documentation]

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
        Close = self.data.Close
        self.ma1 = self.I(SMA, Close, 10)
        self.ma2 = self.I(SMA, Close, 20)

    def next(self):
        if crossover(self.ma1, self.ma2):
            self.buy()
        elif crossover(self.ma2, self.ma1):
            self.sell()


bt = Backtest(GOOG, SmaCross,
              cash=10000, commission=.002)
bt.run()
bt.plot()
```

Results in:

```text
Start                     2004-08-19 00:00:00
End                       2013-03-01 00:00:00
Duration                   3116 days 00:00:00
Exposure [%]                            94.29
Equity Final [$]                     69665.12
Equity Peak [$]                      69722.15
Return [%]                             596.65
Buy & Hold Return [%]                  703.46
Max. Drawdown [%]                      -33.61
Avg. Drawdown [%]                       -5.68
Max. Drawdown Duration      689 days 00:00:00
Avg. Drawdown Duration       41 days 00:00:00
# Trades                                   93
Win Rate [%]                            53.76
Best Trade [%]                          56.98
Worst Trade [%]                        -17.03
Avg. Trade [%]                           2.44
Max. Trade Duration         121 days 00:00:00
Avg. Trade Duration          32 days 00:00:00
Expectancy [%]                           6.92
SQN                                      1.77
Sharpe Ratio                             0.22
Sortino Ratio                            0.54
Calmar Ratio                             0.07
_strategy                            SmaCross
```
[![plot of trading simulation](https://i.imgur.com/q6OSQD8.png)](https://kernc.github.io/backtesting.py/#example)

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
