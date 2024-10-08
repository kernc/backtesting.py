"""Monitor and influence the optimization procedure via callbacks.

Callbacks are callables which are invoked after each iteration of the optimizer
and are passed the results "so far". Callbacks can monitor progress, or stop
the optimization early by returning `True`.
"""

try:
    from collections.abc import Callable
except ImportError:
    from collections.abc import Callable

import os
from time import time

import numpy as np

from skopt.utils import dump, load


def check_callback(callback):
    """Check if callback is a callable or a list of callables."""
    if callback is not None:
        if isinstance(callback, Callable):
            return [callback]

        elif isinstance(callback, list) and all(
            [isinstance(c, Callable) for c in callback]
        ):
            return callback

        else:
            raise ValueError(
                "callback should be either a callable or " "a list of callables."
            )
    else:
        return []


class VerboseCallback:
    """Callback to control the verbosity.

    Parameters
    ----------
    n_init : int, optional
        Number of points provided by the user which are yet to be
        evaluated. This is equal to `len(x0)` when `y0` is None

    n_random : int, optional
        Number of points randomly chosen.

    n_total : int
        Total number of func calls.

    Attributes
    ----------
    iter_no : int
        Number of iterations of the optimization routine.
    """

    def __init__(self, n_total, n_init=0, n_random=0):
        self.n_init = n_init
        self.n_random = n_random
        self.n_total = n_total
        self.iter_no = 1

        self._start_time = time()
        self._print_info(start=True)

    def _print_info(self, start=True):
        iter_no = self.iter_no
        if start:
            status = "started"
            eval_status = "Evaluating function"
            search_status = "Searching for the next optimal point."

        else:
            status = "ended"
            eval_status = "Evaluation done"
            search_status = "Search finished for the next optimal point."

        if iter_no <= self.n_init:
            print(
                "Iteration No: %d %s. %s at provided point."
                % (iter_no, status, eval_status)
            )

        elif self.n_init < iter_no <= (self.n_random + self.n_init):
            print(
                "Iteration No: %d %s. %s at random point."
                % (iter_no, status, eval_status)
            )

        else:
            print("Iteration No: %d %s. %s" % (iter_no, status, search_status))

    def __call__(self, res):
        """
        Parameters
        ----------
        res : `OptimizeResult`, scipy object
            The optimization as a OptimizeResult object.
        """
        time_taken = time() - self._start_time
        self._print_info(start=False)

        curr_y = res.func_vals[-1]
        curr_min = res.fun

        print("Time taken: %0.4f" % time_taken)
        print("Function value obtained: %0.4f" % curr_y)
        print("Current minimum: %0.4f" % curr_min)

        self.iter_no += 1
        if self.iter_no <= self.n_total:
            self._print_info(start=True)
            self._start_time = time()


class TimerCallback:
    """Log the elapsed time between each iteration of the minimization loop.

    The time for each iteration is stored in the `iter_time` attribute which
    you can inspect after the minimization has completed.

    Attributes
    ----------
    iter_time : list, shape (n_iter,)
        `iter_time[i-1]` gives the time taken to complete iteration `i`
    """

    def __init__(self):
        self._time = time()
        self.iter_time = []

    def __call__(self, res):
        """
        Parameters
        ----------
        res : `OptimizeResult`, scipy object
            The optimization as a OptimizeResult object.
        """
        elapsed_time = time() - self._time
        self.iter_time.append(elapsed_time)
        self._time = time()


class EarlyStopper:
    """Decide to continue or not given the results so far.

    The optimization procedure will be stopped if the callback returns
    True.
    """

    def __call__(self, result):
        """
        Parameters
        ----------
        result : `OptimizeResult`, scipy object
            The optimization as a OptimizeResult object.
        """
        return self._criterion(result)

    def _criterion(self, result):
        """Compute the decision to stop or not.

        Classes inheriting from `EarlyStop` should use this method to
        implement their decision logic.

        Parameters
        ----------
        result : `OptimizeResult`, scipy object
            The optimization as a OptimizeResult object.

        Returns
        -------
        decision : boolean or None
            Return True/False if the criterion can make a decision or `None` if
            there is not enough data yet to make a decision.
        """
        raise NotImplementedError(
            "The _criterion method should be implemented"
            " by subclasses of EarlyStopper."
        )


class DeltaXStopper(EarlyStopper):
    """Stop the optimization when ``|x1 - x2| < delta``

    If the last two positions at which the objective has been evaluated
    are less than `delta` apart stop the optimization procedure.
    """

    def __init__(self, delta):
        super(EarlyStopper, self).__init__()
        self.delta = delta

    def _criterion(self, result):
        if len(result.x_iters) >= 2:
            return (
                result.space.distance(result.x_iters[-2], result.x_iters[-1])
                < self.delta
            )

        else:
            return None


