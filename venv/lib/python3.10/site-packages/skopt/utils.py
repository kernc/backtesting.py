from collections import OrderedDict
from copy import deepcopy
from functools import wraps

import numpy as np
from joblib import dump as dump_
from joblib import load as load_
from scipy.optimize import OptimizeResult
from scipy.optimize import minimize as sp_minimize
from sklearn.base import is_regressor
from sklearn.ensemble import GradientBoostingRegressor

from .learning import (
    ExtraTreesRegressor,
    GaussianProcessRegressor,
    GradientBoostingQuantileRegressor,
    RandomForestRegressor,
)
from .learning.gaussian_process.kernels import ConstantKernel, HammingKernel, Matern
from .sampler import Grid, Halton, Hammersly, InitialPointGenerator, Lhs, Sobol
from .space import Categorical, Dimension, Space

__all__ = (
    "load",
    "dump",
)


def create_result(Xi, yi, space=None, rng=None, specs=None, models=None):
    """Initialize an `OptimizeResult` object.

    Parameters
    ----------
    Xi : list of lists, shape (n_iters, n_features)
        Location of the minimum at every iteration.

    yi : array-like, shape (n_iters,)
        Minimum value obtained at every iteration.

    space : Space instance, optional
        Search space.

    rng : RandomState instance, optional
        State of the random state.

    specs : dict, optional
        Call specifications.

    models : list, optional
        List of fit surrogate models.

    Returns
    -------
    res : `OptimizeResult`, scipy object
        OptimizeResult instance with the required information.
    """
    res = OptimizeResult()
    yi = np.asarray(yi)
    if np.ndim(yi) == 2:
        res.log_time = np.ravel(yi[:, 1])
        yi = np.ravel(yi[:, 0])
    best = np.argmin(yi)
    res.x = Xi[best]
    res.fun = yi[best]
    res.func_vals = yi
    res.x_iters = Xi
    res.models = models
    res.space = space
    res.random_state = rng
    res.specs = specs
    return res


def eval_callbacks(callbacks, result):
    """Evaluate list of callbacks on result.

    The return values of the `callbacks` are ORed together to give the
    overall decision on whether or not the optimization procedure should
    continue.

    Parameters
    ----------
    callbacks : list of callables
        Callbacks to evaluate.

    result : `OptimizeResult`, scipy object
        Optimization result object to be stored.

    Returns
    -------
    decision : bool
        Decision of the callbacks whether or not to keep optimizing
    """
    stop = False
    if callbacks:
        for c in callbacks:
            decision = c(result)
            if decision is not None:
                stop = stop or decision

    return stop


def dump(res, filename, store_objective=True, **kwargs):
    """Store an skopt optimization result into a file.

    Parameters
    ----------
    res : `OptimizeResult`, scipy object
        Optimization result object to be stored.

    filename : string or `pathlib.Path`
        The path of the file in which it is to be stored. The compression
        method corresponding to one of the supported filename extensions ('.z',
        '.gz', '.bz2', '.xz' or '.lzma') will be used automatically.

    store_objective : boolean, default=True
        Whether the objective function should be stored. Set `store_objective`
        to `False` if your objective function (`.specs['args']['func']`) is
        unserializable (i.e. if an exception is raised when trying to serialize
        the optimization result).

        Notice that if `store_objective` is set to `False`, a deep copy of the
        optimization result is created, potentially leading to performance
        problems if `res` is very large. If the objective function is not
        critical, one can delete it before calling `skopt.dump()` and thus
        avoid deep copying of `res`.

    **kwargs : other keyword arguments
        All other keyword arguments will be passed to `joblib.dump`.
    """
    if store_objective:
        dump_(res, filename, **kwargs)

    elif 'func' in res.specs['args']:
        # If the user does not want to store the objective and it is indeed
        # present in the provided object, then create a deep copy of it and
        # remove the objective function before dumping it with joblib.dump.
        res_without_func = deepcopy(res)
        del res_without_func.specs['args']['func']
        dump_(res_without_func, filename, **kwargs)

    else:
        # If the user does not want to store the objective and it is already
        # missing in the provided object, dump it without copying.
        dump_(res, filename, **kwargs)


