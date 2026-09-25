import inspect
import multiprocessing as mp
import os
import sys
import time
import unittest
import warnings
from concurrent.futures.process import ProcessPoolExecutor
from contextlib import contextmanager
from functools import partial
from glob import glob
from runpy import run_path
from tempfile import NamedTemporaryFile, gettempdir
from unittest import TestCase

import numpy as np
import pandas as pd
from pandas.testing import assert_frame_equal

from backtesting import Backtest as _Backtest, Strategy
from backtesting._stats import compute_drawdown_duration_peaks
from backtesting._util import _Array, _as_str, _Indicator, patch, try_
from backtesting.lib import (
    FractionalBacktest, MultiBacktest, OHLCV_AGG,
    SignalStrategy,
    TrailingStrategy,
    barssince,
    compute_stats,
    cross,
    crossover,
    plot_heatmaps,
    quantile,
    random_ohlc_data,
    resample_apply,
)
from backtesting.test import BTCUSD, EURUSD, GOOG, SMA

SHORT_DATA = GOOG.iloc[:20]  # Short data for fast tests with no indicator lag

# Avoid the 'Some trades remain open' warning in many tests
Backtest = partial(_Backtest, finalize_trades=True)


@contextmanager
def _tempfile():
    with NamedTemporaryFile(suffix='.html') as f:
        if sys.platform.startswith('win'):
            f.close()
        yield f.name


@contextmanager
def chdir(path):
    cwd = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(cwd)


class SmaCross(Strategy):
    # NOTE: These values are also used on the website!
    fast = 10
    slow = 30

    def init(self):
        self.sma1 = self.I(SMA, self.data.Close, self.fast)
        self.sma2 = self.I(SMA, self.data.Close, self.slow)

    def next(self):
        if crossover(self.sma1, self.sma2):
            self.position.close()
            self.buy()
        elif crossover(self.sma2, self.sma1):
            self.position.close()
            self.sell()


class _S(Strategy):
    def init(self):
        super().init()


