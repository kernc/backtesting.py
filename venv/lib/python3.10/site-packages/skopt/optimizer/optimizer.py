import sys
import warnings
from math import log
from numbers import Number

import numpy as np
from joblib import Parallel, delayed
from scipy.optimize import fmin_l_bfgs_b
from sklearn.base import clone, is_regressor
from sklearn.multioutput import MultiOutputRegressor
from sklearn.utils import check_random_state

from ..acquisition import _gaussian_acquisition, gaussian_acquisition_1D
from ..learning import GaussianProcessRegressor
from ..space import Categorical, Space
from ..utils import (
    check_x_in_space,
    cook_estimator,
    cook_initial_point_generator,
    create_result,
    has_gradients,
    is_2Dlistlike,
    is_listlike,
    normalize_dimensions,
)


class Optimizer:
    """Run bayesian optimisation loop.

    An `Optimizer` represents the steps of a bayesian optimisation loop. To
    use it you need to provide your own loop mechanism. The various
    optimisers provided by `skopt` use this class under the hood.

    Use this class directly if you want to control the iterations of your
    bayesian optimisation loop.

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

    base_estimator : `"GP"`, `"RF"`, `"ET"`, `"GBRT"` or sklearn regressor, \
            default: `"GP"`
        Should inherit from :obj:`sklearn.base.RegressorMixin`.
        In addition the `predict` method, should have an optional `return_std`
        argument, which returns `std(Y | x)` along with `E[Y | x]`.
        If base_estimator is one of ["GP", "RF", "ET", "GBRT"], a default
        surrogate model of the corresponding type is used corresponding to what
        is used in the minimize functions.

    n_random_starts : int, default: 10
        .. deprecated:: 0.6
            use `n_initial_points` instead.

    n_initial_points : int, default: 10
        Number of evaluations of `func` with initialization points
        before approximating it with `base_estimator`. Initial point
        generator can be changed by setting `initial_point_generator`.

    initial_point_generator : str, InitialPointGenerator instance, \
            default: `"random"`
        Sets a initial points generator. Can be either

        - `"random"` for uniform random numbers,
        - `"sobol"` for a Sobol' sequence,
        - `"halton"` for a Halton sequence,
        - `"hammersly"` for a Hammersly sequence,
        - `"lhs"` for a latin hypercube sequence,
        - `"grid"` for a uniform grid sequence

    acq_func : string, default: `"gp_hedge"`
        Function to minimize over the posterior distribution. Can be either

        - `"LCB"` for lower confidence bound.
        - `"EI"` for negative expected improvement.
        - `"PI"` for negative probability of improvement.
        - `"MES"` for Max-value Entropy Search.
        - `"PVRS"` for Predictive Variance Reduction Search.
        - `"gp_hedge"` Probabilistically choose one of the above three

          - The gains `g_i` are initialized to zero.
          - At every iteration,

            - Each acquisition function is optimised independently to
              propose an candidate point `X_i`.
            - Out of all these candidate points, the next point `X_best` is
              chosen by :math:`softmax(\\eta g_i)`
            - After fitting the surrogate model with `(X_best, y_best)`,
              the gains are updated such that :math:`g_i -= \\mu(X_i)`

        - `"EIps"` for negated expected improvement per second to take into
          account the function compute time. Then, the objective function is
          assumed to return two values, the first being the objective value and
          the second being the time taken in seconds.
        - `"PIps"` for negated probability of improvement per second. The
          return type of the objective function is assumed to be similar to
          that of `"EIps"`

    acq_optimizer : string, `"sampling"` or `"lbfgs"`, default: `"auto"`
        Method to minimize the acquisition function. The fit model
        is updated with the optimal value obtained by optimizing `acq_func`
        with `acq_optimizer`.

        - If set to `"auto"`, then `acq_optimizer` is configured on the
          basis of the base_estimator and the space searched over.
          If the space is Categorical or if the estimator provided based on
          tree-models then this is set to be `"sampling"`.
        - If set to `"sampling"`, then `acq_func` is optimized by computing
          `acq_func` at `n_points` randomly sampled points.
        - If set to `"lbfgs"`, then `acq_func` is optimized by

          - Sampling `n_restarts_optimizer` points randomly.
          - `"lbfgs"` is run for 20 iterations with these points as initial
            points to find local minima.
          - The optimal of these local minima is used to update the prior.

    random_state : int, RandomState instance, or None (default)
        Set random state to something other than None for reproducible
        results.

    n_jobs : int, default: 1
        The number of jobs to run in parallel in the base_estimator,
        if the base_estimator supports n_jobs as parameter and
        base_estimator was given as string.
        If -1, then the number of jobs is set to the number of cores.

    acq_func_kwargs : dict
        Additional arguments to be passed to the acquisition function.

    acq_optimizer_kwargs : dict
        Additional arguments to be passed to the acquisition optimizer.

    model_queue_size : int or None, default: None
        Keeps list of models only as long as the argument given. In the
        case of None, the list has no capped length.

    avoid_duplicates : bool, default True
        When set to True, a random point is evaluated instead of the same
        point twice.

    space_constraint : callable or None, default: None
        Constraint function. Should take a single list of parameters
        (i.e. a point in space) and return True if the point satisfies
        the constraints.
        If None, the space is not conditionally constrained.

    Attributes
    ----------
    Xi : list
        Points at which objective has been evaluated.
    yi : scalar
        Values of objective at corresponding points in `Xi`.
    models : list
        Regression models used to fit observations and compute acquisition
        function.
    space : Space
        An instance of :class:`skopt.space.Space`. Stores parameter search
        space used to sample points, bounds, and type of parameters.
    """

    def __init__(
        self,
        dimensions,
        base_estimator="gp",
        n_random_starts=None,
        n_initial_points=10,
        initial_point_generator="random",
        n_jobs=1,
        acq_func="gp_hedge",
        acq_optimizer="auto",
        random_state=None,
        model_queue_size=None,
        space_constraint=None,
        acq_func_kwargs=None,
        acq_optimizer_kwargs=None,
        avoid_duplicates=True,
    ):
        args = locals().copy()
        del args['self']
        self.specs = {"args": args, "function": "Optimizer"}
        self.rng = check_random_state(random_state)

        # Configure acquisition function

        # Store and creat acquisition function set
        self.acq_func = acq_func
        self.acq_func_kwargs = acq_func_kwargs
        self.avoid_duplicates = avoid_duplicates

        allowed_acq_funcs = [
            "gp_hedge",
            "EI",
            "LCB",
            "MES",
            "PVRS",
            "PI",
            "EIps",
            "PIps",
        ]
        if self.acq_func not in allowed_acq_funcs:
            raise ValueError(
                "expected acq_func to be in %s, got %s"
                % (",".join(allowed_acq_funcs), self.acq_func)
            )

        # treat hedging method separately
        if self.acq_func == "gp_hedge":
            self.cand_acq_funcs_ = ["EI", "LCB", "PI"]
            self.gains_ = np.zeros(3)
        else:
            self.cand_acq_funcs_ = [self.acq_func]

        if acq_func_kwargs is None:
            acq_func_kwargs = dict()
        self.eta = acq_func_kwargs.get("eta", 1.0)

        # Configure counters of points

        # Check `n_random_starts` deprecation first
        if n_random_starts is not None:
            warnings.warn(
                ("n_random_starts will be removed in favour of " "n_initial_points."),
                DeprecationWarning,
            )
            n_initial_points = n_random_starts

        if n_initial_points < 0:
            raise ValueError(
                "Expected `n_initial_points` >= 0, got %d" % n_initial_points
            )
        self._n_initial_points = n_initial_points
        self.n_initial_points_ = n_initial_points

        # Configure estimator

        # build base_estimator if doesn't exist
        if isinstance(base_estimator, str):
            base_estimator = cook_estimator(
                base_estimator,
                space=dimensions,
                random_state=self.rng.randint(0, np.iinfo(np.int32).max),
                n_jobs=n_jobs,
            )

        # check if regressor
        if not is_regressor(base_estimator) and base_estimator is not None:
            raise ValueError("%s has to be a regressor." % base_estimator)

        # treat per second acqusition function specially
        is_multi_regressor = isinstance(base_estimator, MultiOutputRegressor)
        if "ps" in self.acq_func and not is_multi_regressor:
            self.base_estimator_ = MultiOutputRegressor(base_estimator)
        else:
            self.base_estimator_ = base_estimator

        # Configure optimizer

        # decide optimizer based on gradient information
        if acq_optimizer == "auto":
            if has_gradients(self.base_estimator_) and acq_func not in [
                "MES",
                "PVRS",
            ]:
                acq_optimizer = "lbfgs"
            else:
                acq_optimizer = "sampling"

        if space_constraint is not None:
            acq_optimizer = "sampling"
        if acq_optimizer not in ["lbfgs", "sampling"]:
            raise ValueError(
                "Expected acq_optimizer to be 'lbfgs' or "
                "'sampling', got {}".format(acq_optimizer)
            )

        if not has_gradients(self.base_estimator_) and acq_optimizer != "sampling":
            raise ValueError(
                "The regressor {} should run with "
                "acq_optimizer"
                "='sampling'.".format(type(base_estimator))
            )
        self.acq_optimizer = acq_optimizer

        # record other arguments
        if acq_optimizer_kwargs is None:
            acq_optimizer_kwargs = dict()

        self.n_points = acq_optimizer_kwargs.get("n_points", 10000)
        self.n_restarts_optimizer = acq_optimizer_kwargs.get("n_restarts_optimizer", 5)
        self.n_jobs = acq_optimizer_kwargs.get("n_jobs", 1)
        self.acq_optimizer_kwargs = acq_optimizer_kwargs

        # Configure search space

        if space_constraint is not None and not callable(space_constraint):
            raise ValueError(
                'Expected space_constraint to be callable '
                'or None, got {}'.format(space_constraint)
            )

        # normalize space if GP regressor
        if isinstance(self.base_estimator_, GaussianProcessRegressor):
            dimensions = normalize_dimensions(dimensions)
        self.space = Space(dimensions, constraint=space_constraint)

        self._initial_samples = None
        self._initial_point_generator = cook_initial_point_generator(
            initial_point_generator
        )

        if self._initial_point_generator is not None:
            transformer = self.space.get_transformer()
            self._initial_samples = self._initial_point_generator.generate(
                self.space.dimensions,
                n_initial_points,
                random_state=self.rng.randint(0, np.iinfo(np.int32).max),
            )
            self.space.set_transformer(transformer)

        # record categorical and non-categorical indices
        self._cat_inds = []
        self._non_cat_inds = []
        for ind, dim in enumerate(self.space.dimensions):
            if isinstance(dim, Categorical):
                self._cat_inds.append(ind)
            else:
                self._non_cat_inds.append(ind)

        # Initialize storage for optimization
        if not isinstance(model_queue_size, (int, type(None))):
            raise TypeError(
                "model_queue_size should be an int or None, "
                "got {}".format(type(model_queue_size))
            )
        self.max_model_queue_size = model_queue_size
        self.models = []
        self.Xi = []
        self.yi = []

        # Initialize cache for `ask` method responses
        # This ensures that multiple calls to `ask` with n_points set
        # return same sets of points. Reset to {} at every call to `tell`.
        self.cache_ = {}

    def copy(self, random_state=None):
        """Create a shallow copy of an instance of the optimizer.

        Parameters
        ----------
        random_state : int, RandomState instance, or None (default)
            Set the random state of the copy.
        """

        optimizer = Optimizer(
            dimensions=self.space.dimensions,
            base_estimator=self.base_estimator_,
            n_initial_points=self.n_initial_points_,
            initial_point_generator=self._initial_point_generator,
            acq_func=self.acq_func,
            acq_optimizer=self.acq_optimizer,
            acq_func_kwargs=self.acq_func_kwargs,
            acq_optimizer_kwargs=self.acq_optimizer_kwargs,
            space_constraint=self.space.constraint,
            random_state=random_state,
        )
        optimizer._initial_samples = self._initial_samples
        if hasattr(self, "gains_"):
            optimizer.gains_ = np.copy(self.gains_)
        if self.Xi:
            optimizer._tell(self.Xi, self.yi)

        return optimizer

    def ask(self, n_points=None, strategy="cl_min"):
        """Query point or multiple points at which objective should be evaluated.

        n_points : int or None, default: None
            Number of points returned by the ask method.
            If the value is None, a single point to evaluate is returned.
            Otherwise a list of points to evaluate is returned of size
            n_points. This is useful if you can evaluate your objective in
            parallel, and thus obtain more objective function evaluations per
            unit of time.

        strategy : string, default: "cl_min"
            Method to use to sample multiple points (see also `n_points`
            description). This parameter is ignored if n_points = None.
            Supported options are `"cl_min"`, `"cl_mean"` or `"cl_max"`.

            - If set to `"cl_min"`, then constant liar strategy is used
               with lie objective value being minimum of observed objective
               values. `"cl_mean"` and `"cl_max"` means mean and max of values
               respectively. For details on this strategy see:

               https://hal.archives-ouvertes.fr/hal-00732512/document

               With this strategy a copy of optimizer is created, which is
               then asked for a point, and the point is told to the copy of
               optimizer with some fake objective (lie), the next point is
               asked from copy, it is also told to the copy with fake
               objective and so on. The type of lie defines different
               flavours of `cl_x` strategies.
        """
        if n_points is None:
            return self._ask()

        supported_strategies = ["cl_min", "cl_mean", "cl_max"]

        if not (isinstance(n_points, int) and n_points > 0):
            raise ValueError("n_points should be int > 0, got " + str(n_points))

        if strategy not in supported_strategies:
            raise ValueError(
                "Expected parallel_strategy to be one of "
                + str(supported_strategies)
                + ", "
                + "got %s" % strategy
            )

        # Caching the result with n_points not None. If some new parameters
        # are provided to the ask, the cache_ is not used.
        if (n_points, strategy) in self.cache_:
            return self.cache_[(n_points, strategy)]

        # Copy of the optimizer is made in order to manage the
        # deletion of points with "lie" objective (the copy of
        # oiptimizer is simply discarded)
        opt = self.copy(random_state=self.rng.randint(0, np.iinfo(np.int32).max))

        X = []
        for _ in range(n_points):
            x = opt.ask()
            X.append(x)

            ti_available = "ps" in self.acq_func and len(opt.yi) > 0
            ti = [t for (_, t) in opt.yi] if ti_available else None

            if strategy == "cl_min":
                y_lie = np.min(opt.yi) if opt.yi else 0.0  # CL-min lie
                t_lie = np.min(ti) if ti is not None else log(sys.float_info.max)
            elif strategy == "cl_mean":
                y_lie = np.mean(opt.yi) if opt.yi else 0.0  # CL-mean lie
                t_lie = np.mean(ti) if ti is not None else log(sys.float_info.max)
            else:
                y_lie = np.max(opt.yi) if opt.yi else 0.0  # CL-max lie
                t_lie = np.max(ti) if ti is not None else log(sys.float_info.max)

            # Lie to the optimizer.
            if "ps" in self.acq_func:
                # Use `_tell()` instead of `tell()` to prevent repeated
                # log transformations of the computation times.
                opt._tell(x, (y_lie, t_lie))
            else:
                opt._tell(x, y_lie)

        self.cache_ = {(n_points, strategy): X}  # cache_ the result

        return X

    def _ask(self):
        """Suggest next point at which to evaluate the objective.

        Return a random point while not at least `n_initial_points`
        observations have been `tell`ed, after that `base_estimator` is used
        to determine the next point.
        """
        if self._n_initial_points > 0 or self.base_estimator_ is None:
            # this will not make a copy of `self.rng` and hence keep advancing
            # our random state.
            if self._initial_samples is None:
                return self.space.rvs(random_state=self.rng)[0]
            else:
                # The samples are evaluated starting form initial_samples[0]
                return self._initial_samples[
                    len(self._initial_samples) - self._n_initial_points
                ]

        else:
            if not self.models:
                raise RuntimeError(
                    "Random evaluations exhausted and no " "model has been fit."
                )

            next_x = self._next_x
            min_delta_x = min([self.space.distance(next_x, xi) for xi in self.Xi])
            if abs(min_delta_x) <= 1e-8:
                if self.avoid_duplicates:
                    next_x_new = next_x
                    if hasattr(self, "next_xs_"):
                        # Test if one of the acquisition functions proposed a
                        # candidate that has not been used yet
                        for x in self.next_xs_:
                            next_x_new_ = self.space.inverse_transform(
                                x.reshape((1, -1))
                            )[0]
                            if next_x_new_ != next_x:
                                # Also compare for all previous points
                                if next_x_new_ in self.Xi:
                                    continue  # Do not use this candidate
                                else:
                                    next_x_new = next_x_new_
                                    break  # Found an actually new candidate

                    if next_x_new == next_x:
                        # No new candidate could be found. Use a random one
                        next_x_new = self.space.rvs(random_state=self.rng)[0]
                        warnings.warn(
                            "The objective has been evaluated at "
                            "point {} before, using random point {}".format(
                                next_x, next_x_new
                            )
                        )
                    next_x = next_x_new
                else:
                    warnings.warn(
                        "The objective has been evaluated at point "
                        "{} before".format(next_x)
                    )
            # return point computed from last call to tell()
            return next_x

    def tell(self, x, y, fit=True):
        """Record an observation (or several) of the objective function.

        Provide values of the objective function at points suggested by
        `ask()` or other points. By default a new model will be fit to all
        observations. The new model is used to suggest the next point at
        which to evaluate the objective. This point can be retrieved by calling
        `ask()`.

        To add observations without fitting a new model set `fit` to False.

        To add multiple observations in a batch pass a list-of-lists for `x`
        and a list of scalars for `y`.

        Parameters
        ----------
        x : list or list-of-lists
            Point at which objective was evaluated.

        y : scalar or list
            Value of objective at `x`.

        fit : bool, default: True
            Fit a model to observed evaluations of the objective. A model will
            only be fitted after `n_initial_points` points have been told to
            the optimizer irrespective of the value of `fit`.
        """
        check_x_in_space(x, self.space)
        self._check_y_is_valid(x, y)

        # take the logarithm of the computation times
        if "ps" in self.acq_func:
            if is_2Dlistlike(x):
                y = [[val, log(t)] for (val, t) in y]
            elif is_listlike(x):
                y = list(y)
                y[1] = log(y[1])

        return self._tell(x, y, fit=fit)

    def _tell(self, x, y, fit=True):
        """Perform the actual work of incorporating one or more new points. See `tell()`
        for the full description.

        This method exists to give access to the internals of adding
        points by side stepping all input validation and transformation.
        """

        if "ps" in self.acq_func:
            if is_2Dlistlike(x):
                self.Xi.extend(x)
                self.yi.extend(y)
                self._n_initial_points -= len(y)
            elif is_listlike(x):
                self.Xi.append(x)
                self.yi.append(y)
                self._n_initial_points -= 1
        # if y isn't a scalar it means we have been handed a batch of points
        elif is_listlike(y) and is_2Dlistlike(x):
            self.Xi.extend(x)
            self.yi.extend(y)
            self._n_initial_points -= len(y)
        elif is_listlike(x):
            self.Xi.append(x)
            self.yi.append(y)
            self._n_initial_points -= 1
        else:
            raise ValueError(
                "Type of arguments `x` (%s) and `y` (%s) "
                "not compatible." % (type(x), type(y))
            )

        # optimizer learned something new - discard cache
        self.cache_ = {}

        # after being "told" n_initial_points we switch from sampling
        # random points to using a surrogate model
        if fit and self._n_initial_points <= 0 and self.base_estimator_ is not None:
            transformed_bounds = np.array(self.space.transformed_bounds)
            est = clone(self.base_estimator_)

            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                est.fit(self.space.transform(self.Xi), self.yi)

            if hasattr(self, "next_xs_") and self.acq_func == "gp_hedge":
                self.gains_ -= est.predict(np.vstack(self.next_xs_))

            if self.max_model_queue_size is None:
                self.models.append(est)
            elif len(self.models) < self.max_model_queue_size:
                self.models.append(est)
            else:
                # Maximum list size obtained, remove oldest model.
                self.models.pop(0)
                self.models.append(est)

            # even with BFGS as optimizer we want to sample a large number
            # of points and then pick the best ones as starting points
            X = self.space.transform(
                self.space.rvs(n_samples=self.n_points, random_state=self.rng)
            )

            self.next_xs_ = []
            for cand_acq_func in self.cand_acq_funcs_:
                values = _gaussian_acquisition(
                    X=X,
                    model=est,
                    y_opt=np.min(self.yi),
                    acq_func=cand_acq_func,
                    acq_func_kwargs=self.acq_func_kwargs,
                )
                # Find the minimum of the acquisition function by randomly
                # sampling points from the space
                if self.acq_optimizer == "sampling":
                    next_x = X[np.argmin(values)]

                # Use BFGS to find the mimimum of the acquisition function, the
                # minimization starts from `n_restarts_optimizer` different
                # points and the best minimum is used
                elif self.acq_optimizer == "lbfgs":
                    x0 = X[np.argsort(values)[: self.n_restarts_optimizer]]

                    with warnings.catch_warnings():
                        warnings.simplefilter("ignore")
                        results = Parallel(n_jobs=self.n_jobs)(
                            delayed(fmin_l_bfgs_b)(
                                gaussian_acquisition_1D,
                                x,
                                args=(
                                    est,
                                    np.min(self.yi),
                                    cand_acq_func,
                                    self.acq_func_kwargs,
                                ),
                                bounds=self.space.transformed_bounds,
                                approx_grad=False,
                                maxiter=20,
                            )
                            for x in x0
                        )

                    cand_xs = np.array([r[0] for r in results])
                    cand_acqs = np.array([r[1] for r in results])
                    next_x = cand_xs[np.argmin(cand_acqs)]

                # lbfgs should handle this but just in case there are
                # precision errors.
                if not self.space.is_categorical:
                    next_x = np.clip(
                        next_x, transformed_bounds[:, 0], transformed_bounds[:, 1]
                    )
                self.next_xs_.append(next_x)

            if self.acq_func == "gp_hedge":
                logits = np.array(self.gains_)
                logits -= np.max(logits)
                exp_logits = np.exp(self.eta * logits)
                probs = exp_logits / np.sum(exp_logits)
                next_x = self.next_xs_[np.argmax(self.rng.multinomial(1, probs))]
            else:
                next_x = self.next_xs_[0]

            # note the need for [0] at the end
            self._next_x = self.space.inverse_transform(next_x.reshape((1, -1)))[0]

        # Pack results
        result = create_result(
            self.Xi, self.yi, self.space, self.rng, models=self.models
        )

        result.specs = self.specs
        return result

    def _check_y_is_valid(self, x, y):
        """Check if the shape and types of x and y are consistent."""

        if "ps" in self.acq_func:
            if is_2Dlistlike(x):
                if not (np.ndim(y) == 2 and np.shape(y)[1] == 2):
                    raise TypeError("expected y to be a list of (func_val, t)")
            elif is_listlike(x):
                if not (np.ndim(y) == 1 and len(y) == 2):
                    raise TypeError("expected y to be (func_val, t)")

        # if y isn't a scalar it means we have been handed a batch of points
        elif is_listlike(y) and is_2Dlistlike(x):
            for y_value in y:
                if not isinstance(y_value, Number):
                    raise ValueError("expected y to be a list of scalars")

        elif is_listlike(x):
            if not isinstance(y, Number):
                raise ValueError("`func` should return a scalar")

        else:
            raise ValueError(
                "Type of arguments `x` (%s) and `y` (%s) "
                "not compatible." % (type(x), type(y))
            )

    def run(self, func, n_iter=1):
        """Execute ask() + tell() `n_iter` times."""
        for _ in range(n_iter):
            x = self.ask()
            self.tell(x, func(x))

        result = create_result(
            self.Xi, self.yi, self.space, self.rng, models=self.models
        )
        result.specs = self.specs
        return result

    def update_next(self):
        """Updates the value returned by opt.ask().

        Useful if a parameter was updated after ask was called.
        """
        self.cache_ = {}
        # Ask for a new next_x.
        # We only need to overwrite _next_x if it exists.
        if hasattr(self, '_next_x'):
            opt = self.copy(random_state=self.rng)
            self._next_x = opt._next_x

    def get_result(self):
        """Returns the same result that would be returned by opt.tell() but without
        calling tell.

        Returns
        -------
        res : `OptimizeResult`, scipy object
            OptimizeResult instance with the required information.
        """
        result = create_result(
            self.Xi, self.yi, self.space, self.rng, models=self.models
        )
        result.specs = self.specs
        return result
