"""
Core backtesting data structures.
Objects from this module can be imported from the top-level
module directly, e.g.

    from backtesting import Backtest, Strategy
"""
import multiprocessing as mp
import os
import warnings
from abc import abstractmethod, ABCMeta
from concurrent.futures import ProcessPoolExecutor, as_completed
from functools import partial
from itertools import repeat, product, chain
from numbers import Number
from typing import Callable, Union, Sequence, Tuple, Type

import numpy as np
import pandas as pd

try:
    from tqdm.auto import tqdm as _tqdm
    _tqdm = partial(_tqdm, leave=False)
except ImportError:
    def _tqdm(seq, **_):
        return seq

from ._plotting import plot
from ._util import _as_str, _Indicator, _Data, _data_period, try_


__pdoc__ = {
    'Strategy.__init__': False,
    'Orders.__init__': False,
    'Position.__init__': False,
}


_MARKET_PRICE = 'market'


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
        self._broker = broker  # type: _Broker
        self._data = data   # type: _Data
        self._params = self._check_params(params)

    def __repr__(self):
        return '<Strategy ' + str(self) + '>'

    def __str__(self):
        params = ','.join('{}={}'.format(*p) for p in zip(self._params.keys(),
                                                          map(_as_str, self._params.values())))
        if params:
            params = '(' + params + ')'
        return '{}{}'.format(self.__class__.__name__, params)

    def _check_params(self, params):
        for k, v in params.items():
            if not hasattr(self, k):
                raise AttributeError(
                    "Strategy '{}' is missing parameter '{}'. Strategy class "
                    "should define parameters as class variables before they "
                    "can be optimized or run with.".format(self.__class__.__name__, k))
            setattr(self, k, v)
        return params

    def I(self,  # noqa: E743
          func: Callable, *args,
          name=None, plot=True, overlay=None, color=None, scatter=False,
          **kwargs) -> np.ndarray:
        """
        Declare indicator. An indicator is just an array of values,
        but one that is revealed gradually in
        `backtesting.backtesting.Strategy.next` much like
        `backtesting.backtesting.Strategy.data` is.
        Returns `np.ndarray` of indicator values.

        `func` is a function that returns the indicator array(s) of
        same length as `backtesting.backtesting.Strategy.data`.

        In the plot legend, the indicator is labeled with
        function name, unless `name` overrides it.

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
        """
        if name is None:
            params = ','.join(filter(None, map(_as_str, chain(args, kwargs.values()))))
            func_name = _as_str(func)
            name = ('{}({})' if params else '{}').format(func_name, params)
        else:
            name = name.format(*map(_as_str, args),
                               **dict(zip(kwargs.keys(), map(_as_str, kwargs.values()))))

        try:
            value = func(*args, **kwargs)
        except Exception as e:
            raise RuntimeError('Indicator "{}" errored with exception: {}'.format(name, e))

        if isinstance(value, pd.DataFrame):
            value = value.values.T

        value = try_(lambda: np.asarray(value, order='C'), None)
        is_arraylike = value is not None

        # Optionally flip the array if the user returned e.g. `df.values`
        if is_arraylike and np.argmax(value.shape) == 0:
            value = value.T

        if not is_arraylike or not 1 <= value.ndim <= 2 or value.shape[-1] != len(self._data.Close):
            raise ValueError(
                'Indicators must return (optionally a tuple of) numpy.arrays of same '
                'length as `data`(data shape: {}; indicator "{}" shape: {}, value: {})'
                .format(self._data.Close.shape, name, getattr(value, 'shape', ''), value))

        if plot and overlay is None and np.issubdtype(value.dtype, np.number):
            x = value / self._data.Close
            # By default, overlay if strong majority of indicator values
            # is within 30% of Close
            with np.errstate(invalid='ignore'):
                overlay = ((x < 1.4) & (x > .6)).mean() > .6

        value = _Indicator(value, name=name, plot=plot, overlay=overlay,
                           color=color, scatter=scatter,
                           # lib.resample_apply() uses this:
                           data=self.data)
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

    def buy(self, price=None, *, sl=None, tp=None):
        """
        Let the strategy close any current position and
        use _all available funds_ to
        buy the asset for `price`,
        optionally entering two other orders:
        one at stop-loss price (`sl`; stop-limit order) and
        one at take-profit price (`tp`; limit order).

        If `price` is not set, market price is assumed.
        """
        self._broker.buy(price and float(price),
                         sl and float(sl),
                         tp and float(tp))

    def sell(self, price=None, *, sl=None, tp=None):
        """
        Let the strategy close any current position and
        use _all available funds_ to
        short sell the asset for `price`,
        optionally entering two other orders:
        one at stop-loss price (`sl`; stop-limit order) and
        one at take-profit price (`tp`; limit order).

        If `price` is not set, market price is assumed.
        """
        self._broker.sell(price and float(price),
                          sl and float(sl),
                          tp and float(tp))

    @property
    def equity(self):
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
          Pandas series, you can call their `.to_series()` method
          (e.g. `data.Close.to_series()`).
        """
        return self._data

    @property
    def position(self) -> 'Position':
        """Instance of `backtesting.backtesting.Position`."""
        return self._broker.position

    @property
    def orders(self) -> 'Orders':
        """Instance of `backtesting.backtesting.Orders`."""
        return self._broker.orders


class Orders:
    """
    Orders waiting for execution, available as
    `backtesting.backtesting.Strategy.orders` within
    `backtesting.backtesting.Strategy.next`.

    Implied limit and stop-limit orders (taking profits and stopping loss)
    are always present; set the limit price with
    `backtesting.backtesting.Orders.set_sl` and
    `backtesting.backtesting.Orders.set_tp`.
    """
    def __init__(self, broker):
        self._broker = broker
        self._entry = self._sl = self._tp = self._close = self._is_long = None

    def _update(self, entry, sl, tp, is_long=True):
        self._entry = entry and float(entry) or _MARKET_PRICE
        self._sl = sl and float(sl) or None
        self._tp = tp and float(tp) or None
        self._close = False
        self._is_long = is_long

    @property
    def is_long(self):
        """True if the waiting entry order is long."""
        return self._is_long

    @property
    def is_short(self):
        """True if the waiting entry order is short."""
        return not self._is_long

    @property
    def entry(self):
        """Price at which to enter the position if hit."""
        return self._entry

    @property
    def sl(self):
        """Stop-loss (stop-limit) price at which to exit the position if hit."""
        return self._sl

    @property
    def tp(self):
        """Take-profit (limit) price at which to exit the position if hit."""
        return self._tp

    def __is_price_ok(self, price, is_limit_order):
        assert price is None or price > 0
        if not price:
            return
        market_price = self._broker.last_close
        # Entry (market/limit) or TP are limit orders, SL is stop order
        if (is_limit_order and (self._is_long and price < market_price or
                                not self._is_long and price > market_price) or
            not is_limit_order and (self._is_long and price > market_price or
                                    not self._is_long and price < market_price)):
            raise ValueError("Setting the target price as sepcified would trigger "
                             "the order immediately -- this is forbidden. "
                             "Use `position.close()` to close the position, or similar.")

    def set_entry(self, price):
        """Set new entry price of the implied limit order)."""
        if self._entry is None and price is not None:
            raise RuntimeError("Can't reset order for position entry. "
                               "The order has been already executed or no "
                               "buy/sell order was put in place.")
        self.__is_price_ok(price, True)
        self._entry = price and float(price)

    def set_sl(self, price):
        """Set new stop-loss price (of the implied stop-limit order)."""
        if self._entry is None and not self._broker._position:
            raise RuntimeError("You don't currently hold a position to set "
                               "stop-loss for.")
        self.__is_price_ok(price, False)
        self._sl = price and float(price)

    def set_tp(self, price):
        """Set new take-profit price (of the implied limit order)."""
        if self._entry is None and not self._broker._position:
            raise RuntimeError("You don't currently hold a position to set "
                               "take-profit limit for.")
        self.__is_price_ok(price, True)
        self._tp = price and float(price)

    def cancel(self):
        """Cancel all implied orders."""
        self._entry = self._sl = self._tp = self._close = self._is_long = None

    def __bool__(self):
        return bool(self._entry or self._sl or self._tp or self._close)

    def __repr__(self):
        return '<Orders: %.6f %.6f %.6f %d>' % (self._entry or np.nan,
                                                self._sl or np.nan,
                                                self._tp or np.nan,
                                                self._close or 0)
    __str__ = __repr__


class Position:
    """
    Currently held asset position, available as
    `backtesting.backtesting.Strategy.position` within
    `backtesting.backtesting.Strategy.next`.
    Can be used in boolean contexts, e.g.

        if self.position:
            ...  # we have a position, either long or short
    """
    def __init__(self, broker):
        self._broker = broker

    def __bool__(self):
        return self.size != 0

    @property
    def size(self):
        """Position size in units of asset. Negative if position is short."""
        return self._broker._position

    @property
    def open_price(self):
        """Price at which the position was opened."""
        return self._broker._position_open_price

    @property
    def open_time(self):
        """Data index value at which the position was opened."""
        i = self._broker._position_open_i
        return i if i is None else self._broker._data.index[i]

    def _pl(self, price):
        open, size = self.open_price, self.size
        pl = (price - open) * size
        pl -= open * self._broker._commission * abs(size)
        return pl

    @property
    def pl(self):
        """Profit (positive) or loss (negative) of current position."""
        return self._pl(self._broker._data.Close[-1])

    @property
    def pl_pct(self):
        """
        Profit (positive) or loss (negative) of current position,
        in percent of position open price.
        """
        return self.pl / (self.open_price * abs(self.size) or 1)

    @property
    def is_long(self):
        """True if the position is long (position size is positive)."""
        return self.size > 0

    @property
    def is_short(self):
        """True if the position is short (position size is negative)."""
        return self.size < 0

    def close(self):
        """Close the position at current market price."""
        self._broker.close()

    def __repr__(self):
        return '<Position: %d>' % self.size


class _OutOfMoneyError(Exception):
    pass


class _Broker:
    class _Log:
        def __init__(self, length):
            self.equity = np.tile(np.nan, length)
            self.exit_entry = np.tile(np.nan, length)
            self.exit_position = np.tile(np.nan, length)
            self.entry_price = np.tile(np.nan, length)
            self.exit_price = np.tile(np.nan, length)
            self.pl = np.tile(np.nan, length)

    def __init__(self, *, data, cash, commission, margin, trade_on_close, length):
        assert 0 < cash, "cash shosuld be >0, is {}".format(cash)
        assert 0 <= commission < .1, "commission should be between 0-10%, is {}".format(commission)
        assert 0 < margin <= 1, "margin should be between 0 and 1, is {}".format(margin)
        self._data = data  # type: _Data
        self._cash = cash
        self._commission = commission
        self._leverage = 1 / margin
        self._trade_on_close = trade_on_close
        self._position = 0
        self._position_open_price = 0
        self._position_open_i = None
        self.log = self._Log(length)
        self.position = Position(self)
        self.orders = Orders(self)

    def __repr__(self):
        return '<Broker: {:.0f}{:+.1f}>'.format(self._cash, self.position.pl)

    def buy(self, price=None, sl=None, tp=None):
        assert (sl or -np.inf) <= (price or self.last_close) <= (tp or np.inf), "For long orders should be: SL ({}) < BUY PRICE ({}) < TP ({})".format(sl, price or self.last_close, tp)  # noqa: E501
        self.orders._update(price, sl, tp)

    def sell(self, price=None, sl=None, tp=None):
        assert (tp or -np.inf) <= (price or self.last_close) <= (sl or np.inf), "For short orders should be: TP ({}) < BUY PRICE ({}) < SL ({})".format(tp, price or self.last_close, sl)  # noqa: E501
        self.orders._update(price, sl, tp, is_long=False)

    def close(self):
        self.orders.cancel()
        self.orders._close = True

    def _get_market_price(self, price):
        i = self._i
        if price in (_MARKET_PRICE, None):
            price = self._data.Open[-1]
            if self._trade_on_close:
                price = self._data.Close[-2]
                i -= 1
        return i, price

    @property
    def last_close(self):
        """Return price at the last (current) close.
        Used e.g. in `Orders._is_price_ok()` to see if the set price is reasonable.
        """
        return self._data.Close[-1]

    def _open_position(self, price, is_long):
        assert not self._position
        self.orders.set_entry(None)

        i, price = self._get_market_price(price)

        position = float(self._cash * self._leverage / (price * (1 + self._commission)))
        self._position = position if is_long else -position
        self._position_open_price = price
        self._position_open_i = i

        self.log.entry_price[i] = price

    def _close_position(self, price=None):
        if not self._position:
            return

        i, price = self._get_market_price(price)
        pl = self.position._pl(price)

        self.log.pl[i] = pl
        self.log.exit_entry[i] = self._position_open_i
        self.log.exit_price[i] = price
        self.log.exit_position[i] = self._position

        self._cash += pl
        self._position = 0
        self._position_open_price = 0
        self._position_open_i = None

    @property
    def equity(self):
        return self._cash + self.position.pl

    def next(self):
        data = self._data
        i = self._i = len(data) - 1

        if self.orders:
            orders = self.orders
            is_long = orders._is_long
            entry, sl, tp = orders._entry, orders._sl, orders._tp
            open, high, low = data.Open[-1], data.High[-1], data.Low[-1]

            if entry or orders._close:
                self._close_position()
                orders._close = False

            # First make the entry order, if hit
            if entry:
                if entry is _MARKET_PRICE or high > orders._entry > low:
                    self._open_position(entry, is_long)

            # Check if stop-loss threshold was hit
            if sl and self._position:
                price = (sl if low <= sl <= high else              # hit
                         open if (is_long and open < sl or         # gapped hit
                                  not is_long and open > sl) else
                         None)                                     # not hit
                if price is not None:
                    self._close_position(price)
                    self.orders.cancel()

            # Check if take-profit threshold was hit
            if tp and self._position:
                price = (tp if low < tp < high else
                         open if (is_long and open > tp or
                                  not is_long and open > sl) else
                         None)
                if price is not None:
                    self._close_position(price)
                    self.orders.cancel()

        # Log account equity for the equity curve
        equity = self.equity
        self.log.equity[i] = equity

        # Hovever, if negative, set all to 0 and stop the simulation
        if equity < 0:
            self._close_position()
            self._cash = 0
            self.log.equity[i:] = 0
            raise _OutOfMoneyError


class Backtest:
    """
    Backtest a particular (parameterized) strategy
    on particular data.

    Upon initialization, call method
    `backtesting.backtesting.Backtest.run` to run a backtest
    instance, or `backtesting.backtesting.Backtest.optimize` to
    optimize it.
    """
    def __init__(self,
                 data: pd.DataFrame,
                 strategy: Type[Strategy],
                 *,
                 cash: float = 10000,
                 commission: float = .0,
                 margin: float = 1.,
                 trade_on_close=False
                 ):
        """
        Initialize a backtest. Requires data and a strategy to test.

        `data` is a `pd.DataFrame` with columns:
        `Open`, `High`, `Low`, `Close`, and (optionally) `Volume`.
        If any columns are missing, set them to what you have available,
        e.g.

            df['Open'] = df['High'] = df['Low'] = df['Close']

        DataFrame index can be either datetime index (timestamps)
        or a monotonic range index (i.e. a sequence of periods).

        `strategy` is a `backtesting.backtesting.Strategy`
        _subclass_ (not an instance).

        `cash` is the initial cash to start with.

        `commission` is the commision ratio. E.g. if your broker's commission
        is 1% of trade value, set commission to `0.01`. Note, if you wish to
        account for bid-ask spread, you cam approximate doing so by increasing
        the commission, e.g. set it to `0.0002` for commission-less forex
        trading where the average spread is roughly 0.2‰ of asking price.

        `margin` is the required margin (ratio) of a leveraged account.
        No difference is made between initial and maintenance margins.
        To run the backtest using e.g. 50:1 leverge that your broker allows,
        set margin to `0.02` (1 / leverage).

        If `trade_on_close` is `True`, market orders will be executed
        with respect to the current bar's closing price instead of the
        next bar's open.
        """

        if not (isinstance(strategy, type) and issubclass(strategy, Strategy)):
            raise TypeError('`strategy` must be a Strategy sub-type')
        if not isinstance(data, pd.DataFrame):
            raise TypeError("`data` must be a pandas.DataFrame with columns")
        if not isinstance(commission, Number):
            raise TypeError('`commission` must be a float value, percent of '
                            'entry order price')

        data = data.copy(deep=False)

        # Convert index to datetime index
        if (not data.index.is_all_dates and
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
        if len(data.columns & {'Open', 'High', 'Low', 'Close', 'Volume'}) != 5:
            raise ValueError("`data` must be a pandas.DataFrame with columns "
                             "'Open', 'High', 'Low', 'Close', and (optionally) 'Volume'")
        if data[['Open', 'High', 'Low', 'Close']].isnull().values.any():
            raise ValueError('Some OHLC values are missing (NaN). '
                             'Please strip those lines with `df.dropna()` or '
                             'fill them in with `df.interpolate()` or whatever.')
        if not data.index.is_monotonic_increasing:
            warnings.warn('Data index is not sorted in ascending order. Sorting.',
                          stacklevel=2)
            data = data.sort_index()
        if not data.index.is_all_dates:
            warnings.warn('Data index is not datetime. Assuming simple periods.',
                          stacklevel=2)

        self._data = data   # type: pd.DataFrame
        self._broker = partial(
            _Broker, cash=cash, commission=commission, margin=margin,
            trade_on_close=trade_on_close, length=len(data)
        )
        self._strategy = strategy
        self._results = None

    def run(self, **kwargs) -> pd.Series:
        """
        Run the backtest. Returns `pd.Series` with results and statistics.

        Keyword arguments are interpreted as strategy parameters.
        """
        data = _Data(self._data)
        broker = self._broker(data=data)  # type: _Broker
        strategy = self._strategy(broker, data, kwargs)  # type: Strategy

        strategy.init()

        # Indicators used in Strategy.next()
        indicator_attrs = {attr: indicator
                           for attr, indicator in strategy.__dict__.items()
                           if isinstance(indicator, _Indicator)}.items()

        # Skip first few candles where indicators are still "warming up"
        # +1 to have at least two entries available
        start = 1 + max((np.isnan(indicator.astype(float)).argmin(axis=-1).max()
                         for _, indicator in indicator_attrs), default=0)

        # Disable "invalid value encountered in ..." warnings. Comparison
        # np.nan >= 3 is not invalid; it's False.
        with np.errstate(invalid='ignore'):

            for i in range(start, len(self._data)):
                # Prepare data and indicators for `next` call
                data._set_length(i + 1)
                for attr, indicator in indicator_attrs:
                    # Slice indicator on the last dimension (case of 2d indicator)
                    setattr(strategy, attr, indicator[..., :i + 1])

                # Handle orders processing and broker stuff
                try:
                    broker.next()
                except _OutOfMoneyError:
                    break

                # Next tick, a moment before bar close
                strategy.next()

        self._results = self._compute_stats(broker, strategy)
        return self._results

    def optimize(self,
                 maximize: Union[str, Callable[[pd.Series], float]] = 'SQN',
                 constraint: Callable[[dict], bool] = None,
                 return_heatmap: bool = False,
                 **kwargs) -> Union[pd.Series, Tuple[pd.Series, pd.Series]]:
        """
        Optimize strategy parameters to an optimal combination using
        parallel exhaustive search. Returns result `pd.Series` of
        the best run.

        `maximize` is a string key from the
        `backtesting.backtesting.Backtest.run`-returned results series,
        or a function that accepts this series object and returns a number;
        the higher the better. By default, the method maximizes
        Van Tharp's [System Quality Number](https://google.com/search?q=System+Quality+Number).

        `constraint` is a function that accepts a dict-like object of
        parameters (with values) and returns `True` when the combination
        is admissible to test with. By default, any parameters combination
        is considered admissible.

        If `return_heatmap` is `True`, besides returning the result
        series, an additional `pd.Series` is returned with a multiindex
        of all admissible parameter combinations, which can be further
        inspected or projected onto 2D to plot a heatmap
        (see `backtesting.backtesting.lib.plot_heatmaps()`).

        Additional keyword arguments represent strategy arguments with
        list-like collections of possible values. For example, the following
        code finds and returns the "best" of the 7 admissible (of the
        9 possible) parameter combinations:

            backtest.optimize(sma1=[5, 10, 15], sma2=[10, 20, 40],
                              constraint=lambda p: p.sma1 < p.sma2)

        .. TODO::
            Add parameter `max_tries: Union[int, float] = None` which switches
            from exhaustive grid search to random search. See notes in the source.
        """
        if not kwargs:
            raise ValueError('Need some strategy parameters to optimize')

        if isinstance(maximize, str):

            stats = self._results if self._results is not None else self.run()
            if maximize not in stats:
                raise ValueError('`maximize`, if str, must match a key in pd.Series '
                                 'result of backtest.run()')

            def maximize(stats: pd.Series, _key=maximize):
                return stats[_key]

        elif not callable(maximize):
            raise TypeError('`maximize` must be str (a field of backtest.run() result '
                            'Series) or a function that accepts result Series '
                            'and returns a number; the higher the better')

        if constraint is None:

            def constraint(_):
                return True

        elif not callable(constraint):
            raise TypeError("`constraint` must be a function that accepts a dict "
                            "of strategy parameters and returns a bool whether "
                            "the combination of parameters is admissible or not")

        def _tuple(x):
            return x if isinstance(x, Sequence) and not isinstance(x, str) else (x,)

        class AttrDict(dict):
            def __getattr__(self, item):
                return self[item]

        param_combos = tuple(map(dict,  # back to dict so it pickles
                                 filter(constraint,  # constraints applied on our fancy dict
                                        map(AttrDict,
                                            product(*(zip(repeat(k), _tuple(v))
                                                      for k, v in kwargs.items()))))))
        if not param_combos:
            raise ValueError('No admissible parameter combinations to test')

        if len(param_combos) > 300:
            warnings.warn('Searching best of {} configurations.'.format(len(param_combos)),
                          stacklevel=2)

        heatmap = pd.Series(np.nan,
                            index=pd.MultiIndex.from_tuples([p.values() for p in param_combos],
                                                            names=next(iter(param_combos)).keys()))

        # TODO: add parameter `max_tries:Union[int, float]=None` which switches
        # exhaustive grid search to random search. This might need to avoid
        # returning NaNs in stats on runs with no trades to differentiate those
        # from non-tested parameter combos in heatmap.

        def _batch(seq):
            n = np.clip(len(seq) // (os.cpu_count() or 1), 5, 300)
            for i in range(0, len(seq), n):
                yield seq[i:i + n]

        # If multiprocessing start method is 'fork' (i.e. on POSIX), use
        # a pool of processes to compute results in parallel.
        # Otherwise (i.e. on Windos), sequential computation will be "faster".
        if mp.get_start_method(allow_none=False) == 'fork':
            with ProcessPoolExecutor() as executor:
                futures = [executor.submit(self._mp_task, params)
                           for params in _batch(param_combos)]
                for future in _tqdm(as_completed(futures), total=len(futures)):
                    for params, stats in future.result():
                        heatmap[tuple(params.values())] = maximize(stats)
        else:
            if os.name == 'posix':
                warnings.warn("For multiprocessing support in `Backtest.optimize()` "
                              "set multiprocessing start method to 'fork'.")
            for params in _tqdm(param_combos):
                for _, stats in self._mp_task([params]):
                    heatmap[tuple(params.values())] = maximize(stats)

        best_params = heatmap.idxmax()

        if pd.isnull(best_params):
            # No trade was made in any of the runs. Just make a random
            # run so we get some, if empty, results
            self.run(**param_combos[0])
        else:
            # Re-run best strategy so that the next .plot() call will render it
            self.run(**dict(zip(heatmap.index.names, best_params)))

        if return_heatmap:
            return self._results, heatmap
        return self._results

    def _mp_task(self, param_combos):
        return [(params, stats) for params, stats in ((params, self.run(**params))
                                                      for params in param_combos)
                if stats['# Trades']]

    @staticmethod
    def _compute_drawdown_duration_peaks(dd: pd.Series):
        iloc = np.unique(np.r_[(dd == 0).values.nonzero()[0], len(dd) - 1])
        iloc = pd.Series(iloc, index=dd.index[iloc])
        df = iloc.to_frame('iloc').assign(prev=iloc.shift())
        df = df[df['iloc'] > df['prev'] + 1].astype(int)
        # If no drawdown since no trade, avoid below for pandas sake and return nan series
        if not len(df):
            return (dd.replace(0, np.nan),) * 2
        df['duration'] = df['iloc'].map(dd.index.__getitem__) - df['prev'].map(dd.index.__getitem__)
        df['peak_dd'] = df.apply(lambda row: dd.iloc[row['prev']:row['iloc'] + 1].max(), axis=1)
        df = df.reindex(dd.index)
        return df['duration'], df['peak_dd']

    def _compute_stats(self, broker: _Broker, strategy: Strategy) -> pd.Series:
        data = self._data

        df = pd.DataFrame()
        df['Equity'] = pd.Series(broker.log.equity).bfill().fillna(broker._cash)
        equity = df.Equity.values
        df['Exit Entry'] = broker.log.exit_entry
        exits = df['Exit Entry']
        df['Exit Position'] = broker.log.exit_position
        df['Entry Price'] = broker.log.entry_price
        df['Exit Price'] = broker.log.exit_price
        df['P/L'] = broker.log.pl
        pl = df['P/L']
        df['Returns'] = returns = pl.dropna() / equity[exits.dropna().values.astype(int)]
        df['Drawdown'] = dd = 1 - equity / np.maximum.accumulate(equity)
        dd_dur, dd_peaks = self._compute_drawdown_duration_peaks(pd.Series(dd, index=data.index))
        df['Drawdown Duration'] = dd_dur.values
        dd_dur = df['Drawdown Duration']

        df.index = data.index

        def _round_timedelta(value, _period=_data_period(df)):
            if not isinstance(value, pd.Timedelta):
                return value
            resolution = getattr(_period, 'resolution_string', None) or _period.resolution
            return value.ceil(resolution)

        s = pd.Series(dtype=object)
        s.loc['Start'] = df.index[0]
        s.loc['End'] = df.index[-1]
        s.loc['Duration'] = s.End - s.Start
        exits = df['Exit Entry']  # After reindexed
        durations = (exits.dropna().index - df.index[exits.dropna().values.astype(int)]).to_series()
        s.loc['Exposure [%]'] = np.nan_to_num(durations.sum() / (s.loc['Duration'] or np.nan) * 100)
        s.loc['Equity Final [$]'] = equity[-1]
        s.loc['Equity Peak [$]'] = equity.max()
        s.loc['Return [%]'] = (equity[-1] - equity[0]) / equity[0] * 100
        c = data.Close.values
        s.loc['Buy & Hold Return [%]'] = abs(c[-1] - c[0]) / c[0] * 100  # long OR short
        s.loc['Max. Drawdown [%]'] = max_dd = -np.nan_to_num(dd.max()) * 100
        s.loc['Avg. Drawdown [%]'] = -dd_peaks.mean() * 100
        s.loc['Max. Drawdown Duration'] = _round_timedelta(dd_dur.max())
        s.loc['Avg. Drawdown Duration'] = _round_timedelta(dd_dur.mean())
        s.loc['# Trades'] = n_trades = pl.count()
        s.loc['Win Rate [%]'] = win_rate = np.nan if not n_trades else (pl > 0).sum() / n_trades * 100  # noqa: E501
        s.loc['Best Trade [%]'] = returns.max() * 100
        s.loc['Worst Trade [%]'] = returns.min() * 100
        mean_return = returns.mean()
        s.loc['Avg. Trade [%]'] = mean_return * 100
        s.loc['Max. Trade Duration'] = _round_timedelta(durations.max())
        s.loc['Avg. Trade Duration'] = _round_timedelta(durations.mean())
        s.loc['Expectancy [%]'] = ((returns[returns > 0].mean() * win_rate -
                                    returns[returns < 0].mean() * (100 - win_rate)))
        pl = pl.dropna()
        s.loc['SQN'] = np.sqrt(n_trades) * pl.mean() / pl.std()
        s.loc['Sharpe Ratio'] = mean_return / (returns.std() or np.nan)
        s.loc['Sortino Ratio'] = mean_return / (returns[returns < 0].std() or np.nan)
        s.loc['Calmar Ratio'] = mean_return / ((-max_dd / 100) or np.nan)

        s.loc['_strategy'] = strategy
        s._trade_data = df  # Private API
        return s

    def plot(self, *, results: pd.Series = None, filename=None, plot_width=None,
             plot_equity=True, plot_pl=True,
             plot_volume=True, plot_drawdown=False,
             smooth_equity=False, relative_equity=True,
             omit_missing=True, superimpose: Union[bool, str] = True,
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
        an equity (cash plus assets) graph section.

        If `plot_pl` is `True`, the resulting plot will contain
        a profit/loss (P/L) indicator section.

        If `plot_volume` is `True`, the resulting plot will contain
        a trade volume section.

        If `plot_drawdown` is `True`, the resulting plot will contain
        a separate drawdown graph section.

        If `smooth_equity` is `True`, the equity graph will be
        interpolated between points of cash-only positions,
        unaffected by any interim asset volatility.

        If `relative_equity` is `True`, scale and label equity graph axis
        with return percent, not absolute cash-equivalent values.

        If `omit_missing` is `True`, skip missing candlestick bars on the
        datetime axis.

        If `superimpose` is `True`, superimpose downsampled candlesticks
        over the original candlestick chart. Default downsampling is:
        weekly for daily data, daily for hourly data, hourly for minute data,
        and minute for second and sub-second data.
        `superimpose` can also be a string, in which case it is a valid
        [Pandas offset string], such as `'5T'` or `'5min'`.
        Note, this only works for data with a datetime index.

        [Pandas offset string]: \
            http://pandas.pydata.org/pandas-docs/stable/timeseries.html#offset-aliases

        If `show_legend` is `True`, the resulting plot graphs will contain
        labeled legends.

        If `open_browser` is `True`, the resulting `filename` will be
        opened in the default web browser.
        """
        if results is None:
            if self._results is None:
                raise RuntimeError('First issue `backtest.run()` to obtain results.')
            results = self._results

        plot(
            results=results,
            df=self._data,
            indicators=results._strategy._indicators,
            filename=filename,
            plot_width=plot_width,
            plot_equity=plot_equity,
            plot_pl=plot_pl,
            plot_volume=plot_volume,
            omit_missing=omit_missing,
            plot_drawdown=plot_drawdown,
            smooth_equity=smooth_equity,
            relative_equity=relative_equity,
            superimpose=superimpose,
            show_legend=show_legend,
            open_browser=open_browser)