class TestBacktest(TestCase):
    def test_run(self):
        bt = Backtest(EURUSD, SmaCross)
        bt.run()

    def test_run_invalid_param(self):
        bt = Backtest(GOOG, SmaCross)
        self.assertRaises(AttributeError, bt.run, foo=3)

    def test_run_speed(self):
        bt = Backtest(GOOG, SmaCross)
        start = time.process_time()
        bt.run()
        end = time.process_time()
        self.assertLess(end - start, .3)

    def test_data_missing_columns(self):
        df = GOOG.copy(deep=False)
        del df['Open']
        with self.assertRaises(ValueError):
            Backtest(df, SmaCross).run()

    def test_data_nan_columns(self):
        df = GOOG.copy()
        df['Open'] = np.nan
        with self.assertRaises(ValueError):
            Backtest(df, SmaCross).run()

    def test_data_extra_columns(self):
        df = GOOG.copy(deep=False)
        df['P/E'] = np.arange(len(df))
        df['MCap'] = np.arange(len(df))

        class S(Strategy):
            def init(self):
                assert len(self.data.MCap) == len(self.data.Close)
                assert len(self.data['P/E']) == len(self.data.Close)

            def next(self):
                assert len(self.data.MCap) == len(self.data.Close)
                assert len(self.data['P/E']) == len(self.data.Close)

        Backtest(df, S).run()

    def test_data_invalid(self):
        with self.assertRaises(TypeError):
            Backtest(GOOG.index, SmaCross).run()
        with self.assertRaises(ValueError):
            Backtest(GOOG.iloc[:0], SmaCross).run()

    def test_assertions(self):
        class Assertive(Strategy):
            def init(self):
                self.sma = self.I(SMA, self.data.Close, 10)
                self.remains_indicator = np.r_[2] * np.cumsum(self.sma * 5 + 1) * np.r_[2]

                self.transpose_invalid = self.I(lambda: np.column_stack((self.data.Open,
                                                                         self.data.Close)))

                resampled = resample_apply('W', SMA, self.data.Close, 3)
                resampled_ind = resample_apply('W', SMA, self.sma, 3)
                assert np.unique(resampled[-5:]).size == 1
                assert np.unique(resampled[-6:]).size == 2
                assert resampled in self._indicators, "Strategy.I not called"
                assert resampled_ind in self._indicators, "Strategy.I not called"

                assert 1 == try_(lambda: self.data.X, 1, AttributeError)
                assert 1 == try_(lambda: self.data['X'], 1, KeyError)

                assert self.data.pip == .01

                assert float(self.data.Close) == self.data.Close[-1]

            def next(self, _FEW_DAYS=pd.Timedelta('3 days')):  # noqa: N803
                assert self.equity >= 0

                assert isinstance(self.sma, _Indicator)
                assert isinstance(self.remains_indicator, _Indicator)
                assert self.remains_indicator.name
                assert isinstance(self.remains_indicator._opts, dict)

                assert not np.isnan(self.data.Open[-1])
                assert not np.isnan(self.data.High[-1])
                assert not np.isnan(self.data.Low[-1])
                assert not np.isnan(self.data.Close[-1])
                assert not np.isnan(self.data.Volume[-1])
                assert not np.isnan(self.sma[-1])
                assert self.data.index[-1]

                self.position
                self.position.size
                self.position.pl
                self.position.pl_pct
                self.position.is_long

                if crossover(self.sma, self.data.Close):
                    for order in self.orders:
                        if not order.is_contingent:
                            order.cancel()
                    price = self.data.Close[-1]
                    sl, tp = 1.05 * price, .9 * price

                    n_orders = len(self.orders)
                    self.sell(size=.21, limit=price, stop=price, sl=sl, tp=tp)
                    assert len(self.orders) == n_orders + 1

                    order = self.orders[-1]
                    assert order.limit == price
                    assert order.stop == price
                    assert order.size == -.21
                    assert order.sl == sl
                    assert order.tp == tp
                    assert not order.is_contingent

                elif self.position:
                    assert not self.position.is_long
                    assert self.position.is_short
                    assert self.position.pl
                    assert self.position.pl_pct
                    assert self.position.size < 0

                    trade = self.trades[0]
                    if self.data.index[-1] - self.data.index[trade.entry_bar] > _FEW_DAYS:
                        assert not trade.is_long
                        assert trade.is_short
                        assert trade.size < 0
                        assert trade.entry_bar > 0
                        assert isinstance(trade.entry_time, pd.Timestamp)
                        assert trade.exit_bar is None
                        assert trade.exit_time is None
                        assert trade.entry_price > 0
                        assert trade.exit_price is None
                        assert trade.pl / 1
                        assert trade.pl_pct / 1
                        assert trade.value > 0
                        assert trade.sl
                        assert trade.tp
                        # Close multiple times
                        self.position.close(.5)
                        self.position.close(.5)
                        self.position.close(.5)
                        self.position.close()
                        self.position.close()

        bt = Backtest(GOOG, Assertive)
        with self.assertWarns(UserWarning):
            stats = bt.run()
        self.assertEqual(stats['# Trades'], 132)

    def test_broker_params(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross,
                      cash=1000, spread=.01, margin=.1, trade_on_close=True)
        bt.run()

    def test_absolute_size_order_warns_on_insufficient_margin(self):
        class S(Strategy):
            def init(self):
                pass

            def next(self):
                self.buy(size=10_000)

        bt = Backtest(GOOG.iloc[:3], S, cash=1000)
        with self.assertWarnsRegex(UserWarning, 'insufficient margin'):
            stats = bt.run()
        self.assertEqual(stats['# Trades'], 0)

    def test_spread_commission(self):
        class S(Strategy):
            def init(self):
                self.done = False

            def next(self):
                if len(self.data) < ORDER_BAR:  # place the order on bar ORDER_BAR - 1
                    return
                if not self.position:
                    self.buy()
                else:
                    self.position.close()
                    self.next = lambda: None  # Done

        SPREAD = .01
        COMMISSION = .01
        CASH = 10_000
        ORDER_BAR = 2
        stats = Backtest(SHORT_DATA, S, cash=CASH, spread=SPREAD, commission=COMMISSION).run()
        trade_open_price = SHORT_DATA['Open'].iloc[ORDER_BAR]
        self.assertEqual(stats['_trades']['EntryPrice'].iloc[0], trade_open_price * (1 + SPREAD))
        self.assertEqual(stats['_equity_curve']['Equity'].iloc[2:4].round(2).tolist(),
                         [9685.31, 9749.33])

        stats = Backtest(SHORT_DATA, S, cash=CASH, commission=(100, COMMISSION)).run()
        self.assertEqual(stats['_equity_curve']['Equity'].iloc[2:4].round(2).tolist(),
                         [9784.50, 9718.69])

        commission_func = lambda size, price: size * price * COMMISSION  # noqa: E731
        stats = Backtest(SHORT_DATA, S, cash=CASH, commission=commission_func).run()
        self.assertEqual(stats['_equity_curve']['Equity'].iloc[2:4].round(2).tolist(),
                         [9781.28, 9846.04])

    def test_commissions(self):
        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(size=SIZE, tp=3)

        FIXED_COMMISSION, COMMISSION = 10, .01
        CASH, SIZE, PRICE_ENTRY, PRICE_EXIT = 5000, 100, 1, 4
        arr = np.r_[1, PRICE_ENTRY, 1, 2, PRICE_EXIT, 1, 2]
        df = pd.DataFrame({'Open': arr, 'High': arr, 'Low': arr, 'Close': arr})
        with self.assertWarnsRegex(UserWarning, 'index is not datetime'):
            stats = Backtest(df, S, cash=CASH, commission=(FIXED_COMMISSION, COMMISSION)).run()
        EXPECTED_PAID_COMMISSION = (
            FIXED_COMMISSION + COMMISSION * SIZE * PRICE_ENTRY +
            FIXED_COMMISSION + COMMISSION * SIZE * PRICE_EXIT)
        self.assertEqual(stats['Commissions [$]'], EXPECTED_PAID_COMMISSION)
        self.assertEqual(stats._trades['Commission'][0], EXPECTED_PAID_COMMISSION)
        self.assertEqual(
            stats['Equity Final [$]'],
            CASH + (PRICE_EXIT - PRICE_ENTRY) * SIZE - EXPECTED_PAID_COMMISSION)

    def test_dont_overwrite_data(self):
        df = EURUSD.copy()
        bt = Backtest(df, SmaCross)
        bt.run()
        bt.optimize(fast=4, slow=[6, 8])
        bt.plot(plot_drawdown=True, open_browser=False)
        self.assertTrue(df.equals(EURUSD))

    def test_strategy_abstract(self):
        class MyStrategy(Strategy):
            pass

        self.assertRaises(TypeError, MyStrategy, None, None)

    def test_strategy_str(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross)
        self.assertEqual(str(bt.run()._strategy), SmaCross.__name__)
        self.assertEqual(str(bt.run(fast=11)._strategy), SmaCross.__name__ + '(fast=11)')

    def test_compute_drawdown(self):
        dd = pd.Series([0, 1, 7, 0, 4, 0, 0])
        durations, peaks = compute_drawdown_duration_peaks(dd)
        np.testing.assert_array_equal(durations, pd.Series([3, 2], index=[3, 5]).reindex(dd.index))
        np.testing.assert_array_equal(peaks, pd.Series([7, 4], index=[3, 5]).reindex(dd.index))

    def test_compute_stats(self):
        stats = Backtest(GOOG, SmaCross, finalize_trades=True).run()
        expected = pd.Series({
                # NOTE: These values are also used on the website!  # noqa: E126
                '# Trades': 66,
                '# Long Trades': 33,
                '# Short Trades': 33,
                'Avg. Drawdown Duration': pd.Timedelta('41 days 00:00:00'),
                'Avg. Drawdown [%]': -5.925851581948801,
                'Avg. Trade Duration': pd.Timedelta('46 days 00:00:00'),
                'Avg. Trade [%]': 2.5479693282886906,
                'Best Trade [%]': 53.59595229490424,
                'Buy & Hold Return [%]': 522.0601851851852,
                'Calmar Ratio': 0.4447456445221315,
                'Duration': pd.Timedelta('3116 days 00:00:00'),
                'End': pd.Timestamp('2013-03-01 00:00:00'),
                'Equity Final [$]': 51959.94999999997,
                'Equity Peak [$]': 75787.44,
                'Expectancy [%]': 3.2930986285628268,
                'Exposure Time [%]': 96.74115456238361,
                'Long/Short Ratio': 1.0,
                'Max. Drawdown Duration': pd.Timedelta('584 days 00:00:00'),
                'Max. Drawdown [%]': -47.98012705007589,
                'Max. Trade Duration': pd.Timedelta('183 days 00:00:00'),
                'Profit Factor': 2.174469316409448,
                'Return (Ann.) [%]': 21.338952529139753,
                'Return [%]': 419.59949999999964,
                'Volatility (Ann.) [%]': 36.541528967898145,
                'CAGR [%]': 21.307865404063108,
                'SQN': 1.0880865497975716,
                'Kelly Criterion': 0.15319708142323157,
                'Sharpe Ratio': 0.5839644134181166,
                'Sortino Ratio': 1.0929459039159732,
                'Start': pd.Timestamp('2004-08-19 00:00:00'),
                'Win Rate [%]': 46.96969696969697,
                'Win Rate Longs [%]': 54.54545454545454,
                'Win Rate Shorts [%]': 39.39393939393939,
                'Worst Trade [%]': -18.39887353835481,
                'Alpha [%]': 399.7149324245838,
                'Beta': 0.03808864981412506,
        })

        def almost_equal(a, b):
            try:
                return np.isclose(a, b, rtol=1.e-8)
            except TypeError:
                return a == b

        diff = {key: print(key) or value  # noqa: T201
                for key, value in stats.filter(regex='^[^_]').items()
                if not almost_equal(value, expected[key])}
        self.assertDictEqual(diff, {})

        self.assertSequenceEqual(
            sorted(stats['_equity_curve'].columns),
            sorted(['Equity', 'DrawdownPct', 'DrawdownDuration']))

        self.assertEqual(len(stats['_trades']), 66)

        indicator_columns = [
            f'{entry}_SMA(C,{n})'
            for entry in ('Entry', 'Exit')
            for n in (SmaCross.fast, SmaCross.slow)]
        self.assertSequenceEqual(
            sorted(stats['_trades'].columns),
            sorted(['Size', 'IsLong', 'IsShort', 'EntryBar', 'ExitBar', 'EntryPrice', 'ExitPrice',
                    'SL', 'TP', 'PnL', 'ReturnPct', 'EntryTime', 'ExitTime',
                    'Duration', 'Tag', 'Commission',
                    *indicator_columns]))

    def test_compute_stats_bordercase(self):

        class SingleTrade(Strategy):
            def init(self):
                self._done = False

            def next(self):
                if not self._done:
                    self.buy()
                    self._done = True
                if self.position:
                    self.position.close()

        class SinglePosition(_S):
            def next(self):
                if not self.position:
                    self.buy()

        class NoTrade(_S):
            def next(self):
                pass

        for strategy in (SmaCross,
                         SingleTrade,
                         SinglePosition,
                         NoTrade):
            with self.subTest(strategy=strategy.__name__):
                stats = Backtest(GOOG.iloc[:100], strategy).run()

                self.assertFalse(np.isnan(stats['Equity Final [$]']))
                self.assertFalse(stats['_equity_curve']['Equity'].isnull().any())
                self.assertEqual(stats['_strategy'].__class__, strategy)

    def test_trade_enter_hit_sl_on_same_day(self):
        the_day = pd.Timestamp("2012-10-17 00:00:00")

        class S(_S):
            def next(self):
                if self.data.index[-1] == the_day:
                    self.buy(sl=720)

        self.assertEqual(Backtest(GOOG, S).run()._trades.iloc[0].ExitPrice, 720)

        class S(_S):
            def next(self):
                if self.data.index[-1] == the_day:
                    self.buy(stop=758, sl=720)

        with self.assertWarns(UserWarning):
            self.assertEqual(Backtest(GOOG, S).run()._trades.iloc[0].ExitPrice, 705.58)

    def test_stop_price_between_sl_tp(self):
        class S(_S):
            def next(self):
                if self.data.index[-1] == pd.Timestamp("2004-09-09 00:00:00"):
                    self.buy(stop=104, sl=103, tp=110)

        with self.assertWarns(UserWarning):
            self.assertEqual(Backtest(GOOG, S).run()._trades.iloc[0].EntryPrice, 104)

    def test_position_close_portion(self):
        class SmaCross(Strategy):
            def init(self):
                self.sma1 = self.I(SMA, self.data.Close, 10)
                self.sma2 = self.I(SMA, self.data.Close, 20)

            def next(self):
                if not self.position and crossover(self.sma1, self.sma2):
                    self.buy(size=10)
                if self.position and crossover(self.sma2, self.sma1):
                    self.position.close(portion=.5)

        bt = Backtest(GOOG, SmaCross, spread=.002)
        bt.run()

    def test_close_orders_from_last_strategy_iteration(self):
        class S(_S):
            def next(self):
                if not self.position:
                    self.buy()
                elif len(self.data) == len(SHORT_DATA):
                    self.position.close()

        with self.assertWarnsRegex(UserWarning, 'finalize_trades'):
            self.assertTrue(Backtest(SHORT_DATA, S, finalize_trades=False).run()._trades.empty)
        self.assertFalse(Backtest(SHORT_DATA, S, finalize_trades=True).run()._trades.empty)

    def test_check_adjusted_price_when_placing_order(self):
        class S(_S):
            def next(self):
                self.buy(tp=self.data.Close * 1.01)

        self.assertRaises(ValueError, Backtest(SHORT_DATA, S, spread=.02).run)


