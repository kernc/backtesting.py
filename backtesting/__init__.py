"""

![xkcd.com/1570](https://imgs.xkcd.com/comics/engineer_syllogism.png)

## Manuals

* [**Quick Start User Guide**](../examples/Quick Start User Guide.html)

## Tutorials

* [Library of Utilities and Composable Base Strategies](../examples/Strategies Library.html)
* [Multiple Time Frames](../examples/Multiple Time Frames.html)
* [**Parameter Heatmap & Optimization**](../examples/Parameter Heatmap &amp; Optimization.html)
* [Trading with Machine Learning](../examples/Trading with Machine Learning.html)

These tutorials are also available as live Jupyter notebooks:
[![Binder](https://mybinder.org/badge_logo.svg)][binder]
[![Google Colab](https://colab.research.google.com/assets/colab-badge.svg)][colab]
<br>In Colab, you might have to `!pip install backtesting`.

[binder]: \
    https://mybinder.org/v2/gh/kernc/backtesting.py/master?\
urlpath=lab%2Ftree%2Fdoc%2Fexamples%2FQuick%20Start%20User%20Guide.ipynb
[colab]: https://colab.research.google.com/github/kernc/backtesting.py/

## Example Strategies

* (contributions welcome)


.. tip::
    For an overview of recent changes, see
    [What's New](https://github.com/kernc/backtesting.py/blob/master/CHANGELOG.md).


## FAQ

Some answers to frequent and popular questions can be found on the
[issue tracker](https://github.com/kernc/backtesting.py/issues?q=label%3Aquestion+-label%3Ainvalid)
or on the [discussion forum](https://github.com/kernc/backtesting.py/discussions) on GitHub.
Please use the search!

## License

This software is licensed under the terms of [AGPL 3.0]{: rel=license},
meaning you can use it for any reasonable purpose and remain in
complete ownership of all the excellent trading strategies you produce,
but you are also encouraged to make sure any upgrades to _Backtesting.py_
itself find their way back to the community.

[AGPL 3.0]: https://www.gnu.org/licenses/agpl-3.0.html

# API Reference Documentation
"""
try:
    from ._version import version as __version__  # noqa: F401
except ImportError:
    __version__ = '?.?.?'  # Package not installed

from .backtesting import Backtest, Strategy  # noqa: F401
from . import lib  # noqa: F401
from ._plotting import set_bokeh_output  # noqa: F401
