# Reproducibility Sub-Skill

Set `random_state` for consistent results:
```python
bt = Backtest(GOOG, MyStrategy, cash=10000, random_state=42)
```

Useful for strategies with random components or Monte Carlo simulations.