class TestStrategy(TestCase):
    @staticmethod
    def _Backtest(strategy_coroutine, data=SHORT_DATA, **kwargs):
        class S(Strategy):
            def init(self):
                self.step = strategy_coroutine(self)

            def next(self):
                try_(self.step.__next__, None, StopIteration)

        return Backtest(data, S, **kwargs)

    def test_position(self):
        def coroutine(self):
            yield self.buy()

            assert self.position
            assert self.position.is_long
            assert not self.position.is_short
            assert self.position.size > 0
            assert self.position.pl
            assert self.position.pl_pct

            yield self.position.close()

            assert not self.position
            assert not self.position.is_long
            assert not self.position.is_short
            assert not self.position.size
            assert not self.position.pl
            assert not self.position.pl_pct

        self._Backtest(coroutine).run()

    def test_broker_hedging(self):
        def coroutine(self):
            yield self.buy(size=2)

            assert len(self.trades) == 1
            yield self.sell(size=1)

            assert len(self.trades) == 2

        self._Backtest(coroutine, hedging=True).run()

    def test_broker_exclusive_orders(self):
        def coroutine(self):
            yield self.buy(size=2)

            assert len(self.trades) == 1
            yield self.sell(size=3)

            assert len(self.trades) == 1
            assert self.trades[0].size == -3

        self._Backtest(coroutine, exclusive_orders=True).run()

    def test_trade_multiple_close(self):
        def coroutine(self):
            yield self.buy()

            assert self.trades
            self.trades[-1].close(1)
            self.trades[-1].close(.1)
            yield

        self._Backtest(coroutine).run()

    def test_close_trade_leaves_needsize_0(self):
        def coroutine(self):
            self.buy(size=1)
            self.buy(size=1)
            yield
            if self.position:
                self.sell(size=1)

        self._Backtest(coroutine).run()

    def test_stop_limit_order_price_is_stop_price(self):
        def coroutine(self):
            yield  # place both orders on the second bar
            self.buy(stop=112, limit=113, size=1)
            self.sell(stop=107, limit=105, size=1)
            yield

        stats = self._Backtest(coroutine).run()
        self.assertListEqual(stats._trades.filter(like='Price').stack().tolist(), [112, 107])

    def test_autoclose_trades_on_finish(self):
        def coroutine(self):
            yield self.buy()

        stats = self._Backtest(coroutine, finalize_trades=True).run()
        self.assertEqual(len(stats._trades), 1)

    def test_order_tag(self):
        def coroutine(self):
            yield self.buy(size=2, tag=1)
            yield self.sell(size=1, tag='s')
            yield self.sell(size=1)

            yield self.buy(tag=2)
            yield self.position.close()

        stats = self._Backtest(coroutine).run()
        self.assertEqual(list(stats._trades.Tag), [1, 1, 2])


class TestOptimize(TestCase):
    def test_optimize(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross)
        OPT_PARAMS = {'fast': range(2, 5, 2), 'slow': [2, 5, 7, 9]}

        self.assertRaises(ValueError, bt.optimize)
        self.assertRaises(ValueError, bt.optimize, maximize='missing key', **OPT_PARAMS)
        self.assertRaises(ValueError, bt.optimize, maximize='missing key', **OPT_PARAMS)
        self.assertRaises(TypeError, bt.optimize, maximize=15, **OPT_PARAMS)
        self.assertRaises(TypeError, bt.optimize, constraint=15, **OPT_PARAMS)
        self.assertRaises(ValueError, bt.optimize, constraint=lambda d: False, **OPT_PARAMS)
        self.assertRaises(ValueError, bt.optimize, return_optimization=True, **OPT_PARAMS)

        res = bt.optimize(**OPT_PARAMS)
        self.assertIsInstance(res, pd.Series)

        default_maximize = inspect.signature(bt.optimize).parameters['maximize'].default
        res2 = bt.optimize(**OPT_PARAMS, maximize=lambda s: s[default_maximize])
        self.assertDictEqual(res.filter(regex='^[^_]').fillna(-1).to_dict(),
                             res2.filter(regex='^[^_]').fillna(-1).to_dict())

        res3, heatmap = bt.optimize(**OPT_PARAMS, return_heatmap=True,
                                    constraint=lambda d: d.slow > 2 * d.fast)
        self.assertIsInstance(heatmap, pd.Series)
        self.assertEqual(len(heatmap), 4)
        self.assertEqual(heatmap.name, default_maximize)

        with _tempfile() as f:
            bt.plot(filename=f, open_browser=False)

    def test_method_sambo(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross, finalize_trades=True)
        res, heatmap, sambo_results = bt.optimize(
            fast=range(2, 20), slow=np.arange(2, 20, dtype=object),
            constraint=lambda p: p.fast < p.slow,
            max_tries=30,
            method='sambo',
            return_optimization=True,
            return_heatmap=True,
            random_state=2)
        self.assertIsInstance(res, pd.Series)
        self.assertIsInstance(heatmap, pd.Series)
        self.assertGreater(heatmap.max(), 1.1)
        self.assertGreater(heatmap.min(), -2)
        self.assertEqual(-sambo_results.fun, heatmap.max())
        self.assertEqual(heatmap.index.tolist(), heatmap.dropna().index.unique().tolist())

    def test_max_tries(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross)
        OPT_PARAMS = {'fast': range(2, 10, 2), 'slow': [2, 5, 7, 9]}
        for method, max_tries, random_state in (('grid', 5, 0),
                                                ('grid', .3, 0),
                                                ('sambo', 6, 0),
                                                ('sambo', .42, 0)):
            with self.subTest(method=method,
                              max_tries=max_tries,
                              random_state=random_state):
                _, heatmap = bt.optimize(max_tries=max_tries,
                                         method=method,
                                         random_state=random_state,
                                         return_heatmap=True,
                                         **OPT_PARAMS)
                self.assertEqual(len(heatmap), 6)

    def test_optimize_invalid_param(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross)
        self.assertRaises(AttributeError, bt.optimize, foo=range(3))
        self.assertRaises(ValueError, bt.optimize, fast=[])

    def test_optimize_no_trades(self):
        bt = Backtest(GOOG, SmaCross)
        stats = bt.optimize(fast=[3], slow=[3])
        self.assertTrue(stats.isnull().any())

    def test_optimize_speed(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross)
        start = time.process_time()
        bt.optimize(fast=range(2, 20, 2), slow=range(10, 40, 2))
        end = time.process_time()
        print(end - start)
        handicap = 5 if 'win' in sys.platform else .1
        self.assertLess(end - start, .3 + handicap)


