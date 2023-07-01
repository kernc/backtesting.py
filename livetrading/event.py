import abc
import dataclasses
import datetime

from collections import deque
from dateutil.parser import isoparse
from typing import Optional


intervals = {
            "1s": 1,
            "1m": 60,
            "3m": 3 * 60,
            "5m": 5 * 60,
            "15m": 15 * 60,
            "30m": 30 * 60,
            "1h": 3600,
            "2h": 2 * 3600,
            "4h": 4 * 3600,
            "6h": 6 * 3600,
            "8h": 8 * 3600,
            "12h": 12 * 3600,
            "1d": 86400,
            "3d": 3 * 86400,
            "1w": 7 * 86400,
            "1M": 31 * 86400
}


@dataclasses.dataclass
class Bar:
    """A Bar, aka candlestick, is the summary of the trading activity in a given period.

    :param date: The beginning of the period. It must have timezone information set.
    :param pair: The trading pair.
    :param open: The opening price.
    :param high: The highest traded price.
    :param low: The lowest traded price.
    :param close: The closing price.
    :param volume: The volume traded.
    """
    date: datetime
    pair: str
    Open: float
    High: float
    Low: float
    Close: float
    Volume: float


@dataclasses.dataclass
class Pair:
    """A trading pair.

    :param base_symbol: The base symbol.
    :param quote_symbol: The quote symbol.
    """
    base_symbol: str
    quote_symbol: str

    def __str__(self):
        # change format here to reflect corresponding exchange
        return "{}-{}".format(self.base_symbol, self.quote_symbol)


@dataclasses.dataclass
class PairInfo:
    """Information about a trading pair.

    :param base_increment: The increment for the base symbol.
    :param quote_increment: The increment for the quote symbol.
    """
    base_increment: float
    quote_increment: float


class Ticker:
    """A Ticker constantly updating stream of information about a stock.
    :param datetime: The beginning of the period. It must have timezone information set.
    :param pair: The trading pair.
    :param open: The opening price.
    :param high: The highest traded price.
    :param low: The lowest traded price.
    :param price: The price.
    :param volume: The volume traded.
    """
    def __init__(self, pair: Pair, json: dict):
        self.pair: Pair = pair
        self.json: dict = json
        self.Date = isoparse(json['time'])
        self.Volume = float(json["volume_24h"])
        self.Open = float(json["open_24h"])
        self.High = float(json["high_24h"])
        self.Low = float(json["low_24h"])
        self.Close = float(json["price"])


class KlineBar(Bar):
    """
    K-line, aka candlestick, is a chart marked with the opening price, closing price,
    highest price, and lowest price to reflect price changes.
    :param pair: The trading pair.
    :param json: Message json.
    """
    def __init__(self, pair: Pair, json: dict):
        super().__init__(
            datetime.utcfromtimestamp(
                int(json["t"] / 1e3).replace(tzinfo=datetime.timezone.utc)),
            pair, float(json["o"]), float(json["h"]),
            float(json["l"]), float(json["c"]), float(json["v"])
        )
        self.pair: Pair = pair
        self.json: dict = json


class EventProducer:
    """Base class for event producers.
    .. note::

        Main method is for main functions that should be performed for an event producer.
        Finalize method is called on error or stop.
    """
    def main(self):
        """Override to run the loop that produces events."""
        pass

    def finalize(self):
        """Override to perform task and transaction cancellation."""
        pass


class Event:
    """Base class for events.

    :param when: The datetime when the event occurred.
    Used to calculate the datetime for the next event.
    It must have timezone information set.
    """

    def __init__(self, when: datetime.datetime):
        self.when: datetime.datetime = when


class EventSource(metaclass=abc.ABCMeta):
    """Base class for events storage.

    :param producer: EventProducer.
    """

    def __init__(self, producer: Optional[EventProducer] = None):
        self.producer = producer
        self.events = deque()


class ChannelEventSource(EventSource):
    """Base class for websockets channels.

    :param producer: EventProducer.
    """
    def __init__(self, producer: EventProducer):
        super().__init__(producer=producer)

    @abc.abstractmethod
    def push_to_queue(self, message: dict):
        raise NotImplementedError()


class TickersEventSource(ChannelEventSource):
    """An event source for :class:`Ticker` instances.

    :param pair: The trading pair.
    """
    def __init__(self, pair: Pair, when: datetime, producer: EventProducer):
        super().__init__(producer=producer)
        self.pair: Pair = pair
        self.when = intervals.get(when)

    def push_to_queue(self, message: dict):
        timestamp = message["time"]
        dt = isoparse(timestamp) + datetime.timedelta(seconds=self.when)
        self.events.append(TickerEvent(
            dt,
            Ticker(self.pair, message)))


class KLinesEventSource(EventSource):
    """An event source for :class:`KLineBar` instances.

    :param pair: The trading pair..
    """
    def __init__(self, pair: Pair, producer: EventProducer):
        super().__init__(producer=producer)
        self.pair: Pair = pair

    def push_to_queue(self, message: dict):
        kline_event = message["data"]
        kline = kline_event["k"]
        # Wait for the last update to the kline.
        if kline["x"] is False:
            return
        self.events.append(BarEvent(
            datetime.utcfromtimestamp(
                int(kline_event["E"] / 1e3).replace(tzinfo=datetime.timezone.utc)),
            KlineBar(self.pair, kline)))

    def ws_channel(self, interval: str) -> str:
        """
        Generate websocket channel
        """
        return "{}@kline_{}".format(
            "{}{}".format(self.pair.base_symbol.upper(), self.pair.quote_symbol.upper()).lower(),
            interval)


class BarEvent(Event):
    """An event for :class:`Bar` instances.

    :param when: The datetime when the event occurred. It must have timezone information set.
    :param bar: The bar.
    """
    def __init__(self, when, bar: Bar):
        super().__init__(when)

        self.data = bar


class TickerEvent(Event):
    """An event for :class:`Ticker` instances.

    :param when: The datetime when the event occurred. It must have timezone information set.
    :param ticker: The Ticker.
    """
    def __init__(self, when, ticker: Ticker):
        super().__init__(when)

        self.data = ticker