def load(filename, **kwargs):
    """Reconstruct a skopt optimization result from a file persisted with skopt.dump.

    .. note::
        Notice that the loaded optimization result can be missing
        the objective function (`.specs['args']['func']`) if `skopt.dump`
        was called with `store_objective=False`.

    Parameters
    ----------
    filename : string or `pathlib.Path`
        The path of the file from which to load the optimization result.

    **kwargs : other keyword arguments
        All other keyword arguments will be passed to `joblib.load`.

    Returns
    -------
    res : `OptimizeResult`, scipy object
        Reconstructed OptimizeResult instance.
    """
    return load_(filename, **kwargs)


def is_listlike(x):
    return isinstance(x, (list, tuple))


def is_2Dlistlike(x):
    return np.all([is_listlike(xi) for xi in x])


def check_x_in_space(x, space):
    if is_2Dlistlike(x):
        if not np.all([p in space for p in x]):
            raise ValueError("Not all points are within the bounds of" " the space.")
        if any([len(p) != len(space.dimensions) for p in x]):
            raise ValueError("Not all points have the same dimensions as" " the space.")
    elif is_listlike(x):
        if x not in space:
            raise ValueError(
                "Point (%s) is not within the bounds of"
                " the space (%s)." % (x, space.bounds)
            )
        if len(x) != len(space.dimensions):
            raise ValueError(
                "Dimensions of point (%s) and space (%s) do not match"
                % (x, space.bounds)
            )


def expected_minimum(res, n_random_starts=20, random_state=None):
    """Compute the minimum over the predictions of the last surrogate model. Uses
    `expected_minimum_random_sampling` with `n_random_starts` = 100000, when the space
    contains any categorical values.

    .. note::
        The returned minimum may not necessarily be an accurate
        prediction of the minimum of the true objective function.

    Parameters
    ----------
    res : `OptimizeResult`, scipy object
        The optimization result returned by a `skopt` minimizer.

    n_random_starts : int, default=20
        The number of random starts for the minimization of the surrogate
        model.

    random_state : int, RandomState instance, or None (default)
        Set random state to something other than None for reproducible
        results.

    Returns
    -------
    x : list
        location of the minimum.
    fun : float
        the surrogate function value at the minimum.
    """
    if res.space.is_partly_categorical:
        return expected_minimum_random_sampling(
            res, n_random_starts=100000, random_state=random_state
        )

    def func(x):
        reg = res.models[-1]
        x = res.space.transform(x.reshape(1, -1))
        return reg.predict(x.reshape(1, -1))[0]

    xs = [res.x]
    if n_random_starts > 0:
        xs.extend(res.space.rvs(n_random_starts, random_state=random_state))

    best_x = None
    best_fun = np.inf

    for x0 in xs:
        r = sp_minimize(func, x0=x0, bounds=res.space.bounds)

        if r.fun < best_fun:
            best_x = r.x
            best_fun = r.fun

    return [v for v in best_x], best_fun


def expected_minimum_random_sampling(res, n_random_starts=100000, random_state=None):
    """Minimum search by doing naive random sampling, Returns the parameters that gave
    the minimum function value. Can be used when the space contains any categorical
    values.

    .. note::
        The returned minimum may not necessarily be an accurate
        prediction of the minimum of the true objective function.

    Parameters
    ----------
    res : `OptimizeResult`, scipy object
        The optimization result returned by a `skopt` minimizer.

    n_random_starts : int, default=100000
        The number of random starts for the minimization of the surrogate
        model.

    random_state : int, RandomState instance, or None (default)
        Set random state to something other than None for reproducible
        results.

    Returns
    -------
    x : list
        location of the minimum.
    fun : float
        the surrogate function value at the minimum.
    """

    # sample points from search space
    random_samples = res.space.rvs(n_random_starts, random_state=random_state)

    # make estimations with surrogate
    model = res.models[-1]
    y_random = model.predict(res.space.transform(random_samples))
    index_best_objective = np.argmin(y_random)
    min_x = random_samples[index_best_objective]

    return min_x, y_random[index_best_objective]


