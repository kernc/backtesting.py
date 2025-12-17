# Performance Profiling Sub-Skill

**CPU profiling**: Use `cProfile` to identify slow functions.
**Memory profiling**: Use `tracemalloc` to track memory usage.

Quick memory check:
```python
import tracemalloc
tracemalloc.start()
# ... run backtest ...
current, peak = tracemalloc.get_traced_memory()
print(f"Peak memory: {peak / 1024 / 1024:.2f} MB")
```

See [../redundant-skills.md](../redundant-skills.md) for full examples.
