"""
Core framework data structures.
Objects from this module can also be imported from the top-level
module directly, e.g.

    from backtesting import Backtest, Strategy
"""

from __future__ import annotations

import sys
import warnings
from abc import ABCMeta, abstractmethod
from collections.abc import Callable, Mapping, Sequence
from copy import copy
from difflib import get_close_matches
from functools import lru_cache, partial
from itertools import chain, product, repeat
from math import copysign
from numbers import Number
from typing import Optional, Union

import numpy as np
import pandas as pd
from numpy.random import default_rng

from ._plotting import plot  # noqa: I001
from ._stats import compute_stats, dummy_stats
from ._util import (
    SharedMemoryManager, _as_str, _Indicator, _Data, _MultiData, _batch,
    _indicator_warmup_nbars, _merged_symbols, _strategy_indicator_specs,
    _symbol_from_symbols, patch, try_, _tqdm,
)

__pdoc__ = {
    'Strategy.__init__': False,
    'Order.__init__': False,
    'Position.__init__': False,
    'Trade.__init__': False,
}


class Strategy(metaclass=ABCMeta):
    """
    A trading strategy base class. Extend this class and
    override methods
    `backtesting.backtesting.Strategy.init` and
    `backtesting.backtesting.Strategy.next` to define
    your own strategy.
    """
    def __init__(self, broker, data, params):
        self._indicators = []
        self._broker: _Broker = broker
        self._data: _Data = data
        self._params = self._check_params(params)

    def __repr__(self):
        return '<Strategy ' + str(self) + '>'

    def __str__(self):
        params = ','.join(f'{i[0]}={i[1]}' for i in zip(self._params.keys(),
                                                        map(_as_str, self._params.values())))
        if params:
            params = '(' + params + ')'
        return f'{self.__class__.__name__}{params}'

    def _check_params(self, params):
        for k, v in params.items():
            if not hasattr(self, k):
                suggestions = get_close_matches(k, (attr for attr in dir(self) if not attr.startswith('_')))
                hint = f" Did you mean: {', '.join(suggestions)}?" if suggestions else ""
                raise AttributeError(
                    f"Strategy '{self.__class__.__name__}' is missing parameter '{k}'. "
                    "Strategy class should define parameters as class variables before they "
                    "can be optimized or run with." + hint)
            setattr(self, k, v)
        return params

    def I(self,  # noqa: E743
          func: Callable, *args,
          name=None, plot=True, overlay=None, color=None, scatter=False,
          **kwargs) -> np.ndarray:
        """
        Declare an indicator. An indicator is just an array of values
        (or a tuple of such arrays in case of, e.g., MACD indicator),
        but one that is revealed gradually in
        `backtesting.backtesting.Strategy.next` much like
        `backtesting.backtesting.Strategy.data` is.
        Returns `np.ndarray` of indicator values.

        `func` is a function that returns the indicator array(s) of
        same length as `backtesting.backtesting.Strategy.data`.

        In the plot legend, the indicator is labeled with
        function name, unless `name` overrides it. If `func` returns
        a tuple of arrays, `name` can be a sequence of strings, and
        its size must agree with the number of arrays returned.

        If `plot` is `True`, the indicator is plotted on the resulting
        `backtesting.backtesting.Backtest.plot`.

        If `overlay` is `True`, the indicator is plotted overlaying the
        price candlestick chart (suitable e.g. for moving averages).
        If `False`, the indicator is plotted standalone below the
        candlestick chart. By default, a heuristic is used which decides
        correctly most of the time.

        `color` can be string hex RGB triplet or X11 color name.
        By default, the next available color is assigned.

        If `scatter` is `True`, the plotted indicator marker will be a
        circle instead of a connected line segment (default).

        Additional `*args` and `**kwargs` are passed to `func` and can
        be used for parameters.

        For example, using simple moving average function from TA-Lib:

            def init():
                self.sma = self.I(ta.SMA, self.data.Close, self.n_sma)

        .. warning::
            Rolling indicators may front-pad warm-up values with NaNs.
            In this case, the **backtest will only begin on the first bar when
            all declared indicators have non-NaN values** (e.g. bar 201 for a
            strategy that uses a 200-bar MA).
            This can affect results.
        """
        def _format_name(name: str) -> str:
            return name.format(*map(_as_str, args),
                               **dict(zip(kwargs.keys(), map(_as_str, kwargs.values()))))

        if name is None:
            params = ','.join(filter(None, map(_as_str, chain(args, kwargs.values()))))
            func_name = _as_str(func)
            name = (f'{func_name}({params})' if params else f'{func_name}')
        elif isinstance(name, str):
            name = _format_name(name)
        elif try_(lambda: all(isinstance(item, str) for item in name), False):
            name = [_format_name(item) for item in name]
        else:
            raise TypeError(f'Unexpected `name=` type {type(name)}; expected `str` or '
                            '`Sequence[str]`')

        try:
            value = func(*args, **kwargs)
        except Exception as e:
            raise RuntimeError(f'Indicator "{name}" error. See traceback above.') from e
        raw_value = value

        if isinstance(value, pd.DataFrame):
            value = value.values.T

        if value is not None:
            value = try_(lambda: np.asarray(value, order='C'), None)
            if value is not None and not value.flags.writeable:
                value = value.copy()
        is_arraylike = bool(value is not None and value.shape)

        # Optionally flip the array if the user returned e.g. `df.values`
        if is_arraylike and np.argmax(value.shape) == 0:
            value = value.T

        if isinstance(name, list) and (np.atleast_2d(value).shape[0] != len(name)):
            raise ValueError(
                f'Length of `name=` ({len(name)}) must agree with the number '
                f'of arrays the indicator returns ({value.shape[0]}).')

        data_len = len(self._data)
        if not is_arraylike or not 1 <= value.ndim <= 2 or value.shape[-1] != data_len:
            raise ValueError(
                'Indicators must return (optionally a tuple of) numpy.arrays of same '
                f'length as `data` (data length: {data_len}; indicator "{name}" '
                f'shape: {getattr(value, "shape", "")}, returned value: {value})')

        symbols = _merged_symbols(raw_value, *chain(args, kwargs.values()))
        symbol = _symbol_from_symbols(symbols)
        if overlay is None and np.issubdtype(value.dtype, np.number):
            if len(symbols) > 1:
                overlay = False
            else:
                def _indicator_close():
                    return self._data[symbol].Close if symbol is not None else self._data.Close
                close = try_(_indicator_close)
                if close is not None:
                    x = value / close
                    # By default, overlay if strong majority of indicator values
                    # is within 30% of Close
                    with np.errstate(invalid='ignore'):
                        overlay = ((x < 1.4) & (x > .6)).mean() > .6
                else:
                    overlay = False

        value = _Indicator(value, name=name, plot=plot, overlay=overlay,
                           color=color, scatter=scatter,
                           # _Indicator.s Series accessor uses this:
                           index=self.data.index,
                           symbol=symbol,
                           symbols=symbols)
        self._indicators.append(value)
        return value

    @abstractmethod
    def init(self):
        """
        Initialize the strategy.
        Override this method.
        Declare indicators (with `backtesting.backtesting.Strategy.I`).
        Precompute what needs to be precomputed or can be precomputed
        in a vectorized fashion before the strategy starts.

        If you extend composable strategies from `backtesting.lib`,
        make sure to call:

            super().init()
        """

    @abstractmethod
    def next(self):
        """
        Main strategy runtime method, called as each new
        `backtesting.backtesting.Strategy.data`
        instance (row; full candlestick bar) becomes available.
        This is the main method where strategy decisions
        upon data precomputed in `backtesting.backtesting.Strategy.init`
        take place.

        If you extend composable strategies from `backtesting.lib`,
        make sure to call:

            super().next()
        """

    class __FULL_EQUITY(float):  # noqa: N801
        def __repr__(self): return '.9999'  # noqa: E704
    _FULL_EQUITY = __FULL_EQUITY(1 - sys.float_info.epsilon)

    def buy(self, symbol=None, *,
            size: float = _FULL_EQUITY,
            limit: Optional[float] = None,
            stop: Optional[float] = None,
            sl: Optional[float] = None,
            tp: Optional[float] = None,
            tag: object = None) -> 'Order':
        """
        Place a new long order and return it. For explanation of parameters, see `Order`
        and its properties.
        Unless you're running `Backtest(..., trade_on_close=True)`,
        market orders are filled on next bar's open,
        whereas other order types (limit, stop-limit, stop-market) are filled when
        the respective conditions are met.

        See `Position.close()` and `Trade.close()` for closing existing positions.

        See also `Strategy.sell()`.
        """
        assert 0 < size < 1 or round(size) == size >= 1, \
            "size must be a positive fraction of equity, or a positive whole number of units"
        return self._broker.new_order(size, limit, stop, sl, tp, tag, symbol=symbol)

    def sell(self, symbol=None, *,
             size: float = _FULL_EQUITY,
             limit: Optional[float] = None,
             stop: Optional[float] = None,
             sl: Optional[float] = None,
             tp: Optional[float] = None,
             tag: object = None) -> 'Order':
        """
        Place a new short order and return it. For explanation of parameters, see `Order`
        and its properties.

        .. caution::
            Keep in mind that `self.sell(size=.1)` doesn't close existing `self.buy(size=.1)`
            trade unless:

            * the backtest was run with `exclusive_orders=True`,
            * the underlying asset price is equal in both cases and
              the backtest was run with `spread = commission = 0`.

            Use `Trade.close()` or `Position.close()` to explicitly exit trades.

        See also `Strategy.buy()`.

        .. note::
            If you merely want to close an existing long position,
            use `Position.close()` or `Trade.close()`.
        """
        assert 0 < size < 1 or round(size) == size >= 1, \
            "size must be a positive fraction of equity, or a positive whole number of units"
        return self._broker.new_order(-size, limit, stop, sl, tp, tag, symbol=symbol)

    @property
    def equity(self) -> float:
        """Current account equity (cash plus assets)."""
        return self._broker.equity

    @property
    def data(self) -> _Data:
        """
        Price data, roughly as passed into
        `backtesting.backtesting.Backtest.__init__`,
        but with two significant exceptions:

        * `data` is _not_ a DataFrame, but a custom structure
          that serves customized numpy arrays for reasons of performance
          and convenience. Besides OHLCV columns, `.index` and length,
          it offers `.pip` property, the smallest price unit of change.
        * Within `backtesting.backtesting.Strategy.init`, `data` arrays
          are available in full length, as passed into
          `backtesting.backtesting.Backtest.__init__`
          (for precomputing indicators and such). However, within
          `backtesting.backtesting.Strategy.next`, `data` arrays are
          only as long as the current iteration, simulating gradual
          price point revelation. In each call of
          `backtesting.backtesting.Strategy.next` (iteratively called by
          `backtesting.backtesting.Backtest` internally),
          the last array value (e.g. `data.Close[-1]`)
          is always the _most recent_ value.
        * If you need data arrays (e.g. `data.Close`) to be indexed
          **Pandas series**, you can call their `.s` accessor
          (e.g. `data.Close.s`). If you need the whole of data
          as a **DataFrame**, use `.df` accessor (i.e. `data.df`).
        """
        return self._data

    @property
    def position(self) -> 'Position':
        """Instance of `backtesting.backtesting.Position`."""
        return self._broker.position

    @property
    def orders(self) -> tuple[Order, ...]:
        """List of orders (see `Order`) waiting for execution."""
        return tuple(self._broker.orders)

    @property
    def trades(self) -> tuple[Trade, ...]:
        """List of active trades (see `Trade`)."""
        return tuple(self._broker.trades)

    @property
    def closed_trades(self) -> tuple[Trade, ...]:
        """List of settled trades (see `Trade`)."""
        return tuple(self._broker.closed_trades)