class DeltaYStopper(EarlyStopper):
    """Stop the optimization if the `n_best` minima are within `delta`

    Stop the optimizer if the absolute difference between the `n_best`
    objective values is less than `delta`.
    """

    def __init__(self, delta, n_best=5):
        super(EarlyStopper, self).__init__()
        self.delta = delta
        self.n_best = n_best

    def _criterion(self, result):
        if len(result.func_vals) >= self.n_best:
            func_vals = np.sort(result.func_vals)
            worst = func_vals[self.n_best - 1]
            best = func_vals[0]

            # worst is always larger, so no need for abs()
            return worst - best < self.delta

        else:
            return None


class HollowIterationsStopper(EarlyStopper):
    """Stop if the improvement over the last n iterations is below a threshold."""

    def __init__(self, n_iterations, threshold=0):
        super().__init__()
        self.n_iterations = n_iterations
        self.threshold = abs(threshold)

    def _criterion(self, result):

        if len(result.func_vals) <= self.n_iterations:
            return False

        cummin = np.minimum.accumulate(result.func_vals)
        return cummin[-self.n_iterations - 1] - cummin[-1] <= self.threshold


class DeadlineStopper(EarlyStopper):
    """Stop the optimization before running out of a fixed budget of time.

    Attributes
    ----------
    iter_time : list, shape (n_iter,)
        `iter_time[i-1]` gives the time taken to complete iteration `i`

    Parameters
    ----------
    total_time : float
        fixed budget of time (seconds) that the optimization must
        finish within.
    """

    def __init__(self, total_time):
        super().__init__()
        self._time = time()
        self.iter_time = []
        self.total_time = total_time

    def _criterion(self, result):
        elapsed_time = time() - self._time
        self.iter_time.append(elapsed_time)
        self._time = time()

        if result.x_iters:
            time_remaining = self.total_time - np.sum(self.iter_time)
            return time_remaining <= np.max(self.iter_time)
        else:
            return None


class StdStopper(EarlyStopper):
    """Stop the optimization when the standard deviation of the Gaussian process is
    lower than the threshold.

    Paper: automatic-termination-for-hyperparameter-optimization
    """

    def __init__(self, threshold: float, log_interval=10) -> None:
        super(EarlyStopper, self).__init__()
        self.threshold = threshold
        self.log_interval = log_interval

    def _criterion(self, result) -> bool:
        y_train_std_ = []
        for model in result.models:
            y_train_std_.append(model.y_train_std_)
        if len(y_train_std_) == 0:
            return False
        if len(y_train_std_) % self.log_interval == 0:
            print(
                "num_models:",
                len(y_train_std_),
                "min_std:",
                min(y_train_std_),
                "max_std:",
                max(y_train_std_),
            )
        return min(y_train_std_) <= self.threshold


class ThresholdStopper(EarlyStopper):
    """Stop the optimization when the objective value is lower than the given
    threshold."""

    def __init__(self, threshold: float) -> None:
        super(EarlyStopper, self).__init__()
        self.threshold = threshold

    def _criterion(self, result) -> bool:
        return np.any([val <= self.threshold for val in result.func_vals])


class CheckpointSaver:
    """Save current state after each iteration with :class:`skopt.dump`. Allows to re-
    use previously computed function evaluations.

    Examples
    --------
    >>> import skopt
    >>> def obj_fun(x):
    ...     return x[0]**2
    >>> checkpoint_callback = skopt.callbacks.CheckpointSaver("./result.pkl")
    >>> skopt.gp_minimize(obj_fun, [(-2, 2)], n_calls=10,
    ...                   callback=[checkpoint_callback]) # doctest: +SKIP
    >>> # when re-using stored results.
    >>> checkpoint_callback = skopt.callbacks.CheckpointSaver("./result.pkl")
    >>> skopt.gp_minimize(obj_fun, [(-2, 2)], n_calls=10,
    ...                   callback=[checkpoint_callback]
    ...                   **checkpoint_callback.load()) # doctest: +SKIP

    Parameters
    ----------
    checkpoint_path : string
        location where checkpoint will be saved to;
    dump_options : string
        options to pass on to `skopt.dump`, like `compress=9`
    """

    def __init__(self, checkpoint_path, **dump_options):
        self.checkpoint_path = checkpoint_path
        self.dump_options = dump_options

    def __call__(self, res):
        """
        Parameters
        ----------
        res : `OptimizeResult`, scipy object
            The optimization as a OptimizeResult object.
        """
        dump(res, self.checkpoint_path, **self.dump_options)

    def load(self):
        """Loads from disk previously evaluated points.

        Returns
        -------
        Dict with previous evaluations and their latest surrogate state.
        """
        if os.path.exists(self.checkpoint_path):
            result = load(self.checkpoint_path)
            return {
                'x0': result.x_iters,
                'y0': result.func_vals,
                'base_estimator': result.models[-1] if result.models else None,
            }
        return {}
