from backtesting import Backtest, Strategy
from backtesting.lib import crossover
from backtesting.test import SMA, GOOG
from pandas_datareader import data
import matplotlib.pyplot as plt
import pandas as pd


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


if __name__ == '__main__':
    # tickers = ['AAPL', 'MSFT', '^GSPC']
    start_date = '2010-01-01'
    end_date = '2021-12-31'

    # User pandas_reader.data.DataReader to load the desired data. As simple as that.
    panel_data = data.DataReader('AAPL', 'yahoo', start_date, end_date)

    bt = Backtest(panel_data, SmaCross, commission=.002,
                  exclusive_orders=True)
    stats = bt.run()
    # print(stats)
    bt.plot()
