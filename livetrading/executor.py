import time
import datetime
import logging
from functools import partial
from typing import Any, Dict, List, Set, Optional

from backtesting import Backtest
from .converter import ohlcv_to_dataframe
from .event import Event, EventSource, EventProducer

logger = logging.getLogger(__name__)


class EventDispatcher:
    """Responsible for connecting event sources to event handlers and dispatching events
    in the right order.
    """
    def __init__(self, strategy):
        self._event_handlers: Dict[EventSource, List[Any]] = {}
        self._prefetched_events: Dict[EventSource, Optional[Event]] = {}
        self._prev_events: Dict[EventSource, datetime.datetime] = {}
        self._producers: Set[EventProducer] = set()
        self._running = False
        self._stopped = False
        self._current_event_dt = None
        self.strategy = strategy
        self.backtesting = None

    def set_strategy(self, strategy):
        self._strategy = strategy

    def set_backtesting_partial(self, cash: float = 10_000,
                                commission: float = .0,
                                margin: float = 1.,
                                trade_on_close=False,
                                hedging=False,
                                exclusive_orders=False):
        self.backtesting = partial(Backtest, strategy=self.strategy, cash=cash, commission=commission,
                                   margin=margin, trade_on_close=trade_on_close,
                                   hedging=hedging, exclusive_orders=exclusive_orders)

    def subscribe(self, source: EventSource, event_handler: Any):
        """Registers an callable that will be called when an event source has new events.

        :param source: An event source.
        :param event_handler: An callable that receives an event.
        """
        assert not self._running
        handlers = self._event_handlers.setdefault(source, [])
        if event_handler not in handlers:
            handlers.append(event_handler)
        if source.producer:
            self._producers.add(source.producer)

    def run(self):
        assert not self._running, "Running or already ran"

        self._running = True
        try:
            # Run producers and dispatch loop.
            for producer in self._producers:
                producer.main()
            self._dispatch_loop()
        except Exception as error:
            logger.error(error)
        finally:
            for producer in self._producers:
                producer.finalize()

    def on_error(self, error: Any):
        logger.error(error)

    def _dispatch_next(self, ge_or_assert: Optional[datetime.datetime]):
        # Pre-fetch events from all sources.
        sources_to_pop = [
            source for source in self._event_handlers.keys() if
            self._prefetched_events.get(source) is None
        ]
        for source in sources_to_pop:
            if source.events:
                df = ohlcv_to_dataframe([event.data for event in source.events])
                bt = self.backtesting(data=df)
                bt.run()

                event = source.events.pop()
                # Check that events from the same source are returned in order.
                prev_event = self._prev_events.get(source)
                if prev_event is not None and event.when < prev_event.when:
                    continue

                self._prev_events[source] = event
                self._prefetched_events[source] = event

        # Calculate the datetime for the next event using the prefetched events.
        next_dt = None
        prefetched_events = [e for e in self._prefetched_events.values() if e]
        if prefetched_events:
            next_dt = min(map(lambda e: e.when, prefetched_events))
        assert ge_or_assert is None or next_dt is None or next_dt >= ge_or_assert, \
            f"{next_dt} can't be dispatched after {ge_or_assert}"

        # Dispatch events matching the desired datetime.
        event_handlers = []
        for source, e in self._prefetched_events.items():
            if e is not None and e.when == next_dt:
                # Collect event handlers for the event source.
                event_handlers += [event_handler(e) for event_handler in
                                   self._event_handlers.get(source, [])]
                # Consume the event.
                self._prefetched_events[source] = None

        self._current_event_dt = None
        return next_dt

    def stop(self):
        """Requests the event dispatcher to stop the event processing loop."""
        self._stopped = True

        for producer in self._producers:
            producer.finalize()

    def _dispatch_loop(self):
        last_dt = None

        while not self._stopped:
            dispatched_dt = self._dispatch_next(last_dt)
            if dispatched_dt is None:
                time.sleep(0.01)
            else:
                last_dt = dispatched_dt
