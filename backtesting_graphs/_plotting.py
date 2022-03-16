""" Plotting for all Bokeh figures. """
from functools import partial
import os
import re
import sys
import warnings


from bokeh.colors import RGB
from bokeh.colors.named import (
    lime as BULL_COLOR,
    tomato as BEAR_COLOR
)
from bokeh.embed import file_html
from bokeh.io import output_notebook, output_file, show
from bokeh.io.state import curstate
from bokeh.layouts import gridplot
from bokeh.models import (
    ColumnDataSource,
    CrosshairTool,
    CustomJS,
    NumeralTickFormatter,
    Span,
    HoverTool,
    Range1d,
    DatetimeTickFormatter,
    WheelZoomTool,
)
try:
    from bokeh.models import CustomJSTickFormatter
except ImportError:  # Bokeh < 3.0
    from bokeh.models import FuncTickFormatter as CustomJSTickFormatter
from bokeh.plotting import figure as _figure
from bokeh.resources import CDN
from bokeh.transform import factor_cmap
from colorsys import hls_to_rgb, rgb_to_hls
import numpy as np
import pandas as pd

from backtesting_graphs._util import _data_period

with open(os.path.join(os.path.dirname(__file__), 'autoscale_cb.js'),
          encoding='utf-8') as _f:
    _AUTOSCALE_JS_CALLBACK = _f.read()

IS_JUPYTER_NOTEBOOK = 'JPY_PARENT_PID' in os.environ

if IS_JUPYTER_NOTEBOOK:
    warnings.warn('Jupyter Notebook detected. '
                  'Setting Bokeh output to notebook. '
                  'This may not work in Jupyter clients without JavaScript '
                  'support (e.g. PyCharm, Spyder IDE). '
                  'Reset with `backtesting.set_bokeh_output(notebook=False)`.')
    output_notebook()

def _bokeh_reset(filename=None):
    curstate().reset()
    if filename:
        if not filename.endswith('.html'):
            filename += '.html'
        output_file(filename, title=filename)
    elif IS_JUPYTER_NOTEBOOK:
        curstate().output_notebook()

def lightness(color, lightness=.94):
    rgb = np.array([color.r, color.g, color.b]) / 255
    h, _, s = rgb_to_hls(*rgb)
    rgb = np.array(hls_to_rgb(h, lightness, s)) * 255
    return RGB(*rgb)

_MAX_CANDLES = 10_000

def _maybe_resample_data(resample_rule, df, equity_data, trades):
    if isinstance(resample_rule, str):
        freq = resample_rule
    else:
        if resample_rule is False or len(df) <= _MAX_CANDLES:
            return df, equity_data, trades

        freq_minutes = pd.Series({
            "1T": 1,
            "5T": 5,
            "10T": 10,
            "15T": 15,
            "30T": 30,
            "1H": 60,
            "2H": 60*2,
            "4H": 60*4,
            "8H": 60*8,
            "1D": 60*24,
            "1W": 60*24*7,
            "1M": np.inf,
        })
        timespan = df.index[-1] - df.index[0]
        require_minutes = (timespan / _MAX_CANDLES).total_seconds() // 60
        freq = freq_minutes.where(freq_minutes >= require_minutes).first_valid_index()
        warnings.warn(f"Data contains too many candlesticks to plot; downsampling to {freq!r}. "
                      "See `Backtest.plot(resample=...)`")

    from .lib import OHLCV_AGG, TRADES_AGG, _EQUITY_AGG
    df = df.resample(freq, label='right').agg(OHLCV_AGG).dropna()

    equity_data = equity_data.resample(freq, label='right').agg(_EQUITY_AGG).dropna(how='all')
    assert equity_data.index.equals(df.index)
    return df, equity_data, trades


