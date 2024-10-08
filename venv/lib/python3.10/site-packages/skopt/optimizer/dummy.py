"""Random search."""

from .base import base_minimize


def dummy_minimize(
    func,
    dimensions,
    n_calls=100,
    initial_point_generator="random",
    x0=None,
    y0=None,
    random_state=None,
    verbose=False,
    callback=None,
    model_queue_size=None,
    init_point_gen_kwargs=None,
    space_constraint=None,
):
    """Random search by uniform sampling within the given bounds.

    Parameters
    ----------
    func : callable
        Function to minimize. Should take a single list of parameters
        and return the objective value.

        If you have a search-space where all dimensions have names,
        then you can use :func:`skopt.utils.use_named_args` as a decorator
        on your objective function, in order to call it directly
        with the named arguments. See `use_named_args` for an example.

    dimensions : list, shape (n_dims,)
        List of search space dimensions.
        Each search dimension can be defined either as

        - a `(lower_bound, upper_bound)` tuple (for `Real` or `Integer`
          dimensions),
        - a `(lower_bound, upper_bound, prior)` tuple (for `Real`
          dimensions),
        - as a list of categories (for `Categorical` dimensions), or
        - an instance of a `Dimension` object (`Real`, `Integer` or
          `Categorical`).

    n_calls : int, default: 100
        Number of calls to `func` to find the minimum.

    initial_point_generator : str, InitialPointGenerator instance, \
            default: `"random"`
        Sets a initial points generator. Can be either

        - `"random"` for uniform random numbers,
        - `"sobol"` for a Sobol' sequence,
        - `"halton"` for a Halton sequence,
        - `"hammersly"` for a Hammersly sequence,
        - `"lhs"` for a latin hypercube sequence,
        - `"grid"` for a uniform grid sequence

    x0 : list, list of lists or `None`
        Initial input points.

        - If it is a list of lists, use it as a list of input points.
        - If it is a list, use it as a single initial input point.
        - If it is `None`, no initial input points are used.

    y0 : list, scalar or `None`
        Evaluation of initial input points.

        - If it is a list, then it corresponds to evaluations of the function
          at each element of `x0` : the i-th element of `y0` corresponds
          to the function evaluated at the i-th element of `x0`.
        - If it is a scalar, then it corresponds to the evaluation of the
          function at `x0`.
        - If it is None and `x0` is provided, then the function is evaluated
          at each element of `x0`.

    random_state : int, RandomState instance, or None (default)
        Set random state to something other than None for reproducible
        results.

    verbose : boolean, default: False
        Control the verbosity. It is advised to set the verbosity to True
        for long optimization runs.

    callback : callable, list of callables, optional
        If callable then `callback(res)` is called after each call to `func`.
        If list of callables, then each callable in the list is called.

    model_queue_size : int or None, default: None
        Keeps list of models only as long as the argument given. In the
        case of None, the list has no capped length.

    space_constraint : callable or None, default: None
        Constraint function. Should take a single list of parameters
        (i.e. a point in space) and return True if the point satisfies
        the constraints.
        If None, the space is not conditionally constrained.

    Returns
    -------
    res : `OptimizeResult`, scipy object
        The optimization result returned as a OptimizeResult object.
        Important attributes are:

        - `x` [list]: location of the minimum.
        - `fun` [float]: function value at the minimum.
        - `x_iters` [list of lists]: location of function evaluation for each
          iteration.
        - `func_vals` [array]: function value for each iteration.
        - `space` [Space]: the optimisation space.
        - `specs` [dict]: the call specifications.
        - `rng` [RandomState instance]: State of the random state
          at the end of minimization.

        For more details related to the OptimizeResult object, refer
        http://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.OptimizeResult.html

    .. seealso:: functions :class:`skopt.gp_minimize`,
        :class:`skopt.forest_minimize`, :class:`skopt.gbrt_minimize`
    """
    # all our calls want random suggestions, except if we need to evaluate
    # some initial points
    if x0 is not None and y0 is None:
        n_initial_points = n_calls - len(x0)
    else:
        n_initial_points = n_calls

    return base_minimize(
        func,
        dimensions,
        base_estimator="dummy",
        # explicitly set optimizer to sampling as "dummy"
        # minimizer does not provide gradients.
        acq_optimizer="sampling",
        n_calls=n_calls,
        n_initial_points=n_initial_points,
        initial_point_generator=initial_point_generator,
        x0=x0,
        y0=y0,
        random_state=random_state,
        verbose=verbose,
        space_constraint=space_constraint,
        callback=callback,
        model_queue_size=model_queue_size,
    )
