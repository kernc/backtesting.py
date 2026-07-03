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

from backtesting import Backtest, Strategy
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
                'Avg. Drawdown Duration': pd.Timedelta('41 days 00:00:00'),
                'Avg. Drawdown [%]': -5.925851581948801,
                'Avg. Trade Duration': pd.Timedelta('46 days 00:00:00'),
                'Avg. Trade [%]': 2.531715975158555,
                'Best Trade [%]': 53.59595229490424,
                'Buy & Hold Return [%]': 522.0601851851852,
                'Calmar Ratio': 0.4414380935608377,
                'Duration': pd.Timedelta('3116 days 00:00:00'),
                'End': pd.Timestamp('2013-03-01 00:00:00'),
                'Equity Final [$]': 51422.98999999996,
                'Equity Peak [$]': 75787.44,
                'Expectancy [%]': 3.2748078066748834,
                'Exposure Time [%]': 96.74115456238361,
                'Max. Drawdown Duration': pd.Timedelta('584 days 00:00:00'),
                'Max. Drawdown [%]': -47.98012705007589,
                'Max. Trade Duration': pd.Timedelta('183 days 00:00:00'),
                'Profit Factor': 2.167945974262033,
                'Return (Ann.) [%]': 21.180255813792282,
                'Return [%]': 414.2298999999996,
                'Volatility (Ann.) [%]': 36.49390889140787,
                'CAGR [%]': 14.159843619607383,
                'SQN': 1.0766187356697705,
                'Kelly Criterion': 0.1518705127029717,
                'Sharpe Ratio': 0.5803778344714113,
                'Sortino Ratio': 1.0847880675854096,
                'Start': pd.Timestamp('2004-08-19 00:00:00'),
                'Win Rate [%]': 46.96969696969697,
                'Worst Trade [%]': -18.39887353835481,
                'Alpha [%]': 394.37391142027462,
                'Beta': 0.03803390709192,
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
        examples = glob(os.path.join(self.DOCS_DIR, 'examples', '*.py'))
        self.assertGreaterEqual(len(examples), 4)
        with chdir(gettempdir()), \
                patch(backtesting, 'Pool', mp.get_context('fork').Pool):
            for file in examples:
                with self.subTest(example=os.path.basename(file)):
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


