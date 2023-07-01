import logging
import websocket, json, _thread

from typing import Dict, List, Set

from livetrading.event import EventSource, EventProducer

logger = logging.getLogger(__name__)


class WSClient(EventProducer, websocket.WebSocketApp):
    """"Class for channel based web socket clients.
     :param config: Config settings for exchange.
    """
    def __init__(self, config):
        super(WSClient, self).__init__(config['ws_url'])
        self.event_sources: Dict[str, EventSource] = {}
        self.pending_subscriptions: Set[str] = set()
        self.timeout = config['ws_timeout']
        self.on_open = lambda ws: self.subscribe_msg()
        self.on_message = lambda ws, msg: self.handle_message(json.loads(msg))
        self.on_error = lambda ws, e: logger.warning(f"Error: {e}")
        self.on_close = self.on_close
        self._running = False
        self.thread = None

    def set_channel_event_source(self, channel: str, event_source: EventSource):
        assert channel not in self.event_sources, "channel already registered"
        self.event_sources[channel] = event_source
        self.pending_subscriptions.add(channel)

    def subscribe_msg(self):
        self.pending_subscriptions.update(self.event_sources.keys())
        channels = list(self.pending_subscriptions)
        self.subscribe_to_channels(channels)

    def on_close(self):
        self.pending_subscriptions = set()
    
    def main(self):
        if not self._running:
            self.thread = _thread.start_new_thread(self.run_forever, ())
            self._running = True

    def subscribe_to_channels(
            self, channels: List[str]
    ):
        sub_msg = {
            "type": "subscribe",
            "product_ids": [
                "ETH-USD",
                "BTC-USD"
            ],
            "channels": channels
        }
        self.send(json.dumps(sub_msg))
        logger.info(f"Subscribed to channels: {channels}")

    def handle_message(self, message: dict) -> None:
        channel = message.get("type")
        event_source = self.event_sources.get(channel)
        if event_source:
            event_source.push_to_queue(message)