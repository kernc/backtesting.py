"""
Inspired by https://github.com/jonathf/chaospy/blob/master/chaospy/
distributions/sampler/sequences/grid.py
"""

import numpy as np
from sklearn.utils import check_random_state

from ..space import Space
from .base import InitialPointGenerator


def _quadrature_combine(args):
    args = [np.asarray(arg).reshape(len(arg), -1) for arg in args]
    shapes = [arg.shape for arg in args]

    size = np.prod(shapes, 0)[0] * np.sum(shapes, 0)[1]
    if size > 10**9:
        raise MemoryError("Too large sets")

    out = args[0]
    for arg in args[1:]:
        out = np.hstack(
            [
                np.tile(out, len(arg)).reshape(-1, out.shape[1]),
                np.tile(arg.T, len(out)).reshape(arg.shape[1], -1).T,
            ]
        )
    return out


def _create_uniform_grid_exclude_border(n_dim, order):
    assert order > 0
    assert n_dim > 0
    x_data = np.arange(1, order + 1) / (order + 1.0)
    x_data = _quadrature_combine([x_data] * n_dim)
    return x_data


def _create_uniform_grid_include_border(n_dim, order):
    assert order > 1
    assert n_dim > 0
    x_data = np.arange(0, order) / (order - 1.0)
    x_data = _quadrature_combine([x_data] * n_dim)
    return x_data


def _create_uniform_grid_only_border(n_dim, order):
    assert n_dim > 0
    assert order > 1
    x = [[0.0, 1.0]] * (n_dim - 1)
    x.append(list(np.arange(0, order) / (order - 1.0)))
    x_data = _quadrature_combine(x)
    return x_data


class Grid(InitialPointGenerator):
    """Generate samples from a regular grid.

    Parameters
    ----------
    border : str, default='exclude'
        defines how the samples are generated:
        - 'include' : Includes the border into the grid layout
        - 'exclude' : Excludes the border from the grid layout
        - 'only' : Selects only points at the border of the dimension
    use_full_layout : boolean, default=True
        When True, a  full factorial design is generated and
        missing points are taken from the next larger full factorial
        design, depending on `append_border`
        When False, the next larger  full factorial design is
        generated and points are randomly selected from it.
    append_border : str, default="only"
        When use_full_layout is True, this parameter defines how the missing
        points will be generated from the next larger grid layout:
        - 'include' : Includes the border into the grid layout
        - 'exclude' : Excludes the border from the grid layout
        - 'only' : Selects only points at the border of the dimension
    """

    def __init__(self, border="exclude", use_full_layout=True, append_border="only"):
        self.border = border
        self.use_full_layout = use_full_layout
        self.append_border = append_border

    def generate(self, dimensions, n_samples, random_state=None):
        """Creates samples from a regular grid.

        Parameters
        ----------
        dimensions : list, shape (n_dims,)
            List of search space dimensions.
            Each search dimension can be defined either as

            - a `(lower_bound, upper_bound)` tuple (for `Real` or `Integer`
              dimensions),
            - a `(lower_bound, upper_bound, "prior")` tuple (for `Real`
              dimensions),
            - as a list of categories (for `Categorical` dimensions), or
            - an instance of a `Dimension` object (`Real`, `Integer` or
              `Categorical`).

        n_samples : int
            The order of the Halton sequence. Defines the number of samples.
        random_state : int, RandomState instance, or None (default)
            Set random state to something other than None for reproducible
            results.

        Returns
        -------
        np.array, shape=(n_dim, n_samples)
            grid set
        """
        rng = check_random_state(random_state)
        space = Space(dimensions)
        n_dim = space.n_dims
        transformer = space.get_transformer()
        space.set_transformer("normalize")

        if self.border == "include":
            if self.use_full_layout:
                order = int(np.floor(np.sqrt(n_samples)))
            else:
                order = int(np.ceil(np.sqrt(n_samples)))
            if order < 2:
                order = 2
            h = _create_uniform_grid_include_border(n_dim, order)
        elif self.border == "exclude":
            if self.use_full_layout:
                order = int(np.floor(np.sqrt(n_samples)))
            else:
                order = int(np.ceil(np.sqrt(n_samples)))
            if order < 1:
                order = 1
            h = _create_uniform_grid_exclude_border(n_dim, order)
        elif self.border == "only":
            if self.use_full_layout:
                order = int(np.floor(n_samples / 2.0))
            else:
                order = int(np.ceil(n_samples / 2.0))
            if order < 2:
                order = 2
            h = _create_uniform_grid_only_border(n_dim, order)
        else:
            raise ValueError("Wrong value for border")
        if np.size(h, 0) > n_samples:
            rng.shuffle(h)
            h = h[:n_samples, :]
        elif np.size(h, 0) < n_samples:
            if self.append_border == "only":
                order = int(np.ceil((n_samples - np.size(h, 0)) / 2.0))
                if order < 2:
                    order = 2
                h2 = _create_uniform_grid_only_border(n_dim, order)
            elif self.append_border == "include":
                order = int(np.ceil(np.sqrt(n_samples - np.size(h, 0))))
                if order < 2:
                    order = 2
                h2 = _create_uniform_grid_include_border(n_dim, order)
            elif self.append_border == "exclude":
                order = int(np.ceil(np.sqrt(n_samples - np.size(h, 0))))
                if order < 1:
                    order = 1
                h2 = _create_uniform_grid_exclude_border(n_dim, order)
            else:
                raise ValueError("Wrong value for append_border")
            h = np.vstack((h, h2[: (n_samples - np.size(h, 0))]))
            rng.shuffle(h)
        else:
            rng.shuffle(h)
        h = space.inverse_transform(h)
        space.set_transformer(transformer)
        return h
