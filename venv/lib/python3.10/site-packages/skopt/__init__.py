"""Scikit-Optimize, or `skopt`, is a simple and efficient library for optimizing (very)
expensive and noisy black-box functions.

It implements
several methods for sequential model-based optimization. `skopt` aims
to be accessible and easy to use in many contexts.
"""

import importlib
import multiprocessing as mp
import platform
import struct
from importlib.metadata import version, PackageNotFoundError


try:
    __version__ = version("scikit-optimize")
except PackageNotFoundError:
    __version__ = '?.?.?'  # Not installed

from . import (
    acquisition,
    benchmarks,
    callbacks,
    learning,
    optimizer,
    sampler,
    space,
)
from .optimizer import (
    dummy_minimize,
    forest_minimize,
    gbrt_minimize,
    gp_minimize,
    Optimizer,
)
from .searchcv import BayesSearchCV
from .space import Space
from .utils import dump, load, expected_minimum, expected_minimum_random_sampling

__all__ = (
    "show_versions",
    "acquisition",
    "benchmarks",
    "callbacks",
    "learning",
    "optimizer",
    "plots",
    "sampler",
    "space",
    "gp_minimize",
    "dummy_minimize",
    "forest_minimize",
    "gbrt_minimize",
    "Optimizer",
    "dump",
    "load",
    "expected_minimum",
    "expected_minimum_random_sampling",
    "BayesSearchCV",
    "Space",
)
_IS_32BIT = 8 * struct.calcsize("P") == 32


def show_versions():
    """Provide useful information, important for bug reports."""
    print('Platform:', platform.platform())
    print('Python:', platform.python_version())
    print('CPU count:', mp.cpu_count())
    print('scikit-optimize', __version__)
    for pkg in ('sklearn', 'numpy', 'scipy'):
        print(f'{pkg}:', importlib.import_module(pkg).__version__)
