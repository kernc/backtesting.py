"""A collection of benchmark problems."""

import numpy as np


def bench1(x):
    """A benchmark function for test purposes.

    f(x) = x ** 2

    It has a single minima with f(x*) = 0 at x* = 0.
    """
    return x[0] ** 2


def bench1_with_time(x):
    """Same as bench1 but returns the computation time (constant)."""
    return x[0] ** 2, 2.22


def bench2(x):
    """A benchmark function for test purposes.

        f(x) = x ** 2           if x < 0
               (x-5) ** 2 - 5   otherwise.

    It has a global minima with f(x*) = -5 at x* = 5.
    """
    if x[0] < 0:
        return x[0] ** 2
    else:
        return (x[0] - 5) ** 2 - 5


def bench3(x):
    """A benchmark function for test purposes.

        f(x) = sin(5*x) * (1 - tanh(x ** 2))

    It has a global minima with f(x*) ~= -0.9 at x* ~= -0.3.
    """
    return np.sin(5 * x[0]) * (1 - np.tanh(x[0] ** 2))


def bench4(x):
    """A benchmark function for test purposes.

    f(x) = float(x) ** 2

    where x is a string. It has a single minima with f(x*) = 0 at x* =
    "0". This benchmark is used for checking support of categorical
    variables.
    """
    return float(x[0]) ** 2


def bench5(x):
    """A benchmark function for test purposes.

    f(x) = float(x[0]) ** 2 + x[1] ** 2

    where x is a string. It has a single minima with f(x) = 0 at x[0] =
    "0" and x[1] = "0" This benchmark is used for checking support of
    mixed spaces.
    """
    return float(x[0]) ** 2 + x[1] ** 2


def branin(
    x, a=1, b=5.1 / (4 * np.pi**2), c=5.0 / np.pi, r=6, s=10, t=1.0 / (8 * np.pi)
):
    """Branin-Hoo function is defined on the square :math:`x1 \\in [-5, 10], x2 \\in [0,
    15]`.

    It has three minima with f(x*) = 0.397887 at x* = (-pi, 12.275),
    (+pi, 2.275), and (9.42478, 2.475).

    More details: <http://www.sfu.ca/~ssurjano/branin.html>
    """
    return (
        a * (x[1] - b * x[0] ** 2 + c * x[0] - r) ** 2 + s * (1 - t) * np.cos(x[0]) + s
    )


def hart6(
    x,
    alpha=np.asarray([1.0, 1.2, 3.0, 3.2]),
    P=10**-4
    * np.asarray(
        [
            [1312, 1696, 5569, 124, 8283, 5886],
            [2329, 4135, 8307, 3736, 1004, 9991],
            [2348, 1451, 3522, 2883, 3047, 6650],
            [4047, 8828, 8732, 5743, 1091, 381],
        ]
    ),
    A=np.asarray(
        [
            [10, 3, 17, 3.50, 1.7, 8],
            [0.05, 10, 17, 0.1, 8, 14],
            [3, 3.5, 1.7, 10, 17, 8],
            [17, 8, 0.05, 10, 0.1, 14],
        ]
    ),
):
    """The six dimensional Hartmann function is defined on the unit hypercube.

    It has six local minima and one global minimum f(x*) = -3.32237 at
    x* = (0.20169, 0.15001, 0.476874, 0.275332, 0.311652, 0.6573).

    More details: <http://www.sfu.ca/~ssurjano/hart6.html>
    """
    return -np.sum(alpha * np.exp(-np.sum(A * (np.array(x) - P) ** 2, axis=1)))
