from bokeh.io import show, output_file
from bokeh.models import ColumnDataSource
from bokeh.plotting import figure

output_file("backtesting_logo.html")

source = ColumnDataSource(data=dict(
    colors=[['#00a618', '#d0d000', 'tomato'][i]
            for i in [0, 0, 1, 0, 1, 0, 0, 1, 0, 2]],
    x=list(range(10)),
    bottom=[1, 3, 4, 3, 2, 3, 5, 5, 7, 6.5],
    top=   [4, 7, 6, 5, 4, 6, 8, 7, 9, 8]))   # noqa: E222,E251


p = figure(plot_height=800, plot_width=1200, tools='wheel_zoom,save')
p.vbar('x', .6, 'bottom', 'top', source=source,
       line_color='black', line_width=2,
       fill_color='colors')

p.xgrid.grid_line_color = None
p.ygrid.grid_line_color = None
p.y_range.start = -2
p.y_range.end = 12
p.x_range.start = -2
p.x_range.end = 11
p.background_fill_color = None
p.border_fill_color = None

show(p)