def has_gradients(estimator):
    """Check if an estimator's ``predict`` method provides gradients.

    Parameters
    ----------
    estimator :
        sklearn BaseEstimator instance.
    """
    tree_estimators = (
        ExtraTreesRegressor,
        RandomForestRegressor,
        GradientBoostingQuantileRegressor,
    )

    # cook_estimator() returns None for "dummy minimize" aka random values only
    if estimator is None:
        return False

    if isinstance(estimator, tree_estimators):
        return False

    categorical_gp = False
    if hasattr(estimator, "kernel"):
        params = estimator.get_params()
        categorical_gp = isinstance(estimator.kernel, HammingKernel) or any(
            [isinstance(params[p], HammingKernel) for p in params]
        )

    return not categorical_gp


def cook_estimator(base_estimator, space=None, **kwargs):
    """Cook a default estimator.

    For the special base_estimator called "DUMMY" the return value is None.
    This corresponds to sampling points at random, hence there is no need
    for an estimator.

    Parameters
    ----------
    base_estimator : "GP", "RF", "ET", "GBRT", "DUMMY" or sklearn regressor
        Should inherit from `sklearn.base.RegressorMixin`.
        In addition the `predict` method should have an optional `return_std`
        argument, which returns `std(Y | x)`` along with `E[Y | x]`.
        If base_estimator is one of ["GP", "RF", "ET", "GBRT", "DUMMY"], a
        surrogate model corresponding to the relevant `X_minimize` function
        is created.

    space : Space instance
        Has to be provided if the base_estimator is a gaussian process.
        Ignored otherwise.

    kwargs : dict
        Extra parameters provided to the base_estimator at init time.
    """
    if isinstance(base_estimator, str):
        base_estimator = base_estimator.upper()
        if base_estimator not in ["GP", "ET", "RF", "GBRT", "DUMMY"]:
            raise ValueError(
                "Valid strings for the base_estimator parameter "
                " are: 'RF', 'ET', 'GP', 'GBRT' or 'DUMMY' not "
                "%s." % base_estimator
            )
    elif not is_regressor(base_estimator):
        raise ValueError("base_estimator has to be a regressor.")

    if base_estimator == "GP":
        if space is not None:
            space = Space(space)
            space = Space(normalize_dimensions(space.dimensions))
            n_dims = space.transformed_n_dims
            is_cat = space.is_categorical
        else:
            raise ValueError("Expected a Space instance, not None.")

        cov_amplitude = ConstantKernel(1.0, (0.01, 1000.0))
        # only special if *all* dimensions are categorical
        if is_cat:
            other_kernel = HammingKernel(length_scale=np.ones(n_dims))
        else:
            other_kernel = Matern(
                length_scale=np.ones(n_dims),
                length_scale_bounds=[(0.01, 100)] * n_dims,
                nu=2.5,
            )

        base_estimator = GaussianProcessRegressor(
            kernel=cov_amplitude * other_kernel,
            normalize_y=True,
            noise="gaussian",
            n_restarts_optimizer=2,
        )
    elif base_estimator == "RF":
        base_estimator = RandomForestRegressor(n_estimators=100, min_samples_leaf=3)
    elif base_estimator == "ET":
        base_estimator = ExtraTreesRegressor(n_estimators=100, min_samples_leaf=3)
    elif base_estimator == "GBRT":
        gbrt = GradientBoostingRegressor(n_estimators=30, loss="quantile")
        base_estimator = GradientBoostingQuantileRegressor(base_estimator=gbrt)

    elif base_estimator == "DUMMY":
        return None

    if ('n_jobs' in kwargs.keys()) and not hasattr(base_estimator, 'n_jobs'):
        del kwargs['n_jobs']

    base_estimator.set_params(**kwargs)
    return base_estimator


