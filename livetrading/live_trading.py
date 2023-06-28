import websocket

from backtesting import Strategy
from backtesting._util import _Data
from livetrading import executor
from livetrading.broker import Broker, Pair
from livetrading.config import config
from livetrading.converter import ohlcv_to_dataframe


class LiveStrategy(Strategy):

    def __init__(self, broker):
        super().__init__(broker=broker, data=[], params={})
        self.event_data = []

    def init(self):
        super().init()
        self.set_atr_periods()

    def set_atr_periods(self):
        if len(self.data) > 1:
            print(self.data.High, self.data.Low)

    def on_bar_event(self, event):
        self.event_data.append(event.ticker)
        event_df = ohlcv_to_dataframe(self.event_data)
        self._data = _Data(event_df.copy(deep=False))

    def next(self):
        print(self.data)


class PositionManager:
    def __init__(self, exchange, position_amount):
        assert position_amount > 0
        self.exchange = exchange
        self.position_amount = position_amount

    def on_event(self, bar_event):
        # react on event from websocket
        pass


if __name__ == '__main__':

    websocket.enableTrace(False)

    event_dis = executor.EventDispatcher()

    exchange = Broker(event_dis, config=config)

    pair_info = exchange.get_pair_info('BTC-USD')

    position_mgr = PositionManager(exchange, 0.8)

    strategy = LiveStrategy(exchange)

    exchange.subscribe_to_ticker_events(Pair(base_symbol="UTC", quote_symbol="SDT"),
                                        strategy.on_bar_event)

    event_dis.set_strategy(strategy)

    event_dis.run()
