from backtesting import Backtest, Strategy, SizeType
from backtesting.test import GOOG

#print(GOOG)

class DollarCostAverage(Strategy):
    def init(self):
        self.count = 1
    def next(self):
        self.buy(size=0.2, size_type=SizeType.FractionOfUnit)
        if self.count % 5 == 5: # Just do random sells to test selling as well.
            self.sell(size=0.2, size_type=SizeType.FractionOfUnit)
        self.count += 1
       

bt = Backtest(GOOG, DollarCostAverage, cash=100000)
stats = bt.run()
print(stats)

#bt.plot()