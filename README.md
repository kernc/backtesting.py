[![](https://i.imgur.com/E8Kj69Y.png)](https://kernc.github.io/backtesting.py/)

Backtesting.py
==============
[![Build Status](https://img.shields.io/github/actions/workflow/status/kernc/backtesting.py/ci.yml?branch=master&style=for-the-badge)](https://github.com/kernc/backtesting.py/actions)
[![Code Coverage](https://img.shields.io/codecov/c/gh/kernc/backtesting.py.svg?style=for-the-badge&label=Covr)](https://codecov.io/gh/kernc/backtesting.py)
[![Source lines of code](https://img.shields.io/endpoint?url=https%3A%2F%2Fghloc.vercel.app%2Fapi%2Fkernc%2Fbacktesting.py%2Fbadge?filter=.py%26format=human&style=for-the-badge&label=SLOC&color=skyblue)](https://ghloc.vercel.app/kernc/backtesting.py)
[![Backtesting on PyPI](https://img.shields.io/pypi/v/backtesting.svg?color=blue&style=for-the-badge)](https://pypi.org/project/backtesting)
[![PyPI downloads](https://img.shields.io/pypi/dd/backtesting.svg?style=for-the-badge&label=D/L&color=skyblue)](https://pypistats.org/packages/backtesting)
[![Total downloads](https://img.shields.io/pepy/dt/backtesting?style=for-the-badge&label=%E2%88%91&color=skyblue)](https://pypistats.org/packages/backtesting)
[![Stars](https://img.shields.io/github/stars/kernc/backtesting.py?color=silver&style=for-the-badge&label=%e2%ad%90)](https://github.com/kernc/backtesting.py)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/kernc?color=pink&style=for-the-badge&label=%E2%99%A5)](https://github.com/sponsors/kernc)

Backtest trading strategies with Python.

[**Project website**](https://kernc.github.io/backtesting.py) + [Documentation] &nbsp;&nbsp;|&nbsp; [YouTube]

[Documentation]: https://kernc.github.io/backtesting.py/doc/backtesting/
[YouTube]: https://www.youtube.com/results?q=%22backtesting.py%22

Installation
------------

    $ pip install backtesting

Or if you prefer the bleeding edge:

    $ pip install git+https://github.com/kernc/backtesting.py


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
Exposure Time [%]                    94.27374
Equity Final [$]                  56263.51934
Equity Peak [$]                   56309.05934
Commissions [$]                   10563.95154
Return [%]                          462.63519
Buy & Hold Return [%]               607.37036
Return (Ann.) [%]                    22.47754
Volatility (Ann.) [%]                37.41641
CAGR [%]                             22.44464
Sharpe Ratio                          0.60074
Sortino Ratio                         1.14509
Calmar Ratio                          0.66244
Alpha [%]                           450.62135
Beta                                  0.01978
Max. Drawdown [%]                   -33.93159
Avg. Drawdown [%]                    -6.16072
Max. Drawdown Duration      830 days 00:00:00
Avg. Drawdown Duration       50 days 00:00:00
# Trades                                   93
Win Rate [%]                         52.68817
Best Trade [%]                       56.91868
Worst Trade [%]                     -16.82943
Avg. Trade [%]                        1.75814
Max. Trade Duration         121 days 00:00:00
Avg. Trade Duration          32 days 00:00:00
Profit Factor                         1.99349
Expectancy [%]                        2.29043
SQN                                   1.58439
Kelly Criterion                       0.20929
_strategy                            SmaCross
_equity_curve                             ...
_trades                       Size  EntryB...
dtype: object
```
[![plot of trading simulation](https://i.imgur.com/xRFNHfg.png)](https://kernc.github.io/backtesting.py/#example)

Find more usage examples in the [documentation].


Features
--------
* Simple, [well-documented API](https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html)
* Blazing fast execution
* Built-in [optimizer](https://kernc.github.io/backtesting.py/doc/examples/Quick%20Start%20User%20Guide.html#Optimization)
  based on [SAMBO](https://sambo-optimization.github.io)
* [Library of composable base strategies](https://kernc.github.io/backtesting.py/doc/examples/Strategies%20Library.html)
  and related utilities
* Indicator-library-agnostic (BYO)
* Supports _any_ financial instrument with OHLC(V) candlestick data
* [Detailed trade results](https://kernc.github.io/backtesting.py/doc/examples/Quick%20Start%20User%20Guide.html#Trade-data)
  provided as simple Series/DataFrame objects
* [Interactive visualizations](https://kernc.github.io/backtesting.py/#example)

![xkcd.com/1570](https://imgs.xkcd.com/comics/engineer_syllogism.png)


Bugs
----
Before reporting bugs or posting to the
[discussion board](https://github.com/kernc/backtesting.py/discussions),
please read [contributing guidelines](CONTRIBUTING.md), particularly the section
about crafting useful bug reports and ```` ``` ````-fencing your code.
The maintainers thank you!


Alternatives
------------
See [alternatives.md] for a list of alternative Python
backtesting frameworks and related packages.

[alternatives.md]: https://github.com/kernc/backtesting.py/blob/master/doc/alternatives.md
