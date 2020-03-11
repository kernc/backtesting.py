import os
import sys
import time
import unittest
import warnings
from contextlib import contextmanager
from glob import glob
from runpy import run_path
from tempfile import NamedTemporaryFile, gettempdir
from unittest import TestCase

import numpy as np
import pandas as pd

from backtesting import Backtest, Strategy
from backtesting.lib import (
    OHLCV_AGG,
    barssince,
    cross,
    crossover,
    quantile,
    SignalStrategy,
    TrailingStrategy,
    resample_apply,
    plot_heatmaps
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
            self.buy()
        elif crossover(self.sma2, self.sma1):
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
        self.assertLess(end - start, .2)

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

                self.orders.is_long
                self.orders.is_short
                self.orders.entry
                self.orders.sl
                self.orders.tp

                self.position
                self.position.size
                self.position.pl
                self.position.pl_pct
                self.position.open_price
                self.position.open_time
                self.position.is_long

                if crossover(self.sma, self.data.Close):
                    self.orders.cancel()
                    self.sell()
                    assert not self.orders.is_long
                    assert self.orders.is_short
                    assert self.orders.entry
                    assert not self.orders.sl
                    assert not self.orders.tp
                    price = self.data.Close[-1]
                    sl, tp = 1.05 * price, .9 * price
                    self.sell(price, sl=sl, tp=tp)
                    self.orders.set_entry(price)
                    self.orders.set_sl(sl)
                    self.orders.set_tp(tp)
                    assert self.orders.entry == price
                    assert self.orders.sl == sl
                    assert self.orders.tp == tp

                elif self.position:
                    assert not self.orders.entry
                    assert not self.position.is_long
                    assert not not self.position.is_short
                    assert self.position.open_price
                    assert self.position.pl
                    assert self.position.pl_pct
                    assert self.position.size < 0
                    if self.data.index[-1] - self.position.open_time > FIVE_DAYS:
                        self.position.close()

        bt = Backtest(GOOG, Assertive)
        stats = bt.run()
        self.assertEqual(stats['# Trades'], 144)

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
        durations, peaks = Backtest._compute_drawdown_duration_peaks(dd)
        np.testing.assert_array_equal(durations, pd.Series([3, 2], index=[3, 5]).reindex(dd.index))
        np.testing.assert_array_equal(peaks, pd.Series([7, 4], index=[3, 5]).reindex(dd.index))

    def test_compute_stats(self):
        stats = Backtest(GOOG, SmaCross).run()
        # Pandas compares in 'almost equal' manner
        from pandas.testing import assert_series_equal
        assert_series_equal(
            stats.filter(regex='^[^_]').sort_index(),
            pd.Series({
                # NOTE: These values are also used on the website!
                '# Trades': 65,
                'Avg. Drawdown Duration': pd.Timedelta('41 days 00:00:00'),
                'Avg. Drawdown [%]': -6.087158560194047,
                'Avg. Trade Duration': pd.Timedelta('46 days 00:00:00'),
                'Avg. Trade [%]': 3.0404430275631444,
                'Best Trade [%]': 54.05363186670138,
                'Buy & Hold Return [%]': 703.4582419772772,
                'Calmar Ratio': 0.0631443286380662,
                'Duration': pd.Timedelta('3116 days 00:00:00'),
                'End': pd.Timestamp('2013-03-01 00:00:00'),
                'Equity Final [$]': 52624.29346696951,
                'Equity Peak [$]': 76908.27001642012,
                'Expectancy [%]': 8.774692825628644,
                'Exposure [%]': 93.93453145057767,
                'Max. Drawdown Duration': pd.Timedelta('584 days 00:00:00'),
                'Max. Drawdown [%]': -48.15069053929621,
                'Max. Trade Duration': pd.Timedelta('183 days 00:00:00'),
                'Return [%]': 426.2429346696951,
                'SQN': 0.91553210127173,
                'Sharpe Ratio': 0.23169782960690408,
                'Sortino Ratio': 0.7096713270577958,
                'Start': pd.Timestamp('2004-08-19 00:00:00'),
                'Win Rate [%]': 46.15384615384615,
                'Worst Trade [%]': -18.85561318387153,
            }).sort_index()
        )
        self.assertTrue(
            stats._trade_data.columns.equals(
                pd.Index(['Equity', 'Exit Entry', 'Exit Position',
                          'Entry Price', 'Exit Price', 'P/L', 'Returns',
                          'Drawdown', 'Drawdown Duration'])))

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
                self.assertFalse(stats._trade_data['Equity'].isnull().any())
                self.assertEqual(stats['_strategy'].__class__, strategy)


class TestStrategy(TestCase):
    def test_position(self):
        def coroutine(self):
            yield self.buy()

            assert self.position
            assert self.position.is_long
            assert not self.position.is_short
            assert self.position.size > 0
            assert self.position.pl
            assert self.position.pl_pct
            assert self.position.open_price > 0
            assert self.position.open_time

            yield self.position.close()

            assert not self.position
            assert not self.position.is_long
            assert not self.position.is_short
            assert not self.position.size
            assert not self.position.pl
            assert not self.position.pl_pct
            assert not self.position.open_price
            assert not self.position.open_time

        class S(Strategy):
            def init(self):
                self.step = coroutine(self)

            def next(self):
                try_(self.step.__next__, None, StopIteration)

        Backtest(SHORT_DATA, S).run()


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

        res = bt.optimize(**OPT_PARAMS)
        self.assertIsInstance(res, pd.Series)

        res2 = bt.optimize(**OPT_PARAMS, maximize=lambda s: s['SQN'])
        self.assertSequenceEqual(res.filter(regex='^[^_]').to_dict(),
                                 res2.filter(regex='^[^_]').to_dict())

        res3, heatmap = bt.optimize(**OPT_PARAMS, return_heatmap=True,
                                    constraint=lambda d: d.slow > 2 * d.fast)
        self.assertIsInstance(heatmap, pd.Series)
        self.assertEqual(len(heatmap), 4)

        with _tempfile() as f:
            bt.plot(filename=f, open_browser=False)

    def test_optimize_invalid_param(self):
        bt = Backtest(GOOG.iloc[:100], SmaCross)
        self.assertRaises(AttributeError, bt.optimize, foo=range(3))

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
                          plot_pl=False,
                          plot_drawdown=True,
                          superimpose=False,
                          omit_missing=False,
                          smooth_equity=False,
                          relative_equity=False,
                          show_legend=False).items():
                with self.subTest(param=p[0]):
                    bt.plot(**dict([p]), filename=f, open_browser=False)

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
        self.assertEqual(res.iloc[-48:].unique().tolist(),
                         [1.2426429999999997, 1.2423809999999995, 1.2422749999999998])

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

    def test_SignalStrategy(self):
        class S(SignalStrategy):
            def init(self):
                sma = self.data.Close.to_series().rolling(10).mean()
                self.set_signal(self.data.Close > sma,
                                self.data.Close < sma)

        stats = Backtest(GOOG, S).run()
        self.assertGreater(stats['# Trades'], 1000)

    def test_TrailingStrategy(self):
        class S(TrailingStrategy):
            def init(self):
                super().init()
                self.set_atr_periods(40)
                self.set_trailing_sl(3)
                self.sma = self.I(lambda: self.data.Close.to_series().rolling(10).mean())

            def next(self):
                super().next()
                if not self.position and self.data.Close > self.sma:
                    self.buy()

        stats = Backtest(GOOG, S).run()
        self.assertGreater(stats['# Trades'], 6)


