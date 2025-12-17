# Fillna Interpolation Sub-Skill

Use `interpolate()` instead of `fillna(0)` for missing values:
```python
returns = returns.interpolate(method='linear', limit_direction='both') + 1
```

Applied in `backtesting/_stats.py` `geometric_mean()` function.
