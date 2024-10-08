"""
  Authors:
    Original FORTRAN77 version of i4_sobol by Bennett Fox.
    MATLAB version by John Burkardt.
    PYTHON version by Corrado Chisari

    Original Python version of is_prime by Corrado Chisari

    Original MATLAB versions of other functions by John Burkardt.
    PYTHON versions by Corrado Chisari

    Modified Python version by Holger Nahrstaedt

    Original code is available from
    http://people.sc.fsu.edu/~jburkardt/py_src/sobol/sobol.html
"""

import warnings

import numpy as np
from sklearn.utils import check_random_state

from ..space import Space
from .base import InitialPointGenerator


class Sobol(InitialPointGenerator):
    """Generates a new quasirandom Sobol' vector with each call.

    Parameters
    ----------
    skip : int
        Skipped seed number.

    randomize : bool, default=False
        When set to True, random shift is applied.

    Notes
    -----
    Sobol' sequences [1]_ provide :math:`n=2^m` low discrepancy points in
    :math:`[0,1)^{dim}`. Scrambling them makes them suitable for singular
    integrands, provides a means of error estimation, and can improve their
    rate of convergence.

    There are many versions of Sobol' sequences depending on their
    'direction numbers'. Here, the maximum number of dimension is 40.

    The routine adapts the ideas of Antonov and Saleev [2]_.

    .. warning::

       Sobol' sequences are a quadrature rule and they lose their balance
       properties if one uses a sample size that is not a power of 2, or skips
       the first point, or thins the sequence [5]_.

       If :math:`n=2^m` points are not enough then one should take :math:`2^M`
       points for :math:`M>m`. When scrambling, the number R of independent
       replicates does not have to be a power of 2.

       Sobol' sequences are generated to some number :math:`B` of bits. Then
       after :math:`2^B` points have been generated, the sequence will repeat.
       Currently :math:`B=30`.

    References
    ----------
    .. [1] I. M. Sobol. The distribution of points in a cube and the accurate
       evaluation of integrals. Zh. Vychisl. Mat. i Mat. Phys., 7:784-802,
       1967.

    .. [2] Antonov, Saleev,
       USSR Computational Mathematics and Mathematical Physics,
       Volume 19, 1980, pages 252 - 256.

    .. [3] Paul Bratley, Bennett Fox,
       Algorithm 659:
       Implementing Sobol's Quasirandom Sequence Generator,
       ACM Transactions on Mathematical Software,
       Volume 14, Number 1, pages 88-100, 1988.

    .. [4] Bennett Fox,
       Algorithm 647:
       Implementation and Relative Efficiency of Quasirandom
       Sequence Generators,

    .. [5] Art B. Owen. On dropping the first Sobol' point. arXiv 2008.08051,
       2020.
    """

    def __init__(self, skip=0, randomize=True):

        if not (skip & (skip - 1) == 0):
            raise ValueError(
                "The balance properties of Sobol' points require"
                " skipping a power of 2."
            )
        if skip != 0:
            warnings.warn(
                f"{skip} points have been skipped: "
                f"{skip} points can be generated before the "
                f"sequence repeats."
            )
        self.skip = skip

        self.num_generated = 0
        self.randomize = randomize

        self.dim_max = 40
        self.log_max = 30
        self.atmost = 2**self.log_max - 1
        self.lastq = None
        self.maxcol = None
        self.poly = None
        self.recipd = None
        self.seed_save = -1
        self.v = np.zeros((self.dim_max, self.log_max))
        self.dim_num_save = -1

    def init(self, dim_num):
        self.dim_num_save = dim_num
        self.v = np.zeros((self.dim_max, self.log_max))
        self.v[0:40, 0] = np.transpose(
            [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
            ]
        )

        self.v[2:40, 1] = np.transpose(
            [
                1,
                3,
                1,
                3,
                1,
                3,
                3,
                1,
                3,
                1,
                3,
                1,
                3,
                1,
                1,
                3,
                1,
                3,
                1,
                3,
                1,
                3,
                3,
                1,
                3,
                1,
                3,
                1,
                3,
                1,
                1,
                3,
                1,
                3,
                1,
                3,
                1,
                3,
            ]
        )

        self.v[3:40, 2] = np.transpose(
            [
                7,
                5,
                1,
                3,
                3,
                7,
                5,
                5,
                7,
                7,
                1,
                3,
                3,
                7,
                5,
                1,
                1,
                5,
                3,
                3,
                1,
                7,
                5,
                1,
                3,
                3,
                7,
                5,
                1,
                1,
                5,
                7,
                7,
                5,
                1,
                3,
                3,
            ]
        )

        self.v[5:40, 3] = np.transpose(
            [
                1,
                7,
                9,
                13,
                11,
                1,
                3,
                7,
                9,
                5,
                13,
                13,
                11,
                3,
                15,
                5,
                3,
                15,
                7,
                9,
                13,
                9,
                1,
                11,
                7,
                5,
                15,
                1,
                15,
                11,
                5,
                3,
                1,
                7,
                9,
            ]
        )

        self.v[7:40, 4] = np.transpose(
            [
                9,
                3,
                27,
                15,
                29,
                21,
                23,
                19,
                11,
                25,
                7,
                13,
                17,
                1,
                25,
                29,
                3,
                31,
                11,
                5,
                23,
                27,
                19,
                21,
                5,
                1,
                17,
                13,
                7,
                15,
                9,
                31,
                9,
            ]
        )

        self.v[13:40, 5] = np.transpose(
            [
                37,
                33,
                7,
                5,
                11,
                39,
                63,
                27,
                17,
                15,
                23,
                29,
                3,
                21,
                13,
                31,
                25,
                9,
                49,
                33,
                19,
                29,
                11,
                19,
                27,
                15,
                25,
            ]
        )

        self.v[19:40, 6] = np.transpose(
            [
                13,
                33,
                115,
                41,
                79,
                17,
                29,
                119,
                75,
                73,
                105,
                7,
                59,
                65,
                21,
                3,
                113,
                61,
                89,
                45,
                107,
            ]
        )

        self.v[37:40, 7] = np.transpose([7, 23, 39])

        #  Set POLY.
        self.poly = [
            1,
            3,
            7,
            11,
            13,
            19,
            25,
            37,
            59,
            47,
            61,
            55,
            41,
            67,
            97,
            91,
            109,
            103,
            115,
            131,
            193,
            137,
            145,
            143,
            241,
            157,
            185,
            167,
            229,
            171,
            213,
            191,
            253,
            203,
            211,
            239,
            247,
            285,
            369,
            299,
        ]

        #  Find the number of bits in ATMOST.
        self.maxcol = _bit_hi1(self.atmost)

        #  Initialize row 1 of V.
        self.v[0, 0 : self.maxcol] = 1

        #  Check parameters.
        if dim_num < 1 or self.dim_max < dim_num:
            raise ValueError(
                f'I4_SOBOL - Fatal error!\n'
                f'  The spatial dimension DIM_NUM should '
                f'satisfy:\n'
                f'  1 <= DIM_NUM <= {self.dim_max}\n'
                f'  But this input value is DIM_NUM = {dim_num}'
            )

        #  Initialize the remaining rows of V.
        for i in range(2, dim_num + 1):

            #  The bits of the integer POLY(I) gives the form of polynomial I.
            #  Find the degree of polynomial I from binary encoding.
            j = self.poly[i - 1]
            m = 0
            j //= 2
            while j > 0:
                j //= 2
                m += 1

            #  Expand this bit pattern to separate components
            #  of the logical array INCLUD.
            j = self.poly[i - 1]
            includ = np.zeros(m)
            for k in range(m, 0, -1):
                j2 = j // 2
                includ[k - 1] = j != 2 * j2
                j = j2

            #  Calculate the remaining elements of row I as explained
            #  in Bratley and Fox, section 2.
            for j in range(m + 1, self.maxcol + 1):
                newv = self.v[i - 1, j - m - 1]
                p2 = 1
                for k in range(1, m + 1):
                    p2 *= 2
                    if includ[k - 1]:
                        newv = np.bitwise_xor(
                            int(newv), int(p2 * self.v[i - 1, j - k - 1])
                        )
                self.v[i - 1, j - 1] = newv
        #  Multiply columns of V by appropriate power of 2.
        p2 = 1
        for j in range(self.maxcol - 1, 0, -1):
            p2 *= 2
            self.v[0:dim_num, j - 1] = self.v[0:dim_num, j - 1] * p2

        #  RECIPD is 1/(common denominator of the elements in V).
        self.recipd = 1.0 / (2 * p2)
        self.lastq = np.zeros(dim_num)

    def generate(self, dimensions, n_samples, random_state=None):
        """Creates samples from Sobol' set.

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
            The order of the Sobol' sequence. Defines the number of samples.
        random_state : int, RandomState instance, or None (default)
            Set random state to something other than None for reproducible
            results.

        Returns
        -------
        sample : array_like (n_samples, dim)
            Sobol' set.
        """
        total_n_samples = self.num_generated + n_samples
        if not (total_n_samples & (total_n_samples - 1) == 0):
            warnings.warn(
                "The balance properties of Sobol' points require "
                "n to be a power of 2. {0} points have been "
                "previously generated, then: n={0}+{1}={2}. ".format(
                    self.num_generated, n_samples, total_n_samples
                )
            )
        if self.skip != 0 and total_n_samples > self.skip:
            raise ValueError(
                f"{self.skip} points have been skipped: "
                f"generating "
                f"{n_samples} more points would cause the "
                f"sequence to repeat."
            )

        rng = check_random_state(random_state)
        space = Space(dimensions)
        n_dim = space.n_dims
        transformer = space.get_transformer()
        space.set_transformer("normalize")
        r = np.full((n_samples, n_dim), np.nan)

        seed = self.skip
        for j in range(n_samples):
            r[j, 0:n_dim], seed = self._sobol(n_dim, seed)

        if self.randomize:
            r = _random_shift(r, rng)

        r = space.inverse_transform(r)
        space.set_transformer(transformer)

        self.num_generated += n_samples

        return r

    def _sobol(self, dim_num, seed):
        """Generates a new quasirandom Sobol' vector with each call.

        Parameters
        ----------
        dim_num : int
          Number of spatial dimensions.
          `dim_num` must satisfy 1 <= DIM_NUM <= 40.

        seed : int
          the `seed` for the sequence.
          This is essentially the index in the sequence of the quasirandom
          value to be generated. On output, `seed` has been set to the
          appropriate next value, usually simply `seed`+1.
          If `seed` is less than 0 on input, it is treated as though it were 0.
          An input value of 0 requests the first (0-th) element of
          the sequence.

        Returns
        -------
        vector, seed : np.array (n_dim,), int
            The next quasirandom vector and the seed of its next vector.
        """
        #  Things to do only if the dimension changed.
        if dim_num != self.dim_num_save:
            self.init(dim_num)

        seed = int(np.floor(seed))

        if seed < 0:
            seed = 0

        pos_lo0 = 1
        if seed == 0:
            self.lastq = np.zeros(dim_num)

        elif seed == self.seed_save + 1:

            #  Find the position of the right-hand zero in SEED.
            pos_lo0 = _bit_lo0(seed)

        elif seed <= self.seed_save:

            self.seed_save = 0
            self.lastq = np.zeros(dim_num)

            for seed_temp in range(int(self.seed_save), int(seed)):
                pos_lo0 = _bit_lo0(seed_temp)
                for i in range(1, dim_num + 1):
                    self.lastq[i - 1] = np.bitwise_xor(
                        int(self.lastq[i - 1]), int(self.v[i - 1, pos_lo0 - 1])
                    )

            pos_lo0 = _bit_lo0(seed)

        elif self.seed_save + 1 < seed:

            for seed_temp in range(int(self.seed_save + 1), int(seed)):
                pos_lo0 = _bit_lo0(seed_temp)
                for i in range(1, dim_num + 1):
                    self.lastq[i - 1] = np.bitwise_xor(
                        int(self.lastq[i - 1]), int(self.v[i - 1, pos_lo0 - 1])
                    )

            pos_lo0 = _bit_lo0(seed)

        #  Check that the user is not calling too many times!
        if self.maxcol < pos_lo0:
            raise ValueError(
                f'I4_SOBOL - Fatal error!\n'
                f' Too many calls!\n'
                f' MAXCOL = {self.maxcol}\n'
                f' L =      {pos_lo0}\n'
            )

        #  Calculate the new components of QUASI.
        quasi = np.zeros(dim_num)
        for i in range(1, dim_num + 1):
            quasi[i - 1] = self.lastq[i - 1] * self.recipd
            self.lastq[i - 1] = np.bitwise_xor(
                int(self.lastq[i - 1]), int(self.v[i - 1, pos_lo0 - 1])
            )

        self.seed_save = seed
        seed += 1

        return [quasi, seed]


