# Backtesting Analyzer Skill

## Sub-Skills
- [strategy-examples](backtesting/strategy-examples.md) - Strategy implementation
- [performance-profiling](backtesting/performance-profiling.md) - CPU/memory profiling
- [plotting-visualization](backtesting/plotting-visualization.md) - Charts and plots
- [reproducibility](backtesting/reproducibility.md) - Random seed for consistent results
- [fillna-interpolation](backtesting/fillna-interpolation.md) - Missing value handling

## Quick Start
```python
from backtesting import Backtest, Strategy
from backtesting.test import GOOG

bt = Backtest(GOOG, MyStrategy, cash=10000)
stats = bt.run()
```

## Key Metrics
`Return [%]`, `Sharpe Ratio`, `Max. Drawdown [%]`, `Win Rate [%]`, `# Trades`

## Common Parameters
`cash`, `commission`, `spread`, `margin`, `trade_on_close`, `hedging`, `exclusive_orders`, `random_state`

## Strategy Conversation Saved

### Strategy Conversation Saved
*Saved on 2025-12-17 11:17*

**Files:** analyzer.md, examples.md, analyzer.md:
**Issues:**
- you mentioned (where content was being saved to the parent instead of the more specific sub-skill) w
- both files:

1
- in whatever skill processing logic is handling the saves - that's outside these skill files themselv
**Values:** files=1