class TestMultiAsset(TestCase):
    @staticmethod
    def _df(values, index=None, high=None, low=None):
        """OHLC frame with Open == Close (== High == Low unless overridden).
        NaN values produce all-NaN (non-traded) bars."""
        v = pd.Series(values, index=index, dtype=float)
        return pd.DataFrame({
            'Open': v,
            'High': v if high is None else pd.Series(high, index=index, dtype=float),
            'Low': v if low is None else pd.Series(low, index=index, dtype=float),
            'Close': v})

    @staticmethod
    def _index(n, start='2020-01-01'):
        return pd.date_range(start, periods=n, freq='D')

    @contextmanager
    def _no_full_equity_warning(self):
        with warnings.catch_warnings():
            warnings.filterwarnings('ignore', message='.*default size.*')
            yield

    # Input handling & validation ############################################

    def test_dict_and_multiindex_input_equivalent(self):
        a, b = GOOG.iloc[:60], GOOG.iloc[30:90] * 2
        multi_df = pd.concat({'A': a, 'B': b}, axis=1)

        class S(_S):
            def next(self):
                if len(self.data) == 40:
                    self.buy(symbol='A', size=1)
                    self.sell(symbol='B', size=1)

        stats1 = Backtest({'A': a, 'B': b}, S, finalize_trades=True).run()
        stats2 = Backtest(multi_df, S, finalize_trades=True).run()
        assert_frame_equal(stats1._trades, stats2._trades)
        np.testing.assert_array_equal(stats1._equity_curve.Equity,
                                      stats2._equity_curve.Equity)
        self.assertEqual(sorted(stats1._trades['Symbol']), ['A', 'B'])
        self.assertEqual(stats1._trades.columns[0], 'Symbol')

    def test_single_asset_has_no_symbol_column(self):
        stats = Backtest(SHORT_DATA, SmaCross, finalize_trades=True).run(fast=2, slow=4)
        self.assertNotIn('Symbol', stats._trades.columns)

    def test_input_validation(self):
        idx = self._index(4)
        good = self._df([1, 2, 3, 4], idx)

        # Non-DataFrame dict value
        self.assertRaises(TypeError, Backtest, {'A': good.Close}, _S)
        # Empty dict
        self.assertRaises(ValueError, Backtest, {}, _S)
        # Duplicate timestamps within a symbol
        dup = good.copy()
        dup.index = idx[[0, 1, 1, 2]]
        self.assertRaises(ValueError, Backtest, {'A': dup}, _S)
        # Non-string symbols
        self.assertRaises(ValueError, Backtest, {1: good}, _S)
        # Symbol shadowing OHLCV fields
        self.assertRaises(ValueError, Backtest, {'Close': good}, _S)
        # Partially-NaN OHLC bar
        partial = good.copy()
        partial.loc[idx[1], 'High'] = np.nan
        self.assertRaisesRegex(ValueError, 'all be present',
                               Backtest, {'A': good, 'B': partial}, _S)
        # All-NaN symbol
        self.assertRaisesRegex(ValueError, 'no OHLC',
                               Backtest, {'A': good, 'B': good * np.nan}, _S)
        # >2 column levels
        deep = pd.concat({'X': pd.concat({'A': good}, axis=1)}, axis=1)
        self.assertRaises(ValueError, Backtest, deep, _S)
        # Mixed tz-aware and tz-naive indexes
        tz = good.copy()
        tz.index = tz.index.tz_localize('UTC')
        self.assertRaises(ValueError, Backtest, {'A': good, 'B': tz}, _S)
        # Volume is added per symbol
        bt = Backtest({'A': good, 'B': good}, _S)
        self.assertIn(('A', 'Volume'), bt._data.columns)
        self.assertIn(('B', 'Volume'), bt._data.columns)
        # Warning on prices exceeding cash
        with self.assertWarnsRegex(UserWarning, 'larger than initial cash'):
            Backtest({'A': good, 'B': good * 1e6}, _S)
        # Warning on markedly different calendars
        monthly = self._df(np.r_[1:5], pd.date_range('2020-01-01', periods=4, freq='MS'))
        with self.assertWarnsRegex(UserWarning, 'calendars'):
            Backtest({'A': good, 'B': monthly}, _S)

    def test_symbol_validation_and_suggestions(self):
        class BuyTypo(_S):
            def next(self):
                self.buy(symbol='GOOX')

        bt = Backtest({'GOOG': SHORT_DATA, 'AAPL': SHORT_DATA}, BuyTypo)
        self.assertRaisesRegex(ValueError, "Did you mean: 'GOOG'", bt.run)

        class BuyNoSymbol(_S):
            def next(self):
                self.buy()

        bt = Backtest({'GOOG': SHORT_DATA, 'AAPL': SHORT_DATA}, BuyNoSymbol)
        self.assertRaisesRegex(ValueError, 'explicit order routing', bt.run)

        class SymbolInSingle(_S):
            def next(self):
                self.buy(symbol='GOOG')

        bt = Backtest(SHORT_DATA, SymbolInSingle)
        self.assertRaisesRegex(ValueError, 'single-asset backtest', bt.run)

        class BadIndicatorSymbol(_S):
            def init(self):
                self.I(SMA, self.data['GOOG'].Close, 2, symbol='NOPE')

            def next(self):
                pass

        bt = Backtest({'GOOG': SHORT_DATA, 'AAPL': SHORT_DATA}, BadIndicatorSymbol)
        self.assertRaisesRegex(ValueError, 'Unknown symbol', bt.run)

    # Zero-behavior-change degeneracy ########################################

    def test_degeneracy_matrix(self):
        """`Backtest({'X': df})` must equal `Backtest(df)` bit for bit."""
        class SmaCrossM(Strategy):
            fast, slow = 10, 30

            def init(self):
                close = self.data['X'].Close
                self.sma1 = self.I(SMA, close, self.fast, symbol='X')
                self.sma2 = self.I(SMA, close, self.slow, symbol='X')

            def next(self):
                if crossover(self.sma1, self.sma2):
                    self.positions['X'].close()
                    self.buy(symbol='X')
                elif crossover(self.sma2, self.sma1):
                    self.positions['X'].close()
                    self.sell(symbol='X')

        df = GOOG.iloc[:150]
        for kwargs in (dict(),
                       dict(trade_on_close=True),
                       dict(hedging=True),
                       dict(exclusive_orders=True),
                       dict(margin=.1, spread=.001, commission=.002),
                       dict(finalize_trades=True),
                       dict(finalize_trades=True, trade_on_close=True)):
            with self.subTest(**kwargs):
                stats1 = Backtest(df, SmaCross, **kwargs).run()
                with self._no_full_equity_warning():
                    stats2 = Backtest({'X': df}, SmaCrossM, **kwargs).run()
                np.testing.assert_array_equal(stats1._equity_curve.Equity,
                                              stats2._equity_curve.Equity)
                trades2 = stats2._trades.drop(columns='Symbol')
                trades1 = stats1._trades
                # Indicator entry/exit column names differ ('X: SMA...'); compare values
                trades2.columns = trades1.columns
                assert_frame_equal(trades1, trades2)

    # Look-ahead bias ########################################################

    def test_progressive_revelation(self):
        idx = self._index(30)
        a = self._df(np.r_[1:31.], idx)
        b = self._df(np.r_[[np.nan] * 10, 11:31.], idx)  # Lists 10 bars later
        test = self

        class S(_S):
            def init(self):
                self.a = self.data['A']  # Child view captured in init
                self.data.df[('A', 'Extra')] = np.arange(30.)  # Mutate master df

            def next(self):
                i = len(self.data)
                test.assertEqual(len(self.data['A']), i)
                test.assertEqual(len(self.data['B']), i)
                test.assertEqual(len(self.a), i)  # Captured view stays slaved
                test.assertEqual(self.a.Close[-1], i)
                test.assertEqual(len(self.data.df), i)
                test.assertEqual(self.data['A'].Extra[-1], i - 1)
                b_close = self.data['B'].Close
                if i <= 10:
                    test.assertTrue(np.isnan(b_close[-1]))  # Pre-listing NaN
                else:
                    test.assertEqual(b_close[-1], i)
                test.assertEqual(self.data.index[-1], idx[i - 1])

        Backtest({'A': a, 'B': b}, S).run()

    def test_future_perturbation_does_not_change_past(self):
        T = 100
        rng = np.random.RandomState(0)

        def perturbed(df, t):
            df = df.copy()
            noise = 1 + .2 * rng.random(len(df) - t)
            for col in ('Open', 'High', 'Low', 'Close'):
                df.iloc[t:, df.columns.get_loc(col)] *= noise
            return df

        a, b = GOOG.iloc[:150], GOOG.iloc[20:170].reset_index(drop=True).set_index(
            GOOG.index[:150]) * 1.5

        class S(Strategy):
            def init(self):
                self.sma = {s: self.I(SMA, self.data[s].Close, 10, symbol=s)
                            for s in self.data.symbols}

            def next(self):
                for s in self.data.symbols:
                    if crossover(self.data[s].Close, self.sma[s]):
                        self.buy(symbol=s, size=.2)
                    elif self.positions[s] and crossover(self.sma[s], self.data[s].Close):
                        self.positions[s].close()

        stats1 = Backtest({'A': a, 'B': b}, S).run()
        stats2 = Backtest({'A': perturbed(a, T), 'B': perturbed(b, T)}, S).run()

        np.testing.assert_array_equal(stats1._equity_curve.Equity[:T],
                                      stats2._equity_curve.Equity[:T])
        closed_before_t = [t[t.ExitBar < T] for t in (stats1._trades, stats2._trades)]
        assert_frame_equal(*closed_before_t)
        self.assertGreater(len(closed_before_t[0]), 0)

    # NaN-gap (calendar) semantics ###########################################

    def test_market_order_defers_across_gap(self):
        idx = self._index(6)
        a = self._df([10, 11, 12, 13, 14, 15], idx)
        b = self._df([20, 21, np.nan, np.nan, 24, 25], idx)

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='B', size=1)

        stats = Backtest({'A': a, 'B': b}, S, finalize_trades=True).run()
        trade = stats._trades.iloc[0]
        # Order placed on bar 1 fills at B's next traded bar's open (bar 4 @ 24),
        # not on NaN bars 2-3, not at a stale/ffilled price
        self.assertEqual(trade.EntryBar, 4)
        self.assertEqual(trade.EntryPrice, 24)
        self.assertEqual(trade.EntryTime, idx[4])

    def test_contingent_orders_dormant_during_gap(self):
        idx = self._index(7)
        a = self._df([10, 11, 12, 13, 14, 15, 16], idx)
        # B: trades at 20, 21, then halts (during which "prices" would have crossed
        # any level), resumes at 15 (gapping through the stop level 18)
        b = self._df([20, 21, np.nan, np.nan, np.nan, 15, 15], idx)

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.sell(symbol='B', size=1, stop=18)

        stats = Backtest({'A': a, 'B': b}, S, finalize_trades=True).run()
        trade = stats._trades.iloc[0]
        # Stop not evaluated during the halt; on resume, pessimistic gap-through
        # fill at min(open, stop) = 15
        self.assertEqual(trade.EntryBar, 5)
        self.assertEqual(trade.EntryPrice, 15)

        class S2(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='B', size=1, sl=19)

        stats2 = Backtest({'A': a, 'B': b}, S2).run()
        trade2 = stats2._trades.iloc[0]
        # Entry at bar 2's open is deferred to bar 5 (B halted); SL 19 then
        # exits at min(open, sl) = 15 on B's next traded bar
        self.assertEqual((trade2.EntryBar, trade2.EntryPrice), (5, 15))

    def test_trade_on_close_across_gap(self):
        idx = self._index(6)
        a = self._df([10, 11, 12, 13, 14, 15], idx)
        b = self._df([20, 21, np.nan, np.nan, 24, 25], idx)

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='A', size=1)  # Contiguous symbol
                    self.buy(symbol='B', size=1)  # Symbol halted on next bar

        with self._no_full_equity_warning():
            stats = Backtest({'A': a, 'B': b}, S, trade_on_close=True,
                             finalize_trades=True).run()
        trades = stats._trades.set_index('Symbol')
        # A fills at bar 1's close, stamped on bar 1 (standard trade_on_close)
        self.assertEqual((trades.loc['A', 'EntryBar'], trades.loc['A', 'EntryPrice']), (1, 11))
        # B, deferred across the gap, fills at its resume bar's open --
        # there was no close it could have filled at
        self.assertEqual((trades.loc['B', 'EntryBar'], trades.loc['B', 'EntryPrice']), (4, 24))

    def test_mark_to_market_and_equity_during_halt(self):
        idx = self._index(6)
        a = self._df([10.] * 6, idx)  # Flat, to isolate B's effect
        b = self._df([20, 21, np.nan, np.nan, 27, 28], idx)

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='B', size=2)

        stats = Backtest({'A': a, 'B': b}, S, cash=1000, finalize_trades=True).run()
        equity = stats._equity_curve.Equity
        # Entry (ordered on bar 1) is deferred over the bar-2/3 halt to bar 4 @ 27
        trade = stats._trades.iloc[0]
        self.assertEqual((trade.EntryBar, trade.EntryPrice), (4, 27))
        np.testing.assert_array_equal(equity.values, [
            1000, 1000, 1000, 1000, 1000, 1000 + 2 * (28 - 27)])

    def test_mark_to_market_stale_close(self):
        idx = self._index(6)
        a = self._df([10.] * 6, idx)
        b = self._df([20, 21, 22, np.nan, np.nan, 30], idx)

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='B', size=2)

        with self.assertWarnsRegex(UserWarning, 'remain open.*B'):
            stats = Backtest({'A': a, 'B': b}, S, cash=1000).run()
        equity = stats._equity_curve.Equity
        # Entry bar 2 @ 22; equity marks at 22 through the bar-3/4 halt
        np.testing.assert_array_equal(equity.values, [
            1000, 1000, 1000, 1000, 1000, 1000 + 2 * (30 - 22)])

    def test_pre_listing_orders(self):
        idx = self._index(5)
        a = self._df([10, 11, 12, 13, 14], idx)
        b = self._df([np.nan, np.nan, 20, 21, 22], idx)

        class MarketTooEarly(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='B', size=1)

        bt = Backtest({'A': a, 'B': b}, MarketTooEarly)
        self.assertRaisesRegex(ValueError, 'no price data', bt.run)

        class LimitBeforeListing(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='B', size=1, limit=20.5)

        stats = Backtest({'A': a, 'B': b}, LimitBeforeListing, finalize_trades=True).run()
        trade = stats._trades.iloc[0]
        # Limit order legally queues pre-listing and fills once B lists
        self.assertEqual((trade.EntryBar, trade.EntryPrice), (2, 20))

    # Netting, hedging, exclusivity, margin ##################################

    def test_netting_scoped_per_symbol(self):
        idx = self._index(6)
        dfs = {s: self._df([10, 11, 12, 13, 14, 15], idx) for s in 'AB'}

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='A', size=5)
                    self.buy(symbol='B', size=3)
                elif len(self.data) == 4:
                    self.sell(symbol='A', size=2)  # Reduces A only

        stats = Backtest(dfs, S).run()
        # The sell(2) FIFO-reduced A's own position; B untouched
        closed, = stats._trades.itertuples(index=False)
        self.assertEqual((closed.Symbol, closed.Size), ('A', 2))
        remaining = {t.symbol: t.size for t in stats._strategy._broker.trades}
        self.assertEqual(remaining, {'A': 3, 'B': 3})

    def test_exclusive_orders_scoped_per_symbol(self):
        idx = self._index(6)
        dfs = {s: self._df([10, 11, 12, 13, 14, 15], idx) for s in 'AB'}

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='A', size=1)
                    self.buy(symbol='B', size=1)
                elif len(self.data) == 4:
                    self.sell(symbol='A', size=1)  # Flips A; must not touch B

        stats = Backtest(dfs, S, exclusive_orders=True).run()
        remaining = {t.symbol: t.size for t in stats._strategy._broker.trades}
        self.assertEqual(remaining, {'A': -1, 'B': 1})
        closed = stats._trades
        self.assertEqual(list(closed.Symbol), ['A'])

    def test_hedging_across_symbols(self):
        idx = self._index(4)
        dfs = {s: self._df([10, 11, 12, 13], idx) for s in 'AB'}

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='A', size=1)
                    self.sell(symbol='B', size=1)

        stats = Backtest(dfs, S, hedging=True).run()
        remaining = {t.symbol: t.size for t in stats._strategy._broker.trades}
        self.assertEqual(remaining, {'A': 1, 'B': -1})

    def test_shared_account_margin(self):
        idx = self._index(4)
        dfs = {s: self._df([100.] * 4, idx) for s in 'AB'}

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='A', size=.5)
                    self.buy(symbol='B', size=.5)

        stats = Backtest(dfs, S, cash=1000).run()
        trades = stats._strategy._broker.trades
        # Sequential consumption of one shared account: .5 *of remaining* each
        self.assertEqual([(t.symbol, t.size) for t in trades], [('A', 5), ('B', 2)])

        class TooBig(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='A', size=9)
                    self.buy(symbol='B', size=9)

        with self.assertWarnsRegex(UserWarning, 'insufficient margin'):
            Backtest(dfs, TooBig, cash=1000).run()

    def test_full_equity_default_size_warns_once(self):
        idx = self._index(4)
        dfs = {s: self._df([10, 11, 12, 13], idx) for s in 'AB'}

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='A')
                    self.buy(symbol='B')

        with warnings.catch_warnings(record=True) as w:
            warnings.simplefilter('always')
            Backtest(dfs, S).run()
        self.assertEqual(sum('default size' in str(x.message) for x in w), 1)

    def test_bankruptcy_closes_all_positions(self):
        idx = self._index(5)
        a = self._df([100, 100, 50, 10, 5], idx)
        b = self._df([100, 100, 60, 20, 10], idx)

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='A', size=12)
                    self.buy(symbol='B', size=12)

        stats = Backtest({'A': a, 'B': b}, S, cash=1000, margin=.5).run()
        self.assertEqual(len(stats._strategy._broker.trades), 0)
        self.assertEqual(sorted(stats._trades.Symbol), ['A', 'B'])
        equity = stats._equity_curve.Equity
        self.assertEqual(equity.iloc[-1], 0)

    # Positions & data API ###################################################

    def test_positions_api(self):
        idx = self._index(5)
        dfs = {s: self._df([10, 11, 12, 13, 14], idx) for s in 'AB'}
        test = self

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='A', size=2)
                if len(self.data) == 4:
                    test.assertTrue(self.positions['A'])
                    test.assertFalse(self.positions['B'])
                    test.assertEqual(self.positions['A'].size, 2)
                    test.assertEqual(self.positions['A'].symbol, 'A')
                    test.assertGreater(self.positions['A'].pl, 0)
                    test.assertRaises(RuntimeError, lambda: self.position)
                    test.assertRaises(KeyError, lambda: self.positions['Z'])
                    test.assertRaisesRegex(
                        AttributeError, 'ambiguous', lambda: self.data.Close)
                    test.assertRaisesRegex(
                        AttributeError, 'ambiguous', lambda: self.data.pip)
                    test.assertEqual(self.data['A'].pip, .1)
                    self.positions['A'].close()

        Backtest(dfs, S).run()

    def test_portable_strategy_idiom(self):
        class Portable(Strategy):
            def init(self):
                self.sma = {s: self.I(SMA, self.data[s].Close, 3, symbol=s)
                            for s in (self.data.symbols or (None,))}

            def next(self):
                for s in (self.data.symbols or (None,)):
                    d = self.data[s]
                    if np.isnan(d.Close[-1]):
                        continue
                    if not self.positions[s] and d.Close[-1] > self.sma[s][-1]:
                        self.buy(symbol=s, size=1)
                    elif self.positions[s] and d.Close[-1] < self.sma[s][-1]:
                        self.positions[s].close()

        stats_single = Backtest(SHORT_DATA, Portable).run()
        stats_multi = Backtest({'X': SHORT_DATA, 'Y': SHORT_DATA * 2}, Portable).run()
        self.assertGreater(stats_single['# Trades'], 0)
        self.assertGreater(stats_multi['# Trades'], 0)

    def test_order_trade_symbol_attribution(self):
        idx = self._index(5)
        dfs = {s: self._df([10, 11, 12, 13, 14], idx) for s in 'AB'}
        test = self
        commission_symbols = []

        def commission(order_size, price, symbol):
            commission_symbols.append(symbol)
            return 0.

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    order = self.buy(symbol='A', size=2, sl=5, tp=100)
                    test.assertEqual(order.symbol, 'A')
                    test.assertIn("symbol='A'", repr(order))
                if len(self.data) == 4:
                    trade, = self.trades
                    test.assertEqual(trade.symbol, 'A')
                    test.assertIn('symbol=A', repr(trade))
                    test.assertEqual(trade._sl_order.symbol, 'A')
                    test.assertEqual(trade._tp_order.symbol, 'A')
                    test.assertIn('A', repr(self.positions['A']))

        Backtest(dfs, S, commission=commission).run()
        self.assertEqual(set(commission_symbols), {'A'})

    # Indicators, containers, warmup #########################################

    def test_container_indicators_sliced_progressively(self):
        idx = self._index(20)
        dfs = {s: self._df(np.r_[1:21.], idx) for s in 'AB'}
        test = self
        from collections import namedtuple
        NT = namedtuple('NT', ['a', 'b'])

        class S(_S):
            def init(self):
                arange = lambda: np.arange(len(self.data), dtype=float)  # noqa: E731
                self.dct = {s: self.I(arange, name=f'{s}d', symbol=s) for s in 'AB'}
                self.lst = [self.I(arange, name='l0'), self.I(arange, name='l1')]
                self.tpl = (self.I(arange, name='t0'),)
                self.nt = NT(self.I(arange, name='n0'), self.I(arange, name='n1'))

            def next(self):
                i = len(self.data) - 1
                for s in 'AB':
                    test.assertEqual(self.dct[s][-1], i)
                    test.assertEqual(len(self.dct[s]), i + 1)
                test.assertEqual(self.lst[0][-1], i)
                test.assertEqual(self.tpl[0][-1], i)
                test.assertEqual(self.nt.a[-1], i)
                test.assertIsInstance(self.nt, NT)

        Backtest(dfs, S).run()

    def test_mixed_container_raises(self):
        class S(_S):
            def init(self):
                self.mixed = {'ind': self.I(lambda: np.arange(len(self.data)), name='x'),
                              'other': 42}

            def next(self):
                pass

        bt = Backtest(SHORT_DATA, S)
        self.assertRaisesRegex(ValueError, 'mixes indicators', bt.run)

    def test_warmup_multiasset_groups(self):
        idx = self._index(30)
        a = self._df(np.r_[1:31.], idx)
        b = self._df(np.r_[[np.nan] * 15, 16:31.], idx)  # Lists on bar 15
        first_bar_seen = []

        class S(Strategy):
            def init(self):
                self.sma = {s: self.I(SMA, self.data[s].Close, 5, symbol=s)
                            for s in self.data.symbols}

            def next(self):
                first_bar_seen.append(len(self.data) - 1)

        Backtest({'A': a, 'B': b}, S).run()
        # A's SMA(5) is warm on bar 4; B's only on bar 19.
        # Earliest-ready group wins (+1 for at least two entries available)
        self.assertEqual(first_bar_seen[0], 5)

        # An untagged indicator gates every group
        first_bar_seen.clear()

        class S2(S):
            def init(self):
                super().init()
                self.gate = self.I(lambda: self.data['B'].Close * 1., name='gate')

        Backtest({'A': a, 'B': b}, S2).run()
        self.assertEqual(first_bar_seen[0], 16)

        # A never-valid group is excluded rather than collapsing the warmup
        first_bar_seen.clear()

        class S3(S):
            def init(self):
                super().init()
                self.dead = self.I(lambda: self.data['B'].Close * np.nan,
                                   name='dead', symbol='B')

        Backtest({'A': a, 'B': b}, S3).run()
        self.assertEqual(first_bar_seen[0], 5)

        # All groups never-valid => no simulation, with a warning
        class S4(Strategy):
            def init(self):
                self.dead = self.I(lambda: self.data['A'].Close * np.nan, name='dead')

            def next(self):
                raise AssertionError('should never run')

        with self.assertWarnsRegex(UserWarning, 'ever becomes non-NaN'):
            stats = Backtest({'A': a, 'B': b}, S4).run()
        self.assertEqual(stats['# Trades'], 0)

    def test_indicator_master_length_enforced(self):
        class S(_S):
            def init(self):
                self.I(lambda: self.data['A'].Close.s.dropna(), symbol='B', name='bad')

            def next(self):
                pass

        idx = self._index(10)
        a = self._df(np.r_[[np.nan] * 5, 6:11.], idx)
        b = self._df(np.r_[1:11.], idx)
        bt = Backtest({'A': a, 'B': b}, S)
        self.assertRaisesRegex(ValueError, 'same length', bt.run)

    # Stats ##################################################################

    def test_multiasset_stats_and_benchmark(self):
        idx = self._index(4)
        a = self._df([10, 11, 12, 13], idx)                    # +10%, +9.09%, +8.33%
        b = self._df([np.nan, 20, 22, np.nan], idx)            # lists bar 1, delists bar 3

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='A', size=1)

        with warnings.catch_warnings():
            warnings.simplefilter('ignore')
            stats = Backtest({'A': a, 'B': b}, S, finalize_trades=True).run()

        # Equal-weight rebalanced basket:
        # bar1: mean(10%) [B just listed, no return yet] -> hmm, B has return NaN on bar 1
        r1 = (11 / 10 - 1)
        r2 = np.mean([12 / 11 - 1, 22 / 20 - 1])
        r3 = (13 / 12 - 1)  # B delisted, drops out
        expected = (1 + r1) * (1 + r2) * (1 + r3) - 1
        self.assertAlmostEqual(stats['Buy & Hold Return [%]'], expected * 100)

        # Symbol column first, indicator masking N/A here
        self.assertEqual(stats._trades.columns[0], 'Symbol')

    def test_indicator_columns_masked_across_symbols(self):
        idx = self._index(20)
        dfs = {s: self._df(np.r_[1:21.], idx) for s in 'AB'}

        class S(Strategy):
            def init(self):
                self.sma_a = self.I(SMA, self.data['A'].Close, 3, symbol='A')

            def next(self):
                if len(self.data) == 5:
                    self.buy(symbol='A', size=1)
                    self.buy(symbol='B', size=1)
                if len(self.data) == 8:
                    for trade in self.trades:
                        trade.close()

        stats = Backtest(dfs, S).run()
        trades = stats._trades.set_index('Symbol')
        col = [c for c in trades.columns if c.startswith('Entry_')][0]
        self.assertFalse(np.isnan(trades.loc['A', col]))
        self.assertTrue(np.isnan(trades.loc['B', col]))

    def test_lib_compute_stats_multiasset_subset(self):
        df = GOOG.iloc[:100]
        with self._no_full_equity_warning():
            stats = Backtest({'A': df, 'B': df * 2}, _PortfolioSmaCross,
                             cash=100_000, finalize_trades=True).run()
        trades_a = stats._trades[stats._trades.Symbol == 'A']
        stats_a = compute_stats(stats=stats, trades=trades_a,
                                data=pd.concat({'A': df, 'B': df * 2}, axis=1))
        self.assertEqual(stats_a['# Trades'], len(trades_a))

    # Finalization ###########################################################

    def test_finalize_trades_settles_delisted_symbol(self):
        idx = self._index(6)
        a = self._df([10, 11, 12, 13, 14, 15], idx)
        b = self._df([20, 21, 22, 23, np.nan, np.nan], idx)

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='A', size=1)
                    self.buy(symbol='B', size=1)

        stats = Backtest({'A': a, 'B': b}, S, finalize_trades=True).run()
        trades = stats._trades.set_index('Symbol')
        self.assertEqual(len(trades), 2)
        # B settles at its last traded close, stamped on its last traded bar
        self.assertEqual((trades.loc['B', 'ExitBar'], trades.loc['B', 'ExitPrice']), (3, 23))
        # A closes through the regular end-of-run pipeline on the last bar
        self.assertEqual((trades.loc['A', 'ExitBar'], trades.loc['A', 'ExitPrice']), (5, 15))
        self.assertEqual(len(stats._strategy._broker.trades), 0)
        self.assertEqual(len(stats._strategy.orders), 0)

    # Plotting & optimization ################################################

    def test_plot_multiasset(self):
        df = GOOG.iloc[:100]
        dfs = {'A': df, 'B': (df.iloc[30:] * 2).round(1)}
        with self._no_full_equity_warning():
            bt = Backtest(dfs, _PortfolioSmaCross, cash=100_000, finalize_trades=True)
            stats = bt.run()
        self.assertRaisesRegex(ValueError, 'Symbols', bt.plot, results=stats,
                               open_browser=False)
        self.assertRaisesRegex(ValueError, 'Unknown symbol', bt.plot, results=stats,
                               symbol='Z', open_browser=False)
        for symbol in ('A', 'B'):
            with _tempfile() as f:
                bt.plot(results=stats, symbol=symbol, filename=f, open_browser=False)
                self.assertLess(100, os.path.getsize(f))

        # Single-asset plot() must reject symbol=
        bt1 = Backtest(df, SmaCross)
        bt1.run()
        self.assertRaisesRegex(ValueError, 'multi-asset', bt1.plot,
                               symbol='A', open_browser=False)

    def test_optimize_multiasset(self):
        df = GOOG.iloc[:100]
        with self._no_full_equity_warning(), warnings.catch_warnings():
            warnings.filterwarnings('ignore', message='.*Searching for best.*')
            bt = Backtest({'A': df, 'B': df * 2}, _PortfolioSmaCross, cash=100_000)
            stats = bt.optimize(fast=[5, 10], slow=[15, 25])
        self.assertGreater(stats['# Trades'], 0)

    def test_shared_memory_multiindex_roundtrip(self):
        from backtesting._util import SharedMemoryManager
        df = pd.concat({'A': GOOG.iloc[:30], 'B': GOOG.iloc[:30] * 2}, axis=1)
        with SharedMemoryManager(create=True) as smm:
            shm = smm.df2shm(df)
            df2, shms = SharedMemoryManager.shm2df(shm)
            try:
                self.assertIsInstance(df2.columns, pd.MultiIndex)
                assert_frame_equal(df, df2, check_names=False)
            finally:
                for s in shms:
                    s.close()

    def test_fractional_backtest_rejects_multiasset(self):
        self.assertRaises(TypeError, FractionalBacktest, {'A': GOOG}, SmaCross)
        self.assertRaises(TypeError, FractionalBacktest,
                          pd.concat({'A': GOOG}, axis=1), SmaCross)

    # Review-driven regression tests #########################################

    def test_commission_callable_signatures(self):
        # Legacy 2-arg callable with an extra defaulted param: called with 2 args
        def commission_defaulted(order_size, price, fee_rate=.001):
            return abs(order_size) * price * fee_rate

        class BuyOnce(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(size=1)

        stats = Backtest(SHORT_DATA, BuyOnce, commission=commission_defaulted,
                         finalize_trades=True).run()
        self.assertGreater(stats._trades['Commission'].iloc[0], 0)

        # Keyword-only `symbol` param receives the symbol in multi-asset mode
        seen = []

        def commission_kwonly(order_size, price, *, symbol=None):
            seen.append(symbol)
            return 0.

        class BuyA(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='A', size=1)

        idx = self._index(4)
        dfs = {s: self._df([10, 11, 12, 13], idx) for s in 'AB'}
        Backtest(dfs, BuyA, commission=commission_kwonly, finalize_trades=True).run()
        self.assertEqual(set(seen), {'A'})

        # *args callables keep the legacy 2-arg convention
        def commission_varargs(*args):
            assert len(args) == 2, args
            return 0.

        Backtest(SHORT_DATA, BuyOnce, commission=commission_varargs).run()

    def test_settlement_equity_includes_commissions(self):
        idx = self._index(6)
        a = self._df([10.] * 6, idx)
        b = self._df([20, 21, 22, 23, np.nan, np.nan], idx)

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    self.buy(symbol='B', size=5)

        stats = Backtest({'A': a, 'B': b}, S, cash=1000, commission=.01,
                         finalize_trades=True).run()
        # All trades closed => final equity must equal cash + sum of trade PnLs
        self.assertAlmostEqual(stats['Equity Final [$]'],
                               1000 + stats._trades.PnL.sum())

    def test_finalize_leaves_last_bar_entries_open_like_upstream(self):
        class S(_S):
            def next(self):
                if len(self.data) == len(SHORT_DATA):
                    self.buy(size=1)  # Fills during the finalize re-run

        stats = Backtest(SHORT_DATA, S, finalize_trades=True).run()
        # Upstream leaves the just-opened trade open and out of stats
        self.assertEqual(len(stats._trades), 0)
        self.assertEqual(len(stats._strategy._broker.trades), 1)

    def test_warmup_object_dtype_indicator(self):
        first_bar_seen = []

        class S(_S):
            def init(self):
                values = [None] * 5 + [1.] * (len(self.data) - 5)
                self.ind = self.I(lambda: np.asarray(values, dtype=object), name='obj')

            def next(self):
                first_bar_seen.append(len(self.data) - 1)

        Backtest(SHORT_DATA, S).run()
        # Object-dtype numeric indicators still contribute their NaN warm-up
        self.assertEqual(first_bar_seen[0], 6)

    def test_unknown_symbol_subscript_suggestion(self):
        test = self

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    test.assertRaisesRegex(
                        AttributeError, "Did you mean: 'GOOG'",
                        lambda: self.data['GOOX'])

        Backtest({'GOOG': SHORT_DATA, 'AAPL': SHORT_DATA}, S).run()

    def test_positions_mapping_read_only(self):
        test = self

        class S(_S):
            def next(self):
                if len(self.data) == 2:
                    with test.assertRaises(TypeError):
                        self.positions['A'] = None

        Backtest({'A': SHORT_DATA}, S).run()


class _PortfolioSmaCross(Strategy):
    fast, slow = 10, 30

    def init(self):
        self.sma1 = {s: self.I(SMA, self.data[s].Close, self.fast, symbol=s)
                     for s in self.data.symbols}
        self.sma2 = {s: self.I(SMA, self.data[s].Close, self.slow, symbol=s)
                     for s in self.data.symbols}

    def next(self):
        for s in self.data.symbols:
            if np.isnan(self.data[s].Close[-1]):
                continue
            if crossover(self.sma1[s], self.sma2[s]):
                self.buy(symbol=s, size=.3)
            elif crossover(self.sma2[s], self.sma1[s]) and self.positions[s]:
                self.positions[s].close()