def _bit_hi1(n):
    """Returns the position of the high 1 bit base 2 in an integer.

    Parameters
    ----------
    n : int
        Input, should be positive.
    """
    bin_repr = np.binary_repr(n)
    most_left_one = bin_repr.find('1')
    if most_left_one == -1:
        return 0
    else:
        return len(bin_repr) - most_left_one


def _bit_lo0(n):
    """Returns the position of the low 0 bit base 2 in an integer.

    Parameters
    ----------
    n : int
        Input, should be positive.
    """
    bin_repr = np.binary_repr(n)
    most_right_zero = bin_repr[::-1].find('0')
    if most_right_zero == -1:
        most_right_zero = len(bin_repr)
    return most_right_zero + 1


def _random_shift(dm, random_state=None):
    """Random shifting of a vector.

    Randomization of the quasi-MC samples can be achieved in the easiest manner
    by random shift (or the Cranley-Patterson rotation).

    References
    -----------
    .. [1] C. Lemieux, "Monte Carlo and Quasi-Monte Carlo Sampling," Springer
       Series in Statistics 692, Springer Science+Business Media, New York,
       2009

    Parameters
    ----------
    dm : array, shape(n, d)
        Input matrix.
    random_state : int, RandomState instance, or None (default)
        Set random state to something other than None for reproducible
        results.

    Returns
    -------
    dm :  array, shape(n, d)
        Randomized Sobol' design matrix.
    """
    rng = check_random_state(random_state)
    # Generate random shift matrix from uniform distribution
    shift = np.repeat(rng.rand(1, dm.shape[1]), dm.shape[0], axis=0)
    # Return the shifted Sobol' design
    return (dm + shift) % 1