def cook_initial_point_generator(generator, **kwargs):
    """Cook a default initial point generator.

    For the special generator called "random" the return value is None.

    Parameters
    ----------
    generator : "lhs", "sobol", "halton", "hammersly", "grid", "random" \
            or InitialPointGenerator instance"
        Should inherit from `skopt.sampler.InitialPointGenerator`.

    kwargs : dict
        Extra parameters provided to the generator at init time.
    """
    if generator is None:
        generator = "random"
    elif isinstance(generator, str):
        generator = generator.lower()
        if generator not in ["sobol", "halton", "hammersly", "lhs", "random", "grid"]:
            raise ValueError(
                "Valid strings for the generator parameter "
                " are: 'sobol', 'lhs', 'halton', 'hammersly',"
                "'random', or 'grid' not "
                "%s." % generator
            )
    elif not isinstance(generator, InitialPointGenerator):
        raise ValueError(
            "generator has to be an InitialPointGenerator."
            "Got %s" % (str(type(generator)))
        )

    if isinstance(generator, str):
        if generator == "sobol":
            generator = Sobol()
        elif generator == "halton":
            generator = Halton()
        elif generator == "hammersly":
            generator = Hammersly()
        elif generator == "lhs":
            generator = Lhs()
        elif generator == "grid":
            generator = Grid()
        elif generator == "random":
            return None
    generator.set_params(**kwargs)
    return generator


def dimensions_aslist(search_space):
    """Convert a dict representation of a search space into a list of dimensions,
    ordered by sorted(search_space.keys()).

    Parameters
    ----------
    search_space : dict
        Represents search space. The keys are dimension names (strings)
        and values are instances of classes that inherit from the class
        :class:`skopt.space.Dimension` (Real, Integer or Categorical)

    Returns
    -------
    params_space_list: list
        list of skopt.space.Dimension instances.

    Examples
    --------
    >>> from skopt.space.space import Real, Integer
    >>> from skopt.utils import dimensions_aslist
    >>> search_space = {'name1': Real(0,1),
    ...                 'name2': Integer(2,4), 'name3': Real(-1,1)}
    >>> dimensions_aslist(search_space)[0]
    Real(low=0, high=1, prior='uniform', transform='identity')
    >>> dimensions_aslist(search_space)[1]
    Integer(low=2, high=4, prior='uniform', transform='identity')
    >>> dimensions_aslist(search_space)[2]
    Real(low=-1, high=1, prior='uniform', transform='identity')
    """
    params_space_list = [search_space[k] for k in sorted(search_space.keys())]
    return params_space_list


def point_asdict(search_space, point_as_list):
    """Convert the list representation of a point from a search space to the dictionary
    representation, where keys are dimension names and values are corresponding to the
    values of dimensions in the list.

    .. seealso:: :class:`skopt.utils.point_aslist`

    Parameters
    ----------
    search_space : dict
        Represents search space. The keys are dimension names (strings)
        and values are instances of classes that inherit from the class
        :class:`skopt.space.Dimension` (Real, Integer or Categorical)

    point_as_list : list
        list with parameter values.The order of parameters in the list
        is given by sorted(params_space.keys()).

    Returns
    -------
    params_dict : OrderedDict
        dictionary with parameter names as keys to which
        corresponding parameter values are assigned.

    Examples
    --------
    >>> from skopt.space.space import Real, Integer
    >>> from skopt.utils import point_asdict
    >>> search_space = {'name1': Real(0,1),
    ...                 'name2': Integer(2,4), 'name3': Real(-1,1)}
    >>> point_as_list = [0.66, 3, -0.15]
    >>> d = point_asdict(search_space, point_as_list)
    >>> d.keys(), d.values()
    (odict_keys(['name1', 'name2', 'name3']), odict_values([0.66, 3, -0.15]))
    """
    params_dict = OrderedDict()
    for k, v in zip(sorted(search_space.keys()), point_as_list):
        params_dict[k] = v
    return params_dict