class TestFirstBarExecution(TestCase):
    """`Strategy.next()` runs on the earliest bar where every indicator is valid, including bar 0.

    Orders decided on a bar are processed by the broker on the following bar only, so deciding on the first bar never
    fills with prices of that same bar (except `trade_on_close`, which by definition fills at the deciding bar's close).
    """
    DATA = SHORT_DATA.iloc[:6]

    @staticmethod
    def _run(decide, data=None, **kwargs):
        calls = []

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                calls.append(len(self.data) - 1)
                decide(self, len(self.data) - 1)

        stats = Backtest(TestFirstBarExecution.DATA if data is None else data, S, **kwargs).run()
        return stats, calls

    def test_next_is_called_on_the_first_bar_without_indicators(self):
        _, calls = self._run(lambda strategy, bar: None)
        self.assertEqual(calls, list(range(len(self.DATA))))

    def test_first_bar_market_order_fills_at_the_next_open(self):
        def decide(strategy, bar):
            if bar == 0:
                strategy.buy(size=1)

        stats, _ = self._run(decide)
        trade = stats._trades.iloc[0]
        self.assertEqual(trade.EntryBar, 1)
        self.assertEqual(trade.EntryPrice, self.DATA.Open.iloc[1])
        self.assertEqual(stats._equity_curve.Equity.iloc[0], 10_000)  # nothing filled on the deciding bar

    def test_first_bar_limit_stop_and_bracket_orders_are_evaluated_from_the_next_bar(self):
        first = self.DATA.iloc[0]
        self.assertTrue((self.DATA.Low.iloc[1:] > first.Low).all())  # only bar 0 itself reaches its low

        def run(place):
            return self._run(lambda strategy, bar: place(strategy) if bar == 0 else None)[0]._trades

        # a limit the deciding bar's own low satisfies must not fill with that bar's prices
        self.assertTrue(run(lambda strategy: strategy.buy(size=1, limit=first.Low)).empty)
        # a stop the deciding bar's own high reached triggers only on a later bar, at that bar's prices
        second = self.DATA.iloc[1]
        self.assertGreaterEqual(second.High, first.High)
        stop = run(lambda strategy: strategy.buy(size=1, stop=first.High)).iloc[0]
        self.assertEqual((stop.EntryBar, stop.EntryPrice), (1, max(second.Open, first.High)))
        self.assertTrue(run(lambda strategy: strategy.buy(size=1, stop=self.DATA.High.max() + 1)).empty)
        bracket = run(lambda strategy: strategy.buy(size=1, sl=first.Low * .5, tp=first.High * 2)).iloc[0]
        self.assertEqual((bracket.EntryBar, bracket.EntryPrice), (1, self.DATA.Open.iloc[1]))

    def test_warm_up_still_delays_next_until_every_indicator_is_valid(self):
        seen = []

        class S(Strategy):
            def init(self):
                self.sma = self.I(SMA, self.data.Close, 3)

            def next(self):
                seen.append((len(self.data) - 1, self.sma[-1]))

        Backtest(self.DATA, S).run()
        self.assertEqual(seen[0][0], 2)  # SMA(3) is first valid on bar 2
        self.assertTrue(all(np.isfinite(value) for _, value in seen))

    def test_trade_on_close_fills_a_first_bar_decision_at_that_bar_close(self):
        def decide(strategy, bar):
            if bar in (0, 2):
                strategy.buy(size=1)

        stats, _ = self._run(decide, trade_on_close=True)
        first, later = stats._trades.iloc[0], stats._trades.iloc[1]
        self.assertEqual((first.EntryBar, first.EntryPrice), (0, self.DATA.Close.iloc[0]))
        self.assertEqual((later.EntryBar, later.EntryPrice), (2, self.DATA.Close.iloc[2]))

    def test_first_bar_reversal_behaves_like_any_later_bar(self):
        def decide(strategy, bar):
            if bar == 0:
                strategy.buy()
            elif bar == 1:
                strategy.sell()

        stats, _ = self._run(decide, exclusive_orders=True)
        long_trade, short_trade = stats._trades.iloc[0], stats._trades.iloc[1]
        self.assertEqual((long_trade.EntryBar, long_trade.ExitBar), (1, 2))
        self.assertGreater(long_trade.Size, 0)
        self.assertEqual((short_trade.EntryBar, short_trade.EntryPrice), (2, self.DATA.Open.iloc[2]))
        self.assertLess(short_trade.Size, 0)

    def test_orders_placed_in_init_keep_their_fill_timing_after_indicator_warm_up(self):
        # SMA(3) is first valid on bar 2, so next() starts there; an init() order is first processed on the
        # following simulation bar, exactly as when next() started one bar after the warm-up
        warm_up = 2
        for trade_on_close, entry_bar, price in ((False, warm_up + 1, self.DATA.Open.iloc[warm_up + 1]),
                                                 (True, warm_up, self.DATA.Close.iloc[warm_up])):
            seen = []

            class S(Strategy):
                def init(self):
                    self.sma = self.I(SMA, self.data.Close, 3)
                    self.buy(size=1)

                def next(self):
                    seen.append(len(self.data) - 1)

            trade = Backtest(self.DATA, S, trade_on_close=trade_on_close).run()._trades.iloc[0]
            self.assertEqual(seen[0], warm_up)
            self.assertEqual((trade.EntryBar, trade.EntryPrice), (entry_bar, price))

    def test_orders_placed_in_init_keep_filling_on_the_second_bar(self):
        for trade_on_close, price in ((False, self.DATA.Open.iloc[1]), (True, self.DATA.Close.iloc[0])):
            class S(Strategy):
                def init(self):
                    self.buy(size=1)

                def next(self):
                    pass

            trade = Backtest(self.DATA, S, trade_on_close=trade_on_close).run()._trades.iloc[0]
            self.assertEqual(trade.EntryPrice, price)
            self.assertEqual(trade.EntryBar, 0 if trade_on_close else 1)


