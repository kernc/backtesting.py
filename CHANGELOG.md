What's New
==========

These were the major changes contributing to each release:


### 0.x.x


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