class Position:
    """
    Currently held asset position, available as
    `backtesting.backtesting.Strategy.position` within
    `backtesting.backtesting.Strategy.next`.
    Can be used in boolean contexts, e.g.

        if self.position:
            ...  # we have a position, either long or short
    """
    def __init__(self, broker: _Broker, symbol=None):
        self.__broker = broker
        self.__symbol = symbol

    def __trades(self):
        return [trade for trade in self.__broker.trades
                if self.__symbol is None or trade.symbol == self.__symbol]

    def __bool__(self):
        return self.size != 0

    @property
    def size(self) -> float:
        """Position size in units of asset. Negative if position is short."""
        return sum(trade.size for trade in self.__trades())

    @property
    def pl(self) -> float:
        """Profit (positive) or loss (negative) of the current position in cash units."""
        return sum(trade.pl for trade in self.__trades())

    @property
    def pl_pct(self) -> float:
        """Profit (positive) or loss (negative) of the current position in percent."""
        total_invested = sum(trade.entry_price * abs(trade.size) for trade in self.__trades())
        return (self.pl / total_invested) * 100 if total_invested else 0

    @property
    def is_long(self) -> bool:
        """True if the position is long (position size is positive)."""
        return self.size > 0

    @property
    def is_short(self) -> bool:
        """True if the position is short (position size is negative)."""
        return self.size < 0

    def close(self, portion: float = 1.):
        """
        Close portion of position by closing `portion` of each active trade. See `Trade.close`.
        """
        for trade in self.__trades():
            trade.close(portion)

    def __repr__(self):
        symbol = '' if self.__symbol is None else f' {self.__symbol}'
        return f'<Position{symbol}: {self.size} ({len(self.__trades())} trades)>'


class _Positions:
    """
    Mapping-like portfolio position accessor, keyed by symbol.
    """
    def __init__(self, broker: _Broker, symbols):
        self.__broker = broker
        self.__positions = {symbol: Position(broker, symbol) for symbol in symbols}

    def __getitem__(self, symbol) -> Position:
        try:
            return self.__positions[symbol]
        except KeyError:
            raise KeyError(f"Symbol {symbol!r} not in data") from None

    def __iter__(self):
        return iter(self.__positions)

    def __bool__(self):
        return any(self.__positions.values())

    def keys(self):
        return self.__positions.keys()

    def values(self):
        return self.__positions.values()

    def items(self):
        return self.__positions.items()

    def close(self, portion: float = 1.):
        for position in self.__positions.values():
            position.close(portion)

    @property
    def pl(self) -> float:
        return sum(trade.pl for trade in self.__broker.trades)

    def __repr__(self):
        positions = {symbol: position.size for symbol, position in self.items()}
        return f'<Positions: {positions}>'


class _OutOfMoneyError(Exception):
    pass


class Order:
    """
    Place new orders through `Strategy.buy()` and `Strategy.sell()`.
    Query existing orders through `Strategy.orders`.

    When an order is executed or [filled], it results in a `Trade`.

    If you wish to modify aspects of a placed but not yet filled order,
    cancel it and place a new one instead.

    All placed orders are [Good 'Til Canceled].

    [filled]: https://www.investopedia.com/terms/f/fill.asp
    [Good 'Til Canceled]: https://www.investopedia.com/terms/g/gtc.asp
    """
    def __init__(self, broker: _Broker,
                 size: float,
                 limit_price: Optional[float] = None,
                 stop_price: Optional[float] = None,
                 sl_price: Optional[float] = None,
                 tp_price: Optional[float] = None,
                 parent_trade: Optional['Trade'] = None,
                 tag: object = None,
                 symbol=None):
        self.__broker = broker
        assert size != 0
        self.__symbol = symbol
        self.__size = size
        self.__limit_price = limit_price
        self.__stop_price = stop_price
        self.__sl_price = sl_price
        self.__tp_price = tp_price
        self.__parent_trade = parent_trade
        self.__tag = tag

    def _replace(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, f'_{self.__class__.__qualname__}__{k}', v)
        return self

    def __repr__(self):
        return '<Order {}>'.format(', '.join(f'{param}={try_(lambda: round(value, 5), value)!r}'
                                             for param, value in (
                                                 ('symbol', self.__symbol),
                                                 ('size', self.__size),
                                                 ('limit', self.__limit_price),
                                                 ('stop', self.__stop_price),
                                                 ('sl', self.__sl_price),
                                                 ('tp', self.__tp_price),
                                                 ('contingent', self.is_contingent),
                                                 ('tag', self.__tag),
                                             ) if value is not None))  # noqa: E126

    def cancel(self):
        """Cancel the order."""
        self.__broker.orders.remove(self)
        trade = self.__parent_trade
        if trade:
            if self is trade._sl_order:
                trade._replace(sl_order=None)
            elif self is trade._tp_order:
                trade._replace(tp_order=None)
            else:
                pass  # Order placed by Trade.close()

    # Fields getters

    @property
    def size(self) -> float:
        """
        Order size (negative for short orders).

        If size is a value between 0 and 1, it is interpreted as a fraction of current
        available liquidity (cash plus `Position.pl` minus used margin).
        A value greater than or equal to 1 indicates an absolute number of units.
        """
        return self.__size

    @property
    def symbol(self):
        """Order asset symbol, or None for single-asset backtests."""
        return self.__symbol

    @property
    def limit(self) -> Optional[float]:
        """
        Order limit price for [limit orders], or None for [market orders],
        which are filled at next available price.

        [limit orders]: https://www.investopedia.com/terms/l/limitorder.asp
        [market orders]: https://www.investopedia.com/terms/m/marketorder.asp
        """
        return self.__limit_price

    @property
    def stop(self) -> Optional[float]:
        """
        Order stop price for [stop-limit/stop-market][_] order,
        otherwise None if no stop was set, or the stop price has already been hit.

        [_]: https://www.investopedia.com/terms/s/stoporder.asp
        """
        return self.__stop_price

    @property
    def sl(self) -> Optional[float]:
        """
        A stop-loss price at which, if set, a new contingent stop-market order
        will be placed upon the `Trade` following this order's execution.
        See also `Trade.sl`.
        """
        return self.__sl_price

    @property
    def tp(self) -> Optional[float]:
        """
        A take-profit price at which, if set, a new contingent limit order
        will be placed upon the `Trade` following this order's execution.
        See also `Trade.tp`.
        """
        return self.__tp_price

    @property
    def parent_trade(self):
        return self.__parent_trade

    @property
    def tag(self):
        """
        Arbitrary value (such as a string) which, if set, enables tracking
        of this order and the associated `Trade` (see `Trade.tag`).
        """
        return self.__tag

    __pdoc__['Order.parent_trade'] = False

    # Extra properties

    @property
    def is_long(self):
        """True if the order is long (order size is positive)."""
        return self.__size > 0

    @property
    def is_short(self):
        """True if the order is short (order size is negative)."""
        return self.__size < 0

    @property
    def is_contingent(self):
        """
        True for [contingent] orders, i.e. [OCO] stop-loss and take-profit bracket orders
        placed upon an active trade. Remaining contingent orders are canceled when
        their parent `Trade` is closed.

        You can modify contingent orders through `Trade.sl` and `Trade.tp`.

        [contingent]: https://www.investopedia.com/terms/c/contingentorder.asp
        [OCO]: https://www.investopedia.com/terms/o/oco.asp
        """
        return bool((parent := self.__parent_trade) and
                    (self is parent._sl_order or
                     self is parent._tp_order))