class TestPlot(TestCase):
    def test_plot_before_run(self):
        bt = Backtest(GOOG, SmaCross)
        self.assertRaises(RuntimeError, bt.plot)

    def test_file_size(self):
        bt = Backtest(GOOG, SmaCross)
        bt.run()
        with _tempfile() as f:
            bt.plot(filename=f[:-len('.html')], open_browser=False)
            self.assertLess(os.path.getsize(f), 500000)

    def test_params(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross)
        bt.run()
        with _tempfile() as f:
            for p in dict(plot_volume=False,  # noqa: C408
                          plot_equity=False,
                          plot_return=True,
                          plot_pl=False,
                          plot_drawdown=True,
                          plot_trades=False,
                          superimpose=False,
                          resample='1W',
                          smooth_equity=False,
                          relative_equity=False,
                          reverse_indicators=True,
                          show_legend=False).items():
                with self.subTest(param=p[0]):
                    bt.plot(**dict([p]), filename=f, open_browser=False)

    def test_hide_legend(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross)
        bt.run()
        with _tempfile() as f:
            bt.plot(filename=f, show_legend=False)
            # Give browser time to open before tempfile is removed
            time.sleep(5)

    def test_resolutions(self):
        with _tempfile() as f:
            for rule in 'ms s min h D W ME'.split():
                with self.subTest(rule=rule):
                    df = EURUSD.iloc[:2].resample(rule).agg(OHLCV_AGG).dropna().iloc[:1100]
                    bt = Backtest(df, SmaCross)
                    # Data is shorter than the SMA windows
                    with self.assertWarnsRegex(UserWarning, 'all NaN'):
                        bt.run()
                    bt.plot(filename=f, open_browser=False)

    def test_range_axis(self):
        df = GOOG.iloc[:100].reset_index(drop=True)

        # Warm-up. CPython bug bpo-29620.
        try:
            with self.assertWarns(UserWarning):
                Backtest(df, SmaCross)
        except RuntimeError:
            pass

        with self.assertWarns(UserWarning):
            bt = Backtest(df, SmaCross)
        bt.run()
        with _tempfile() as f:
            bt.plot(filename=f, open_browser=False)

    def test_preview(self):
        class Strategy(SmaCross):
            def init(self):
                super().init()

                def ok(x):
                    return x

                self.a = self.I(SMA, self.data.Open, 5, overlay=False, name='ok')
                self.b = self.I(ok, np.random.random(len(self.data.Open)))

        bt = Backtest(GOOG, Strategy)
        bt.run()
        with _tempfile() as f:
            bt.plot(filename=f, plot_drawdown=True, smooth_equity=True)
            # Give browser time to open before tempfile is removed
            time.sleep(5)

    def test_wellknown(self):
        class S(_S):
            def next(self):
                date = self.data.index[-1]
                if date == pd.Timestamp('Thu 19 Oct 2006'):
                    self.buy(stop=484, limit=466, size=100)
                elif date == pd.Timestamp('Thu 30 Oct 2007'):
                    self.position.close()
                elif date == pd.Timestamp('Tue 11 Nov 2008'):
                    self.sell(stop=self.data.Low,
                              limit=324.90,  # High from 14 Nov
                              size=200)

        bt = Backtest(GOOG, S, margin=.1)
        stats = bt.run()
        trades = stats['_trades']

        self.assertAlmostEqual(stats['Equity Peak [$]'], 46961)
        self.assertEqual(stats['Equity Final [$]'], 0)
        self.assertEqual(len(trades), 2)
        assert trades[['EntryTime', 'ExitTime']].equals(
            pd.DataFrame({'EntryTime': pd.to_datetime(['2006-11-01', '2008-11-14']),
                          'ExitTime': pd.to_datetime(['2007-10-31', '2009-09-21'])}))
        assert trades['PnL'].round().equals(pd.Series([23469., -34420.]))

        with _tempfile() as f:
            bt.plot(filename=f, plot_drawdown=True, smooth_equity=False)
            # Give browser time to open before tempfile is removed
            time.sleep(1)

    def test_resample(self):
        class S(SmaCross):
            def init(self):
                self.I(lambda: ['x'] * len(self.data))  # categorical indicator, GH-309
                super().init()

        bt = Backtest(GOOG, S)
        bt.run()
        import backtesting._plotting
        with _tempfile() as f, \
                patch(backtesting._plotting, '_MAX_CANDLES', 10), \
                self.assertWarns(UserWarning):
            bt.plot(filename=f, resample=True)
            # Give browser time to open before tempfile is removed
            time.sleep(1)

    def test_resample_trades_vectorized(self):
        """Vectorized trade resampling produces correct weighted returns and bar indices."""
        import backtesting._plotting as _plotting
        from backtesting.lib import OHLCV_AGG, TRADES_AGG, _EQUITY_AGG

        bt = Backtest(GOOG, SmaCross)
        results = bt.run()
        trades = results['_trades']
        if trades.empty:
            return

        df_ohlcv = bt._data.copy()
        equity_data = results['_equity_curve'].copy(deep=False)

        freq = '1ME'
        df_resampled = df_ohlcv.resample(
            freq, label='right').agg(OHLCV_AGG).dropna()

        # --- Reference (original callback) implementation ---
        def _weighted_returns(s, _trades=trades):
            d = _trades.loc[s.index]
            return (
                (d['Size'].abs() * d['ReturnPct'])
                / d['Size'].abs().sum()
            ).sum()

        def _group_trades(column):
            def f(s,
                  new_index=pd.Index(
                      df_resampled.index.astype(np.int64)),
                  bars=trades[column]):
                if s.size:
                    mean_time = int(
                        bars.loc[s.index].astype(np.int64).mean()
                    )
                    return new_index.get_indexer(
                        [mean_time], method='nearest')[0]
            return f

        ref = trades.assign(count=1).resample(
            freq, on='ExitTime', label='right',
        ).agg(dict(
            TRADES_AGG,
            ReturnPct=_weighted_returns,
            count='sum',
            EntryBar=_group_trades('EntryTime'),
            ExitBar=_group_trades('ExitTime'),
        )).dropna()

        # --- Vectorized implementation ---
        eq = equity_data.resample(
            freq, label='right').agg(_EQUITY_AGG).dropna(how='all')
        _, _, _, vec_trades = _plotting._maybe_resample_data(
            freq, df_ohlcv.copy(), [], eq, trades.copy(),
        )

        cols = ['Size', 'EntryBar', 'ExitBar', 'EntryPrice',
                'ExitPrice', 'PnL', 'ReturnPct', 'count']
        assert_frame_equal(
            vec_trades[cols].reset_index(drop=True),
            ref[cols].reset_index(drop=True),
            check_exact=False, check_dtype=False, atol=1e-10,
        )

    def test_indicator_name(self):
        test_self = self

        class S(Strategy):
            def init(self):
                def _SMA():
                    return SMA(self.data.Close, 5), SMA(self.data.Close, 10)

                test_self.assertRaises(TypeError, self.I, _SMA, name=42)
                test_self.assertRaises(ValueError, self.I, _SMA, name=("SMA One", ))
                test_self.assertRaises(
                    ValueError, self.I, _SMA, name=("SMA One", "SMA Two", "SMA Three"))

                for overlay in (True, False):
                    self.I(SMA, self.data.Close, 5, overlay=overlay)
                    self.I(SMA, self.data.Close, 5, name="My SMA", overlay=overlay)
                    self.I(SMA, self.data.Close, 5, name=("My SMA", ), overlay=overlay)
                    self.I(_SMA, overlay=overlay)
                    self.I(_SMA, name="My SMA", overlay=overlay)
                    self.I(_SMA, name=("SMA One", "SMA Two"), overlay=overlay)

            def next(self):
                pass

        bt = Backtest(GOOG, S)
        bt.run()
        with _tempfile() as f:
            bt.plot(filename=f,
                    plot_drawdown=False, plot_equity=False, plot_pl=False, plot_volume=False,
                    open_browser=False)

    def test_indicator_color(self):
        class S(Strategy):
            def init(self):
                a = self.I(SMA, self.data.Close, 5, overlay=True, color='red')
                b = self.I(SMA, self.data.Close, 10, overlay=False, color='blue')
                self.I(lambda: (a, b), overlay=False, color=('green', 'orange'))

            def next(self):
                pass

        bt = Backtest(GOOG, S)
        bt.run()
        with _tempfile() as f:
            bt.plot(filename=f,
                    plot_drawdown=False, plot_equity=False, plot_pl=False, plot_volume=False,
                    open_browser=False)

    def test_indicator_scatter(self):
        class S(Strategy):
            def init(self):
                self.I(SMA, self.data.Close, 5, overlay=True, scatter=True)
                self.I(SMA, self.data.Close, 10, overlay=False, scatter=True)

            def next(self):
                pass

        bt = Backtest(GOOG, S)
        bt.run()
        with _tempfile() as f:
            bt.plot(filename=f,
                    plot_drawdown=False, plot_equity=False, plot_pl=False, plot_volume=False,
                    open_browser=False)