def point_aslist(search_space, point_as_dict):
    """Convert a dictionary representation of a point from a search space to the list
    representation. The list of values is created from the values of the dictionary,
    sorted by the names of dimensions used as keys.

    .. seealso:: :class:`skopt.utils.point_asdict`

    Parameters
    ----------
    search_space : dict
        Represents search space. The keys are dimension names (strings)
        and values are instances of classes that inherit from the class
        :class:`skopt.space.Dimension` (Real, Integer or Categorical)

    point_as_dict : dict
        dict with parameter names as keys to which corresponding
        parameter values are assigned.

    Returns
    -------
    point_as_list : list
        list with point values.The order of
        parameters in the list is given by sorted(params_space.keys()).

    Examples
    --------
    >>> from skopt.space.space import Real, Integer
    >>> from skopt.utils import point_aslist
    >>> search_space = {'name1': Real(0,1),
    ...                 'name2': Integer(2,4), 'name3': Real(-1,1)}
    >>> point_as_dict = {'name1': 0.66, 'name2': 3, 'name3': -0.15}
    >>> point_aslist(search_space, point_as_dict)
    [0.66, 3, -0.15]
    """
    point_as_list = [point_as_dict[k] for k in sorted(search_space.keys())]
    return point_as_list


def normalize_dimensions(dimensions):
    """Create a ``Space`` where all dimensions are normalized to unit range.

    This is particularly useful for Gaussian process based regressors and is
    used internally by ``gp_minimize``.

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

         NOTE: The upper and lower bounds are inclusive for `Integer`
         dimensions.
    """
    space = Space(dimensions)
    transformed_dimensions = []
    for dimension in space.dimensions:
        if isinstance(dimension, Categorical):
            dimension.set_transformer("onehot")
        elif isinstance(dimension, Dimension):
            # Change the transformer to normalize
            # and add it to the new transformed dimensions
            dimension.set_transformer("normalize")
        else:
            raise RuntimeError("Unknown dimension type " "(%s)" % type(dimension))
        transformed_dimensions.append(dimension)

    return Space(transformed_dimensions)


def check_list_types(x, types):
    """Check whether all elements of a list `x` are of the correct type(s) and raise a
    ValueError if they are not.

    Note that `types` can be either a single object-type or a tuple
    of object-types.

    Raises `ValueError`, If one or more element in the list `x` is
    not of the correct type(s).

    Parameters
    ----------
    x : list
        List of objects.

    types : object or list(object)
        Either a single object-type or a tuple of object-types.
    """

    # List of the elements in the list that are incorrectly typed.
    err = list(filter(lambda a: not isinstance(a, types), x))

    # If the list is non-empty then raise an exception.
    if len(err) > 0:
        msg = "All elements in list must be instances of {}, but found: {}"
        msg = msg.format(types, err)
        raise ValueError(msg)


def check_dimension_names(dimensions):
    """Check whether all dimensions have names. Raises `ValueError`, if one or more
    dimensions are unnamed.

    Parameters
    ----------
    dimensions : list(Dimension)
        List of Dimension-objects.
    """

    # List of the dimensions that have no names.
    err_dims = list(filter(lambda dim: dim.name is None, dimensions))

    # If the list is non-empty then raise an exception.
    if len(err_dims) > 0:
        msg = "All dimensions must have names, but found: {}"
        msg = msg.format(err_dims)
        raise ValueError(msg)


