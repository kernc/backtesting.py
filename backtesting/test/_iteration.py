from backtesting import Backtest
from backtesting import Strategy
from backtesting.test import GOOG, SMA
from backtesting.lib import crossover
import types

class SmaCross(Strategy):
    # Define the two MA lags as *class variables*
    # for later optimization
    n1 = 10
    n2 = 20
    
    def init(self):
        # Precompute the two moving averages
        self.sma1 = self.I(SMA, self.data.Close, self.n1)
        self.sma2 = self.I(SMA, self.data.Close, self.n2)
    
    def next(self):
        # If sma1 crosses above sma2, close any existing
        # short trades, and buy the asset
        if crossover(self.sma1, self.sma2):
            self.position.close()
            self.buy()

        # Else, if sma1 crosses below sma2, close any existing
        # long trades, and sell the asset
        elif crossover(self.sma2, self.sma1):
            self.position.close()
            self.sell()

bt = Backtest(GOOG, SmaCross, cash=10_000, commission=.002)
# stats = bt.run()
bt.initialize()

while True:
    stats = bt.next()
    if not isinstance(stats, types.NoneType):
        break
print(stats)
bt.plot(results=stats, open_browser=True)