class TestLib(TestCase):
    def test_barssince(self):
        self.assertEqual(barssince(np.r_[1, 0, 0]), 2)
        self.assertEqual(barssince(np.r_[0, 0, 0]), np.inf)
        self.assertEqual(barssince(np.r_[0, 0, 0], 0), 0)

    def test_cross(self):
        self.assertTrue(cross([0, 1], [1, 0]))
        self.assertTrue(cross([1, 0], [0, 1]))
        self.assertFalse(cross([1, 0], [1, 0]))

    def test_crossover(self):
        self.assertTrue(crossover([0, 1], [1, 0]))
        self.assertTrue(crossover([0, 1], .5))
        self.assertTrue(crossover([0, 1], pd.Series([.5, .5], index=[5, 6])))
        self.assertFalse(crossover([1, 0], [1, 0]))
        self.assertFalse(crossover([0], [1]))

    def test_quantile(self):
        self.assertEqual(quantile(np.r_[1, 3, 2], .5), 2)
        self.assertEqual(quantile(np.r_[1, 3, 2]), .5)

    def test_resample_apply(self):
        res = resample_apply('D', SMA, EURUSD.Close, 10)
        self.assertEqual(res.name, 'C[D]')
        self.assertEqual(res.count() / res.size, .9634)
        np.testing.assert_almost_equal(res.iloc[-48:].unique().tolist(),
                                       [1.242643, 1.242381, 1.242275],
                                       decimal=6)

        def resets_index(*args):
            return pd.Series(SMA(*args).values)

        res2 = resample_apply('D', resets_index, EURUSD.Close, 10)
        self.assertTrue((res.dropna() == res2.dropna()).all())
        self.assertTrue((res.index == res2.index).all())

        res3 = resample_apply('D', None, EURUSD)
        self.assertIn('Volume', res3)

        res3 = resample_apply('D', lambda df: (df.Close, df.Close), EURUSD)
        self.assertIsInstance(res3, pd.DataFrame)

    def test_plot_heatmaps(self):
        bt = Backtest(GOOG, SmaCross)
        stats, heatmap = bt.optimize(fast=range(2, 7, 2),
                                     slow=range(7, 15, 2),
                                     return_heatmap=True)
        with _tempfile() as f:
            for agg in ('mean',
                        lambda x: np.percentile(x, 75)):
                plot_heatmaps(heatmap, agg, filename=f, open_browser=False)

            # Preview
            plot_heatmaps(heatmap, filename=f)
            time.sleep(5)

    def test_random_ohlc_data(self):
        generator = random_ohlc_data(GOOG, frac=1)
        new_data = next(generator)
        self.assertEqual(list(new_data.index), list(GOOG.index))
        self.assertEqual(new_data.shape, GOOG.shape)
        self.assertEqual(list(new_data.columns), list(GOOG.columns))

    def test_compute_stats(self):
        stats = Backtest(GOOG, SmaCross).run()
        only_long_trades = stats._trades[stats._trades.Size > 0]
        long_stats = compute_stats(stats=stats, trades=only_long_trades,
                                   data=GOOG, risk_free_rate=.02)
        self.assertNotEqual(list(stats._equity_curve.Equity),
                            list(long_stats._equity_curve.Equity))
        self.assertNotEqual(stats['Sharpe Ratio'], long_stats['Sharpe Ratio'])
        self.assertEqual(long_stats['# Trades'], len(only_long_trades))
        self.assertEqual(stats._strategy, long_stats._strategy)
        assert_frame_equal(long_stats._trades, only_long_trades)

    def test_SignalStrategy(self):
        class S(SignalStrategy):
            def init(self):
                sma = self.data.Close.s.rolling(10).mean()
                self.set_signal(self.data.Close > sma,
                                self.data.Close < sma)

        with self.assertWarnsRegex(UserWarning, 'margin'):
            stats = Backtest(GOOG, S).run()
        self.assertIn(stats['# Trades'], (1179, 1182))  # varies on different archs?

    def test_TrailingStrategy(self):
        class S(TrailingStrategy):
            def init(self):
                super().init()
                self.set_atr_periods(40)
                self.set_trailing_pct(.1)
                self.set_trailing_sl(3)
                self.sma = self.I(lambda: self.data.Close.s.rolling(10).mean())

            def next(self):
                super().next()
                if not self.position and self.data.Close > self.sma:
                    self.buy()

        stats = Backtest(GOOG, S).run()
        self.assertEqual(stats['# Trades'], 57)

    def test_FractionalBacktest(self):
        ubtc_bt = FractionalBacktest(
            BTCUSD['2015':], SmaCross, fractional_unit=1 / 1e6, cash=100,
            finalize_trades=True)
        stats = ubtc_bt.run(fast=2, slow=3)
        self.assertEqual(stats['# Trades'], 42)
        trades = stats['_trades']
        self.assertEqual(len(trades), 42)
        trade = trades.iloc[0]
        self.assertAlmostEqual(trade['EntryPrice'], 236.69)
        self.assertAlmostEqual(stats['_strategy']._indicators[0][trade['EntryBar']], 234.14)

    def test_MultiBacktest(self):
        import backtesting
        assert callable(getattr(backtesting, 'Pool', None)), backtesting.__dict__
        for start_method in mp.get_all_start_methods():
            with self.subTest(start_method=start_method), \
                    patch(backtesting, 'Pool', mp.get_context(start_method).Pool):
                start_time = time.monotonic()
                btm = MultiBacktest([GOOG, EURUSD, BTCUSD], SmaCross, cash=100_000,
                                    finalize_trades=True)
                res = btm.run(fast=2)
                self.assertIsInstance(res, pd.DataFrame)
                self.assertEqual(res.columns.tolist(), [0, 1, 2])
                heatmap = btm.optimize(fast=[2, 4], slow=[10, 20])
                self.assertIsInstance(heatmap, pd.DataFrame)
                self.assertEqual(heatmap.columns.tolist(), [0, 1, 2])
                print(start_method, time.monotonic() - start_time)
        plot_heatmaps(heatmap.mean(axis=1), open_browser=False)

    class SometimesNoTrade(Strategy):
        def init(self):
            self._will_trade = len(self.data) == 20

        def next(self):
            if not self._will_trade:
                return
            if self.position:
                self.position.close()
            elif not self.closed_trades:
                self.buy()

    def test_MultiBacktest_handles_mixed_no_trade_results(self):
        btm = MultiBacktest([GOOG.iloc[:20], GOOG.iloc[:21], GOOG.iloc[:22]],
                            self.SometimesNoTrade, cash=100_000)
        res = btm.run()
        self.assertEqual(res.loc['# Trades'].tolist(), [1, 0, 0])
        self.assertNotIsInstance(res.iloc[0, 0], pd.Series)


class TestUtil(TestCase):
    def test_as_str(self):
        def func():
            pass

        class Class:
            def __call__(self):
                pass

        self.assertEqual(_as_str('4'), '4')
        self.assertEqual(_as_str(4), '4')
        self.assertEqual(_as_str(_Indicator([1, 2], name='x')), 'x')
        self.assertEqual(_as_str(func), 'func')
        self.assertEqual(_as_str(Class), 'Class')
        self.assertEqual(_as_str(Class()), 'Class')
        self.assertEqual(_as_str(pd.Series([1, 2], name='x')), 'x')
        self.assertEqual(_as_str(pd.DataFrame()), 'df')
        self.assertEqual(_as_str(lambda x: x), 'λ')
        for s in ('Open', 'High', 'Low', 'Close', 'Volume'):
            self.assertEqual(_as_str(_Array([1], name=s)), s[0])

    def test_patch(self):
        class Object:
            pass
        o = Object()
        o.attr = False
        with patch(o, 'attr', True):
            self.assertTrue(o.attr)
        self.assertFalse(o.attr)

    def test_pandas_accessors(self):
        class S(Strategy):
            def init(self):
                close, index = self.data.Close, self.data.index
                assert close.s.equals(pd.Series(close, index=index))
                assert self.data.df['Close'].equals(pd.Series(close, index=index))
                self.data.df['new_key'] = 2 * close

            def next(self):
                close, index = self.data.Close, self.data.index
                assert close.s.equals(pd.Series(close, index=index))
                assert self.data.df['Close'].equals(pd.Series(close, index=index))
                assert self.data.df['new_key'].equals(pd.Series(self.data.new_key, index=index))

        Backtest(GOOG.iloc[:20], S).run()

    def test_indicators_picklable(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross)  # Long enough for SmaCross indicators
        with ProcessPoolExecutor() as executor:
            stats = executor.submit(_Backtest.run, bt).result()
        assert stats._strategy._indicators[0]._opts, '._opts and .name were not unpickled'
        bt.plot(results=stats, resample='2D', open_browser=False)


class TestDocs(TestCase):
    DOCS_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'doc')

    @unittest.skipUnless(os.path.isdir(DOCS_DIR), "docs dir doesn't exist")
    @unittest.skipUnless(sys.platform.startswith('linux'), "test_examples requires mp.start_method=fork")
    def test_examples(self):
        import backtesting
        examples = glob(os.path.join(self.DOCS_DIR, 'examples', '*.py'))
        self.assertGreaterEqual(len(examples), 4)
        with chdir(gettempdir()), \
                patch(backtesting, 'Pool', mp.get_context('fork').Pool), \
                self.assertWarnsRegex(UserWarning, 'finalize_trades=True'):
            for file in examples:
                with self.subTest(example=os.path.basename(file)):
                    run_path(file)

    def test_backtest_run_docstring_contains_stats_keys(self):
        stats = Backtest(GOOG.iloc[:100], SmaCross).run()  # Long enough for SmaCross indicators
        for key in stats.index:
            self.assertIn(key, _Backtest.run.__doc__)

    def test_readme_contains_stats_keys(self):
        with open(os.path.join(os.path.dirname(__file__),
                               '..', '..', 'README.md')) as f:
            readme = f.read()
        stats = Backtest(GOOG.iloc[:100], SmaCross).run()  # Long enough for SmaCross indicators
        for key in stats.index:
            self.assertIn(key, readme)


