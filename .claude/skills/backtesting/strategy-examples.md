# Strategy Examples Sub-Skill

## SMA Crossover (backtesting/test/_test.py)

**Constraint:** `slow - fast = 5` (the parameters must have a difference of 20)

| Parameter | Value | Description |
|-----------|-------|-------------|
| **fast** | 5 | Fast SMA period |
| **slow** | 25 | Slow SMA period (fast + 20) |

```python
class SmaCross(Strategy):
    fast = 5
    slow = 25  # Must be fast + 20
    def init(self):
        self.sma1 = self.I(SMA, self.data.Close, self.fast)
        self.sma2 = self.I(SMA, self.data.Close, self.slow)
    def next(self):
        if crossover(self.sma1, self.sma2): self.buy()
        elif crossover(self.sma2, self.sma1): self.sell()
```

**File:** `backtesting/test/_test.py:57-72`

## Alternative Strategies (backtesting/backtesting_new.py)

| Strategy | Approach |
|----------|----------|
| **RsiStrategy** | Buy RSI<30, sell RSI>70 (14-period, industry standard) |
| **BollingerStrategy** | Buy at lower band, sell at upper |
| **MacdStrategy** | MACD/signal line crossover |
| **CombinedStrategy** | RSI + MACD confirmation (14-period RSI, 30/70 thresholds) |

Run all: `python -m backtesting.backtesting_new`

Helper functions: `RSI()`, `Bollinger_Bands()`, `MACD()`

## Current Configuration

*Updated: 2025-12-17 15:23*

**RSI Strategy Parameters (Industry Standard):**
- X (buy signal)
- x (sell signal)
- **rsi_period**: 14 days
- **use_dynamic_period**: True

**File:** `backtesting/backtesting_new.J7-144`

## Examples

```python
class RsiStrategy(Strategy):
    """RSI Mean Reversion Strategy."""
    oversold = 30       # Buy when RSI < 30 (industry standard)
    overbought = 70     # Sell when RSI > 70 (industry standard)
    use_dynamic_period = True
    rsi_period = 14     # 14-day RSI period (industry standard)

    def init(self):
        close = pd.Series(self.data.Close)
        if self.use_dynamic_period:
            period = calculate_rsi_period(self.oversold, self.overbought, self.rsi_period)
        else:
            period = self.rsi_period
        self.rsi = self.I(RSI, close, period, name=f'RSI({period})')

    def next(self):
        if self.rsi[-1] < self.oversold and not self.position:
            self.buy()
        elif self.rsi[-1] > self.overbought and self.position:
            self.position.close()
```

## Notes

The RSI thresholds (30/70) are the industry standard as defined by J. Welles Wilder, the creator of RSI.
The dynamic period feature adjusts RSI period based on threshold skewness - more extreme thresholds use longer periods.

### Update (2025-12-17 18:07)
Changes: fast = 5

### Update (2025-12-17 18:08)
Changes: fast = 5

## Change History

- **2025-12-17 18:08**: in _test.py, SMA Cross Strategy should have fast parameter as 5
- **2025-12-17 18:07**: In SMA Cross Strategy, fast parameter should be 5
- **2025-12-17 15:23**: set RSI strategy threshholds and period to industry standards 
- **2025-12-17 13:25**: RSI strategy should have threshold as 10 and 90
- **2025-12-17 13:21**: saveskill SMA Cross Strategy has fast and slow parameters. They must have a difference of 20