class Trade:
    """
    When an `Order` is filled, it results in an active `Trade`.
    Find active trades in `Strategy.trades` and closed, settled trades in `Strategy.closed_trades`.
    """
    def __init__(self, broker: _Broker, size: int, entry_price: float,
                 entry_bar, tag, symbol=None):
        self.__broker = broker
        self.__symbol = symbol
        self.__size = size
        self.__entry_price = entry_price
        self.__exit_price: Optional[float] = None
        self.__entry_bar: int = entry_bar
        self.__exit_bar: Optional[int] = None
        self.__sl_order: Optional[Order] = None
        self.__tp_order: Optional[Order] = None
        self.__tag = tag
        self._commissions = 0

    def __repr__(self):
        symbol = '' if self.__symbol is None else f' symbol={self.__symbol}'
        return (
            f'<Trade{symbol} size={self.__size} '
            f'time={self.__entry_bar}-{self.__exit_bar or ""} '
            f'price={self.__entry_price}-{self.__exit_price or ""} '
            f'pl={self.pl:.0f}'
            f'{" tag=" + str(self.__tag) if self.__tag is not None else ""}>'
        )

    def _replace(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, f'_{self.__class__.__qualname__}__{k}', v)
        return self

    def _copy(self, **kwargs):
        return copy(self)._replace(**kwargs)

    def close(self, portion: float = 1.):
        """Place new `Order` to close `portion` of the trade at next market price."""
        assert 0 < portion <= 1, "portion must be a fraction between 0 and 1"
        # Ensure size is an int to avoid rounding errors on 32-bit OS
        size = copysign(max(1, int(round(abs(self.__size) * portion))), -self.__size)
        order = Order(self.__broker, size, parent_trade=self, tag=self.__tag, symbol=self.__symbol)
        self.__broker.orders.insert(0, order)

    # Fields getters

    @property
    def size(self):
        """Trade size (volume; negative for short trades)."""
        return self.__size

    @property
    def symbol(self):
        """Trade asset symbol, or None for single-asset backtests."""
        return self.__symbol

    @property
    def entry_price(self) -> float:
        """Trade entry price."""
        return self.__entry_price

    @property
    def exit_price(self) -> Optional[float]:
        """Trade exit price (or None if the trade is still active)."""
        return self.__exit_price

    @property
    def entry_bar(self) -> int:
        """Candlestick bar index of when the trade was entered."""
        return self.__entry_bar

    @property
    def exit_bar(self) -> Optional[int]:
        """
        Candlestick bar index of when the trade was exited
        (or None if the trade is still active).
        """
        return self.__exit_bar

    @property
    def tag(self):
        """
        A tag value inherited from the `Order` that opened
        this trade.

        This can be used to track trades and apply conditional
        logic / subgroup analysis.

        See also `Order.tag`.
        """
        return self.__tag

    @property
    def _sl_order(self):
        return self.__sl_order

    @property
    def _tp_order(self):
        return self.__tp_order

    # Extra properties

    @property
    def entry_time(self) -> Union[pd.Timestamp, int]:
        """Datetime of when the trade was entered."""
        return self.__broker._data_for_symbol(self.__symbol).index[self.__entry_bar]

    @property
    def exit_time(self) -> Optional[Union[pd.Timestamp, int]]:
        """Datetime of when the trade was exited."""
        if self.__exit_bar is None:
            return None
        return self.__broker._data_for_symbol(self.__symbol).index[self.__exit_bar]

    @property
    def is_long(self):
        """True if the trade is long (trade size is positive)."""
        return self.__size > 0

    @property
    def is_short(self):
        """True if the trade is short (trade size is negative)."""
        return not self.is_long

    @property
    def pl(self):
        """
        Trade profit (positive) or loss (negative) in cash units.
        Commissions are reflected only after the Trade is closed.
        """
        price = self.__exit_price or self.__broker.last_price_for(self.__symbol)
        return (self.__size * (price - self.__entry_price)) - self._commissions

    @property
    def pl_pct(self):
        """Trade profit (positive) or loss (negative) in percent relative to trade entry price."""
        price = self.__exit_price or self.__broker.last_price_for(self.__symbol)
        gross_pl_pct = copysign(1, self.__size) * (price / self.__entry_price - 1)

        # Total commission across the entire trade size to individual units
        commission_pct = self._commissions / (abs(self.__size) * self.__entry_price)
        return gross_pl_pct - commission_pct

    @property
    def value(self):
        """Trade total value in cash (volume × price)."""
        price = self.__exit_price or self.__broker.last_price_for(self.__symbol)
        return abs(self.__size) * price

    # SL/TP management API

    @property
    def sl(self):
        """
        Stop-loss price at which to close the trade.

        This variable is writable. By assigning it a new price value,
        you create or modify the existing SL order.
        By assigning it `None`, you cancel it.
        """
        return self.__sl_order and self.__sl_order.stop

    @sl.setter
    def sl(self, price: float):
        self.__set_contingent('sl', price)

    @property
    def tp(self):
        """
        Take-profit price at which to close the trade.

        This property is writable. By assigning it a new price value,
        you create or modify the existing TP order.
        By assigning it `None`, you cancel it.
        """
        return self.__tp_order and self.__tp_order.limit

    @tp.setter
    def tp(self, price: float):
        self.__set_contingent('tp', price)

    def __set_contingent(self, type, price):
        assert type in ('sl', 'tp')
        assert price is None or 0 < price < np.inf, f'Make sure 0 < price < inf! price: {price}'
        attr = f'_{self.__class__.__qualname__}__{type}_order'
        order: Order = getattr(self, attr)
        if order:
            order.cancel()
        if price:
            kwargs = {'stop': price} if type == 'sl' else {'limit': price}
            order = self.__broker.new_order(-self.size, trade=self, tag=self.tag, **kwargs)
            setattr(self, attr, order)