class TestRegressions(TestCase):
    def test_gh_521(self):
        class S(_S):
            def next(self):
                if self.data.Close[-1] == 100:
                    self.buy(size=1, sl=90)

        arr = np.r_[100, 100, 100, 50, 50]
        df = pd.DataFrame({'Open': arr, 'High': arr, 'Low': arr, 'Close': arr})
        with self.assertWarnsRegex(UserWarning, 'index is not datetime'):
            bt = Backtest(df, S, cash=100, trade_on_close=True)
        with self.assertWarnsRegex(UserWarning, 'margin'):
            self.assertEqual(bt.run()._trades['ExitPrice'][0], 50)

    def test_stats_annualized(self):
        stats = Backtest(GOOG.resample('W').agg(OHLCV_AGG), SmaCross).run()
        self.assertFalse(np.isnan(stats['Return (Ann.) [%]']))
        self.assertEqual(round(stats['Return (Ann.) [%]']), -3)

    def test_cancel_orders(self):
        class S(_S):
            def next(self):
                self.buy(sl=1, tp=1e3)
                if self.position:
                    self.position.close()
                    for order in self.orders:
                        order.cancel()

        Backtest(SHORT_DATA, S).run()

    def test_trade_on_close_closes_trades_on_close(self):
        def coro(strat):
            yield  # decide on the second bar
            yield strat.buy(size=1, sl=90) and strat.buy(size=1, sl=80)
            assert len(strat.trades) == 2
            yield strat.trades[0].close()
            yield

        arr = np.r_[100, 101, 102, 50, 51]
        df = pd.DataFrame({
            'Open': arr - 10,
            'Close': arr, 'High': arr, 'Low': arr})
        with self.assertWarnsRegex(UserWarning, 'index is not datetime'):
            trades = TestStrategy._Backtest(coro, df, cash=250, trade_on_close=True).run()._trades
            # trades = Backtest(df, S, cash=250, trade_on_close=True).run()._trades
            self.assertEqual(trades['EntryBar'][0], 1)
            self.assertEqual(trades['ExitBar'][0], 2)
            self.assertEqual(trades['EntryPrice'][0], 101)
            self.assertEqual(trades['ExitPrice'][0], 102)
            self.assertEqual(trades['EntryBar'][1], 1)
            self.assertEqual(trades['ExitBar'][1], 3)
            self.assertEqual(trades['EntryPrice'][1], 101)
            self.assertEqual(trades['ExitPrice'][1], 40)

        with self.assertWarnsRegex(UserWarning, 'index is not datetime'):
            trades = TestStrategy._Backtest(coro, df, cash=250, trade_on_close=False).run()._trades
            # trades = Backtest(df, S, cash=250, trade_on_close=False).run()._trades
            self.assertEqual(trades['EntryBar'][0], 2)
            self.assertEqual(trades['ExitBar'][0], 3)
            self.assertEqual(trades['EntryPrice'][0], 92)
            self.assertEqual(trades['ExitPrice'][0], 40)
            self.assertEqual(trades['EntryBar'][1], 2)
            self.assertEqual(trades['ExitBar'][1], 3)
            self.assertEqual(trades['EntryPrice'][1], 92)
            self.assertEqual(trades['ExitPrice'][1], 40)

    def test_trades_dates_match_prices(self):
        bt = Backtest(EURUSD, SmaCross, trade_on_close=True)
        trades = bt.run()._trades
        self.assertEqual(EURUSD.Close[trades['ExitTime']].tolist(),
                         trades['ExitPrice'].tolist())

    def test_sl_always_before_tp(self):
        class S(_S):
            def next(self):
                i = len(self.data.index)
                if i == 4:
                    self.buy()
                if i == 5:
                    t = self.trades[0]
                    t.sl = 105
                    t.tp = 107.9

        trades = Backtest(SHORT_DATA, S).run()._trades
        self.assertEqual(trades['ExitPrice'].iloc[0], 104.95)

    def test_stop_entry_and_tp_in_same_bar(self):
        class S(_S):
            def next(self):
                i = len(self.data.index)
                if i == 3:
                    self.sell(stop=108, tp=105, sl=113)

        trades = Backtest(SHORT_DATA, S).run()._trades
        self.assertEqual(trades['ExitBar'].iloc[0], 3)
        self.assertEqual(trades['ExitPrice'].iloc[0], 105)

    def test_optimize_datetime_index_with_timezone(self):
        data: pd.DataFrame = GOOG.iloc[:100]
        data.index = data.index.tz_localize('Asia/Kolkata')
        res = Backtest(data, SmaCross).optimize(fast=range(2, 3), slow=range(4, 5))
        self.assertGreater(res['# Trades'], 0)

    def test_optimize_range_index(self):
        # Data is passed to the workers through shared memory sized by
        # `.nbytes`, which a lazy RangeIndex under-reports, previously raising
        # "TypeError: buffer is too small for requested array". See GH issue #1237.
        data: pd.DataFrame = GOOG.iloc[:100].reset_index(drop=True)
        with self.assertWarnsRegex(UserWarning, 'index is not datetime'):
            bt = Backtest(data, SmaCross)
        res = bt.optimize(fast=range(2, 3), slow=range(4, 5))
        self.assertGreater(res['# Trades'], 0)

    def test_sl_tp_values_in_trades_df(self):
        class S(_S):
            def next(self):
                self.next = lambda: None
                self.buy(size=1, tp=111)
                self.buy(size=1, sl=99)

        trades = Backtest(SHORT_DATA, S).run()._trades
        self.assertEqual(trades['SL'].fillna(0).tolist(), [0, 99])
        self.assertEqual(trades['TP'].fillna(0).tolist(), [111, 0])

    def test_sl_value_in_trades_df_when_gapped_through(self):
        # An SL that is gapped through (the bar opens beyond the stop, so the
        # fill price is worse than the stop price) must still be recorded in
        # stats._trades["SL"]. See GH issue #1340.
        class S(_S):
            def next(self):
                if len(self.data.index) == 9:
                    self.buy(size=1, sl=99.5)

        trades = Backtest(SHORT_DATA, S).run()._trades
        self.assertEqual(len(trades), 1)
        trade = trades.iloc[0]
        # The long SL (99.5) is gapped through on the next bar's open, so the
        # trade exits at that worse market price rather than at the stop price.
        self.assertEqual(trade['ExitPrice'], 99.19)
        # ... yet the SL value must be preserved in the trades data frame.
        self.assertEqual(trade['SL'], 99.5)


