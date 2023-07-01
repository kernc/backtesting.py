from decimal import Decimal
from typing import Any, Dict, Optional

from livetrading.event import KLinesEventSource, Pair, PairInfo, TickersEventSource
from livetrading.rest_cli import RestClient
from livetrading.websocket_client import WSClient


class Broker:
    """A client for crypto currency exchange.

    :param dispatcher: The event dispatcher.
    :param config: Config settings for exchange.
    """
    def __init__(
            self, dispatcher, config
    ):
        self.dispatcher = dispatcher
        self.config = config
        self.api_cli = RestClient(self.config)
        self.cli: Optional[Any] = None # external libs as ccxt
        self.ws_cli = WSClient(config)
        self._cached_pairs: Dict[Pair] = {}

    def subscribe_to_ticker_events(
            self, pair: Pair, interval: str, event_handler
    ):
        """Registers a callable that will be called every ticker.

        :param bar_duration: The bar duration. One of 1s, 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M.
        :param pair: The trading pair.
        :param event_handler: A callable that receives an TickerEvent.
        """

        event_source = TickersEventSource(pair, interval, self.ws_cli)
        channel = "ticker"

        self._subscribe_to_ws_channel_events(
            channel,
            event_handler,
            event_source
        )

    def subscribe_to_bar_events(
            self, pair: Pair, event_handler, interval
    ):
        """Registers a callable that will be called every bar.

        :param pair: The trading pair.
        :param event_handler: A callable that receives an BarEvent.
        """
        event_source = KLinesEventSource(pair, self.ws_cli)
        channel = event_source.ws_channel(interval)

        self._subscribe_to_ws_channel_events(
            channel,
            event_handler,
            event_source
        )

    def get_pair_info(self, pair: Pair) -> PairInfo:
        """Returns information about a trading pair.

        :param pair: The trading pair.
        """
        ret = self._cached_pairs.get(pair)
        api_path = '/'.join(['products', pair])
        if not ret:
            pair_info = self.api_cli.call(method='GET', apipath=api_path)
            self._cached_pairs[pair] = PairInfo(Decimal(pair_info['base_increment']),
                                                Decimal(pair_info['quote_increment']))
        return self._cached_pairs

    def get_data_df(self, event_source):
        data_source = self.ws_cli.event_sources[event_source]
        return list(data_source.events)

    def _subscribe_to_ws_channel_events(
            self, channel: str, event_handler, event_source
    ):
        # Set the event source for the channel.
        self.ws_cli.set_channel_event_source(channel, event_source)

        # Subscribe the event handler to the event source.
        self.dispatcher.subscribe(event_source, event_handler)
