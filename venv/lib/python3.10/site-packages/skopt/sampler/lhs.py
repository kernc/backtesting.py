"""
Lhs functions are inspired by
https://github.com/clicumu/pyDOE2/blob/
master/pyDOE2/doe_lhs.py
"""

import numpy as np
from scipy import spatial
from sklearn.utils import check_random_state

from ..space import Space
from .base import InitialPointGenerator


def _random_permute_matrix(h, random_state=None):
    rng = check_random_state(random_state)
    h_rand_perm = np.zeros_like(h)
    samples, n = h.shape
    for j in range(n):
        order = rng.permutation(range(samples))
        h_rand_perm[:, j] = h[order, j]
    return h_rand_perm


class Lhs(InitialPointGenerator):
    """Latin hypercube sampling.

    Parameters
    ----------
    lhs_type : str, default='classic'
        - 'classic' - a small random number is added
        - 'centered' - points are set uniformly in each interval

    criterion : str or None, default='maximin'
        When set to None, the LHS is not optimized

        - 'correlation' : optimized LHS by minimizing the correlation
        - 'maximin' : optimized LHS by maximizing the minimal pdist
        - 'ratio' : optimized LHS by minimizing the ratio
          `max(pdist) / min(pdist)`

    iterations : int
        Defines the number of iterations for optimizing LHS
    """

    def __init__(self, lhs_type="classic", criterion="maximin", iterations=1000):
        self.lhs_type = lhs_type
        self.criterion = criterion
        self.iterations = iterations

    def generate(self, dimensions, n_samples, random_state=None):
        """Creates latin hypercube samples.

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
            The order of the LHS sequence. Defines the number of samples.
        random_state : int, RandomState instance, or None (default)
            Set random state to something other than None for reproducible
            results.

        Returns
        -------
        np.array, shape=(n_dim, n_samples)
            LHS set
        """
        rng = check_random_state(random_state)
        space = Space(dimensions)
        transformer = space.get_transformer()
        n_dim = space.n_dims
        space.set_transformer("normalize")
        if self.criterion is None or n_samples == 1:
            h = self._lhs_normalized(n_dim, n_samples, rng)
            h = space.inverse_transform(h)
            space.set_transformer(transformer)
            return h
        else:
            h_opt = self._lhs_normalized(n_dim, n_samples, rng)
            h_opt = space.inverse_transform(h_opt)
            if self.criterion == "correlation":
                mincorr = np.inf
                for _ in range(self.iterations):
                    # Generate a random LHS
                    h = self._lhs_normalized(n_dim, n_samples, rng)
                    r = np.corrcoef(np.array(h).T)
                    if (
                        len(np.abs(r[r != 1])) > 0
                        and np.max(np.abs(r[r != 1])) < mincorr
                    ):
                        mincorr = np.max(np.abs(r - np.eye(r.shape[0])))
                        h_opt = h.copy()
                        h_opt = space.inverse_transform(h_opt)
            elif self.criterion == "maximin":
                maxdist = 0
                # Maximize the minimum distance between points
                for _ in range(self.iterations):
                    h = self._lhs_normalized(n_dim, n_samples, rng)
                    d = spatial.distance.pdist(np.array(h), 'euclidean')
                    if maxdist < np.min(d):
                        maxdist = np.min(d)
                        h_opt = h.copy()
                        h_opt = space.inverse_transform(h_opt)
            elif self.criterion == "ratio":
                minratio = np.inf

                # Maximize the minimum distance between points
                for _ in range(self.iterations):
                    h = self._lhs_normalized(n_dim, n_samples, rng)
                    p = spatial.distance.pdist(np.array(h), 'euclidean')
                    if np.min(p) == 0:
                        ratio = np.max(p) / 1e-8
                    else:
                        ratio = np.max(p) / np.min(p)
                    if minratio > ratio:
                        minratio = ratio
                        h_opt = h.copy()
                        h_opt = space.inverse_transform(h_opt)
            else:
                raise ValueError("Wrong criterion." "Got {}".format(self.criterion))
            space.set_transformer(transformer)
            return h_opt

    def _lhs_normalized(self, n_dim, n_samples, random_state):
        rng = check_random_state(random_state)
        x = np.linspace(0, 1, n_samples + 1)
        u = rng.rand(n_samples, n_dim)
        h = np.zeros_like(u)
        if self.lhs_type == "centered":
            for j in range(n_dim):
                h[:, j] = np.diff(x) / 2.0 + x[:n_samples]
        elif self.lhs_type == "classic":
            for j in range(n_dim):
                h[:, j] = u[:, j] * np.diff(x) + x[:n_samples]
        else:
            raise ValueError(f"Wrong lhs_type. Got {self.lhs_type}")
        return _random_permute_matrix(h, random_state=rng)
