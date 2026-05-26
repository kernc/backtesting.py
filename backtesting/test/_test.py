import inspect
import multiprocessing as mp
import os
import sys
import time
import unittest
import warnings
from concurrent.futures.process import ProcessPoolExecutor
from contextlib import contextmanager
from glob import glob
from runpy import run_path
from tempfile import NamedTemporaryFile, gettempdir
from unittest import TestCase

import numpy as np
import pandas as pd
from pandas.testing import assert_frame_equal

from backtesting import Backtest, PortfolioBacktest, Strategy
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
        self.assertEqual(stats['# Trades'], 131)

    def test_broker_params(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross,
                      cash=1000, spread=.01, margin=.1, trade_on_close=True)
        bt.run()

    def test_spread_commission(self):
        class S(Strategy):
            def init(self):
                self.done = False

            def next(self):
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
                         [9683.74, 9647.77])

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
                'Avg. Drawdown Duration': pd.Timedelta('41 days 00:00:00'),
                'Avg. Drawdown [%]': -5.925851581948801,
                'Avg. Trade Duration': pd.Timedelta('46 days 00:00:00'),
                'Avg. Trade [%]': 2.5479693282886906,
                'Best Trade [%]': 53.59595229490424,
                'Buy & Hold Return [%]': 522.0601851851852,
                'Calmar Ratio': 0.4445179349739874,
                'Duration': pd.Timedelta('3116 days 00:00:00'),
                'End': pd.Timestamp('2013-03-01 00:00:00'),
                'Equity Final [$]': 51959.94999999997,
                'Equity Peak [$]': 75787.44,
                'Expectancy [%]': 3.2930986285628268,
                'Exposure Time [%]': 96.74115456238361,
                'Max. Drawdown Duration': pd.Timedelta('584 days 00:00:00'),
                'Max. Drawdown [%]': -47.98012705007589,
                'Max. Trade Duration': pd.Timedelta('183 days 00:00:00'),
                'Profit Factor': 2.174469316409448,
                'Return (Ann.) [%]': 21.32802699608929,
                'Return [%]': 419.59949999999964,
                'Volatility (Ann.) [%]': 36.53825234483751,
                'CAGR [%]': 14.255789393913654,
                'SQN': 1.0880865497975716,
                'Kelly Criterion': 0.15319708142323157,
                'Sharpe Ratio': 0.5837177650097084,
                'Sortino Ratio': 1.0923863161583598,
                'Start': pd.Timestamp('2004-08-19 00:00:00'),
                'Win Rate [%]': 46.96969696969697,
                'Worst Trade [%]': -18.39887353835481,
                'Alpha [%]': 399.7149324245838,
                'Beta': 0.0380886498141251,
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
            sorted(['Size', 'EntryBar', 'ExitBar', 'EntryPrice', 'ExitPrice',
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

    def test_symbols_column_does_not_make_single_asset_orders_multi_asset(self):
        data = GOOG.iloc[:10].copy()
        data['symbols'] = np.arange(len(data))
        seen = []

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                seen.append(self.data.symbols[-1])
                if not self.position:
                    self.buy(size=1)

        stats = Backtest(data, S, cash=100_000, finalize_trades=True).run()
        self.assertGreaterEqual(stats['# Trades'], 1)
        self.assertTrue(seen)
        self.assertEqual(seen[0], data['symbols'].iloc[1])

    def test_symbol_column_is_not_shadowed_by_data_metadata(self):
        data = GOOG.iloc[:10].copy()
        data['symbol'] = np.arange(len(data)) + 100
        seen = []

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                seen.append(self.data.symbol[-1])
                if not self.position:
                    self.buy(size=1)

        stats = Backtest(data, S, cash=100_000, finalize_trades=True).run()
        self.assertGreaterEqual(stats['# Trades'], 1)
        self.assertTrue(seen)
        self.assertEqual(seen[0], data['symbol'].iloc[1])


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

        default_maximize = inspect.signature(Backtest.optimize).parameters['maximize'].default
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

        stats = Backtest(GOOG, S).run()
        self.assertIn(stats['# Trades'], (1179, 1180))  # varies on different archs?

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
        self.assertEqual(stats['# Trades'], 56)

    def test_FractionalBacktest(self):
        ubtc_bt = FractionalBacktest(BTCUSD['2015':], SmaCross, fractional_unit=1 / 1e6, cash=100)
        stats = ubtc_bt.run(fast=2, slow=3)
        self.assertEqual(stats['# Trades'], 41)
        trades = stats['_trades']
        self.assertEqual(len(trades), 41)
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
                btm = MultiBacktest([GOOG, EURUSD, BTCUSD], SmaCross, cash=100_000)
                res = btm.run(fast=2)
                self.assertIsInstance(res, pd.DataFrame)
                self.assertEqual(res.columns.tolist(), [0, 1, 2])
                heatmap = btm.optimize(fast=[2, 4], slow=[10, 20])
                self.assertIsInstance(heatmap, pd.DataFrame)
                self.assertEqual(heatmap.columns.tolist(), [0, 1, 2])
                print(start_method, time.monotonic() - start_time)
        plot_heatmaps(heatmap.mean(axis=1), open_browser=False)

    def test_PortfolioBacktest(self):
        index = pd.date_range('2020-01-01', periods=6)
        a = pd.DataFrame({
            'Open': [10, 10, 10, 12, 12, 12],
            'High': [10, 10, 10, 12, 12, 12],
            'Low': [10, 10, 10, 12, 12, 12],
            'Close': [10, 10, 10, 12, 12, 12],
        }, index=index)
        b = pd.DataFrame({
            'Open': [20, 20, 20, 20, 18, 18],
            'High': [20, 20, 20, 20, 18, 18],
            'Low': [20, 20, 20, 20, 18, 18],
            'Close': [20, 20, 20, 20, 18, 18],
        }, index=index)

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if len(self.data) == 2:
                    self.buy('A', size=10)
                    self.buy('B', size=5)
                elif len(self.data) == 3:
                    self.assert_positions()
                    self.sell('A', size=10)
                elif len(self.data) == 4:
                    assert not self.position['A']
                    assert self.position['B']
                    self.position['B'].close()

            def assert_positions(self):
                assert self.position['A'].size == 10
                assert self.position['B'].size == 5
                assert len(self.trades) == 2

        stats = PortfolioBacktest({'A': a, 'B': b}, S, cash=10_000).run()
        self.assertEqual(stats['# Trades'], 2)
        self.assertEqual(stats['_trades']['Symbol'].tolist(), ['A', 'B'])
        self.assertEqual(stats['_trades']['PnL'].tolist(), [20, -10])
        self.assertEqual(stats['Equity Final [$]'], 10_010)

    def test_PortfolioBacktest_rejects_duplicate_index(self):
        index = pd.to_datetime([
            '2020-01-01', '2020-01-01', '2020-01-02', '2020-01-03'
        ])

        def frame(values):
            return pd.DataFrame({
                'Open': values,
                'High': values,
                'Low': values,
                'Close': values,
            }, index=index)

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                pass

        with self.assertRaisesRegex(ValueError, 'duplicate|unique|index'):
            PortfolioBacktest({'A': frame([10, 11, 12, 13]),
                               'B': frame([20, 21, 22, 23])}, S)

    def test_PortfolioBacktest_data_df_indicator_keeps_symbol(self):
        index = pd.date_range('2020-01-01', periods=6)

        def frame(values):
            return pd.DataFrame({
                'Open': values,
                'High': values,
                'Low': values,
                'Close': values,
            }, index=index)

        data = {
            'A': frame([10, 11, 12, 13, 14, 15]),
            'B': frame([100, 100, 100, 100, 100, 100]),
        }

        class S(Strategy):
            def init(self):
                self.a_close = self.I(lambda: self.data['A'].df.Close,
                                      name='A_df_close')

            def next(self):
                if len(self.data) == 3:
                    self.buy('B')
                elif len(self.data) == 5:
                    self.position['B'].close()

        stats = PortfolioBacktest(data, S, cash=10_000).run()
        indicator = stats['_strategy']._indicators[0]
        trades = stats['_trades']

        self.assertEqual(indicator._opts.get('symbol'), 'A')
        self.assertTrue(trades['Entry_A_df_close'].isna().all())
        self.assertTrue(trades['Exit_A_df_close'].isna().all())

    def test_PortfolioBacktest_array_df_indicator_keeps_symbol(self):
        index = pd.date_range('2020-01-01', periods=6)

        def frame(values):
            return pd.DataFrame({
                'Open': values,
                'High': values,
                'Low': values,
                'Close': values,
            }, index=index)

        data = {
            'A': frame([10, 11, 12, 13, 14, 15]),
            'B': frame([100, 100, 100, 100, 100, 100]),
        }

        class S(Strategy):
            def init(self):
                self.a_close = self.I(lambda: self.data['A'].Close.df,
                                      name='A_array_df')

            def next(self):
                if len(self.data) == 3:
                    self.buy('B')
                elif len(self.data) == 5:
                    self.position['B'].close()

        stats = PortfolioBacktest(data, S, cash=10_000).run()
        indicator = stats['_strategy']._indicators[0]
        trades = stats['_trades']

        self.assertEqual(indicator._opts.get('symbol'), 'A')
        self.assertTrue(trades['Entry_A_array_df'].isna().all())
        self.assertTrue(trades['Exit_A_array_df'].isna().all())

    def test_PortfolioBacktest_dataframe_indicator_column_metadata_keeps_symbol(self):
        index = pd.date_range('2020-01-01', periods=6)

        def frame(values):
            return pd.DataFrame({
                'Open': values,
                'High': values,
                'Low': values,
                'Close': values,
            }, index=index)

        data = {
            'A': frame([10, 11, 12, 13, 14, 15]),
            'B': frame([100, 100, 100, 100, 100, 100]),
        }

        class S(Strategy):
            def init(self):
                self.a_df = self.I(lambda: pd.DataFrame(self.data['A'].Close.s),
                                   name='A_df')

            def next(self):
                if len(self.data) == 3:
                    self.buy('B')
                elif len(self.data) == 5:
                    self.position['B'].close()

        stats = PortfolioBacktest(data, S, cash=10_000).run()
        indicator = stats['_strategy']._indicators[0]
        trades = stats['_trades']

        self.assertEqual(indicator._opts.get('symbol'), 'A')
        self.assertTrue(trades['Entry_A_df'].isna().all())
        self.assertTrue(trades['Exit_A_df'].isna().all())

    def test_PortfolioBacktest_cross_symbol_dataframe_indicator_stays_global(self):
        index = pd.date_range('2020-01-01', periods=5)
        data = {
            'A': pd.DataFrame({
                'Open': [10, 11, 12, 13, 14],
                'High': [10, 11, 12, 13, 14],
                'Low': [10, 11, 12, 13, 14],
                'Close': [10, 11, 12, 13, 14],
            }, index=index),
            'B': pd.DataFrame({
                'Open': [20, 21, 22, 23, 24],
                'High': [20, 21, 22, 23, 24],
                'Low': [20, 21, 22, 23, 24],
                'Close': [20, 21, 22, 23, 24],
            }, index=index),
        }

        class S(Strategy):
            def init(self):
                def indicator():
                    return pd.concat([
                        self.data['A'].Close.s,
                        self.data['B'].Close.s,
                    ], axis=1)
                self.cross = self.I(indicator, name=['A_close', 'B_close'])

            def next(self):
                if len(self.data) == 2:
                    self.buy('B', size=1)
                elif len(self.data) == 4:
                    self.position['B'].close()

        stats = PortfolioBacktest(data, S).run()
        indicator = stats['_strategy']._indicators[0]
        self.assertIsNone(indicator._opts.get('symbol'))
        self.assertEqual(set(indicator._opts.get('symbols', ())), {'A', 'B'})

    def test_PortfolioBacktest_cross_symbol_df_accessor_arithmetic_stays_global(self):
        index = pd.date_range('2020-01-01', periods=5)
        data = {
            'A': pd.DataFrame({
                'Open': [10, 11, 12, 13, 14],
                'High': [10, 11, 12, 13, 14],
                'Low': [10, 11, 12, 13, 14],
                'Close': [10, 11, 12, 13, 14],
            }, index=index),
            'B': pd.DataFrame({
                'Open': [20, 21, 22, 23, 24],
                'High': [20, 21, 22, 23, 24],
                'Low': [20, 21, 22, 23, 24],
                'Close': [20, 21, 22, 23, 24],
            }, index=index),
        }

        class S(Strategy):
            def init(self):
                self.cross = self.I(lambda: self.data['A'].df.Close + self.data['B'].df.Close,
                                    name='cross_df_sum')

            def next(self):
                if len(self.data) == 2:
                    self.buy('A', size=1)
                    self.buy('B', size=1)
                elif len(self.data) == 4:
                    self.position['A'].close()
                    self.position['B'].close()

        stats = PortfolioBacktest(data, S).run()
        indicator = stats['_strategy']._indicators[0]
        trades = stats['_trades'].sort_values('Symbol').reset_index(drop=True)

        self.assertIsNone(indicator._opts.get('symbol'))
        self.assertEqual(set(indicator._opts.get('symbols', ())), {'A', 'B'})
        self.assertEqual(trades['Entry_cross_df_sum'].tolist(), [34, 34])
        self.assertEqual(trades['Exit_cross_df_sum'].tolist(), [38, 38])

    def test_PortfolioBacktest_cross_symbol_df_accessor_mismatched_columns_stays_global(self):
        index = pd.date_range('2020-01-01', periods=5)

        def frame(values):
            close = np.asarray(values)
            open_ = close + 1
            return pd.DataFrame({
                'Open': open_,
                'High': open_,
                'Low': close,
                'Close': close,
            }, index=index)

        data = {
            'A': frame([10, 11, 12, 13, 14]),
            'B': frame([20, 21, 22, 23, 24]),
        }

        class S(Strategy):
            def init(self):
                self.cross = self.I(lambda: self.data['A'].df.Close + self.data['B'].df.Open,
                                    name='cross_df_mixed')

            def next(self):
                if len(self.data) == 2:
                    self.buy('A', size=1)
                    self.buy('B', size=1)
                elif len(self.data) == 4:
                    self.position['A'].close()
                    self.position['B'].close()

        stats = PortfolioBacktest(data, S).run()
        indicator = stats['_strategy']._indicators[0]
        trades = stats['_trades'].sort_values('Symbol').reset_index(drop=True)

        self.assertIsNone(indicator._opts.get('symbol'))
        self.assertEqual(indicator._opts.get('symbols'), frozenset())
        self.assertEqual(trades['Entry_cross_df_mixed'].tolist(), [35, 35])
        self.assertEqual(trades['Exit_cross_df_mixed'].tolist(), [39, 39])

    def test_PortfolioBacktest_indicator_dicts(self):
        index = pd.date_range('2020-01-01', periods=5)
        data = {
            symbol: pd.DataFrame({
                'Open': values,
                'High': values,
                'Low': values,
                'Close': values,
            }, index=index)
            for symbol, values in {
                'A': np.arange(10, 15),
                'B': np.arange(20, 25),
            }.items()
        }

        class S(Strategy):
            def init(self):
                self.identity = {
                    symbol: self.I(lambda close: close, self.data[symbol].Close,
                                   name=f'{symbol} identity')
                    for symbol in self.data.symbols
                }

            def next(self):
                for indicator in self.identity.values():
                    assert len(indicator) == len(self.data)
                if len(self.data) == 2:
                    self.buy('A', size=1)
                elif len(self.data) == 4:
                    self.position['A'].close()

        stats = PortfolioBacktest(data, S).run()
        self.assertEqual(stats['_trades']['Symbol'].tolist(), ['A'])
        self.assertIn('Entry_A identity', stats['_trades'])

    def test_PortfolioBacktest_indicators_with_same_name_keep_symbol_values(self):
        index = pd.date_range('2020-01-01', periods=5)
        data = {
            symbol: pd.DataFrame({
                'Open': values,
                'High': values,
                'Low': values,
                'Close': values,
            }, index=index)
            for symbol, values in {
                'A': np.arange(10, 15),
                'B': np.arange(20, 25),
            }.items()
        }

        class S(Strategy):
            def init(self):
                self.identity = {
                    symbol: self.I(lambda close: close, self.data[symbol].Close,
                                   name='same')
                    for symbol in self.data.symbols
                }

            def next(self):
                if len(self.data) == 2:
                    self.buy('A', size=1)
                    self.buy('B', size=1)
                elif len(self.data) == 4:
                    self.position['A'].close()
                    self.position['B'].close()

        stats = PortfolioBacktest(data, S).run()
        trades = stats['_trades'].sort_values('Symbol').reset_index(drop=True)
        self.assertEqual(trades['Symbol'].tolist(), ['A', 'B'])
        self.assertEqual(trades['Entry_same'].tolist(), [12, 22])
        self.assertEqual(trades['Exit_same'].tolist(), [14, 24])
        self.assertTrue(pd.api.types.is_numeric_dtype(trades['Entry_same']))
        self.assertTrue(pd.api.types.is_numeric_dtype(trades['Exit_same']))
        self.assertTrue(np.isfinite(trades['Entry_same']).all())
        self.assertTrue(np.isfinite(trades['Exit_same']).all())

    def test_PortfolioBacktest_dataframe_indicators_with_same_name_keep_symbol_values(self):
        index = pd.date_range('2020-01-01', periods=5)
        data = {
            symbol: pd.DataFrame({
                'Open': values,
                'High': values,
                'Low': values,
                'Close': values,
            }, index=index)
            for symbol, values in {
                'A': np.arange(10, 15),
                'B': np.arange(20, 25),
            }.items()
        }

        class S(Strategy):
            def init(self):
                self.identity = {
                    symbol: self.I(lambda symbol=symbol: self.data[symbol].df.Close,
                                   name='same')
                    for symbol in self.data.symbols
                }

            def next(self):
                if len(self.data) == 2:
                    self.buy('A', size=1)
                    self.buy('B', size=1)
                elif len(self.data) == 4:
                    self.position['A'].close()
                    self.position['B'].close()

        stats = PortfolioBacktest(data, S).run()
        trades = stats['_trades'].sort_values('Symbol').reset_index(drop=True)
        self.assertEqual(trades['Symbol'].tolist(), ['A', 'B'])
        self.assertEqual(trades['Entry_same'].tolist(), [12, 22])
        self.assertEqual(trades['Exit_same'].tolist(), [14, 24])
        self.assertTrue(pd.api.types.is_numeric_dtype(trades['Entry_same']))
        self.assertTrue(pd.api.types.is_numeric_dtype(trades['Exit_same']))
        self.assertTrue(np.isfinite(trades['Entry_same']).all())
        self.assertTrue(np.isfinite(trades['Exit_same']).all())

    def test_PortfolioBacktest_cross_symbol_indicator_is_global(self):
        index = pd.date_range('2020-01-01', periods=5)
        data = {
            'A': pd.DataFrame({
                'Open': [10, 11, 12, 13, 14],
                'High': [10, 11, 12, 13, 14],
                'Low': [10, 11, 12, 13, 14],
                'Close': [10, 11, 12, 13, 14],
            }, index=index),
            'B': pd.DataFrame({
                'Open': [20, 22, 24, 26, 28],
                'High': [20, 22, 24, 26, 28],
                'Low': [20, 22, 24, 26, 28],
                'Close': [20, 22, 24, 26, 28],
            }, index=index),
        }

        class S(Strategy):
            def init(self):
                self.spread = self.I(lambda b, a: b - a,
                                     self.data['B'].Close,
                                     self.data['A'].Close,
                                     name='spread')

            def next(self):
                if len(self.data) == 2:
                    self.buy('B', size=1)
                elif len(self.data) == 4:
                    self.position['B'].close()

        stats = PortfolioBacktest(data, S).run()
        indicator = stats['_strategy']._indicators[0]
        self.assertIsNone(indicator._opts.get('symbol'))
        self.assertEqual(set(indicator._opts.get('symbols', ())), {'A', 'B'})
        self.assertEqual(stats['_trades']['Entry_spread'].tolist(), [12])
        self.assertEqual(stats['_trades']['Exit_spread'].tolist(), [14])

    def test_PortfolioBacktest_precomputed_cross_symbol_indicator_is_global(self):
        index = pd.date_range('2020-01-01', periods=5)
        data = {
            symbol: pd.DataFrame({
                'Open': values,
                'High': values,
                'Low': values,
                'Close': values,
            }, index=index)
            for symbol, values in {
                'A': np.arange(10, 15),
                'B': np.arange(20, 25),
            }.items()
        }

        class S(Strategy):
            def init(self):
                spread = self.data['B'].Close - self.data['A'].Close
                self.spread = self.I(lambda x: x, spread, name='spread')

            def next(self):
                if len(self.data) == 2:
                    self.buy('B', size=1)
                elif len(self.data) == 4:
                    self.position['B'].close()

        stats = PortfolioBacktest(data, S).run()
        indicator = stats['_strategy']._indicators[0]
        self.assertIsNone(indicator._opts.get('symbol'))
        self.assertEqual(set(indicator._opts.get('symbols', ())), {'A', 'B'})
        self.assertEqual(stats['_trades']['Entry_spread'].tolist(), [10])
        self.assertEqual(stats['_trades']['Exit_spread'].tolist(), [10])

    def test_PortfolioBacktest_duplicate_indicator_aliases_are_all_sliced(self):
        index = pd.date_range('2020-01-01', periods=5)
        values = np.arange(10, 15)
        data = {
            'A': pd.DataFrame({
                'Open': values,
                'High': values,
                'Low': values,
                'Close': values,
            }, index=index)
        }

        class S(Strategy):
            def init(self):
                indicator = self.I(lambda close: close, self.data['A'].Close,
                                   name='identity')
                self.aliases = {'a': indicator, 'b': indicator}

            def next(self):
                assert len(self.aliases['a']) == len(self.data)
                assert len(self.aliases['b']) == len(self.data)
                if len(self.data) == 2:
                    self.buy('A', size=1)
                elif len(self.data) == 4:
                    self.position['A'].close()

        PortfolioBacktest(data, S).run()

    def test_PortfolioBacktest_plot_passes_global_and_symbol_trades_separately(self):
        import backtesting.backtesting as backtesting_module

        index = pd.date_range('2020-01-01', periods=5)
        data = {
            'A': pd.DataFrame({
                'Open': [10, 10, 10, 12, 12],
                'High': [10, 10, 10, 12, 12],
                'Low': [10, 10, 10, 12, 12],
                'Close': [10, 10, 10, 12, 12],
            }, index=index),
            'B': pd.DataFrame({
                'Open': [20, 20, 20, 20, 20],
                'High': [20, 20, 20, 20, 20],
                'Low': [20, 20, 20, 20, 20],
                'Close': [20, 20, 20, 20, 20],
            }, index=index),
        }

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if len(self.data) == 2:
                    self.buy('A', size=1)
                elif len(self.data) == 4:
                    self.position['A'].close()

        bt = PortfolioBacktest(data, S)
        bt.run()
        captured = {}

        def fake_plot(**kwargs):
            captured.update(kwargs)
            return 'plot-result'

        with patch(backtesting_module, 'plot', fake_plot):
            result = bt.plot(symbol='B')

        self.assertEqual(result, 'plot-result')
        self.assertEqual(len(captured['results']['_trades']), 1)
        self.assertIn('trade_markers', captured)
        self.assertEqual(len(captured['trade_markers']), 0)
        self.assertIn('reverse_indicators', captured)
        self.assertFalse(captured['reverse_indicators'])

        captured.clear()
        with patch(backtesting_module, 'plot', fake_plot):
            bt.plot(symbol='B', reverse_indicators=True)
        self.assertTrue(captured['reverse_indicators'])

        with _tempfile() as f:
            bt.plot(symbol='B', filename=f, open_browser=False, plot_pl=False)

    def test_PortfolioBacktest_plot_aligns_data_trades_and_indicators_after_warmup(self):
        import backtesting.backtesting as backtesting_module

        index = pd.date_range('2020-01-01', periods=6)
        data = pd.DataFrame({
            'Open': [10, 10, 10, 11, 12, 13],
            'High': [10, 10, 10, 11, 12, 13],
            'Low': [10, 10, 10, 11, 12, 13],
            'Close': [10, 10, 10, 11, 12, 13],
            'Volume': [1000] * 6,
        }, index=index)

        class S(Strategy):
            def init(self):
                self.sma = self.I(lambda close: pd.Series(close).rolling(3).mean(),
                                  self.data['A'].Close,
                                  name='sma')

            def next(self):
                if len(self.data) == 4:
                    self.buy('A', size=1)
                elif len(self.data) == 5:
                    self.position['A'].close()

        bt = PortfolioBacktest({'A': data}, S, cash=10_000)
        stats = bt.run()
        captured = {}

        def fake_plot(**kwargs):
            captured.update(kwargs)
            return 'plot-result'

        with patch(backtesting_module, 'plot', fake_plot):
            result = bt.plot(symbol='A')

        expected_index = stats['_equity_curve'].index
        start_offset = data.index.get_indexer([expected_index[0]])[0]
        expected_entry_bars = (stats['_trades']['EntryBar'] - start_offset).clip(lower=0)
        expected_exit_bars = stats['_trades']['ExitBar'] - start_offset

        self.assertEqual(result, 'plot-result')
        self.assertTrue(captured['df'].index.equals(expected_index))
        self.assertTrue(captured['indicators'][0].df.index.equals(expected_index))
        self.assertEqual(captured['results']['_trades']['EntryBar'].tolist(),
                         expected_entry_bars.tolist())
        self.assertEqual(captured['results']['_trades']['ExitBar'].tolist(),
                         expected_exit_bars.tolist())
        self.assertEqual(captured['trade_markers']['EntryBar'].tolist(),
                         expected_entry_bars.tolist())
        self.assertEqual(captured['trade_markers']['ExitBar'].tolist(),
                         expected_exit_bars.tolist())

    def test_PortfolioBacktest_indicators_with_same_name_keep_boolean_values(self):
        index = pd.date_range('2020-01-01', periods=5)
        data = {
            symbol: pd.DataFrame({
                'Open': values,
                'High': values,
                'Low': values,
                'Close': values,
            }, index=index)
            for symbol, values in {
                'A': np.arange(10, 15),
                'B': np.arange(20, 25),
            }.items()
        }

        class S(Strategy):
            def init(self):
                self.signals = {
                    symbol: self.I(lambda close: close % 2 == 0,
                                   self.data[symbol].Close,
                                   name='same_bool')
                    for symbol in self.data.symbols
                }

            def next(self):
                if len(self.data) == 2:
                    self.buy('A', size=1)
                    self.buy('B', size=1)
                elif len(self.data) == 4:
                    self.position['A'].close()
                    self.position['B'].close()

        stats = PortfolioBacktest(data, S).run()
        trades = stats['_trades'].sort_values('Symbol').reset_index(drop=True)
        self.assertEqual(trades['Symbol'].tolist(), ['A', 'B'])
        self.assertEqual(trades['Entry_same_bool'].tolist(), [True, True])
        self.assertEqual(trades['Exit_same_bool'].tolist(), [True, True])

    def test_PortfolioBacktest_restores_data_length_after_running_out_of_money(self):
        index = pd.date_range('2020-01-01', periods=6)
        data = pd.DataFrame({
            'Open': [100, 100, 100, 1, 1, 1],
            'High': [100, 100, 100, 1, 1, 1],
            'Low': [100, 100, 100, 1, 1, 1],
            'Close': [100, 100, 100, 1, 1, 1],
        }, index=index)

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if len(self.data) == 2:
                    self.buy('A', size=100)

        with np.errstate(divide='ignore'):
            stats = PortfolioBacktest({'A': data}, S, cash=1_000, margin=.01).run()
        self.assertEqual(stats['Equity Final [$]'], 0)
        self.assertEqual(len(stats['_strategy'].data), len(data))

    def test_PortfolioBacktest_data_df_mutations_survive_init_update(self):
        index = pd.date_range('2020-01-01', periods=5)
        data = pd.DataFrame({
            'Open': [100, 101, 102, 103, 104],
            'High': [100, 101, 102, 103, 104],
            'Low': [100, 101, 102, 103, 104],
            'Close': [100, 101, 102, 103, 104],
        }, index=index)
        seen = []

        class S(Strategy):
            def init(self):
                self.data['A'].df['Signal'] = np.arange(len(self.data))

            def next(self):
                seen.append(self.data['A'].Signal[-1])

        PortfolioBacktest({'A': data}, S).run()
        self.assertEqual(seen, [1, 2, 3, 4])

    def test_PortfolioBacktest_inner_alignment_warns_on_dropped_rows(self):
        index_a = pd.date_range('2020-01-01', periods=4)
        index_b = pd.date_range('2020-01-03', periods=2)

        def ohlc(index):
            return pd.DataFrame({
                'Open': [100] * len(index),
                'High': [101] * len(index),
                'Low': [99] * len(index),
                'Close': [100] * len(index),
                'Volume': [1000] * len(index),
            }, index=index)

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                pass

        with self.assertWarnsRegex(UserWarning, "dropped.*A.*2"):
            PortfolioBacktest({'A': ohlc(index_a), 'B': ohlc(index_b)}, S)

    def test_PortfolioBacktest_same_bar_fractional_orders_are_not_symbol_order_dependent(self):
        index = pd.date_range('2020-01-01', periods=5)

        def ohlc():
            return pd.DataFrame({
                'Open': [100] * len(index),
                'High': [100] * len(index),
                'Low': [100] * len(index),
                'Close': [100] * len(index),
                'Volume': [1000] * len(index),
            }, index=index)

        class BuyAB(Strategy):
            def init(self):
                pass

            def next(self):
                if len(self.data) == 2:
                    self.buy('A', size=.5)
                    self.buy('B', size=.5)

        class BuyBA(Strategy):
            def init(self):
                pass

            def next(self):
                if len(self.data) == 2:
                    self.buy('B', size=.5)
                    self.buy('A', size=.5)

        stats_ab = PortfolioBacktest({'A': ohlc(), 'B': ohlc()}, BuyAB,
                                     cash=10_000, finalize_trades=True).run()
        stats_ba = PortfolioBacktest({'A': ohlc(), 'B': ohlc()}, BuyBA,
                                     cash=10_000, finalize_trades=True).run()
        trades_ab = stats_ab['_trades'].sort_values('Symbol').reset_index(drop=True)
        trades_ba = stats_ba['_trades'].sort_values('Symbol').reset_index(drop=True)

        self.assertEqual(trades_ab['Symbol'].tolist(), ['A', 'B'])
        self.assertEqual(trades_ab['Size'].tolist(), [50, 50])
        assert_frame_equal(trades_ab[['Symbol', 'Size']], trades_ba[['Symbol', 'Size']])

    def test_PortfolioBacktest_overbooked_fractional_orders_are_first_come_first_served(self):
        index = pd.date_range('2020-01-01', periods=3)

        def ohlc():
            return pd.DataFrame({
                'Open': [100] * len(index),
                'High': [100] * len(index),
                'Low': [100] * len(index),
                'Close': [100] * len(index),
                'Volume': [1000] * len(index),
            }, index=index)

        class BuyAB(Strategy):
            def init(self):
                pass

            def next(self):
                if len(self.data) == 2:
                    self.buy('A', size=.6)
                    self.buy('B', size=.6)

        class BuyBA(Strategy):
            def init(self):
                pass

            def next(self):
                if len(self.data) == 2:
                    self.buy('B', size=.6)
                    self.buy('A', size=.6)

        with self.assertWarnsRegex(UserWarning, 'insufficient margin'):
            stats_ab = PortfolioBacktest({'A': ohlc(), 'B': ohlc()}, BuyAB,
                                         cash=10_000, finalize_trades=True).run()
        with self.assertWarnsRegex(UserWarning, 'insufficient margin'):
            stats_ba = PortfolioBacktest({'A': ohlc(), 'B': ohlc()}, BuyBA,
                                         cash=10_000, finalize_trades=True).run()

        self.assertEqual(stats_ab['_trades']['Symbol'].tolist(), ['A'])
        self.assertEqual(stats_ab['_trades']['Size'].tolist(), [60])
        self.assertEqual(stats_ba['_trades']['Symbol'].tolist(), ['B'])
        self.assertEqual(stats_ba['_trades']['Size'].tolist(), [60])

    def test_PortfolioBacktest_tuple_held_indicators_are_sliced(self):
        index = pd.date_range('2020-01-01', periods=5)
        data = pd.DataFrame({
            'Open': [1, 2, 3, 4, 5],
            'High': [1, 2, 3, 4, 5],
            'Low': [1, 2, 3, 4, 5],
            'Close': [1, 2, 3, 4, 5],
            'Volume': [100] * 5,
        }, index=index)
        seen = []

        class S(Strategy):
            def init(self):
                self.holder = (
                    self.I(lambda close: pd.Series(close).rolling(3).mean(),
                           self.data['A'].Close,
                           name='sma'),
                )

            def next(self):
                indicator = self.holder[0]
                seen.append((len(self.data), len(indicator)))
                assert len(indicator) == len(self.data)

        PortfolioBacktest({'A': data}, S).run()
        self.assertGreater(len(seen), 0)
        self.assertEqual(seen[0][0], 4)

    def test_PortfolioBacktest_warns_all_nan_indicator_ignored_for_warmup(self):
        index = pd.date_range('2020-01-01', periods=4)
        data = pd.DataFrame({
            'Open': [100, 101, 102, 103],
            'High': [100, 101, 102, 103],
            'Low': [100, 101, 102, 103],
            'Close': [100, 101, 102, 103],
            'Volume': [1000] * 4,
        }, index=index)

        class S(Strategy):
            def init(self):
                self.bad = self.I(lambda close: np.full(len(close), np.nan),
                                  self.data['A'].Close,
                                  name='all nan')

            def next(self):
                pass

        with self.assertWarnsRegex(UserWarning, 'all-NaN indicator'):
            PortfolioBacktest({'A': data}, S).run()

    def test_PortfolioBacktest_finalize_trades_exits_on_final_close(self):
        index = pd.date_range('2020-01-01', periods=4)
        data = pd.DataFrame({
            'Open': [10, 10, 20, 25],
            'High': [10, 10, 20, 30],
            'Low': [10, 10, 20, 25],
            'Close': [10, 10, 20, 30],
            'Volume': [1000] * 4,
        }, index=index)

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if not self.position['A']:
                    self.buy('A', size=1)

        stats = PortfolioBacktest({'A': data}, S, cash=10_000, finalize_trades=True).run()
        trade = stats['_trades'].iloc[0]
        self.assertEqual(trade.ExitBar, 3)
        self.assertEqual(trade.ExitPrice, 30)
        self.assertEqual(trade.PnL, 10)

    def test_PortfolioBacktest_warns_about_pending_orders_at_end(self):
        index = pd.date_range('2020-01-01', periods=3)
        data = pd.DataFrame({
            'Open': [100, 101, 102],
            'High': [100, 101, 102],
            'Low': [100, 101, 102],
            'Close': [100, 101, 102],
            'Volume': [1000] * 3,
        }, index=index)

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if len(self.data) == 3:
                    self.buy('A', size=1)

        with self.assertWarnsRegex(UserWarning, 'pending order'):
            stats = PortfolioBacktest({'A': data}, S, cash=10_000, finalize_trades=True).run()
        self.assertEqual(len(stats['_trades']), 0)

    def test_PortfolioBacktest_benchmark_return_rebases_at_strategy_start(self):
        index = pd.date_range('2020-01-01', periods=3)
        a = pd.DataFrame({
            'Open': [100, 100, 200],
            'High': [100, 100, 200],
            'Low': [100, 100, 200],
            'Close': [100, 100, 200],
            'Volume': [1000] * 3,
        }, index=index)
        b = pd.DataFrame({
            'Open': [100, 200, 200],
            'High': [100, 200, 200],
            'Low': [100, 200, 200],
            'Close': [100, 200, 200],
            'Volume': [1000] * 3,
        }, index=index)

        class S(Strategy):
            def init(self):
                self.warmup = self.I(lambda close: pd.Series(close).rolling(2).mean(),
                                     self.data['A'].Close,
                                     name='warmup')

            def next(self):
                pass

        stats = PortfolioBacktest({'A': a, 'B': b}, S).run()
        self.assertAlmostEqual(stats['Buy & Hold Return [%]'], 50.0)

    def test_PortfolioBacktest_benchmark_beta_ignores_pre_warmup_returns(self):
        index = pd.date_range('2020-01-01', periods=4)
        prices = [100, 1000, 1000, 2000]
        data = pd.DataFrame({
            'Open': prices,
            'High': prices,
            'Low': prices,
            'Close': prices,
            'Volume': [1000] * len(index),
        }, index=index)

        class S(Strategy):
            def init(self):
                self.warmup = self.I(lambda close: pd.Series(close).rolling(2).mean(),
                                     self.data['A'].Close,
                                     name='warmup')

            def next(self):
                if len(self.data) == 3:
                    self.buy('A')

        stats = PortfolioBacktest({'A': data}, S, cash=10_000,
                                  trade_on_close=True,
                                  finalize_trades=True).run()
        self.assertAlmostEqual(stats['Buy & Hold Return [%]'], 100.0)
        self.assertAlmostEqual(stats['Return [%]'], 100.0)
        self.assertAlmostEqual(stats['Beta'], 1.0)
        self.assertAlmostEqual(stats['Alpha [%]'], 0.0)

    def test_Backtest_fractional_order_fixed_commission_sizing(self):
        data = pd.DataFrame({
            'Open': [100, 100, 100, 100],
            'High': [100, 100, 100, 100],
            'Low': [100, 100, 100, 100],
            'Close': [100, 100, 100, 100],
            'Volume': [1000] * 4,
        })

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if not self.position:
                    self.buy()

        stats = Backtest(data, S, cash=10_000, commission=(100, 0),
                         finalize_trades=True).run()
        self.assertEqual(stats['_trades'].iloc[0].Size, 99)

    def test_Backtest_fractional_order_spread_relative_commission_sizing(self):
        data = pd.DataFrame({
            'Open': [100, 100, 100, 100],
            'High': [100, 100, 100, 100],
            'Low': [100, 100, 100, 100],
            'Close': [100, 100, 100, 100],
            'Volume': [1000] * 4,
        })

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if not self.position:
                    self.buy()

        stats = Backtest(data, S, cash=10_200, spread=.01,
                         commission=.01, finalize_trades=True).run()
        self.assertEqual(stats['_trades'].iloc[0].Size, 99)

    def test_Backtest_fractional_order_rebate_sizing(self):
        data = pd.DataFrame({
            'Open': [100, 100, 100, 100],
            'High': [100, 100, 100, 100],
            'Low': [100, 100, 100, 100],
            'Close': [100, 100, 100, 100],
            'Volume': [1000] * 4,
        })

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if not self.position:
                    self.buy()

        stats = Backtest(data, S, cash=10_000, commission=(0, -.01),
                         finalize_trades=True).run()
        self.assertEqual(stats['_trades'].iloc[0].Size, 101)

    def test_Backtest_fractional_order_rebate_sizing_is_bounded_when_rebate_exceeds_margin(self):
        data = pd.DataFrame({
            'Open': [100, 100, 100, 100],
            'High': [100, 100, 100, 100],
            'Low': [100, 100, 100, 100],
            'Close': [100, 100, 100, 100],
            'Volume': [1000] * 4,
        })

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if not self.position:
                    self.buy()

        stats = Backtest(data, S, cash=10_000, margin=.05,
                         commission=(0, -.1), finalize_trades=True).run()
        trade = stats['_trades'].iloc[0]
        self.assertEqual(trade.Size, 2000)
        self.assertLess(trade.Size, 10_000)

    def test_Backtest_fractional_order_callable_rebate_still_searches_affordable_size(self):
        data = pd.DataFrame({
            'Open': [100, 100, 100, 100],
            'High': [100, 100, 100, 100],
            'Low': [100, 100, 100, 100],
            'Close': [100, 100, 100, 100],
            'Volume': [1000] * 4,
        })

        def commission(size, price):
            n = abs(size)
            if n == 1:
                return -2 * price
            return max(0, n - 50) * price

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if not self.position:
                    self.buy()

        stats = Backtest(data, S, cash=10_000, commission=commission,
                         finalize_trades=True).run()
        self.assertEqual(stats['_trades'].iloc[0].Size, 75)

    def test_PortfolioBacktest_fractional_sizing_uses_fill_open_not_current_close(self):
        index = pd.date_range('2020-01-01', periods=4)
        data = pd.DataFrame({
            'Open': [100, 100, 100, 100],
            'High': [100, 100, 100, 1000],
            'Low': [100, 100, 100, 100],
            'Close': [100, 100, 100, 1000],
            'Volume': [1000] * len(index),
        }, index=index)

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if len(self.data) == 2:
                    self.buy('A', size=100)
                elif len(self.data) == 3:
                    self.buy('A')

        stats = PortfolioBacktest({'A': data}, S, cash=10_000,
                                  margin=.5, finalize_trades=True).run()
        trades = stats['_trades'].sort_values('EntryBar')
        self.assertEqual(list(trades['Size']), [100, 100])

    def test_PortfolioBacktest_fractional_order_leveraged_fixed_commission_sizing(self):
        index = pd.date_range('2020-01-01', periods=4)
        data = pd.DataFrame({
            'Open': [100, 100, 100, 100],
            'High': [100, 100, 100, 100],
            'Low': [100, 100, 100, 100],
            'Close': [100, 100, 100, 100],
            'Volume': [1000] * len(index),
        }, index=index)

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if not self.position['A']:
                    self.buy('A')

        stats = PortfolioBacktest({'A': data}, S, cash=10_000,
                                  margin=.5, commission=(1000, 0),
                                  finalize_trades=True).run()
        self.assertEqual(stats['_trades'].iloc[0].Size, 180)

    def test_PortfolioBacktest_close_then_buy_uses_freed_margin(self):
        index = pd.date_range('2020-01-01', periods=5)
        data = pd.DataFrame({
            'Open': [100] * len(index),
            'High': [100] * len(index),
            'Low': [100] * len(index),
            'Close': [100] * len(index),
            'Volume': [1000] * len(index),
        }, index=index)

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if len(self.data) == 2:
                    self.buy('A')
                elif len(self.data) == 4:
                    self.position['A'].close()
                    self.buy('B')

        stats = PortfolioBacktest({'A': data, 'B': data}, S, cash=10_000,
                                  finalize_trades=True).run()
        trades = stats['_trades']
        self.assertEqual(list(trades['Symbol']), ['A', 'B'])
        self.assertEqual(list(trades['Size']), [100, 100])

    def test_PortfolioBacktest_opposite_relative_order_nets_before_margin_check(self):
        index = pd.date_range('2020-01-01', periods=5)
        data = pd.DataFrame({
            'Open': [100] * len(index),
            'High': [100] * len(index),
            'Low': [100] * len(index),
            'Close': [100] * len(index),
            'Volume': [1000] * len(index),
        }, index=index)

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if len(self.data) == 2:
                    self.buy('A')
                elif len(self.data) == 3:
                    self.sell('A')

        with warnings.catch_warnings(record=True) as caught:
            warnings.simplefilter('always')
            stats = PortfolioBacktest({'A': data}, S, cash=10_000,
                                      finalize_trades=True).run()
        messages = [str(w.message) for w in caught]
        self.assertFalse(any('relative-sized order due to insufficient margin' in m
                             for m in messages))
        self.assertGreaterEqual(len(stats['_trades']), 1)
        self.assertEqual(stats['_trades'].iloc[0].ExitBar, 3)

    def test_PortfolioBacktest_pandas_series_indicator_preserves_symbol(self):
        index = pd.date_range('2020-01-01', periods=5)

        def ohlc(values):
            return pd.DataFrame({
                'Open': values,
                'High': values,
                'Low': values,
                'Close': values,
                'Volume': [1000] * len(values),
            }, index=index)

        class S(Strategy):
            def init(self):
                self.a_sma = self.I(
                    lambda: self.data['A'].Close.s.rolling(2).mean(),
                    name='A_sma')

            def next(self):
                if len(self.data) == 3:
                    self.buy('B', size=1)
                elif len(self.data) == 4:
                    self.position['B'].close()

        stats = PortfolioBacktest({
            'A': ohlc([10, 11, 12, 13, 14]),
            'B': ohlc([100, 100, 100, 100, 100]),
        }, S).run()
        trades = stats['_trades']
        self.assertIn('Entry_A_sma', trades)
        self.assertTrue(pd.isna(trades['Entry_A_sma'].iloc[0]))
        self.assertTrue(pd.isna(trades['Exit_A_sma'].iloc[0]))

    def test_PortfolioBacktest_pandas_series_indicator_merges_cross_symbol_metadata(self):
        index = pd.date_range('2020-01-01', periods=4)

        def ohlc(values):
            return pd.DataFrame({
                'Open': values,
                'High': values,
                'Low': values,
                'Close': values,
                'Volume': [1000] * len(values),
            }, index=index)

        class S(Strategy):
            def init(self):
                self.sum_ab = self.I(
                    lambda: self.data['A'].Close.s + self.data['B'].Close.s,
                    name='sum_ab')

            def next(self):
                if len(self.data) == 2:
                    self.buy('B', size=1)

        stats = PortfolioBacktest({
            'A': ohlc([10, 11, 12, 13]),
            'B': ohlc([100, 101, 102, 103]),
        }, S, cash=10_000, finalize_trades=True).run()
        strategy = stats['_strategy']
        self.assertEqual(strategy.sum_ab._opts['symbols'], frozenset({'A', 'B'}))
        self.assertIsNone(strategy.sum_ab._opts['symbol'])
        trade = stats['_trades'].iloc[0]
        self.assertEqual(trade.Entry_sum_ab, 114)
        self.assertEqual(trade.Exit_sum_ab, 116)

    def test_PortfolioBacktest_rejects_invalid_ohlc(self):
        data = pd.DataFrame({
            'Open': [100, 100],
            'High': [100, 101],
            'Low': [98, 99],
            'Close': [100, 100],
            'Volume': [1000, 1000],
        }, index=pd.date_range('2020-01-01', periods=2))

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                pass

        high_bad = data.copy()
        high_bad.loc[high_bad.index[0], 'High'] = 99
        with self.assertRaisesRegex(ValueError, 'High'):
            PortfolioBacktest({'A': high_bad}, S)

        bad_type = data.copy()
        bad_type['Open'] = bad_type['Open'].astype(object)
        bad_type.loc[bad_type.index[0], 'Open'] = 'bad'
        with self.assertRaisesRegex(ValueError, 'numeric'):
            PortfolioBacktest({'A': bad_type}, S)

        bad_volume = data.copy()
        bad_volume['Volume'] = bad_volume['Volume'].astype(object)
        bad_volume.loc[bad_volume.index[0], 'Volume'] = 'bad'
        with self.assertRaisesRegex(ValueError, 'Volume values must be numeric'):
            PortfolioBacktest({'A': bad_volume}, S)

    def test_PortfolioBacktest_rejects_invalid_data_dtypes_and_index(self):
        index = pd.date_range('2020-01-01', periods=2)
        data = pd.DataFrame({
            'Open': [100., 101.],
            'High': [101., 102.],
            'Low': [99., 100.],
            'Close': [100., 101.],
            'Volume': [1000., 1000.],
        }, index=index)

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                pass

        bool_ohlc = data.copy()
        for col in ['Open', 'High', 'Low', 'Close']:
            bool_ohlc[col] = True
        with self.assertRaisesRegex(ValueError, 'OHLC values must be real numeric'):
            PortfolioBacktest({'A': bool_ohlc}, S)

        complex_ohlc = data.copy()
        complex_ohlc['Close'] = complex_ohlc['Close'].astype(complex)
        with self.assertRaisesRegex(ValueError, 'OHLC values must be real numeric'):
            PortfolioBacktest({'A': complex_ohlc}, S)

        nat_index = data.copy()
        nat_index.index = pd.DatetimeIndex([pd.Timestamp('2020-01-01'), pd.NaT])
        with self.assertRaisesRegex(ValueError, 'index contains missing values'):
            PortfolioBacktest({'A': nat_index}, S)

        infinite_volume = data.copy()
        infinite_volume.loc[infinite_volume.index[0], 'Volume'] = np.inf
        with self.assertRaisesRegex(ValueError, 'Volume values must be finite'):
            PortfolioBacktest({'A': infinite_volume}, S)

    def test_PortfolioBacktest_accepts_nullable_numeric_data_dtypes(self):
        index = pd.date_range('2020-01-01', periods=3)
        data = pd.DataFrame({
            'Open': pd.array([100, 101, 102], dtype='Float64'),
            'High': pd.array([101, 102, 103], dtype='Float64'),
            'Low': pd.array([99, 100, 101], dtype='Float64'),
            'Close': pd.array([100, 101, 102], dtype='Float64'),
            'Volume': pd.array([1000, 1001, 1002], dtype='Int64'),
        }, index=index)

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                if len(self.data) == 2:
                    self.buy('A', size=1)

        stats = PortfolioBacktest({'A': data}, S, cash=10_000, finalize_trades=True).run()
        self.assertEqual(stats['# Trades'], 1)

    def test_PortfolioBacktest_validates_symbol_mapped_costs_early(self):
        index = pd.date_range('2020-01-01', periods=2)
        data = pd.DataFrame({
            'Open': [100, 100],
            'High': [100, 100],
            'Low': [100, 100],
            'Close': [100, 100],
            'Volume': [1000, 1000],
        }, index=index)

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                pass

        with self.assertRaisesRegex(KeyError, 'B'):
            PortfolioBacktest({'A': data}, S, commission={'B': 0})
        with self.assertRaisesRegex(KeyError, 'B'):
            PortfolioBacktest({'A': data}, S, spread={'B': 0})

    def test_PortfolioBacktest_validates_scalar_costs_and_broker_config_early(self):
        index = pd.date_range('2020-01-01', periods=2)
        data = pd.DataFrame({
            'Open': [100, 100],
            'High': [100, 100],
            'Low': [100, 100],
            'Close': [100, 100],
            'Volume': [1000, 1000],
        }, index=index)

        class S(Strategy):
            def init(self):
                pass

            def next(self):
                pass

        with self.assertRaisesRegex(ValueError, '`spread` must be >= 0'):
            PortfolioBacktest({'A': data}, S, spread=-0.01)

        with self.assertRaisesRegex(ValueError, '`spread` must be finite'):
            PortfolioBacktest({'A': data}, S, spread=np.inf)

        with self.assertRaisesRegex(ValueError, 'commission'):
            PortfolioBacktest({'A': data}, S, commission=(-1, 0))

        with self.assertRaisesRegex(ValueError, 'commission'):
            PortfolioBacktest({'A': data}, S, commission=(1,))

        with self.assertRaisesRegex(ValueError, 'cash'):
            PortfolioBacktest({'A': data}, S, cash=0)

        with self.assertRaisesRegex(ValueError, 'margin'):
            PortfolioBacktest({'A': data}, S, margin=0)

        with self.assertRaisesRegex(ValueError, 'margin'):
            PortfolioBacktest({'A': data}, S, margin=1.5)


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
        bt = Backtest(SHORT_DATA, SmaCross)
        with ProcessPoolExecutor() as executor:
            stats = executor.submit(Backtest.run, bt).result()
        assert stats._strategy._indicators[0]._opts, '._opts and .name were not unpickled'
        bt.plot(results=stats, resample='2d', open_browser=False)


class TestDocs(TestCase):
    DOCS_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'doc')

    @unittest.skipUnless(os.path.isdir(DOCS_DIR), "docs dir doesn't exist")
    @unittest.skipUnless(sys.platform.startswith('linux'), "test_examples requires mp.start_method=fork")
    def test_examples(self):
        import backtesting
        examples_root = os.path.join(self.DOCS_DIR, 'examples')
        examples = glob(os.path.join(examples_root, '**', '*.py'), recursive=True)
        self.assertGreaterEqual(len(examples), 4)
        self.assertIn(os.path.join(examples_root, 'Multi Asset Trading',
                                   'Bollinger Band Portfolio.py'),
                      examples)
        with chdir(gettempdir()), \
                patch(backtesting, 'Pool', mp.get_context('fork').Pool):
            for file in examples:
                with self.subTest(example=os.path.relpath(file, examples_root)):
                    run_path(file)

    def test_backtest_run_docstring_contains_stats_keys(self):
        stats = Backtest(SHORT_DATA, SmaCross).run()
        for key in stats.index:
            self.assertIn(key, Backtest.run.__doc__)

    def test_readme_contains_stats_keys(self):
        with open(os.path.join(os.path.dirname(__file__),
                               '..', '..', 'README.md')) as f:
            readme = f.read()
        stats = Backtest(SHORT_DATA, SmaCross).run()
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

    def test_sl_tp_values_in_trades_df(self):
        class S(_S):
            def next(self):
                self.next = lambda: None
                self.buy(size=1, tp=111)
                self.buy(size=1, sl=99)

        trades = Backtest(SHORT_DATA, S).run()._trades
        self.assertEqual(trades['SL'].fillna(0).tolist(), [0, 99])
        self.assertEqual(trades['TP'].fillna(0).tolist(), [111, 0])
