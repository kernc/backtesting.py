[![](https://i.imgur.com/E8Kj69Y.png)](https://kernc.github.io/backtesting.py/)

Backtesting.py
==============
[![Build Status](https://img.shields.io/github/actions/workflow/status/kernc/backtesting.py/ci.yml?branch=master&style=for-the-badge)](https://github.com/kernc/backtesting.py/actions)
[![Code Coverage](https://img.shields.io/codecov/c/gh/kernc/backtesting.py.svg?style=for-the-badge&label=Covr)](https://codecov.io/gh/kernc/backtesting.py)
[![Source lines of code](https://img.shields.io/endpoint?url=https%3A%2F%2Fghloc.vercel.app%2Fapi%2Fkernc%2Fbacktesting.py%2Fbadge?filter=.py%26format=human&style=for-the-badge&label=SLOC&color=green)](https://ghloc.vercel.app/kernc/backtesting.py)
[![Backtesting on PyPI](https://img.shields.io/pypi/v/backtesting.svg?color=blue&style=for-the-badge)](https://pypi.org/project/backtesting)
[![PyPI downloads](https://img.shields.io/pypi/dd/backtesting.svg?style=for-the-badge&label=D/L&color=skyblue)](https://pypistats.org/packages/backtesting)
[![Total downloads](https://img.shields.io/pepy/dt/backtesting?style=for-the-badge&label=%E2%88%91&color=skyblue)](https://pypistats.org/packages/backtesting)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/kernc?color=pink&style=for-the-badge&label=%E2%99%A5)](https://github.com/sponsors/kernc)

Backtest trading strategies with Python.

[**Project website**](https://kernc.github.io/backtesting.py) + [Documentation] &nbsp;&nbsp;|&nbsp; [YouTube]

[Documentation]: https://kernc.github.io/backtesting.py/doc/backtesting/
[YouTube]: https://www.youtube.com/results?q=%22backtesting.py%22

Installation
------------

    $ pip install backtesting


Development
-----------

This project uses [uv](https://docs.astral.sh/uv/) for dependency management and packaging.

### Setup Development Environment

```bash
# Install all dependencies (dev, test, doc, examples)
uv sync --all-extras

# Or install specific extras
uv sync --extra dev --extra test
```

### Development Commands

```bash
# Run tests
uv run python -m backtesting.test

# Run type checking
uv run pyright backtesting/

# Run linting and formatting
uv run ruff check backtesting/
uv run ruff format backtesting/

# Run code coverage
uv run coverage run -m backtesting.test
uv run coverage report

# Run examples
uv run python doc/examples/main.py
uv run jupyter notebook doc/examples/

# Run any Python script with the dev environment
uv run python your_script.py
```

### Managing Dependencies

```bash
# Add new dependencies
uv add <package-name>                    # Core dependency
uv add --optional dev <package-name>     # Dev dependency
uv add --optional test <package-name>    # Test dependency

# Sync after manual pyproject.toml edits
uv sync --all-extras
```

The library is installed in **editable mode**, so changes to the code are immediately reflected.


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
CAGR [%]                                16.80
Sharpe Ratio                             0.66
Sortino Ratio                            1.30
Calmar Ratio                             0.77
Alpha [%]                              450.62
Beta                                     0.02
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
Kelly Criterion                        0.6134
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

![xkcd.com/1570](https://imgs.xkcd.com/comics/engineer_syllogism.png)


Bugs
----
Before reporting bugs or posting to the
[discussion board](https://github.com/kernc/backtesting.py/discussions),
please read [contributing guidelines](CONTRIBUTING.md), particularly the section
about crafting useful bug reports and ```` ``` ````-fencing your code. We thank you!

### Known Issues

**macOS file descriptor limit**: On macOS, running the full test suite or optimization with many parameters may hit the default file descriptor limit (256). If you encounter `OSError: [Errno 24] Too many open files`, increase the limit:

```bash
ulimit -n 10240
```

For a permanent fix, add to your shell profile (`~/.zshrc` or `~/.bash_profile`):

```bash
ulimit -n 10240
```


Alternatives
------------
See [alternatives.md] for a list of alternative Python
backtesting frameworks and related packages.

[alternatives.md]: https://github.com/kernc/backtesting.py/blob/master/doc/alternatives.md
