import inspect
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
from unittest.mock import patch

import numpy as np
import pandas as pd
from pandas.testing import assert_frame_equal

from backtesting import Backtest, Strategy
from backtesting._stats import compute_drawdown_duration_peaks
from backtesting.lib import (
    OHLCV_AGG,
    barssince,
    compute_stats,
    cross,
    crossover,
    quantile,
    SignalStrategy,
    TrailingStrategy,
    resample_apply,
    plot_heatmaps,
    random_ohlc_data,
)
from backtesting.test import GOOG, EURUSD, SMA
from backtesting._util import _Indicator, _as_str, _Array, try_

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

            def next(self, FIVE_DAYS=pd.Timedelta('3 days')):
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
                    self.orders.cancel()  # cancels only non-contingent
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
                    if self.data.index[-1] - self.data.index[trade.entry_bar] > FIVE_DAYS:
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
        self.assertEqual(stats['# Trades'], 145)

    def test_broker_params(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross,
                      cash=1000, commission=.01, margin=.1, trade_on_close=True)
        bt.run()

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
        stats = Backtest(GOOG, SmaCross).run()
        expected = pd.Series({
                # NOTE: These values are also used on the website!
                '# Trades': 66,
                'Avg. Drawdown Duration': pd.Timedelta('41 days 00:00:00'),
                'Avg. Drawdown [%]': -5.925851581948801,
                'Avg. Trade Duration': pd.Timedelta('46 days 00:00:00'),
                'Avg. Trade [%]': 2.531715975158555,
                'Best Trade [%]': 53.59595229490424,
                'Buy & Hold Return [%]': 703.4582419772772,
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
                'SQN': 1.0766187356697705,
                'Sharpe Ratio': 0.5803778344714113,
                'Sortino Ratio': 1.0847880675854096,
                'Start': pd.Timestamp('2004-08-19 00:00:00'),
                'Win Rate [%]': 46.96969696969697,
                'Worst Trade [%]': -18.39887353835481,
        })

        def almost_equal(a, b):
            try:
                return np.isclose(a, b, rtol=1.e-8)
            except TypeError:
                return a == b

        diff = {key: print(key) or value
                for key, value in stats.filter(regex='^[^_]').items()
                if not almost_equal(value, expected[key])}
        self.assertDictEqual(diff, {})

        self.assertSequenceEqual(
            sorted(stats['_equity_curve'].columns),
            sorted(['Equity', 'DrawdownPct', 'DrawdownDuration']))

        self.assertEqual(len(stats['_trades']), 66)

        self.assertSequenceEqual(
            sorted(stats['_trades'].columns),
            sorted(['Size', 'EntryBar', 'ExitBar', 'EntryPrice', 'ExitPrice',
                    'PnL', 'ReturnPct', 'EntryTime', 'ExitTime', 'Duration']))

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

        class SinglePosition(Strategy):
            def init(self):
                pass

            def next(self):
                if not self.position:
                    self.buy()

        class NoTrade(Strategy):
            def init(self):
                pass

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

        class S(Strategy):
            def init(self): pass

            def next(self):
                if self.data.index[-1] == the_day:
                    self.buy(sl=720)

        self.assertEqual(Backtest(GOOG, S).run()._trades.iloc[0].ExitPrice, 720)

        class S(S):
            def next(self):
                if self.data.index[-1] == the_day:
                    self.buy(stop=758, sl=720)

        with self.assertWarns(UserWarning):
            self.assertEqual(Backtest(GOOG, S).run()._trades.iloc[0].ExitPrice, 705.58)

    def test_stop_price_between_sl_tp(self):
        class S(Strategy):
            def init(self): pass

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

        bt = Backtest(GOOG, SmaCross, commission=.002)
        bt.run()

    def test_close_orders_from_last_strategy_iteration(self):
        class S(Strategy):
            def init(self): pass

            def next(self):
                if not self.position:
                    self.buy()
                elif len(self.data) == len(SHORT_DATA):
                    self.position.close()

        self.assertFalse(Backtest(SHORT_DATA, S).run()._trades.empty)

    def test_check_adjusted_price_when_placing_order(self):
        class S(Strategy):
            def init(self): pass

            def next(self):
                self.buy(tp=self.data.Close * 1.01)

        self.assertRaises(ValueError, Backtest(SHORT_DATA, S, commission=.02).run)


class TestStrategy(TestCase):
    def _Backtest(self, strategy_coroutine, **kwargs):
        class S(Strategy):
            def init(self):
                self.step = strategy_coroutine(self)

            def next(self):
                try_(self.step.__next__, None, StopIteration)

        return Backtest(SHORT_DATA, S, **kwargs)

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

        stats = self._Backtest(coroutine).run()
        self.assertEqual(len(stats._trades), 1)


