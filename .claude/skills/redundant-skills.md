# Redundant Skills Archive

Overflow storage for verbose skill content. Reference this file for detailed examples and extended documentation.

---

## Test Runner - Extended Examples

### With Coverage
```bash
coverage run -m backtesting.test && coverage report -m
```

### Coverage HTML Report
```bash
coverage html && echo "Coverage report generated in htmlcov/index.html"
```

### Run Specific Test
```bash
python -m unittest backtesting.test.TestBacktest
```

---

## Code Quality - Extended Examples

### Flake8 Only (style check)
```bash
flake8 backtesting/ --count --show-source --statistics
```

### mypy Only (type checking)
```bash
mypy backtesting/ --ignore-missing-imports --pretty
```

### Check Specific File
```bash
flake8 backtesting/backtesting.py && mypy backtesting/backtesting.py
```

### Line Length Check (Ruff)
```bash
python -m ruff check backtesting/ --select=E501
```

---

## Docs Builder - Extended Examples

### View Documentation Live
```bash
python -m pdoc backtesting --html
```

### Check Doc Coverage
```bash
python -c "
import backtesting
import inspect

classes = [obj for name, obj in inspect.getmembers(backtesting) if inspect.isclass(obj)]
print(f'Total classes in backtesting: {len(classes)}')
for cls in classes:
    doc = cls.__doc__ or ''
    status = '✅' if doc.strip() else '❌'
    print(f'{status} {cls.__name__}')
"
```

---

## Strategy Examples - Extended Code

### Check Strategy Metrics Available
```bash
python3 -c "
from backtesting.test import GOOG
print('Available test data: GOOG (Google stock data)')
print(f'Data shape: {GOOG.shape}')
print(f'Date range: {GOOG.index[0]} to {GOOG.index[-1]}')
print(f'Columns: {list(GOOG.columns)}')
"
```

---

## Performance Profiling - Extended Examples

### cProfile Full Example
```python
import cProfile
import pstats
import io
from backtesting import Backtest, Strategy
from backtesting.test import GOOG

class SimpleStrategy(Strategy):
    def next(self):
        if not self.position:
            self.buy()

pr = cProfile.Profile()
pr.enable()

bt = Backtest(GOOG, SimpleStrategy, cash=10000)
stats = bt.run()

pr.disable()
s = io.StringIO()
ps = pstats.Stats(pr, stream=s).sort_stats('cumulative')
ps.print_stats(10)
print(s.getvalue())
```

### Memory Usage with tracemalloc
```python
import tracemalloc
from backtesting import Backtest, Strategy
from backtesting.test import GOOG

tracemalloc.start()

bt = Backtest(GOOG, Strategy, cash=10000)
stats = bt.run()

current, peak = tracemalloc.get_traced_memory()
print(f"Current memory: {current / 1024 / 1024:.2f} MB")
print(f"Peak memory: {peak / 1024 / 1024:.2f} MB")
tracemalloc.stop()
```

---

## Plotting - All Options Reference

```python
bt.plot(
    results=stats,           # Results from bt.run()
    filename='backtest.html', # Save to file
    plot_width=None,         # Width in pixels (None = 100% browser)
    plot_equity=True,        # Show equity curve
    plot_return=False,       # Show return curve
    plot_pl=True,            # Show P/L indicator
    plot_volume=True,        # Show volume
    plot_drawdown=False,     # Show drawdown
    plot_trades=True,        # Show trade markers
    smooth_equity=False,     # Interpolate equity between trades
    relative_equity=True,    # Show as percent return
    superimpose=True,        # Overlay larger timeframe candles
    resample=True,           # Resample for performance
    reverse_indicators=False,# Reverse indicator order
    show_legend=True,        # Show legends
    open_browser=True        # Open in browser
)
```