class _Broker:
    def __init__(self, *, data, cash, spread, commission, margin,
                 trade_on_close, hedging, exclusive_orders, index):
        assert cash > 0, f"cash should be > 0, is {cash}"
        assert 0 < margin <= 1, f"margin should be between 0 and 1, is {margin}"
        self._data: _Data = data
        self._cash = cash

        self._commission_spec = self._normalize_commission(commission)
        self._commission = self._commission_func

        self._spread = spread
        self._leverage = 1 / margin
        self._trade_on_close = trade_on_close
        self._hedging = hedging
        self._exclusive_orders = exclusive_orders

        self._equity = np.tile(np.nan, len(index))
        self.orders: list[Order] = []
        self.trades: list[Trade] = []
        self.position = (_Positions(self, data.symbols)
                         if self._is_multi_data
                         else Position(self))
        self.closed_trades: list[Trade] = []

    @property
    def _is_multi_data(self):
        return hasattr(self._data, 'symbols')

    @staticmethod
    def _validate_commission(commission):
        if callable(commission):
            return commission
        try:
            commission_fixed, commission_relative = commission
        except TypeError:
            commission_fixed, commission_relative = 0, commission
        assert commission_fixed >= 0, 'Need fixed cash commission in $ >= 0'
        assert -.1 <= commission_relative < .1, \
            ("commission should be between -10% "
             f"(e.g. market-maker's rebates) and 10% (fees), is {commission_relative}")
        return commission_fixed, commission_relative

    def _normalize_commission(self, commission):
        if isinstance(commission, Mapping):
            return {symbol: self._validate_commission(spec)
                    for symbol, spec in commission.items()}
        return self._validate_commission(commission)

    def _commission_func(self, order_size, price, symbol=None):
        spec = self._commission_spec
        if isinstance(spec, Mapping):
            try:
                spec = spec[symbol]
            except KeyError:
                raise KeyError(f"No commission configured for symbol {symbol!r}") from None

        if callable(spec):
            return spec(order_size, price)

        commission_fixed, commission_relative = spec
        return commission_fixed + abs(order_size) * price * commission_relative

    def __repr__(self):
        return f'<Broker: {self._cash:.0f}{self.position.pl:+.1f} ({len(self.trades)} trades)>'

    def _normalize_symbol(self, symbol):
        if not self._is_multi_data:
            if symbol is not None:
                raise ValueError('Single-asset Backtest orders do not take a symbol')
            return None
        if symbol is None:
            raise ValueError('Multi-asset orders require a symbol, e.g. self.buy("AAPL")')
        if symbol not in self._data.symbols:
            raise KeyError(f"Symbol {symbol!r} not in data")
        return symbol

    def _data_for_symbol(self, symbol=None):
        symbol = self._normalize_symbol(symbol) if self._is_multi_data else symbol
        return self._data[symbol] if self._is_multi_data else self._data

    def _spread_for(self, symbol=None):
        if isinstance(self._spread, Mapping):
            try:
                return self._spread[symbol]
            except KeyError:
                raise KeyError(f"No spread configured for symbol {symbol!r}") from None
        return self._spread

    def new_order(self,
                  size: float,
                  limit: Optional[float] = None,
                  stop: Optional[float] = None,
                  sl: Optional[float] = None,
                  tp: Optional[float] = None,
                  tag: object = None,
                  *,
                  trade: Trade | None = None,
                  symbol=None) -> Order:
        """
        Argument size indicates whether the order is long or short
        """
        symbol = trade.symbol if trade and symbol is None else self._normalize_symbol(symbol)
        size = float(size)
        stop = stop and float(stop)
        limit = limit and float(limit)
        sl = sl and float(sl)
        tp = tp and float(tp)

        is_long = size > 0
        assert size != 0, size
        adjusted_price = self._adjusted_price(size, symbol=symbol)

        if is_long:
            if not (sl or -np.inf) < (limit or stop or adjusted_price) < (tp or np.inf):
                raise ValueError(
                    "Long orders require: "
                    f"SL ({sl}) < LIMIT ({limit or stop or adjusted_price}) < TP ({tp})")
        else:
            if not (tp or -np.inf) < (limit or stop or adjusted_price) < (sl or np.inf):
                raise ValueError(
                    "Short orders require: "
                    f"TP ({tp}) < LIMIT ({limit or stop or adjusted_price}) < SL ({sl})")

        order = Order(self, size, limit, stop, sl, tp, trade, tag, symbol=symbol)

        if not trade:
            # If exclusive orders (each new order auto-closes previous orders/position),
            # cancel all non-contingent orders and close all open trades beforehand
            if self._exclusive_orders:
                for o in self.orders:
                    if not o.is_contingent and o.symbol == symbol:
                        o.cancel()
                for t in self.trades:
                    if t.symbol == symbol:
                        t.close()

        # Put the new order in the order queue, Ensure SL orders are processed first
        self.orders.insert(0 if trade and stop else len(self.orders), order)

        return order

    @property
    def last_price(self) -> float:
        """ Price at the last (current) close. """
        return self.last_price_for(None)

    def last_price_for(self, symbol=None) -> float:
        """Price at the last (current) close for `symbol`."""
        return self._data_for_symbol(symbol).Close[-1]

    def _adjusted_price(self, size=None, price=None, symbol=None) -> float:
        """
        Long/short `price`, adjusted for spread.
        In long positions, the adjusted price is a fraction higher, and vice versa.
        """
        price = self.last_price_for(symbol) if price is None else price
        return price * (1 + copysign(self._spread_for(symbol), size))

    def _order_required_margin(self, size, adjusted_price, price, symbol=None) -> float:
        """Margin consumed by an entry, including commissions and immediate spread loss."""
        commission = self._commission(size, adjusted_price, symbol)
        immediate_pl = size * (price - adjusted_price)
        return abs(size) * price / self._leverage + commission - immediate_pl

    def _prices_for_field(self, field: str, offset: int = -1) -> dict:
        if self._is_multi_data:
            return {
                symbol: getattr(self._data[symbol], field)[offset]
                for symbol in self._data.symbols
            }
        return {None: getattr(self._data, field)[offset]}

    def _order_valuation_prices(self, order, price, is_market_order) -> dict:
        if is_market_order and self._trade_on_close and not order.is_contingent:
            return self._prices_for_field('Close', -2)
        prices = self._prices_for_field('Open')
        if not is_market_order:
            prices[order.symbol] = price
        return prices

    @staticmethod
    def _price_from_mapping(prices, symbol):
        if prices is not None and symbol in prices:
            return prices[symbol]
        return None

    def _trade_pl_at(self, trade, prices=None) -> float:
        price = trade.exit_price or self._price_from_mapping(prices, trade.symbol)
        price = self.last_price_for(trade.symbol) if price is None else price
        return (trade.size * (price - trade.entry_price)) - trade._commissions

    def _trade_value_at(self, trade, prices=None) -> float:
        price = trade.exit_price or self._price_from_mapping(prices, trade.symbol)
        price = self.last_price_for(trade.symbol) if price is None else price
        return abs(trade.size) * price

    def _equity_at(self, prices=None) -> float:
        return self._cash + sum(self._trade_pl_at(trade, prices) for trade in self.trades)

    def _margin_available_at(self, prices=None) -> float:
        margin_used = sum(self._trade_value_at(trade, prices) / self._leverage
                          for trade in self.trades)
        return max(0, self._equity_at(prices) - margin_used)

    def _fractional_order_size(self, size, adjusted_price, price, symbol=None,
                               margin_available=None) -> int:
        """Convert a fractional order into whole units under spread/commission costs."""
        assert -1 < size < 1 and size != 0
        margin_available = self.margin_available if margin_available is None else margin_available
        fraction = abs(size)
        if np.isclose(fraction, 1, rtol=0, atol=sys.float_info.epsilon * 2):
            fraction = 1
        budget = margin_available * fraction
        if not np.isfinite(budget) or budget <= 0 or price <= 0 or adjusted_price <= 0:
            return 0

        sign = copysign(1, size)
        unit_required = self._order_required_margin(int(sign), adjusted_price, price, symbol)
        if unit_required <= 0:
            hi = max(1, int(budget * self._leverage // price))
        else:
            hi = max(1, int(budget // unit_required))
        lo = 0
        while True:
            signed_hi = int(sign * hi)
            required = self._order_required_margin(signed_hi, adjusted_price, price, symbol)
            if required > budget or hi >= sys.maxsize // 2:
                break
            lo, hi = hi, hi * 2
        while lo < hi:
            mid = (lo + hi + 1) // 2
            signed_mid = int(sign * mid)
            required = self._order_required_margin(signed_mid, adjusted_price, price, symbol)
            if required <= budget:
                lo = mid
            else:
                hi = mid - 1
        return int(sign * lo)

    def _opposite_trade_margin(self, order, price) -> float:
        if self._hedging:
            return 0
        margin = 0
        for trade in self.trades:
            if trade.symbol != order.symbol:
                continue
            if trade.is_long == order.is_long:
                continue
            margin += abs(trade.size) * price / self._leverage
        return margin

    def close_all_trades_at_final_close(self):
        """Close all open trades at their symbol's final close and update final equity."""
        if not len(self._data):
            return
        time_index = len(self._data) - 1
        for trade in reversed(list(self.trades)):
            price = self._data_for_symbol(trade.symbol).Close[-1]
            self._close_trade(trade, price, time_index)
        self._equity[time_index] = self.equity

    @property
    def equity(self) -> float:
        return self._cash + sum(trade.pl for trade in self.trades)

    @property
    def margin_available(self) -> float:
        # From https://github.com/QuantConnect/Lean/pull/3768
        margin_used = sum(trade.value / self._leverage for trade in self.trades)
        return max(0, self.equity - margin_used)

    def next(self):
        i = self._i = len(self._data) - 1
        self._process_orders()

        # Log account equity for the equity curve
        equity = self.equity
        self._equity[i] = equity

        # If equity is negative, set all to 0 and stop the simulation
        if equity <= 0:
            assert self.margin_available <= 0
            for trade in list(self.trades):
                self._close_trade(trade, self._data_for_symbol(trade.symbol).Close[-1], i)
            self._cash = 0
            self._equity[i:] = 0
            raise _OutOfMoneyError

    def _process_orders(self):
        reprocess_orders = False
        portfolio_sizing_margin = None

        # Process orders
        for order in list(self.orders):  # type: Order
            data = self._data_for_symbol(order.symbol)
            open, high, low = data.Open[-1], data.High[-1], data.Low[-1]

            # Related SL/TP order was already removed
            if order not in self.orders:
                continue

            # Check if stop condition was hit
            stop_price = order.stop
            if stop_price:
                is_stop_hit = ((high >= stop_price) if order.is_long else (low <= stop_price))
                if not is_stop_hit:
                    continue

                # > When the stop price is reached, a stop order becomes a market/limit order.
                # https://www.sec.gov/fast-answers/answersstopordhtm.html
                order._replace(stop_price=None)

            # Determine purchase price.
            # Check if limit order can be filled.
            if order.limit:
                is_limit_hit = low <= order.limit if order.is_long else high >= order.limit
                # When stop and limit are hit within the same bar, we pessimistically
                # assume limit was hit before the stop (i.e. "before it counts")
                is_limit_hit_before_stop = (is_limit_hit and
                                            (order.limit <= (stop_price or -np.inf)
                                             if order.is_long
                                             else order.limit >= (stop_price or np.inf)))
                if not is_limit_hit or is_limit_hit_before_stop:
                    continue

                # stop_price, if set, was hit within this bar
                price = (min(stop_price or open, order.limit)
                         if order.is_long else
                         max(stop_price or open, order.limit))
            else:
                # Market-if-touched / market order
                # Contingent orders always on next open
                prev_close = data.Close[-2]
                price = prev_close if self._trade_on_close and not order.is_contingent else open
                if stop_price:
                    price = max(price, stop_price) if order.is_long else min(price, stop_price)

            # Determine entry/exit bar index
            is_market_order = not order.limit and not stop_price
            time_index = (
                (self._i - 1)
                if is_market_order and self._trade_on_close and not order.is_contingent else
                self._i)

            valuation_prices = self._order_valuation_prices(order, price, is_market_order)

            # If order is a SL/TP order, it should close an existing trade it was contingent upon
            if order.parent_trade:
                trade = order.parent_trade
                _prev_size = trade.size
                # If order.size is "greater" than trade.size, this order is a trade.close()
                # order and part of the trade was already closed beforehand
                size = copysign(min(abs(_prev_size), abs(order.size)), order.size)
                # If this trade isn't already closed (e.g. on multiple `trade.close(.5)` calls)
                if trade in self.trades:
                    self._reduce_trade(trade, price, size, time_index)
                    assert order.size != -_prev_size or trade not in self.trades
                    if price == stop_price:
                        # Set SL back on the order for stats._trades["SL"]
                        trade._sl_order._replace(stop_price=stop_price)
                if order in (trade._sl_order,
                             trade._tp_order):
                    assert order.size == -trade.size
                    assert order not in self.orders  # Removed when trade was closed
                else:
                    # It's a trade.close() order, now done
                    assert abs(_prev_size) >= abs(size) >= 1
                    self.orders.remove(order)
                portfolio_sizing_margin = None
                continue

            # Else this is a stand-alone trade

            # Adjust price for bid-ask spread.
            # In long positions, the adjusted price is a fraction higher, and vice versa.
            adjusted_price = self._adjusted_price(order.size, price, symbol=order.symbol)

            # If order size was specified proportionally,
            # precompute true size in units, accounting for margin and spread/commissions.
            # Portfolio backtests size same-bar fractional orders from the margin snapshot
            # at the start of order processing so equal-weight orders are not distorted
            # by symbol iteration order.
            size = order.size
            if -1 < size < 1:
                if self._is_multi_data:
                    if portfolio_sizing_margin is None:
                        portfolio_sizing_margin = self._margin_available_at(
                            valuation_prices)
                    sizing_margin = portfolio_sizing_margin
                else:
                    sizing_margin = self._margin_available_at(valuation_prices)
                sizing_margin += self._opposite_trade_margin(order, price)
                size = self._fractional_order_size(size, adjusted_price, price,
                                                   order.symbol, sizing_margin)
                # Not enough cash/margin even for a single unit
                if not size:
                    warnings.warn(
                        f'time={self._i}: Broker canceled the relative-sized order due to '
                        'insufficient margin '
                        f'(equity={self.equity:.2f}, '
                        f'margin_available={self.margin_available:.2f}).',
                        category=UserWarning,
                        stacklevel=2)
                    # XXX: The order is canceled by the broker?
                    self.orders.remove(order)
                    continue
            assert size == round(size)
            need_size = int(size)

            closed_opposite = False
            if not self._hedging:
                # Fill position by FIFO closing/reducing existing opposite-facing trades.
                # Existing trades are closed at unadjusted price, because the adjustment
                # was already made when buying.
                for trade in list(self.trades):
                    if trade.symbol != order.symbol:
                        continue
                    if trade.is_long == order.is_long:
                        continue
                    assert trade.size * order.size < 0

                    # Order size greater than this opposite-directed existing trade,
                    # so it will be closed completely
                    if abs(need_size) >= abs(trade.size):
                        self._close_trade(trade, price, time_index)
                        closed_opposite = True
                        need_size += trade.size
                    else:
                        # The existing trade is larger than the new order,
                        # so it will only be closed partially
                        self._reduce_trade(trade, price, need_size, time_index)
                        closed_opposite = True
                        need_size = 0

                    if not need_size:
                        break

            # If we don't have enough liquidity to cover for the residual opening
            # size, the broker CANCELS it.
            if need_size:
                required_margin = self._order_required_margin(
                    need_size, adjusted_price, price, order.symbol)
                if required_margin > self._margin_available_at(valuation_prices):
                    warnings.warn(
                        f'time={self._i}: Broker canceled the order due to insufficient margin '
                        f'(equity={self.equity:.2f}, '
                        f'margin_available={self.margin_available:.2f}).',
                        category=UserWarning,
                        stacklevel=2)
                    self.orders.remove(order)
                    continue

            # Open a new trade
            if need_size:
                self._open_trade(adjusted_price,
                                 need_size,
                                 order.sl,
                                 order.tp,
                                 time_index,
                                 order.tag,
                                 order.symbol)

                # We need to reprocess the SL/TP orders newly added to the queue.
                # This allows e.g. SL hitting in the same bar the order was open.
                # See https://github.com/kernc/backtesting.py/issues/119
                if order.sl or order.tp:
                    if is_market_order:
                        reprocess_orders = True
                    # Order.stop and TP hit within the same bar, but SL wasn't. This case
                    # is not ambiguous, because stop and TP go in the same price direction.
                    elif stop_price and not order.limit and order.tp and (
                            (order.is_long and order.tp <= high and (order.sl or -np.inf) < low) or
                            (order.is_short and order.tp >= low and (order.sl or np.inf) > high)):
                        reprocess_orders = True
                    elif (low <= (order.sl or -np.inf) <= high or
                          low <= (order.tp or -np.inf) <= high):
                        warnings.warn(
                            f"({data.index[-1]}) A contingent SL/TP order would execute in the "
                            "same bar its parent stop/limit order was turned into a trade. "
                            "Since we can't assert the precise intra-candle "
                            "price movement, the affected SL/TP order will instead be executed on "
                            "the next (matching) price/bar, making the result (of this trade) "
                            "somewhat dubious. "
                            "See https://github.com/kernc/backtesting.py/issues/119",
                            UserWarning)

            if closed_opposite:
                portfolio_sizing_margin = None

            # Order processed
            self.orders.remove(order)

        if reprocess_orders:
            self._process_orders()

    def _reduce_trade(self, trade: Trade, price: float, size: float, time_index: int):
        assert trade.size * size < 0
        assert abs(trade.size) >= abs(size)

        size_left = trade.size + size
        assert size_left * trade.size >= 0
        if not size_left:
            close_trade = trade
        else:
            # Reduce existing trade ...
            trade._replace(size=size_left)
            if trade._sl_order:
                trade._sl_order._replace(size=-trade.size)
            if trade._tp_order:
                trade._tp_order._replace(size=-trade.size)

            # ... by closing a reduced copy of it
            close_trade = trade._copy(size=-size, sl_order=None, tp_order=None)
            self.trades.append(close_trade)

        self._close_trade(close_trade, price, time_index)

    def _close_trade(self, trade: Trade, price: float, time_index: int):
        self.trades.remove(trade)
        if trade._sl_order:
            self.orders.remove(trade._sl_order)
        if trade._tp_order:
            self.orders.remove(trade._tp_order)

        closed_trade = trade._replace(exit_price=price, exit_bar=time_index)
        self.closed_trades.append(closed_trade)
        # Apply commission one more time at trade exit
        commission = self._commission(trade.size, price, trade.symbol)
        self._cash += trade.pl - commission
        # Save commissions on Trade instance for stats
        trade_open_commission = self._commission(
            closed_trade.size, closed_trade.entry_price, trade.symbol)
        # applied here instead of on Trade open because size could have changed
        # by way of _reduce_trade()
        closed_trade._commissions = commission + trade_open_commission

    def _open_trade(self, price: float, size: int,
                    sl: float | None, tp: float | None, time_index: int, tag, symbol=None):
        trade = Trade(self, size, price, time_index, tag, symbol=symbol)
        self.trades.append(trade)
        # Apply broker commission at trade open
        self._cash -= self._commission(size, price, symbol)
        # Create SL/TP (bracket) orders.
        if tp:
            trade.tp = tp
        if sl:
            trade.sl = sl


class Backtest:
    """
    Backtest a particular (parameterized) strategy
    on particular data.

    Initialize a backtest. Requires data and a strategy to test.
    After initialization, you can call method
    `backtesting.backtesting.Backtest.run` to run a backtest
    instance, or `backtesting.backtesting.Backtest.optimize` to
    optimize it.

    `data` is a `pd.DataFrame` with columns:
    `Open`, `High`, `Low`, `Close`, and (optionally) `Volume`.
    If any columns are missing, set them to what you have available,
    e.g.

        df['Open'] = df['High'] = df['Low'] = df['Close']

    The passed data frame can contain additional columns that
    can be used by the strategy (e.g. sentiment info).
    DataFrame index can be either a datetime index (timestamps)
    or a monotonic range index (i.e. a sequence of periods).

    `strategy` is a `backtesting.backtesting.Strategy`
    _subclass_ (not an instance).

    `cash` is the initial cash to start with.

    `spread` is the constant bid-ask spread rate (relative to the price).
    E.g. set it to `0.0002` for commission-less forex
    trading where the average spread is roughly 0.2‰ of the asking price.

    `commission` is the commission rate. E.g. if your broker's commission
    is 1% of order value, set commission to `0.01`.
    The commission is applied twice: at trade entry and at trade exit.
    Besides one single floating value, `commission` can also be a tuple of floating
    values `(fixed, relative)`. E.g. set it to `(100, .01)`
    if your broker charges minimum $100 + 1%.
    Additionally, `commission` can be a callable
    `func(order_size: int, price: float) -> float`
    (note, order size is negative for short orders),
    which can be used to model more complex commission structures.
    Negative commission values are interpreted as market-maker's rebates.

    .. note::
        Before v0.4.0, the commission was only applied once, like `spread` is now.
        If you want to keep the old behavior, simply set `spread` instead.

    .. note::
        With nonzero `commission`, long and short orders will be placed
        at an adjusted price that is slightly higher or lower (respectively)
        than the current price. See e.g.
        [#153](https://github.com/kernc/backtesting.py/issues/153),
        [#538](https://github.com/kernc/backtesting.py/issues/538),
        [#633](https://github.com/kernc/backtesting.py/issues/633).

    `margin` is the required margin (ratio) of a leveraged account.
    No difference is made between initial and maintenance margins.
    To run the backtest using e.g. 50:1 leverage that your broker allows,
    set margin to `0.02` (1 / leverage).

    If `trade_on_close` is `True`, market orders will be filled
    with respect to the current bar's closing price instead of the
    next bar's open.

    If `hedging` is `True`, allow trades in both directions simultaneously.
    If `False`, the opposite-facing orders first close existing trades in
    a [FIFO] manner.

    If `exclusive_orders` is `True`, each new order auto-closes the previous
    trade/position, making at most a single trade (long or short) in effect
    at each time.

    If `finalize_trades` is `True`, the trades that are still
    [active and ongoing] at the end of the backtest will be closed on
    the last bar and will contribute to the computed backtest statistics.

    .. tip:: Fractional trading
        See also `backtesting.lib.FractionalBacktest` if you want to trade
        fractional units (of e.g. bitcoin).

    [FIFO]: https://www.investopedia.com/terms/n/nfa-compliance-rule-2-43b.asp
    [active and ongoing]: https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html#backtesting.backtesting.Strategy.trades
    """  # noqa: E501
    def __init__(self,
                 data: pd.DataFrame,
                 strategy: type[Strategy],
                 *,
                 cash: float = 10_000,
                 spread: float = .0,
                 commission: Union[float, tuple[float, float]] = .0,
                 margin: float = 1.,
                 trade_on_close=False,
                 hedging=False,
                 exclusive_orders=False,
                 finalize_trades=False,
                 ):
        if not (isinstance(strategy, type) and issubclass(strategy, Strategy)):
            raise TypeError('`strategy` must be a Strategy sub-type')
        if not isinstance(data, pd.DataFrame):
            raise TypeError("`data` must be a pandas.DataFrame with columns")
        if not isinstance(spread, Number):
            raise TypeError('`spread` must be a float value, percent of '
                            'entry order price')
        if not isinstance(commission, (Number, tuple)) and not callable(commission):
            raise TypeError('`commission` must be a float percent of order value, '
                            'a tuple of `(fixed, relative)` commission, '
                            'or a function that takes `(order_size, price)`'
                            'and returns commission dollar value')

        data = data.copy(deep=False)

        # Convert index to datetime index
        if (not isinstance(data.index, pd.DatetimeIndex) and
            not isinstance(data.index, pd.RangeIndex) and
            # Numeric index with most large numbers
            (data.index.is_numeric() and
             (data.index > pd.Timestamp('1975').timestamp()).mean() > .8)):
            try:
                data.index = pd.to_datetime(data.index, infer_datetime_format=True)
            except ValueError:
                pass

        if 'Volume' not in data:
            data['Volume'] = np.nan

        if len(data) == 0:
            raise ValueError('OHLC `data` is empty')
        if len(data.columns.intersection({'Open', 'High', 'Low', 'Close', 'Volume'})) != 5:
            raise ValueError("`data` must be a pandas.DataFrame with columns "
                             "'Open', 'High', 'Low', 'Close', and (optionally) 'Volume'")
        if data[['Open', 'High', 'Low', 'Close']].isnull().values.any():
            raise ValueError('Some OHLC values are missing (NaN). '
                             'Please strip those lines with `df.dropna()` or '
                             'fill them in with `df.interpolate()` or whatever.')
        if np.any(data['Close'] > cash):
            warnings.warn('Some prices are larger than initial cash value. Note that fractional '
                          'trading is not supported by this class. If you want to trade Bitcoin, '
                          'increase initial cash, or trade μBTC or satoshis instead (see e.g. class '
                          '`backtesting.lib.FractionalBacktest`.',
                          stacklevel=2)
        if not data.index.is_monotonic_increasing:
            warnings.warn('Data index is not sorted in ascending order. Sorting.',
                          stacklevel=2)
            data = data.sort_index()
        if not isinstance(data.index, pd.DatetimeIndex):
            warnings.warn('Data index is not datetime. Assuming simple periods, '
                          'but `pd.DateTimeIndex` is advised.',
                          stacklevel=2)

        self._data: pd.DataFrame = data
        self._broker = partial(
            _Broker, cash=cash, spread=spread, commission=commission, margin=margin,
            trade_on_close=trade_on_close, hedging=hedging,
            exclusive_orders=exclusive_orders, index=data.index,
        )
        self._strategy = strategy
        self._results: pd.Series | None = None
        self._finalize_trades = bool(finalize_trades)

    def run(self, **kwargs) -> pd.Series:
        """
        Run the backtest. Returns `pd.Series` with results and statistics.

        Keyword arguments are interpreted as strategy parameters.

            >>> Backtest(GOOG, SmaCross).run()
            Start                     2004-08-19 00:00:00
            End                       2013-03-01 00:00:00
            Duration                   3116 days 00:00:00
            Exposure Time [%]                    96.74115
            Equity Final [$]                     51422.99
            Equity Peak [$]                      75787.44
            Return [%]                           414.2299
            Buy & Hold Return [%]               703.45824
            Return (Ann.) [%]                    21.18026
            Volatility (Ann.) [%]                36.49391
            CAGR [%]                             14.15984
            Sharpe Ratio                          0.58038
            Sortino Ratio                         1.08479
            Calmar Ratio                          0.44144
            Alpha [%]                           394.37391
            Beta                                  0.03803
            Max. Drawdown [%]                   -47.98013
            Avg. Drawdown [%]                    -5.92585
            Max. Drawdown Duration      584 days 00:00:00
            Avg. Drawdown Duration       41 days 00:00:00
            # Trades                                   66
            Win Rate [%]                          46.9697
            Best Trade [%]                       53.59595
            Worst Trade [%]                     -18.39887
            Avg. Trade [%]                        2.53172
            Max. Trade Duration         183 days 00:00:00
            Avg. Trade Duration          46 days 00:00:00
            Profit Factor                         2.16795
            Expectancy [%]                        3.27481
            SQN                                   1.07662
            Kelly Criterion                       0.15187
            _strategy                            SmaCross
            _equity_curve                           Eq...
            _trades                       Size  EntryB...
            dtype: object

        .. warning::
            You may obtain different results for different strategy parameters.
            E.g. if you use 50- and 200-bar SMA, the trading simulation will
            begin on bar 201. The actual length of delay is equal to the lookback
            period of the `Strategy.I` indicator which lags the most.
            Obviously, this can affect results.
        """
        data = _Data(self._data.copy(deep=False))
        broker: _Broker = self._broker(data=data)
        strategy: Strategy = self._strategy(broker, data, kwargs)

        strategy.init()
        data._update()  # Strategy.init might have changed/added to data.df

        # Indicators used in Strategy.next()
        indicator_attrs = _strategy_indicator_specs(strategy)

        # Skip first few candles where indicators are still "warming up"
        # +1 to have at least two entries available
        start = 1 + _indicator_warmup_nbars(strategy)

        # Disable "invalid value encountered in ..." warnings. Comparison
        # np.nan >= 3 is not invalid; it's False.
        with np.errstate(invalid='ignore'):

            for i in _tqdm(range(start, len(self._data)), desc=self.run.__qualname__,
                           unit='bar', mininterval=2, miniters=100):
                # Prepare data and indicators for `next` call
                data._set_length(i + 1)
                for _attr, indicator, set_indicator in indicator_attrs:
                    # Slice indicator on the last dimension (case of 2d indicator)
                    set_indicator(indicator[..., :i + 1])

                # Handle orders processing and broker stuff
                try:
                    broker.next()
                except _OutOfMoneyError:
                    break

                # Next tick, a moment before bar close
                strategy.next()
            else:
                if self._finalize_trades is True:
                    # Close any remaining open trades at the final close so
                    # reported trade statistics reflect end-of-backtest liquidation.
                    broker.close_all_trades_at_final_close()
                elif len(broker.trades):
                    warnings.warn(
                        'Some trades remain open at the end of backtest. Use '
                        '`Backtest(..., finalize_trades=True)` to close them and '
                        'include them in stats.', stacklevel=2)

            # Set data back to full length
            # for future `indicator._opts['data'].index` calls to work
            data._set_length(len(self._data))

            equity = pd.Series(broker._equity).bfill().fillna(broker._cash).values
            self._results = compute_stats(
                trades=broker.closed_trades,
                equity=equity,
                ohlc_data=self._data,
                risk_free_rate=0.0,
                strategy_instance=strategy,
            )

        return self._results

    def optimize(self, *,
                 maximize: Union[str, Callable[[pd.Series], float]] = 'SQN',
                 method: str = 'grid',
                 max_tries: Optional[Union[int, float]] = None,
                 constraint: Optional[Callable[[dict], bool]] = None,
                 return_heatmap: bool = False,
                 return_optimization: bool = False,
                 random_state: Optional[int] = None,
                 **kwargs) -> Union[pd.Series,
                                    tuple[pd.Series, pd.Series],
                                    tuple[pd.Series, pd.Series, dict]]:
        """
        Optimize strategy parameters to an optimal combination.
        Returns result `pd.Series` of the best run.

        `maximize` is a string key from the
        `backtesting.backtesting.Backtest.run`-returned results series,
        or a function that accepts this series object and returns a number;
        the higher the better. By default, the method maximizes
        Van Tharp's [System Quality Number](https://google.com/search?q=System+Quality+Number).

        `method` is the optimization method. Currently two methods are supported:

        * `"grid"` which does an exhaustive (or randomized) search over the
          cartesian product of parameter combinations, and
        * `"sambo"` which finds close-to-optimal strategy parameters using
          [model-based optimization], making at most `max_tries` evaluations.

        [model-based optimization]: https://sambo-optimization.github.io

        `max_tries` is the maximal number of strategy runs to perform.
        If `method="grid"`, this results in randomized grid search.
        If `max_tries` is a floating value between (0, 1], this sets the
        number of runs to approximately that fraction of full grid space.
        Alternatively, if integer, it denotes the absolute maximum number
        of evaluations. If unspecified (default), grid search is exhaustive,
        whereas for `method="sambo"`, `max_tries` is set to 200.

        `constraint` is a function that accepts a dict-like object of
        parameters (with values) and returns `True` when the combination
        is admissible to test with. By default, any parameters combination
        is considered admissible.

        If `return_heatmap` is `True`, besides returning the result
        series, an additional `pd.Series` is returned with a multiindex
        of all admissible parameter combinations, which can be further
        inspected or projected onto 2D to plot a heatmap
        (see `backtesting.lib.plot_heatmaps()`).

        If `return_optimization` is True and `method = 'sambo'`,
        in addition to result series (and maybe heatmap), return raw
        [`scipy.optimize.OptimizeResult`][OptimizeResult] for further
        inspection, e.g. with [SAMBO]'s [plotting tools].

        [OptimizeResult]: https://sambo-optimization.github.io/doc/sambo/#sambo.OptimizeResult
        [SAMBO]: https://sambo-optimization.github.io
        [plotting tools]: https://sambo-optimization.github.io/doc/sambo/plot.html

        If you want reproducible optimization results, set `random_state`
        to a fixed integer random seed.

        Additional keyword arguments represent strategy arguments with
        list-like collections of possible values. For example, the following
        code finds and returns the "best" of the 7 admissible (of the
        9 possible) parameter combinations:

            best_stats = backtest.optimize(sma1=[5, 10, 15], sma2=[10, 20, 40],
                                           constraint=lambda p: p.sma1 < p.sma2)
        """
        if not kwargs:
            raise ValueError('Need some strategy parameters to optimize')

        maximize_key = None
        if isinstance(maximize, str):
            maximize_key = str(maximize)
            if maximize not in dummy_stats().index:
                raise ValueError('`maximize`, if str, must match a key in pd.Series '
                                 'result of backtest.run()')

            def maximize(stats: pd.Series, _key=maximize):
                return stats[_key]

        elif not callable(maximize):
            raise TypeError('`maximize` must be str (a field of backtest.run() result '
                            'Series) or a function that accepts result Series '
                            'and returns a number; the higher the better')
        assert callable(maximize), maximize

        have_constraint = bool(constraint)
        if constraint is None:

            def constraint(_):
                return True

        elif not callable(constraint):
            raise TypeError("`constraint` must be a function that accepts a dict "
                            "of strategy parameters and returns a bool whether "
                            "the combination of parameters is admissible or not")
        assert callable(constraint), constraint

        if method == 'skopt':
            method = 'sambo'
            warnings.warn('`Backtest.optimize(method="skopt")` is deprecated. Use `method="sambo"`.',
                          DeprecationWarning, stacklevel=2)
        if return_optimization and method != 'sambo':
            raise ValueError("return_optimization=True only valid if method='sambo'")

        def _tuple(x):
            return x if isinstance(x, Sequence) and not isinstance(x, str) else (x,)

        for k, v in kwargs.items():
            if len(_tuple(v)) == 0:
                raise ValueError(f"Optimization variable '{k}' is passed no "
                                 f"optimization values: {k}={v}")

        class AttrDict(dict):
            def __getattr__(self, item):
                return self[item]

        def _grid_size():
            size = int(np.prod([len(_tuple(v)) for v in kwargs.values()]))
            if size < 10_000 and have_constraint:
                size = sum(1 for p in product(*(zip(repeat(k), _tuple(v))
                                                for k, v in kwargs.items()))
                           if constraint(AttrDict(p)))
            return size

        def _optimize_grid() -> Union[pd.Series, tuple[pd.Series, pd.Series]]:
            rand = default_rng(random_state).random
            grid_frac = (1 if max_tries is None else
                         max_tries if 0 < max_tries <= 1 else
                         max_tries / _grid_size())
            param_combos = [dict(params)  # back to dict so it pickles
                            for params in (AttrDict(params)
                                           for params in product(*(zip(repeat(k), _tuple(v))
                                                                   for k, v in kwargs.items())))
                            if constraint(params)
                            and rand() <= grid_frac]
            if not param_combos:
                raise ValueError('No admissible parameter combinations to test')

            if len(param_combos) > 300:
                warnings.warn(f'Searching for best of {len(param_combos)} configurations.',
                              stacklevel=2)

            heatmap = pd.Series(np.nan,
                                name=maximize_key,
                                index=pd.MultiIndex.from_tuples(
                                    [p.values() for p in param_combos],
                                    names=next(iter(param_combos)).keys()))

            from . import Pool
            with Pool() as pool, \
                    SharedMemoryManager() as smm:
                with patch(self, '_data', None):
                    bt = copy(self)  # bt._data will be reassigned in _mp_task worker
                results = _tqdm(
                    pool.imap(Backtest._mp_task,
                              ((bt, smm.df2shm(self._data), params_batch)
                               for params_batch in _batch(param_combos))),
                    total=len(param_combos),
                    desc='Backtest.optimize'
                )
                for param_batch, result in zip(_batch(param_combos), results):
                    for params, stats in zip(param_batch, result):
                        if stats is not None:
                            heatmap[tuple(params.values())] = maximize(stats)

            if pd.isnull(heatmap).all():
                # No trade was made in any of the runs. Just make a random
                # run so we get some, if empty, results
                stats = self.run(**param_combos[0])
            else:
                best_params = heatmap.idxmax(skipna=True)
                stats = self.run(**dict(zip(heatmap.index.names, best_params)))

            if return_heatmap:
                return stats, heatmap
            return stats

        def _optimize_sambo() -> Union[pd.Series,
                                       tuple[pd.Series, pd.Series],
                                       tuple[pd.Series, pd.Series, dict]]:
            try:
                import sambo
            except ImportError:
                raise ImportError("Need package 'sambo' for method='sambo'. pip install sambo") from None

            nonlocal max_tries
            max_tries = (200 if max_tries is None else
                         max(1, int(max_tries * _grid_size())) if 0 < max_tries <= 1 else
                         max_tries)

            dimensions = []
            for key, values in kwargs.items():
                values = np.asarray(values)
                if values.dtype.kind in 'mM':  # timedelta, datetime64
                    # these dtypes are unsupported in SAMBO, so convert to raw int
                    # TODO: save dtype and convert back later
                    values = values.astype(np.int64)

                if values.dtype.kind in 'iumM':
                    dimensions.append((values.min(), values.max() + 1))
                elif values.dtype.kind == 'f':
                    dimensions.append((values.min(), values.max()))
                else:
                    dimensions.append(values.tolist())

            # Avoid recomputing re-evaluations
            @lru_cache()
            def memoized_run(tup):
                nonlocal maximize, self
                stats = self.run(**dict(tup))
                return -maximize(stats)

            progress = iter(_tqdm(repeat(None), total=max_tries, leave=False,
                                  desc=self.optimize.__qualname__, mininterval=2))
            _names = tuple(kwargs.keys())

            def objective_function(x):
                nonlocal progress, memoized_run, constraint, _names
                next(progress)
                value = memoized_run(tuple(zip(_names, x)))
                return 0 if np.isnan(value) else value

            def cons(x):
                nonlocal constraint, _names
                return constraint(AttrDict(zip(_names, x)))

            res = sambo.minimize(
                fun=objective_function,
                bounds=dimensions,
                constraints=cons,
                max_iter=max_tries,
                method='sceua',
                rng=random_state)

            stats = self.run(**dict(zip(kwargs.keys(), res.x)))
            output = [stats]

            if return_heatmap:
                heatmap = pd.Series(dict(zip(map(tuple, res.xv), -res.funv)),
                                    name=maximize_key)
                heatmap.index.names = kwargs.keys()
                heatmap.sort_index(inplace=True)
                output.append(heatmap)

            if return_optimization:
                output.append(res)

            return stats if len(output) == 1 else tuple(output)

        if method == 'grid':
            output = _optimize_grid()
        elif method in ('sambo', 'skopt'):
            output = _optimize_sambo()
        else:
            raise ValueError(f"Method should be 'grid' or 'sambo', not {method!r}")
        return output

    @staticmethod
    def _mp_task(arg):
        bt, data_shm, params_batch = arg
        bt._data, shm = SharedMemoryManager.shm2df(data_shm)
        try:
            return [stats.filter(regex='^[^_]') if stats['# Trades'] else None
                    for stats in (bt.run(**params)
                                  for params in params_batch)]
        finally:
            for shmem in shm:
                shmem.close()

    def plot(self, *, results: pd.Series = None, filename=None, plot_width=None,
             plot_equity=True, plot_return=False, plot_pl=True,
             plot_volume=True, plot_drawdown=False, plot_trades=True,
             smooth_equity=False, relative_equity=True,
             superimpose: Union[bool, str] = True,
             resample=True, reverse_indicators=False,
             show_legend=True, open_browser=True):
        """
        Plot the progression of the last backtest run.

        If `results` is provided, it should be a particular result
        `pd.Series` such as returned by
        `backtesting.backtesting.Backtest.run` or
        `backtesting.backtesting.Backtest.optimize`, otherwise the last
        run's results are used.

        `filename` is the path to save the interactive HTML plot to.
        By default, a strategy/parameter-dependent file is created in the
        current working directory.

        `plot_width` is the width of the plot in pixels. If None (default),
        the plot is made to span 100% of browser width. The height is
        currently non-adjustable.

        If `plot_equity` is `True`, the resulting plot will contain
        an equity (initial cash plus assets) graph section. This is the same
        as `plot_return` plus initial 100%.

        If `plot_return` is `True`, the resulting plot will contain
        a cumulative return graph section. This is the same
        as `plot_equity` minus initial 100%.

        If `plot_pl` is `True`, the resulting plot will contain
        a profit/loss (P/L) indicator section.

        If `plot_volume` is `True`, the resulting plot will contain
        a trade volume section.

        If `plot_drawdown` is `True`, the resulting plot will contain
        a separate drawdown graph section.

        If `plot_trades` is `True`, the stretches between trade entries
        and trade exits are marked by hash-marked tractor beams.

        If `smooth_equity` is `True`, the equity graph will be
        interpolated between fixed points at trade closing times,
        unaffected by any interim asset volatility.

        If `relative_equity` is `True`, scale and label equity graph axis
        with return percent, not absolute cash-equivalent values.

        If `superimpose` is `True`, superimpose larger-timeframe candlesticks
        over the original candlestick chart. Default downsampling rule is:
        monthly for daily data, daily for hourly data, hourly for minute data,
        and minute for (sub-)second data.
        `superimpose` can also be a valid [Pandas offset string],
        such as `'5T'` or `'5min'`, in which case this frequency will be
        used to superimpose.
        Note, this only works for data with a datetime index.

        If `resample` is `True`, the OHLC data is resampled in a way that
        makes the upper number of candles for Bokeh to plot limited to 10_000.
        This may, in situations of overabundant data,
        improve plot's interactive performance and avoid browser's
        `Javascript Error: Maximum call stack size exceeded` or similar.
        Equity & dropdown curves and individual trades data is,
        likewise, [reasonably _aggregated_][TRADES_AGG].
        `resample` can also be a [Pandas offset string],
        such as `'5T'` or `'5min'`, in which case this frequency will be
        used to resample, overriding above numeric limitation.
        Note, all this only works for data with a datetime index.

        If `reverse_indicators` is `True`, the indicators below the OHLC chart
        are plotted in reverse order of declaration.

        [Pandas offset string]: \
            https://pandas.pydata.org/pandas-docs/stable/user_guide/timeseries.html#dateoffset-objects

        [TRADES_AGG]: lib.html#backtesting.lib.TRADES_AGG

        If `show_legend` is `True`, the resulting plot graphs will contain
        labeled legends.

        If `open_browser` is `True`, the resulting `filename` will be
        opened in the default web browser.
        """
        if results is None:
            if self._results is None:
                raise RuntimeError('First issue `backtest.run()` to obtain results.')
            results = self._results

        return plot(
            results=results,
            df=self._data,
            indicators=results._strategy._indicators,
            filename=filename,
            plot_width=plot_width,
            plot_equity=plot_equity,
            plot_return=plot_return,
            plot_pl=plot_pl,
            plot_volume=plot_volume,
            plot_drawdown=plot_drawdown,
            plot_trades=plot_trades,
            smooth_equity=smooth_equity,
            relative_equity=relative_equity,
            superimpose=superimpose,
            resample=resample,
            reverse_indicators=reverse_indicators,
            show_legend=show_legend,
            open_browser=open_browser)


class PortfolioBacktest:
    """
    Backtest one strategy across multiple assets with shared cash and margin.

    `data` is a mapping of symbol to OHLCV data frame. All assets are aligned
    to a common index using an inner join by default. Within a strategy, access
    per-symbol data with `self.data["AAPL"].Close`, place orders with
    `self.buy("AAPL", size=...)`, and inspect positions with
    `self.position["AAPL"]`.
    """
    def __init__(self,
                 data: Mapping[str, pd.DataFrame],
                 strategy: type[Strategy],
                 *,
                 cash: float = 10_000,
                 spread: Union[float, Mapping[str, float]] = .0,
                 commission: Union[float, tuple[float, float], Mapping[str, object]] = .0,
                 margin: float = 1.,
                 trade_on_close=False,
                 hedging=False,
                 exclusive_orders=False,
                 finalize_trades=False,
                 align: str = 'inner',
                 ):
        if not (isinstance(strategy, type) and issubclass(strategy, Strategy)):
            raise TypeError('`strategy` must be a Strategy sub-type')
        if not isinstance(data, Mapping):
            raise TypeError('`data` must be a mapping of symbol to pandas.DataFrame')
        if not data:
            raise ValueError('`data` must contain at least one symbol')
        if align != 'inner':
            raise NotImplementedError("PortfolioBacktest currently supports align='inner' only")
        if not isinstance(spread, Number) and not isinstance(spread, Mapping):
            raise TypeError('`spread` must be a float value or a mapping by symbol')
        if not isinstance(commission, (Number, tuple, Mapping)) and not callable(commission):
            raise TypeError('`commission` must be a float, tuple, callable, or mapping by symbol')

        prepared: dict[str, pd.DataFrame] = {}
        for symbol, df in data.items():
            if not isinstance(symbol, str) or not symbol:
                raise TypeError('`data` keys must be non-empty symbol strings')
            prepared[symbol] = self._prepare_data(symbol, df)

        symbols = tuple(prepared)
        self._validate_symbol_mapping(spread, symbols, 'spread')
        self._validate_symbol_mapping(commission, symbols, 'commission')

        indexes = [df.index for df in prepared.values()]
        common_index = indexes[0]
        for index in indexes[1:]:
            common_index = common_index.intersection(index, sort=False)
        if common_index.empty:
            raise ValueError('Multi-asset data frames have no overlapping index values')

        dropped = {
            symbol: len(df.index.difference(common_index))
            for symbol, df in prepared.items()
        }
        if any(dropped.values()):
            detail = ', '.join(f'{symbol}={count}' for symbol, count in dropped.items() if count)
            warnings.warn(
                f"PortfolioBacktest align='inner' dropped rows outside the common index: {detail}.",
                UserWarning,
                stacklevel=2)

        self._data: dict[str, pd.DataFrame] = {
            symbol: df.loc[common_index].copy(deep=False)
            for symbol, df in prepared.items()
        }
        if any(np.any(df['Close'] > cash) for df in self._data.values()):
            warnings.warn('Some prices are larger than initial cash value. Note that fractional '
                          'trading is not supported by this class. Increase initial cash, '
                          'trade smaller units, or use FractionalBacktest-compatible data.',
                          stacklevel=2)
        self._broker = partial(
            _Broker, cash=cash, spread=spread, commission=commission, margin=margin,
            trade_on_close=trade_on_close, hedging=hedging,
            exclusive_orders=exclusive_orders, index=common_index,
        )
        self._strategy = strategy
        self._results: pd.Series | None = None
        self._finalize_trades = bool(finalize_trades)

    @staticmethod
    def _validate_symbol_mapping(value, symbols, name):
        if not isinstance(value, Mapping):
            return
        value_symbols = set(value)
        expected_symbols = set(symbols)
        unknown = value_symbols - expected_symbols
        missing = expected_symbols - value_symbols
        if unknown or missing:
            parts = []
            if unknown:
                parts.append(f"unknown symbols {sorted(unknown)!r}")
            if missing:
                parts.append(f"missing symbols {sorted(missing)!r}")
            message = f"`{name}` mapping keys must match portfolio symbols: {', '.join(parts)}"
            raise KeyError(message)
        if name == 'spread':
            for symbol, spread in value.items():
                if not isinstance(spread, Number):
                    raise TypeError(f"`spread[{symbol!r}]` must be a number")
                if spread < 0:
                    raise ValueError(f"`spread[{symbol!r}]` must be >= 0")
        elif name == 'commission':
            for commission in value.values():
                _Broker._validate_commission(commission)

    @staticmethod
    def _prepare_data(symbol: str, data: pd.DataFrame) -> pd.DataFrame:
        if not isinstance(data, pd.DataFrame):
            raise TypeError(f"`data[{symbol!r}]` must be a pandas.DataFrame with columns")

        data = data.copy(deep=False)

        if (not isinstance(data.index, pd.DatetimeIndex) and
            not isinstance(data.index, pd.RangeIndex) and
            (data.index.is_numeric() and
             (data.index > pd.Timestamp('1975').timestamp()).mean() > .8)):
            try:
                data.index = pd.to_datetime(data.index, infer_datetime_format=True)
            except ValueError:
                pass

        if 'Volume' not in data:
            data['Volume'] = np.nan

        if len(data) == 0:
            raise ValueError(f'OHLC `data[{symbol!r}]` is empty')
        if len(data.columns.intersection({'Open', 'High', 'Low', 'Close', 'Volume'})) != 5:
            raise ValueError(f"`data[{symbol!r}]` must be a pandas.DataFrame with columns "
                             "'Open', 'High', 'Low', 'Close', and (optionally) 'Volume'")
        if data[['Open', 'High', 'Low', 'Close']].isnull().values.any():
            raise ValueError(f'Some OHLC values are missing (NaN) in `data[{symbol!r}]`.')
        ohlc = data[['Open', 'High', 'Low', 'Close']]
        try:
            finite_ohlc = np.isfinite(ohlc.values).all()
        except TypeError:
            raise ValueError(
                f'OHLC values must be numeric and finite in `data[{symbol!r}]`.') from None
        if not finite_ohlc:
            raise ValueError(f'Some OHLC values are not finite in `data[{symbol!r}]`.')
        if (ohlc <= 0).values.any():
            raise ValueError(f'OHLC prices must be positive in `data[{symbol!r}]`.')
        if (data['High'] < data[['Open', 'Close']].max(axis=1)).any():
            raise ValueError(f'`data[{symbol!r}]` contains High values below Open/Close.')
        if (data['Low'] > data[['Open', 'Close']].min(axis=1)).any():
            raise ValueError(f'`data[{symbol!r}]` contains Low values above Open/Close.')
        if (data['Low'] > data['High']).any():
            raise ValueError(f'`data[{symbol!r}]` contains Low values above High.')
        if data['Volume'].notna().any():
            try:
                negative_volume = (data['Volume'].dropna() < 0).any()
            except TypeError:
                raise ValueError(
                    f'Volume values must be numeric in `data[{symbol!r}]`.') from None
            if negative_volume:
                raise ValueError(f'`data[{symbol!r}]` contains negative Volume values.')
        if not data.index.is_monotonic_increasing:
            warnings.warn(f'Data index for {symbol!r} is not sorted in ascending order. Sorting.',
                          stacklevel=3)
            data = data.sort_index()
        if not isinstance(data.index, pd.DatetimeIndex):
            warnings.warn(f'Data index for {symbol!r} is not datetime. Assuming simple periods, '
                          'but `pd.DateTimeIndex` is advised.',
                          stacklevel=3)
        return data

    @staticmethod
    def _make_benchmark_data(data: Mapping[str, pd.DataFrame],
                             first_trading_bar: int = 0) -> pd.DataFrame:
        closes = pd.DataFrame({symbol: df['Close'] for symbol, df in data.items()})
        first_trading_bar = min(max(0, int(first_trading_bar)), len(closes) - 1)
        benchmark_close = (closes / closes.iloc[first_trading_bar]).mean(axis=1)
        return pd.DataFrame({
            'Open': benchmark_close,
            'High': benchmark_close,
            'Low': benchmark_close,
            'Close': benchmark_close,
            'Volume': np.nan,
        }, index=benchmark_close.index)

    def run(self, **kwargs) -> pd.Series:
        """
        Run the portfolio backtest. Returns the same statistics series shape as
        `Backtest.run()`, with `_trades.Symbol` identifying each traded asset.
        """
        data = _MultiData({symbol: df.copy(deep=False)
                           for symbol, df in self._data.items()})
        full_len = len(data)
        broker: _Broker = self._broker(data=data)
        strategy: Strategy = self._strategy(broker, data, kwargs)

        strategy.init()
        data._update()

        indicator_attrs = _strategy_indicator_specs(strategy)
        warmup_nbars = _indicator_warmup_nbars(strategy)
        start = 1 + warmup_nbars
        benchmark_data = self._make_benchmark_data(self._data, warmup_nbars)

        with np.errstate(invalid='ignore'):
            for i in _tqdm(range(start, len(data)), desc=self.run.__qualname__,
                           unit='bar', mininterval=2, miniters=100):
                data._set_length(i + 1)
                for _attr, indicator, set_indicator in indicator_attrs:
                    set_indicator(indicator[..., :i + 1])

                try:
                    broker.next()
                except _OutOfMoneyError:
                    break

                strategy.next()
            else:
                if self._finalize_trades is True:
                    broker.close_all_trades_at_final_close()
                elif len(broker.trades):
                    warnings.warn(
                        'Some trades remain open at the end of backtest. Use '
                        '`PortfolioBacktest(..., finalize_trades=True)` to close them and '
                        'include them in stats.', stacklevel=2)

            data._set_length(full_len)

            equity = pd.Series(broker._equity).bfill().fillna(broker._cash).values
            self._results = compute_stats(
                trades=broker.closed_trades,
                equity=equity,
                ohlc_data=benchmark_data,
                risk_free_rate=0.0,
                strategy_instance=strategy,
                stats_start=warmup_nbars,
            )

        return self._results

    def plot(self, *, symbol: str | None = None,
             results: pd.Series | None = None,
             reverse_indicators=False,
             **kwargs):
        """
        Plot one asset's candles and trades alongside the global portfolio equity curve.
        """
        if results is None:
            if self._results is None:
                raise RuntimeError('First issue `backtest.run()` to obtain results.')
            results = self._results
        if symbol is None:
            if len(self._data) != 1:
                raise ValueError('`symbol` is required when plotting a multi-asset portfolio')
            symbol = next(iter(self._data))
        if symbol not in self._data:
            raise KeyError(f"Symbol {symbol!r} not in data")

        plot_results = results.copy()
        trades = plot_results['_trades']
        trade_markers = trades
        if 'Symbol' in trades:
            trade_markers = trades[trades['Symbol'] == symbol]
        indicators = [
            indicator for indicator in plot_results['_strategy']._indicators
            if indicator._opts.get('symbol') in (None, symbol)
        ]
        return plot(results=plot_results, df=self._data[symbol],
                    indicators=indicators, trade_markers=trade_markers,
                    reverse_indicators=reverse_indicators, **kwargs)


# NOTE: Don't put anything public below this __all__ list

__all__ = [getattr(v, '__name__', k)
           for k, v in globals().items()                        # export
           if ((callable(v) and getattr(v, '__module__', None) == __name__ or  # callables from this module; getattr for Python 3.9; # noqa: E501
                k.isupper()) and                                # or CONSTANTS
               not getattr(v, '__name__', k).startswith('_'))]  # neither marked internal

# NOTE: Don't put anything public below here. See above.