class TestOptimize(TestCase):
    def test_optimize(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross)
        OPT_PARAMS = dict(fast=range(2, 5, 2), slow=[2, 5, 7, 9])

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

    def test_method_skopt(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross)
        res, heatmap, skopt_results = bt.optimize(
            fast=range(2, 20), slow=np.arange(2, 20, dtype=object),
            constraint=lambda p: p.fast < p.slow,
            max_tries=30,
            method='skopt',
            return_optimization=True,
            return_heatmap=True,
            random_state=2)
        self.assertIsInstance(res, pd.Series)
        self.assertIsInstance(heatmap, pd.Series)
        self.assertGreater(heatmap.max(), 1.1)
        self.assertGreater(heatmap.min(), -2)
        self.assertEqual(-skopt_results.fun, heatmap.max())
        self.assertEqual(heatmap.index.tolist(), heatmap.dropna().index.unique().tolist())

    def test_max_tries(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross)
        OPT_PARAMS = dict(fast=range(2, 10, 2), slow=[2, 5, 7, 9])
        for method, max_tries, random_state in (('grid', 5, 0),
                                                ('grid', .3, 0),
                                                ('skopt', 7, 0),
                                                ('skopt', .45, 0)):
            with self.subTest(method=method,
                              max_tries=max_tries,
                              random_state=random_state):
                _, heatmap = bt.optimize(max_tries=max_tries,
                                         method=method,
                                         random_state=random_state,
                                         return_heatmap=True,
                                         **OPT_PARAMS)
                self.assertEqual(len(heatmap), 6)

    def test_nowrite_df(self):
        # Test we don't write into passed data df by default.
        # Important for copy-on-write in Backtest.optimize()
        df = EURUSD.astype(float)
        values = df.values.ctypes.data
        assert values == df.values.ctypes.data

        class S(SmaCross):
            def init(self):
                super().init()
                assert values == self.data.df.values.ctypes.data

        bt = Backtest(df, S)
        _ = bt.run()
        assert values == bt._data.values.ctypes.data

    def test_multiprocessing_windows_spawn(self):
        df = GOOG.iloc[:100]
        kw = dict(fast=[10])

        stats1 = Backtest(df, SmaCross).optimize(**kw)
        with patch('multiprocessing.get_start_method', lambda **_: 'spawn'):
            with self.assertWarns(UserWarning) as cm:
                stats2 = Backtest(df, SmaCross).optimize(**kw)

        self.assertIn('multiprocessing support', cm.warning.args[0])
        assert stats1.filter('[^_]').equals(stats2.filter('[^_]')), (stats1, stats2)

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
        bt.optimize(fast=(2, 5, 7), slow=[10, 15, 20, 30])
        end = time.process_time()
        self.assertLess(end - start, .2)


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
            for p in dict(plot_volume=False,
                          plot_equity=False,
                          plot_return=True,
                          plot_pl=False,
                          plot_drawdown=True,
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
            for rule in 'LSTHDWM':
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
        class S(Strategy):
            def init(self):
                pass

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
            pd.DataFrame(dict(EntryTime=pd.to_datetime(['2006-11-01', '2008-11-14']),
                              ExitTime=pd.to_datetime(['2007-10-31', '2009-09-21']))))
        assert trades['PnL'].round().equals(pd.Series([23469., -34420.]))

        with _tempfile() as f:
            bt.plot(filename=f, plot_drawdown=True, smooth_equity=False)
            # Give browser time to open before tempfile is removed
            time.sleep(1)

    def test_resample(self):
        bt = Backtest(GOOG, SmaCross)
        bt.run()
        import backtesting._plotting
        with _tempfile() as f,\
                patch.object(backtesting._plotting, '_MAX_CANDLES', 10),\
                self.assertWarns(UserWarning):
            bt.plot(filename=f, resample=True)
            # Give browser time to open before tempfile is removed
            time.sleep(1)

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
        self.assertIn(stats['# Trades'], (1181, 1182))  # varies on different archs?

    def test_TrailingStrategy(self):
        class S(TrailingStrategy):
            def init(self):
                super().init()
                self.set_atr_periods(40)
                self.set_trailing_sl(3)
                self.sma = self.I(lambda: self.data.Close.s.rolling(10).mean())

            def next(self):
                super().next()
                if not self.position and self.data.Close > self.sma:
                    self.buy()

        stats = Backtest(GOOG, S).run()
        self.assertEqual(stats['# Trades'], 57)


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
    def test_examples(self):
        examples = glob(os.path.join(self.DOCS_DIR, 'examples', '*.py'))
        self.assertGreaterEqual(len(examples), 4)
        with chdir(gettempdir()):
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


if __name__ == '__main__':
    warnings.filterwarnings('error')
    unittest.main()