def plot(*, results: pd.Series,
         df: pd.DataFrame,
         filename='', plot_width=None,
         show_plot=False,
         plot_equity=True, plot_return=False, plot_pl=True,
         plot_volume=True, plot_drawdown=False,
         relative_equity=True,
         superimpose=True, resample=True,
         show_legend=True, open_browser=True):
    """ Plots all Bokeh figures. We modified this function from backtesting.py and
        primarily changed the _plot_equity_section function to overlay the equity
        graph with additional lines. """
    _bokeh_reset(filename)

    COLORS = [BEAR_COLOR, BULL_COLOR]
    BAR_WIDTH = .8

    assert df.index.equals(results['_equity_curve'].index)
    equity_data = results['_equity_curve'].copy(deep=False)
    calc_df = results['_calc_df'].copy(deep=False)
    trades = results['_trades']
    plot_volume = plot_volume and not df.Volume.isnull().all()
    plot_equity = plot_equity and not trades.empty
    plot_return = plot_return and not trades.empty
    plot_pl = plot_pl and not trades.empty
    is_datetime_index = isinstance(df.index, pd.DatetimeIndex)

    from .lib import OHLCV_AGG
    # ohlc df may contain many columns. We're only interested in, and pass on to Bokeh, these
    df = df[list(OHLCV_AGG.keys())].copy(deep=False)

    # Limit data to max_candles
    if is_datetime_index:
        df, equity_data, trades = _maybe_resample_data(
            resample, df, equity_data, trades)

    df.index.name = None  # Provides source name @index
    df['datetime'] = df.index  # Save original, maybe datetime index
    df = df.reset_index(drop=True)
    equity_data = equity_data.reset_index(drop=True)
    index = df.index

    new_bokeh_figure = partial(
        _figure,
        x_axis_type='linear',
        width=plot_width,
        height=400,
        tools="xpan,xwheel_zoom,box_zoom,undo,redo,reset,save",
        active_drag='xpan',
        active_scroll='xwheel_zoom')

    pad = (index[-1] - index[0]) / 20

    fig_ohlc = new_bokeh_figure(
        x_range=Range1d(index[0], index[-1],
                        min_interval=10,
                        bounds=(index[0] - pad,
                                index[-1] + pad)) if index.size > 1 else None)
    figs_above_ohlc, figs_below_ohlc = [], []
    source = ColumnDataSource(df)
    source.add((df.Close >= df.Open).values.astype(np.uint8).astype(str), 'inc')

    trade_source = ColumnDataSource(dict(
        index=trades['ExitBar'],
        datetime=trades['ExitTime'],
        exit_price=trades['ExitPrice'],
        size=trades['Size'],
        returns_positive=(trades['ReturnPct'] > 0).astype(int).astype(str),
    ))

    inc_cmap = factor_cmap('inc', COLORS, ['0', '1'])
    cmap = factor_cmap('returns_positive', COLORS, ['0', '1'])
    colors_darker = [lightness(BEAR_COLOR, .35),
                     lightness(BULL_COLOR, .35)]
    trades_cmap = factor_cmap('returns_positive', colors_darker, ['0', '1'])
    if is_datetime_index:
        fig_ohlc.xaxis.formatter = CustomJSTickFormatter(
            args=dict(axis=fig_ohlc.xaxis[0],
                      formatter=DatetimeTickFormatter(days=['%d %b', '%a %d'],
                                                      months=['%m/%Y', "%b'%y"]),
                      source=source),
            code='''
this.labels = this.labels || formatter.doFormat(ticks
                                                .map(i => source.data.datetime[i])
                                                .filter(t => t !== undefined));
return this.labels[index] || "";
        ''')

    NBSP = '\N{NBSP}' * 4
    ohlc_extreme_values = df[['High', 'Low']].copy(deep=False)
    ohlc_tooltips = [
        ('x, y', NBSP.join(('$index',
                            '$y{0,0.0[0000]}'))),
        ('OHLC', NBSP.join(('@Open{0,0.0[0000]}',
                            '@High{0,0.0[0000]}',
                            '@Low{0,0.0[0000]}',
                            '@Close{0,0.0[0000]}'))),
        ('Volume', '@Volume{0,0}')]

    def new_indicator_figure(**kwargs):
        kwargs.setdefault('height', 90)
        fig = new_bokeh_figure(x_range=fig_ohlc.x_range,
                               active_scroll='xwheel_zoom',
                               active_drag='xpan',
                               **kwargs)
        fig.xaxis.visible = False
        fig.yaxis.minor_tick_line_color = None
        return fig

    def set_tooltips(fig, tooltips=(), vline=True, renderers=()):
        tooltips = list(tooltips)
        renderers = list(renderers)

        if is_datetime_index:
            formatters = {'@datetime': 'datetime'}
            tooltips = [("Date", "@datetime{%c}")] + tooltips
        else:
            formatters = {}
            tooltips = [("#", "@index")] + tooltips
        fig.add_tools(HoverTool(
            point_policy='follow_mouse',
            line_policy="none",
            renderers=renderers, formatters=formatters,
            tooltips=tooltips, mode='vline' if vline else 'mouse'))

    def _plot_equity_section(is_return=False):
        """Equity section"""
        # Max DD Dur. line
        # Plots the equity line
        equity = equity_data['Equity'].copy()

        # Plots additional attributes we want to see
        gross_pos_val = calc_df["gross_position_value"].copy()
        bnh_pos_val = calc_df["bnh_position_value"].copy()

        dd_end = equity_data['DrawdownDuration'].idxmax()
        if np.isnan(dd_end):
            dd_start = dd_end = equity.index[0]
        else:
            dd_start = equity[:dd_end].idxmax()
            # If DD not extending into the future, get exact point of intersection with equity
            if dd_end != equity.index[-1]:
                dd_end = np.interp(equity[dd_start],
                                   (equity[dd_end - 1], equity[dd_end]),
                                   (dd_end - 1, dd_end))
        assert equity.index.equals(equity_data.index)
        # Find the relative equity in each of our functions
        equity /= equity.iloc[0]
        gross_pos_val /= gross_pos_val.iloc[0]
        bnh_pos_val /= bnh_pos_val.iloc[0]

        yaxis_label = 'Gross, Net, and BNH pos values'

        fig = new_indicator_figure(
            y_axis_label=yaxis_label,
            **({} if plot_drawdown else dict(height=400)))
        # High-watermark drawdown dents
        fig.patch('index', 'equity_dd',
                  source=ColumnDataSource(dict(
                      index=np.r_[index, index[::-1]],
                      equity_dd=np.r_[equity, equity.cummax()[::-1]]
                  )),
                  fill_color='#ffffea', line_color='#ffcb66')

        # Plots the net position over time
        net_pos_val_source_key = 'equity'
        net_pos_legend_label = "Net Value"
        source.add(equity, net_pos_val_source_key)
        net_pos = fig.line(
            'index', net_pos_val_source_key, source=source, line_width=1.5,
            legend_label=net_pos_legend_label, line_alpha=1)
        # Format of net_pos tooltip
        net_tooltip = (
            net_pos_legend_label, f'@{net_pos_val_source_key}{{+0,0.[000]%}}'
        )
        # Plots the gross position value overtime
        gross_legend_label = "Gross Value"
        gross_source_key = "gross_val"
        source.add(gross_pos_val, gross_source_key)
        # Format of gross_pos tooltip
        gross_tooltip = (gross_legend_label, f'@{gross_source_key}{{+0,0.[000]%}}')
        gross = fig.line(
            'index', gross_source_key, source=source,
            legend_label=gross_legend_label, line_color="black",
            line_width=1.5
        )
        # Plots the buy and hold position over time
        bnh_legend_label = "Buy and Hold"
        bnh_key = "bnh"
        source.add(bnh_pos_val, bnh_key)
        # Format of bnh pos tooltip
        bnh_tooltip = (bnh_legend_label, f'@{bnh_key}{{+0,0.[000]%}}')
        bnh = fig.line(
            'index', bnh_key, source=source,
            legend_label=bnh_legend_label, line_color="purple",
            line_width=1.5)
        tooltip_examples = [bnh_tooltip, gross_tooltip, net_tooltip]
        set_tooltips(fig, tooltip_examples, renderers=[bnh, gross, net_pos])

        tick_format = '0,0.[00]%'
        legend_format = '{:,.0f}%'
        fig.yaxis.formatter = NumeralTickFormatter(format=tick_format)
        # Peaks
        argmax = equity.idxmax()
        # Lowest Peak
        fig.scatter(argmax, equity[argmax],
                    legend_label='Peak ({})'.format(
                        legend_format.format(equity[argmax] * (100 if relative_equity else 1))),
                    color='cyan', size=8)
        # Highest Peak
        fig.scatter(index[-1], equity.values[-1],
                    legend_label='Final ({})'.format(
                        legend_format.format(equity.iloc[-1] * (100 if relative_equity else 1))),
                    color='blue', size=8)

        if not plot_drawdown:
            drawdown = equity_data['DrawdownPct']
            argmax = drawdown.idxmax()
            fig.scatter(argmax, equity[argmax],
                        legend_label='Max Drawdown (-{:.1f}%)'.format(100 * drawdown[argmax]),
                        color='red', size=8)
        dd_timedelta_label = df['datetime'].iloc[int(round(dd_end))] - df['datetime'].iloc[dd_start]
        fig.line([dd_start, dd_end], equity.iloc[dd_start],
                 line_color='red', line_width=2,
                 legend_label=f'Max Dd Dur. ({dd_timedelta_label})'
                 .replace(' 00:00:00', '')
                 .replace('(0 days ', '('))
        figs_above_ohlc.append(fig)

    def _plot_drawdown_section():
        """Drawdown section"""
        fig = new_indicator_figure(y_axis_label="Drawdown")
        drawdown = equity_data['DrawdownPct']
        argmax = drawdown.idxmax()
        source.add(drawdown, 'drawdown')
        r = fig.line('index', 'drawdown', source=source, line_width=1.3)
        fig.scatter(argmax, drawdown[argmax],
                    legend_label='Peak (-{:.1f}%)'.format(100 * drawdown[argmax]),
                    color='red', size=8)
        set_tooltips(fig, [('Drawdown', '@drawdown{-0.[0]%}')], renderers=[r])
        fig.yaxis.formatter = NumeralTickFormatter(format="-0.[0]%")
        return fig

    def _plot_pl_section():
        """Profit/Loss markers section"""
        fig = new_indicator_figure(y_axis_label="Profit / Loss")
        fig.add_layout(Span(location=0, dimension='width', line_color='#666666',
                            line_dash='dashed', line_width=1))
        returns_long = np.where(trades['Size'] > 0, trades['ReturnPct'], np.nan)
        returns_short = np.where(trades['Size'] < 0, trades['ReturnPct'], np.nan)
        size = trades['Size'].abs()
        size = np.interp(size, (size.min(), size.max()), (8, 20))
        trade_source.add(returns_long, 'returns_long')
        trade_source.add(returns_short, 'returns_short')
        trade_source.add(size, 'marker_size')
        if 'count' in trades:
            trade_source.add(trades['count'], 'count')
        r1 = fig.scatter('index', 'returns_long', source=trade_source, fill_color=cmap,
                         marker='triangle', line_color='black', size='marker_size')
        r2 = fig.scatter('index', 'returns_short', source=trade_source, fill_color=cmap,
                         marker='inverted_triangle', line_color='black', size='marker_size')
        tooltips = [("Size", "@size{0,0}")]
        if 'count' in trades:
            tooltips.append(("Count", "@count{0,0}"))
        set_tooltips(fig, tooltips + [("P/L", "@returns_long{+0.[000]%}")],
                     vline=False, renderers=[r1])
        set_tooltips(fig, tooltips + [("P/L", "@returns_short{+0.[000]%}")],
                     vline=False, renderers=[r2])
        fig.yaxis.formatter = NumeralTickFormatter(format="0.[00]%")
        return fig

    def _plot_volume_section():
        """Volume section"""
        fig = new_indicator_figure(y_axis_label="Volume")
        fig.xaxis.formatter = fig_ohlc.xaxis[0].formatter
        fig.xaxis.visible = True
        fig_ohlc.xaxis.visible = False  # Show only Volume's xaxis
        r = fig.vbar('index', BAR_WIDTH, 'Volume', source=source, color=inc_cmap)
        set_tooltips(fig, [('Volume', '@Volume{0.00 a}')], renderers=[r])
        fig.yaxis.formatter = NumeralTickFormatter(format="0 a")
        return fig

    def _plot_superimposed_ohlc():
        """Superimposed, downsampled vbars"""
        time_resolution = pd.DatetimeIndex(df['datetime']).resolution
        resample_rule = (superimpose if isinstance(superimpose, str) else
                         dict(day='M',
                              hour='D',
                              minute='H',
                              second='T',
                              millisecond='S').get(time_resolution))
        if not resample_rule:
            warnings.warn(
                f"'Can't superimpose OHLC data with rule '{resample_rule}'"
                f"(index datetime resolution: '{time_resolution}'). Skipping.",
                stacklevel=4)
            return

        df2 = (df.assign(_width=1).set_index('datetime')
               .resample(resample_rule, label='left')
               .agg(dict(OHLCV_AGG, _width='count')))

        # Check if resampling was downsampling; error on upsampling
        orig_freq = _data_period(df['datetime'])
        resample_freq = _data_period(df2.index)
        if resample_freq < orig_freq:
            raise ValueError('Invalid value for `superimpose`: Upsampling not supported.')
        if resample_freq == orig_freq:
            warnings.warn('Superimposed OHLC plot matches the original plot. Skipping.',
                          stacklevel=4)
            return

        df2.index = df2['_width'].cumsum().shift(1).fillna(0)
        df2.index += df2['_width'] / 2 - .5
        df2['_width'] -= .1  # Candles don't touch

        df2['inc'] = (df2.Close >= df2.Open).astype(int).astype(str)
        df2.index.name = None
        source2 = ColumnDataSource(df2)
        fig_ohlc.segment('index', 'High', 'index', 'Low', source=source2, color='#bbbbbb')
        colors_lighter = [lightness(BEAR_COLOR, .92),
                          lightness(BULL_COLOR, .92)]
        fig_ohlc.vbar('index', '_width', 'Open', 'Close', source=source2, line_color=None,
                      fill_color=factor_cmap('inc', colors_lighter, ['0', '1']))

    def _plot_ohlc():
        """Main OHLC bars"""
        fig_ohlc.segment('index', 'High', 'index', 'Low', source=source, color="black")
        r = fig_ohlc.vbar('index', BAR_WIDTH, 'Open', 'Close', source=source,
                          line_color="black", fill_color=inc_cmap)
        return r

    def _plot_ohlc_trades():
        """Trade entry / exit markers on OHLC plot"""
        trade_source.add(trades[['EntryBar', 'ExitBar']].values.tolist(), 'position_lines_xs')
        trade_source.add(trades[['EntryPrice', 'ExitPrice']].values.tolist(), 'position_lines_ys')
        fig_ohlc.multi_line(xs='position_lines_xs', ys='position_lines_ys',
                            source=trade_source, line_color=trades_cmap,
                            legend_label=f'Trades ({len(trades)})',
                            line_width=8, line_alpha=1, line_dash='dotted')
    # Construct figure ...

    if plot_equity:
        _plot_equity_section()

    if plot_return:
        _plot_equity_section(is_return=True)

    if plot_drawdown:
        figs_above_ohlc.append(_plot_drawdown_section())

    if plot_pl:
        figs_above_ohlc.append(_plot_pl_section())

    if plot_volume:
        fig_volume = _plot_volume_section()
        figs_below_ohlc.append(fig_volume)

    if superimpose and is_datetime_index:
        _plot_superimposed_ohlc()

    ohlc_bars = _plot_ohlc()
    _plot_ohlc_trades()
    set_tooltips(fig_ohlc, ohlc_tooltips, vline=True, renderers=[ohlc_bars])

    source.add(ohlc_extreme_values.min(1), 'ohlc_low')
    source.add(ohlc_extreme_values.max(1), 'ohlc_high')

    custom_js_args = dict(ohlc_range=fig_ohlc.y_range,
                          source=source)
    if plot_volume:
        custom_js_args.update(volume_range=fig_volume.y_range)

    fig_ohlc.x_range.js_on_change('end', CustomJS(args=custom_js_args,
                                                  code=_AUTOSCALE_JS_CALLBACK))
    plots = figs_above_ohlc + [fig_ohlc] + figs_below_ohlc
    linked_crosshair = CrosshairTool(dimensions='both')

    for f in plots:
        if f.legend:
            f.legend.visible = show_legend
            f.legend.location = 'top_left'
            f.legend.border_line_width = 1
            f.legend.border_line_color = '#333333'
            f.legend.padding = 5
            f.legend.spacing = 0
            f.legend.margin = 0
            f.legend.label_text_font_size = '8pt'
            f.legend.click_policy = "hide"
        f.min_border_left = 0
        f.min_border_top = 3
        f.min_border_bottom = 6
        f.min_border_right = 10
        f.outline_line_color = '#666666'

        f.add_tools(linked_crosshair)
        wheelzoom_tool = next(wz for wz in f.tools if isinstance(wz, WheelZoomTool))
        wheelzoom_tool.maintain_focus = False

    kwargs = {}
    if plot_width is None:
        kwargs['sizing_mode'] = 'stretch_width'

    fig = gridplot(
        plots,
        ncols=1,
        toolbar_location='right',
        toolbar_options=dict(logo=None),
        merge_tools=True,
        **kwargs
    )
    html = file_html(fig, resources=CDN)
    if show_plot:
        show(fig, browser=None if open_browser else 'none')
    return html