def use_named_args(dimensions):
    """Wrapper / decorator for an objective function that uses named arguments to make
    it compatible with optimizers that use a single list of parameters.

    Your objective function can be defined as being callable using named
    arguments: `func(foo=123, bar=3.0, baz='hello')` for a search-space
    with dimensions named `['foo', 'bar', 'baz']`. But the optimizer
    will only pass a single list `x` of unnamed arguments when calling
    the objective function: `func(x=[123, 3.0, 'hello'])`. This wrapper
    converts your objective function with named arguments into one that
    accepts a list as argument, while doing the conversion automatically.

    The advantage of this is that you don't have to unpack the list of
    arguments `x` yourself, which makes the code easier to read and
    also reduces the risk of bugs if you change the number of dimensions
    or their order in the search-space.

    Examples
    --------
    >>> # Define the search-space dimensions. They must all have names!
    >>> from skopt.space import Real
    >>> from skopt import forest_minimize
    >>> from skopt.utils import use_named_args
    >>> dim1 = Real(name='foo', low=0.0, high=1.0)
    >>> dim2 = Real(name='bar', low=0.0, high=1.0)
    >>> dim3 = Real(name='baz', low=0.0, high=1.0)
    >>>
    >>> # Gather the search-space dimensions in a list.
    >>> dimensions = [dim1, dim2, dim3]
    >>>
    >>> # Define the objective function with named arguments
    >>> # and use this function-decorator to specify the
    >>> # search-space dimensions.
    >>> @use_named_args(dimensions=dimensions)
    ... def my_objective_function(foo, bar, baz):
    ...     return foo ** 2 + bar ** 4 + baz ** 8
    >>>
    >>> # Not the function is callable from the outside as
    >>> # `my_objective_function(x)` where `x` is a list of unnamed arguments,
    >>> # which then wraps your objective function that is callable as
    >>> # `my_objective_function(foo, bar, baz)`.
    >>> # The conversion from a list `x` to named parameters `foo`,
    >>> # `bar`, `baz`
    >>> # is done automatically.
    >>>
    >>> # Run the optimizer on the wrapped objective function which is called
    >>> # as `my_objective_function(x)` as expected by `forest_minimize()`.
    >>> result = forest_minimize(func=my_objective_function,
    ...                          dimensions=dimensions,
    ...                          n_calls=20, base_estimator="ET",
    ...                          random_state=4)
    >>>
    >>> # Print the best-found results in same format as the expected result.
    >>> print("Best fitness: " + str(result.fun))
    Best fitness: 0.1948080835239698
    >>> print("Best parameters: {}".format(result.x))
    Best parameters: [0.44134853091052617, 0.06570954323368307, 0.17586123323419825]

    Parameters
    ----------
    dimensions : list(Dimension)
        List of `Dimension`-objects for the search-space dimensions.

    Returns
    -------
    wrapped_func : callable
        Wrapped objective function.
    """

    def decorator(func):
        """This uses more advanced Python features to wrap `func` using a function-
        decorator, which are not explained so well in the official Python documentation.

        A good video tutorial explaining how this works is found here:
        https://www.youtube.com/watch?v=KlBPCzcQNU8

        Parameters
        ----------
        func : callable
            Function to minimize. Should take *named arguments*
            and return the objective value.
        """

        # Ensure all dimensions are correctly typed.
        check_list_types(dimensions, Dimension)

        # Ensure all dimensions have names.
        check_dimension_names(dimensions)

        @wraps(func)
        def wrapper(x):
            """This is the code that will be executed every time the wrapped / decorated
            `func` is being called. It takes `x` as a single list of parameters and
            converts them to named arguments and calls `func` with them.

            Parameters
            ----------
            x : list
                A single list of parameters e.g. `[123, 3.0, 'linear']`
                which will be converted to named arguments and passed
                to `func`.

            Returns
            -------
            objective_value
                The objective value returned by `func`.
            """

            # Ensure the number of dimensions match
            # the number of parameters in the list x.
            if len(x) != len(dimensions):
                msg = (
                    "Mismatch in number of search-space dimensions. "
                    "len(dimensions)=={} and len(x)=={}"
                )
                msg = msg.format(len(dimensions), len(x))
                raise ValueError(msg)

            # Create a dict where the keys are the names of the dimensions
            # and the values are taken from the list of parameters x.
            arg_dict = {dim.name: value for dim, value in zip(dimensions, x)}

            # Call the wrapped objective function with the named arguments.
            objective_value = func(**arg_dict)

            return objective_value

        return wrapper

    return decorator