class TestBugFixes(TestCase):
    """Regression tests for the issues listed in BUG_REPORT.md."""

    class _OnBars(Strategy):
        """Calls `actions[bar](self)` on the given bars."""
        actions: dict = {}

        def init(self):
            pass

        def next(self):
            action = self.actions.get(len(self.data) - 1)
            if action:
                action(self)

    def _run(self, data, actions, **kwargs):
        return _Backtest(data, self._OnBars, **kwargs).run(actions=actions)

    def test_stats_long_short_trades(self):
        def orders(self):
            self.buy(size=1)

        stats = self._run(SHORT_DATA, {2: orders, 5: lambda s: s.position.close(),
                                       7: lambda s: s.sell(size=1)}, finalize_trades=True)
        self.assertEqual(stats['# Long Trades'], 1)
        self.assertEqual(stats['# Short Trades'], 1)
        self.assertEqual(stats['Long/Short Ratio'], 1)
        self.assertEqual(stats._trades['IsLong'].tolist(), [True, False])
        self.assertEqual(stats._trades['IsShort'].tolist(), [False, True])

        # Trades frames without IsLong/IsShort columns (e.g. user-supplied) still work
        trades = stats._trades.drop(columns=['IsLong', 'IsShort'])
        substats = compute_stats(stats=stats, trades=trades, data=SHORT_DATA)
        self.assertEqual(substats['# Long Trades'], 1)
        self.assertEqual(substats['# Short Trades'], 1)

    def test_exclusive_orders_cancels_all_previous_orders(self):
        def reverse(self):
            self.buy(size=2)
            self.sell(size=3)

        def record(self):
            self.position_size = self.position.size

        stats = self._run(SHORT_DATA, {2: lambda s: s.buy(size=1), 5: reverse, 7: record},
                          exclusive_orders=True, finalize_trades=True)
        self.assertEqual(stats._strategy.position_size, -3)

    def test_finalize_trades_closes_at_last_close_and_ignores_last_bar_orders(self):
        last = len(SHORT_DATA) - 1
        stats = self._run(SHORT_DATA, {2: lambda s: s.buy(size=1), last: lambda s: s.sell(size=5)},
                          finalize_trades=True)
        self.assertEqual(len(stats._trades), 1)
        self.assertFalse(stats._strategy.trades)
        self.assertFalse(stats._strategy.orders)
        trade = stats._trades.iloc[0]
        self.assertEqual((trade.ExitBar, trade.ExitPrice), (last, SHORT_DATA.Close.iloc[-1]))
        self.assertEqual(stats['Equity Final [$]'], 10_000 + trade.PnL)

    def test_compute_stats_trades_subset_credits_pnl_on_exit_bar(self):
        stats = self._run(SHORT_DATA, {2: lambda s: s.buy(size=1), 8: lambda s: s.position.close()})
        trade = stats._trades.iloc[0]
        equity = compute_stats(stats=stats, trades=stats._trades,
                               data=SHORT_DATA)._equity_curve.Equity
        self.assertTrue((equity.iloc[:trade.ExitBar] == 10_000).all())
        self.assertTrue((equity.iloc[trade.ExitBar:] == 10_000 + trade.PnL).all())

    def test_fixed_commission_not_double_counted_on_partial_close(self):
        stats = self._run(SHORT_DATA, {2: lambda s: s.buy(size=10),
                                       5: lambda s: s.trades[0].close(.5),
                                       8: lambda s: s.trades[0].close()},
                          commission=(100, 0))
        # One entry fee and two exit fees were paid
        self.assertEqual(stats['Commissions [$]'], 300)
        self.assertAlmostEqual(stats['Equity Final [$]'], 10_000 + stats._trades.PnL.sum())

    def test_FractionalBacktest_validates_data(self):
        def run(data):
            return FractionalBacktest(data, SmaCross, fractional_unit=1,
                                      finalize_trades=True).run()

        expected = run(GOOG.iloc[:100])
        with self.assertWarnsRegex(UserWarning, 'not sorted'):
            unsorted = run(GOOG.iloc[:100].iloc[::-1])
        self.assertEqual(unsorted['Equity Final [$]'], expected['Equity Final [$]'])
        no_volume = run(GOOG.iloc[:100].drop(columns='Volume'))
        self.assertEqual(no_volume['Equity Final [$]'], expected['Equity Final [$]'])

    def test_epoch_index_converted_to_datetime(self):
        for divisor in (10**9, 10**6, 10**3, 1):
            with self.subTest(divisor=divisor):
                df = GOOG.iloc[:100].copy()
                df.index = df.index.astype(np.int64) // divisor
                self.assertTrue(_Backtest(df, SmaCross)._data.index.equals(GOOG.index[:100]))

    def test_plot_without_drawdown(self):
        arr = np.r_[1, 1, 2, 3, 4.]
        df = pd.DataFrame({'Open': arr, 'High': arr, 'Low': arr, 'Close': arr},
                          index=pd.date_range('2020', periods=len(arr)))
        bt = _Backtest(df, self._OnBars)
        bt.run(actions={0: lambda s: s.buy(size=1), 2: lambda s: s.position.close()})
        with _tempfile() as f:
            bt.plot(filename=f, open_browser=False, superimpose=False)

    def test_resample_apply_outside_strategy(self):
        import subprocess
        code = ('from backtesting.lib import resample_apply; from backtesting.test import GOOG; '
                'print(len(resample_apply("W", None, GOOG.Close)))')
        out = subprocess.run([sys.executable, '-W', 'ignore', '-c', code],
                             capture_output=True, text=True, check=True).stdout
        self.assertEqual(int(out), len(GOOG))

    def test_all_nan_indicator_warns(self):
        class S(Strategy):
            def init(self):
                self.nan = self.I(lambda: np.full(len(self.data), np.nan))

            def next(self):
                pass

        with self.assertWarnsRegex(UserWarning, "'nan' are all NaN"):
            _Backtest(SHORT_DATA, S).run()

    def test_TrailingStrategy_has_no_lookahead(self):
        class S(TrailingStrategy):
            def init(self):
                super().init()
                self.set_atr_periods(10)
                self.set_trailing_sl(3)

            def next(self):
                super().next()
                if len(self.data) == 2:
                    self.buy(size=1)
                if len(self.data) == 8:
                    self.sl_during_warmup = self.trades[0].sl

        stats = Backtest(SHORT_DATA, S).run()
        self.assertIsNone(stats._strategy.sl_during_warmup)
        self.assertIsNotNone(stats._trades.SL.iloc[0])

    def test_shared_memory_manager_releases_all_segments(self):
        class FakeShm:
            def __init__(self, fail):
                self.fail, self.name, self._create, self.unlinked = fail, 'fake', True, False

            def close(self):
                if self.fail:
                    raise OSError

            def unlink(self):
                self.unlinked = True

        from backtesting._util import SharedMemoryManager
        smm = SharedMemoryManager()
        smm._shms = [FakeShm(True), FakeShm(False)]
        with self.assertRaises(OSError), self.assertWarns(ResourceWarning):
            smm.__exit__()
        self.assertTrue(smm._shms[1].unlinked)

    def test_pool_keeps_global_start_method(self):
        import backtesting
        before = mp.get_start_method(allow_none=True)
        with backtesting.Pool(1) as pool:
            self.assertEqual(pool.map(abs, [-1]), [1])
        self.assertEqual(mp.get_start_method(allow_none=True), before)

    def test_invalid_arguments_raise_value_error(self):
        for actions in ({1: lambda s: s.buy(size=-1)},
                        {1: lambda s: s.sell(size=1.5)},
                        {1: lambda s: s.buy(size=1), 3: lambda s: s.position.close(2)}):
            with self.subTest(), self.assertRaises(ValueError):
                self._run(SHORT_DATA, actions, finalize_trades=True)
        for kwargs in (dict(cash=0), dict(margin=2), dict(commission=(-1, 0)), dict(commission=.5)):
            with self.subTest(**kwargs), self.assertRaises(ValueError), \
                    warnings.catch_warnings():
                warnings.simplefilter('ignore', UserWarning)  # Prices larger than cash
                self._run(SHORT_DATA, {}, **kwargs)

    def test_randomized_grid_always_tests_something(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross)
        for seed in range(20):
            with self.subTest(seed=seed):
                stats = bt.optimize(fast=[2, 3], slow=[10, 20], max_tries=.01, random_state=seed)
                self.assertIn(stats._strategy.fast, (2, 3))

    def test_indicator_name_length_error(self):
        class S(Strategy):
            def init(self):
                self.I(lambda: None, name=['a', 'b'])

            def next(self):
                pass

        with self.assertRaises(ValueError):
            _Backtest(SHORT_DATA, S).run()

    def test_zero_exit_price(self):
        from backtesting.backtesting import Trade, _Broker
        index = pd.DatetimeIndex(['2025'])
        broker = _Broker(data=pd.DataFrame({'Close': [5.]}, index=index), cash=100, spread=0,
                         commission=0, margin=1, trade_on_close=False, hedging=False,
                         exclusive_orders=False, index=index)
        trade = Trade(broker, 2, 1., 0, None)._replace(exit_price=0., exit_bar=0)
        self.assertEqual(trade.pl, -2)
        self.assertEqual(trade.pl_pct, -1)
        self.assertEqual(trade.value, 0)