class TestUtil(TestCase):
    def test_as_str(self):
        def func():
            pass

        class Class:
            pass

        self.assertEqual(_as_str('4'), '4')
        self.assertEqual(_as_str(4), '4')
        self.assertEqual(_as_str(_Indicator([1, 2], name='x')), 'x')
        self.assertEqual(_as_str(func), 'func')
        self.assertEqual(_as_str(Class), 'Class')
        self.assertEqual(_as_str(pd.Series([1, 2], name='x')), 'x')
        self.assertEqual(_as_str(pd.DataFrame()), 'df')
        self.assertEqual(_as_str(lambda x: x), 'λ')
        for s in ('Open', 'High', 'Low', 'Close', 'Volume'):
            self.assertEqual(_as_str(_Array([1], name=s)), s[0])


@unittest.skipUnless(
    os.path.isdir(os.path.join(os.path.dirname(__file__),
                               '..', '..', 'doc')),
    "docs dir doesn't exist")
class TestDocs(TestCase):
    def test_examples(self):
        examples = glob(os.path.join(os.path.dirname(__file__),
                                     '..', '..', 'doc', 'examples', '*.py'))
        self.assertGreaterEqual(len(examples), 4)
        with chdir(gettempdir()):
            for file in examples:
                run_path(file)


if __name__ == '__main__':
    warnings.filterwarnings('error')
    unittest.main()
