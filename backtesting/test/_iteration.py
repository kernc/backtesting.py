from backtesting import Backtest
from backtesting import Strategy
from backtesting.test import GOOG, SMA
from backtesting.lib import crossover
import types
import random
random.seed(0)

class TestStrategy(Strategy):
    def init(self):
        print("Init", self.equity)
        
    def next(self, action=None):
        # uncomment if you want to test run()
        # if not action:
        #     action = random.randint(0, 1)
        if action!=None:
            if action == 0:
                self.buy()
            elif action == 1:
                self.position.close()


bt = Backtest(GOOG, TestStrategy, cash=10_000, commission=.002)

# stats = bt.run()

bt.initialize()
while True:
    action = random.randint(0, 1)
    stats = bt.next(action=action)
    if not isinstance(stats, types.NoneType):
        break
print(stats)
bt.plot(results=stats, open_browser=True)
