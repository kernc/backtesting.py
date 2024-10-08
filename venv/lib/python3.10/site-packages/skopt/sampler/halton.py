"""
Inspired by https://github.com/jonathf/chaospy/blob/master/chaospy/
distributions/sampler/sequences/halton.py
"""

import numpy as np
from sklearn.utils import check_random_state

from ..space import Space
from .base import InitialPointGenerator


class Halton(InitialPointGenerator):
    """Creates `Halton` sequence samples.

    In statistics, Halton sequences are sequences used to generate
    points in space for numerical methods such as Monte Carlo simulations.
    Although these sequences are deterministic, they are of low discrepancy,
    that is, appear to be random
    for many purposes. They were first introduced in 1960 and are an example
    of a quasi-random number sequence. They generalise the one-dimensional
    van der Corput sequences.

    For ``dim == 1`` the sequence falls back to Van Der Corput sequence.

    Parameters
    ----------
    min_skip : int
        Minimum skipped seed number. When `min_skip != max_skip`
        a random number is picked.
    max_skip : int
        Maximum skipped seed number. When `min_skip != max_skip`
        a random number is picked.
    primes : tuple, default=None
        The (non-)prime base to calculate values along each axis. If
        empty or None, growing prime values starting from 2 will be used.
    """

    def __init__(self, min_skip=0, max_skip=0, primes=None):
        self.primes = primes
        self.min_skip = min_skip
        self.max_skip = max_skip

    def generate(self, dimensions, n_samples, random_state=None):
        """Creates samples from Halton set.

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
            Halton set.
        """
        rng = check_random_state(random_state)
        if self.primes is None:
            primes = []
        else:
            primes = list(self.primes)
        space = Space(dimensions)
        n_dim = space.n_dims
        transformer = space.get_transformer()
        space.set_transformer("normalize")
        if len(primes) < n_dim:
            prime_order = 10 * n_dim
            while len(primes) < n_dim:
                primes = _create_primes(prime_order)
                prime_order *= 2

            primes = primes[:n_dim]
        assert len(primes) == n_dim, "not enough primes"

        if self.min_skip == self.max_skip:
            skip = self.min_skip
        elif self.min_skip < 0 and self.max_skip < 0:
            skip = max(primes)
        elif self.min_skip < 0 or self.max_skip < 0:
            skip = np.max(self.min_skip, self.max_skip)
        else:
            skip = rng.randint(self.min_skip, self.max_skip)

        out = np.empty((n_dim, n_samples))
        indices = [idx + skip for idx in range(n_samples)]
        for dim_ in range(n_dim):
            out[dim_] = _van_der_corput_samples(indices, number_base=primes[dim_])
        out = space.inverse_transform(np.transpose(out))
        space.set_transformer(transformer)
        return out


def _van_der_corput_samples(idx, number_base=2):
    """Create `Van Der Corput` low discrepancy sequence samples.

    A van der Corput sequence is an example of the simplest one-dimensional
    low-discrepancy sequence over the unit interval; it was first described in
    1935 by the Dutch mathematician J. G. van der Corput. It is constructed by
    reversing the base-n representation of the sequence of natural numbers
    (1, 2, 3, ...).

    In practice, use Halton sequence instead of Van Der Corput, as it is the
    same, but generalized to work in multiple dimensions.

    Parameters
    ----------
    idx (int, numpy.ndarray):
        The index of the sequence. If array is provided, all values in
        array is returned.
    number_base : int
        The numerical base from where to create the samples from.

    Returns
    -------
    float, numpy.ndarray
        Van der Corput samples.
    """
    assert number_base > 1

    idx = np.asarray(idx).flatten()
    out = np.zeros(len(idx), dtype=float)

    base = float(number_base)
    active = np.ones(len(idx), dtype=bool)
    while np.any(active):
        out[active] += (idx[active] % number_base) / base
        idx //= number_base
        base *= number_base
        active = idx > 0
    return out


def _create_primes(threshold):
    """Generate prime values using sieve of Eratosthenes method.

    Parameters
    ----------
    threshold : int
        The upper bound for the size of the prime values.

    Returns
    ------
    List
        All primes from 2 and up to ``threshold``.
    """
    if threshold == 2:
        return [2]

    elif threshold < 2:
        return []

    numbers = list(range(3, threshold + 1, 2))
    root_of_threshold = threshold**0.5
    half = int((threshold + 1) / 2 - 1)
    idx = 0
    counter = 3
    while counter <= root_of_threshold:
        if numbers[idx]:
            idy = int((counter * counter - 3) / 2)
            numbers[idy] = 0
            while idy < half:
                numbers[idy] = 0
                idy += counter
        idx += 1
        counter = 2 * idx + 3
    return [2] + [number for number in numbers if number]
