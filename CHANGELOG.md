What's New
==========

These were the major changes contributing to each release:

### 0.x.x

### 0.6.5
(2025-07-30)

* Include 'Commission' column in `stats._trades` DataFrame (#1277), thanks to Abhirath Mahipal.
* Bugfixes:
  * Fix computing commissions when specified with relative amount.
  * Fix sometimes cleared SL value in `stats._trades` data frame
  * Ensure order size is integer to avoid weird rounding errors.
  * Account for commissions in `Trade.pl` and `Trade.pl_pct` (#1279), thanks to Abhirath Mahipal.
  * `functools.partial` objects do not always have a __module__ attr in Python 3.9
* Plotting:
  * Return long/short triangles to P&L section!
  * Do plot `plot=False, overlay=True` indicators, but muted.


### 0.6.4
(2025-03-30)

* Bug fixes:
  * Fix optimization hanging on MS Windows under some conditions,
    primarily missing a `if __name__ == '__main__'` guard.
  * Restore original scale in FractionalBacktest plot (#1247)
  * Fix "'CAGR [%]' must match a key in pd.Series result of bt.run()" error
  * Fix grid optimization on data with timezone-aware datetime index


### 0.6.3
(2025-03-11)

* Enhancements:
  * `backtesting.lib.TrailingStrategy` supports setting trailing stop-loss by percentage.
  * [`backtesting.lib.MultiBacktest`](https://kernc.github.io/backtesting.py/doc/backtesting/lib.html#backtesting.lib.MultiBacktest)
    multi-dataset backtesting wrapper.
  * `Backtest.run()` wrapped in `tqdm()`
  * Rename parameter `lib.FractionalBacktest(fractional_unit=)`.
  * Add market alpha & market beta stats (#1221)
* Plot improvements:
  * Plot trade duration lines in the P&L plot section.
  * Simplify PL section, use circular markers.
  * Only plot trades when some trades are present.
  * Set `fig.yaxis.ticker.desired_num_ticks=3` for indicator subplots.
  * Single legend item for indicators with singular/default names.
  * Make "OHLC" itself a togglable legend item.
  * Add xwheel_pan tool, conditioned on activation for now
    (upvote [Bokeh issue](https://github.com/bokeh/bokeh/issues/14363)).
  * Reduce height of indicator charts, introduce an overridable private
    global `backtesting._plotting._INDICATOR_HEIGHT`.
* Bug fixes:
  * Fixed `Position.pl` occasionally not matching `Position.pl_pct` in sign.
  * SL _always_ executes before TP when hit in the same bar.
  * Fix `functools.partial` objects do not always have a `__module__` attr in Python 3.9 (#1233)
  * Fix stop-market and TP hit within the same bar.
* Documentation improvements (warnings, links, ...)


### 0.6.2
(2025-02-19)

* Enhancements:
  * Grid optimization with mp.Pool & mp.shm.SharedMemory (#1222)
  * [`backtesting.lib.FractionalBacktest`](https://kernc.github.io/backtesting.py/doc/backtesting/lib.html#backtesting.lib.FractionalBacktest)
    that supports fractional trading
  * `backtesting.__all__` for better `from backtesting import *` and suggestions
* Bugs fixed:
  * Fix remaining issues with `trade_on_close=True`
  * Fix trades reported in reverse chronological order when `finalize_trades=True`
  * Fix crosshair not linked across subplots
  * Cast `datetime_arr.astype(np.int64)` to avoid Windos error


### 0.6.1
(2025-02-04)

Enhancement: Use `joblib.Parallel` for optimization.
This should vastly improve performance on Windows while not
affecting other platforms too much.


### 0.6.0
(2025-02-04)

* Enhancements:
  * Add `Backtest(spread=)`; change `Backtest(commission=)` to apply twice per trade
  * Show paid "Commissions [$]" key in trade stats
  * Allow multiple names for vector indicators (#980)
  * Add columns SL and TP to `stats['trades']` (#1039)
  * Add entry/exit indicator values to `stats['trades']` (#1116)
  * Optionally finalize trades at the end of backtest run (#393)
* Bug fixes, including for some long-standing bugs:
  * Fix bug in Sharpe ratio with non-zero risk-free rate (#904)
  * Change price comparisons to lte/gte to align with TradingView
  * Reduce optimization memory footprint (#884)
  * Fix annualized stats with weekly/monthly data
  * Fix `AssertionError` on `for o in self.orders: o.cancel()`
  * Fix plot not shown in VSCode Jupyter
  * Buy&Hold duration now matches trading duration
  * Fix `bt.plot(resample=True)` with categorical indicators
* Several other small bug fixes, deprecations and docs updates.


### 0.5.0
(2025-01-21)

* Enhancements:
  * New `Backtest.optimize(method="sambo")`;
    uses [SAMBO](https://sambo-optimization.github.io):
    to replace `method="skopt"`.
  * New 'CAGR [%]' (compound annual growth rate) statistic.
* Bug fixes:
  * "stop-loss executed at a higher than market price".
  * Bug with buy/sell size=0.
  * `Order.__repr__` issue with non-numeric `Order.tag`.
* Other small fixes, deprecations and docs updates.


### 0.4.0
(2025-01-21)

* Enhancements:
  * 'Kelly Criterion' statistic (#640)
  * `Backtest.plot(plot_trades=)` parameter
  * Order.tag for tracking orders and trades (#200)
* Small bug fixes, deprecation removals and documentation updates.


### 0.3.3
(2021-12-13)

* Fix random generation with recent NumPy.
* Fix Pandas deprecation warnings.
* Replace Bokeh 3.0 deprecations.


### 0.3.2
(2021-08-03)

* New strategy performance method [`backtesting.lib.compute_stats`](https://kernc.github.io/backtesting.py/doc/backtesting/lib.html#backtesting.lib.compute_stats) (#281)
* Improve plotting speed (#329) and optimization performance (#295) on large datasets.
* Commission constraints now allow for market-maker's rebates.
* [`Backtest.plot`](https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html#backtesting.backtesting.Backtest.plot)
  now returns the bokeh figure object for further processing.
* Other small bugs and fixes.


### 0.3.1
(2021-01-25)

* Avoid some `pandas.Index` deprecations
* Fix `Backtest.plot(show_legend=False)` for recent Bokeh


### 0.3.0
(2020-11-24)

* Faster [model-based optimization](https://kernc.github.io/backtesting.py/doc/examples/Parameter%20Heatmap%20&amp;%20Optimization.html#Model-based-optimization) using scikit-optimize (#154)
* Optionally faster [optimization](https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html#backtesting.backtesting.Backtest.optimize) by randomized grid search (#154)
* _Annualized_ Return/Volatility/Sharpe/Sortino/Calmar stats (#156)
* Auto close open trades on backtest finish
* Add `Backtest.plot(plot_return=)`, akin to `plot_equity=`
* Update Expectancy formula (#181)


### 0.2.4
(2020-10-27)

* Add [`lib.random_ohlc_data()`](https://kernc.github.io/backtesting.py/doc/backtesting/lib.html#backtesting.lib.random_ohlc_data) OHLC data generator
* Aggregate Equity on 'last' when plot resampling
* Update stats calculation for Buy & Hold to be long-only (#152)


### 0.2.3
(2020-09-10)

* Link hover crosshairs across plots
* Clicking plot legend glyph toggles indicator visibility
* Fix Bokeh tooltip showing literal '\&nbsp;'


### 0.2.2
(2020-08-21)


### 0.2.1
(2020-08-03)

* Add [`Trade.entry_time/.exit_time`](https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html#backtesting.backtesting.Trade)
* Handle SL/TP hit on the same day the position was opened


### 0.2.0
(2020-07-15)

* New Order/Trade/Position API (#47)
* Add data pandas accessors [`.df` and `.s`](https://kernc.github.io/backtesting.py/doc/backtesting/backtesting.html#backtesting.backtesting.Strategy.data)
* Add `Backtest(..., exclusive_orders=)` that closes previous trades on new orders
* Add `Backtest(..., hedging=)` that makes FIFO trade closing optional
* Add `bt.plot(reverse_indicators=)` param
* Add `bt.plot(resample=)` and auto-downsample large data
* Use geometric mean return in Sharpe/Sortino stats computation


### 0.1.8
(2020-07-14)

* Add Profit Factor statistic (#85)


### 0.1.7
(2020-03-23)

* Fix support for 2-D indicators
* Fix tooltip Date field formatting with Bokeh 2.0.0


### 0.1.6
(2020-03-09)


### 0.1.5
(2020-03-02)


### 0.1.4
(2020-02-25)


### 0.1.3
(2020-02-24)

* Show number of trades on OHLC plot legend
* Add parameter agg= to lib.resample_apply()
* Reset position price (etc.) after closing position
* Fix pandas insertion error on Windos


### 0.1.2
(2019-09-23)

* Make plot span 100% of browser width


### 0.1.1
(2019-09-23)

* Avoid multiprocessing trouble on Windos (#6)
* Add scatter plot indicators


### 0.1.0
(2019-01-15)

* Initial release
