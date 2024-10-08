import warnings

try:
    pass
except ImportError:
    pass

import numpy as np
from scipy.stats import rankdata
from sklearn.model_selection._search import BaseSearchCV
from sklearn.utils import check_random_state
from sklearn.utils.validation import check_is_fitted

try:
    pass
except ImportError:
    pass

from . import Optimizer
from .callbacks import check_callback
from .space import check_dimension
from .utils import dimensions_aslist, eval_callbacks, point_asdict


def _get_score_names(cv_results, *, kind="test"):
    prefix = f"mean_{kind}_"
    return {key[len(prefix) :] for key in cv_results.keys() if key.startswith(prefix)}


class BayesSearchCV(BaseSearchCV):
    """Bayesian optimization over hyper parameters.

    BayesSearchCV implements a "fit" and a "score" method.
    It also implements "predict", "predict_proba", "decision_function",
    "transform" and "inverse_transform" if they are implemented in the
    estimator used.

    The parameters of the estimator used to apply these methods are optimized
    by cross-validated search over parameter settings.

    In contrast to GridSearchCV, not all parameter values are tried out, but
    rather a fixed number of parameter settings is sampled from the specified
    distributions. The number of parameter settings that are tried is
    given by n_iter.

    Parameters are presented as a list of skopt.space.Dimension objects.

    Parameters
    ----------
    estimator : estimator object.
        A object of that type is instantiated for each search point.
        This object is assumed to implement the scikit-learn estimator api.
        Either estimator needs to provide a ``score`` function,
        or ``scoring`` must be passed.

    search_spaces : dict, list of dict or list of tuple containing (dict, int).
        One of these cases:
        1. dictionary, where keys are parameter names (strings)
        and values are skopt.space.Dimension instances (Real, Integer
        or Categorical) or any other valid value that defines skopt
        dimension (see skopt.Optimizer docs). Represents search space
        over parameters of the provided estimator.
        2. list of dictionaries: a list of dictionaries, where every
        dictionary fits the description given in case 1 above.
        If a list of dictionary objects is given, then the search is
        performed sequentially for every parameter space with maximum
        number of evaluations set to self.n_iter.
        3. list of (dict, int > 0): an extension of case 2 above,
        where first element of every tuple is a dictionary representing
        some search subspace, similarly as in case 2, and second element
        is a number of iterations that will be spent optimizing over
        this subspace.

    n_iter : int, default=50
        Number of parameter settings that are sampled. n_iter trades
        off runtime vs quality of the solution. Consider increasing
        ``n_points`` if you want to try more parameter settings in
        parallel.

    optimizer_kwargs : dict, optional
        Dict of arguments passed to :class:`Optimizer`.  For example,
        ``{'base_estimator': 'RF'}`` would use a Random Forest surrogate
        instead of the default Gaussian Process.

    scoring : str, callable, list, tuple or dict, default=None
        Strategy to evaluate the performance of the cross-validated model on
        the test set. If ``None``, the ``score`` method of the estimator is
        used.
        If `scoring` represents a single score, one can use:

        - a single string (see :ref:`scoring_parameter`);
        - a callable (see :ref:`scoring`) that returns a single value.

        If `scoring` represents multiple scores, one can use:

        - a list or tuple of unique strings;
        - a callable returning a dictionary where the keys are the metric
          names and the values are the metric scores;
        - a dictionary with metric names as keys and callables a values.

        Callables must have the signature ``scorer(estimator, X, y=None)``

    fit_params : dict, optional
        Parameters to pass to the fit method.

    n_jobs : int, default=1
        Number of jobs to run in parallel. At maximum there are
        ``n_points`` times ``cv`` jobs available during each iteration.

    n_points : int, default=1
        Number of parameter settings to sample in parallel. If this does
        not align with ``n_iter``, the last iteration will sample less
        points. See also :func:`~Optimizer.ask`

    pre_dispatch : int, or string, optional
        Controls the number of jobs that get dispatched during parallel
        execution. Reducing this number can be useful to avoid an
        explosion of memory consumption when more jobs get dispatched
        than CPUs can process. This parameter can be:

            - None, in which case all the jobs are immediately
              created and spawned. Use this for lightweight and
              fast-running jobs, to avoid delays due to on-demand
              spawning of the jobs
            - An int, giving the exact number of total jobs that are
              spawned
            - A string, giving an expression as a function of n_jobs,
              as in '2*n_jobs'

    cv : int, cross-validation generator or an iterable, optional
        Determines the cross-validation splitting strategy.
        Possible inputs for cv are:

          - None, to use the default 3-fold cross validation,
          - integer, to specify the number of folds in a `(Stratified)KFold`,
          - An object to be used as a cross-validation generator.
          - An iterable yielding train, test splits.

        For integer/None inputs, if the estimator is a classifier and ``y`` is
        either binary or multiclass, :class:`StratifiedKFold` is used. In all
        other cases, :class:`KFold` is used.

    refit : bool, str, default=True
        Refit the best estimator with the entire dataset.
        If "False", it is impossible to make predictions using
        this BayesSearchCV instance after fitting.
        For multiple metric evaluation, this needs to be a `str` denoting the
        scorer that would be used to direct the optimization process, and find
        the best parameters for refitting the estimator at the end.

    verbose : integer
        Controls the verbosity: the higher, the more messages.

    random_state : int or RandomState
        Pseudo random number generator state used for random uniform sampling
        from lists of possible values instead of scipy.stats distributions.

    error_score : 'raise' (default) or numeric
        Value to assign to the score if an error occurs in estimator fitting.
        If set to 'raise', the error is raised. If a numeric value is given,
        FitFailedWarning is raised. This parameter does not affect the refit
        step, which will always raise the error.

    return_train_score : boolean, default=False
        If ``'True'``, the ``cv_results_`` attribute will include training
        scores.

    Examples
    --------

    >>> from skopt import BayesSearchCV
    >>> # parameter ranges are specified by one of below
    >>> from skopt.space import Real, Categorical, Integer
    >>>
    >>> from sklearn.datasets import load_iris
    >>> from sklearn.svm import SVC
    >>> from sklearn.model_selection import train_test_split
    >>>
    >>> X, y = load_iris(return_X_y=True)
    >>> X_train, X_test, y_train, y_test = train_test_split(X, y,
    ...                                                     train_size=0.75,
    ...                                                     random_state=0)
    >>>
    >>> # log-uniform: understand as search over p = exp(x) by varying x
    >>> opt = BayesSearchCV(
    ...     SVC(),
    ...     {
    ...         'C': Real(1e-6, 1e+6, prior='log-uniform'),
    ...         'gamma': Real(1e-6, 1e+1, prior='log-uniform'),
    ...         'degree': Integer(1,8),
    ...         'kernel': Categorical(['linear', 'poly', 'rbf']),
    ...     },
    ...     n_iter=10, n_jobs=-1,
    ...     random_state=0
    ... )
    >>>
    >>> # executes bayesian optimization
    >>> _ = opt.fit(X_train, y_train)
    >>>
    >>> # model can be saved, used for predictions or scoring
    >>> print(opt.score(X_test, y_test))
    0.973...

    Attributes
    ----------
    cv_results_ : dict of numpy (masked) ndarrays
        A dict with keys as column headers and values as columns, that can be
        imported into a pandas ``DataFrame``.

        For instance the below given table

        +--------------+-------------+-------------------+---+---------------+
        | param_kernel | param_gamma | split0_test_score |...|rank_test_score|
        +==============+=============+===================+===+===============+
        |    'rbf'     |     0.1     |        0.8        |...|       2       |
        +--------------+-------------+-------------------+---+---------------+
        |    'rbf'     |     0.2     |        0.9        |...|       1       |
        +--------------+-------------+-------------------+---+---------------+
        |    'rbf'     |     0.3     |        0.7        |...|       1       |
        +--------------+-------------+-------------------+---+---------------+

        will be represented by a ``cv_results_`` dict of::

            {
            'param_kernel' : masked_array(data = ['rbf', 'rbf', 'rbf'],
                                          mask = False),
            'param_gamma'  : masked_array(data = [0.1 0.2 0.3], mask = False),
            'split0_test_score'  : [0.8, 0.9, 0.7],
            'split1_test_score'  : [0.82, 0.5, 0.7],
            'mean_test_score'    : [0.81, 0.7, 0.7],
            'std_test_score'     : [0.02, 0.2, 0.],
            'rank_test_score'    : [3, 1, 1],
            'split0_train_score' : [0.8, 0.9, 0.7],
            'split1_train_score' : [0.82, 0.5, 0.7],
            'mean_train_score'   : [0.81, 0.7, 0.7],
            'std_train_score'    : [0.03, 0.03, 0.04],
            'mean_fit_time'      : [0.73, 0.63, 0.43, 0.49],
            'std_fit_time'       : [0.01, 0.02, 0.01, 0.01],
            'mean_score_time'    : [0.007, 0.06, 0.04, 0.04],
            'std_score_time'     : [0.001, 0.002, 0.003, 0.005],
            'params' : [{'kernel' : 'rbf', 'gamma' : 0.1}, ...],
            }

        NOTE that the key ``'params'`` is used to store a list of parameter
        settings dict for all the parameter candidates.

        The ``mean_fit_time``, ``std_fit_time``, ``mean_score_time`` and
        ``std_score_time`` are all in seconds.

    best_estimator_ : estimator
        Estimator that was chosen by the search, i.e. estimator
        which gave highest score (or smallest loss if specified)
        on the left out data. Not available if refit=False.

    optimizer_results_ : list of `OptimizeResult`
        Contains a `OptimizeResult` for each search space. The search space
        parameter are sorted by its name.

    best_score_ : float
        Score of best_estimator on the left out data.

    best_params_ : dict
        Parameter setting that gave the best results on the hold out data.

    best_index_ : int
        The index (of the ``cv_results_`` arrays) which corresponds to the best
        candidate parameter setting.

        The dict at ``search.cv_results_['params'][search.best_index_]`` gives
        the parameter setting for the best model, that gives the highest
        mean score (``search.best_score_``).

    scorer_ : function
        Scorer function used on the held out data to choose the best
        parameters for the model.

    n_splits_ : int
        The number of cross-validation splits (folds/iterations).

    refit_time_ : float
        Seconds used for refitting the best model on the whole dataset.
        This is present only if ``refit`` is not False.
    multimetric_ : bool
        Whether or not the scorers compute several metrics.

    Notes
    -----
    The parameters selected are those that maximize the score of the held-out
    data, according to the scoring parameter.

    If `n_jobs` was set to a value higher than one, the data is copied for each
    parameter setting (and not `n_jobs` times). This is done for efficiency
    reasons if individual jobs take very little time, but may raise errors if
    the dataset is large and not enough memory is available.  A workaround in
    this case is to set `pre_dispatch`. Then, the memory is copied only
    `pre_dispatch` many times. A reasonable value for `pre_dispatch` is `2 *
    n_jobs`.

    See Also
    --------
    :class:`GridSearchCV`:
        Does exhaustive search over a grid of parameters.
    """

    def __init__(
        self,
        estimator,
        search_spaces,
        optimizer_kwargs=None,
        n_iter=50,
        scoring=None,
        fit_params=None,
        n_jobs=1,
        n_points=1,
        iid='deprecated',
        refit=True,
        cv=None,
        verbose=0,
        pre_dispatch='2*n_jobs',
        random_state=None,
        error_score='raise',
        return_train_score=False,
    ):

        self.search_spaces = search_spaces
        self.n_iter = n_iter
        self.n_points = n_points
        self.random_state = random_state
        self.optimizer_kwargs = optimizer_kwargs
        self._check_search_space(self.search_spaces)
        # Temporary fix for compatibility with sklearn 0.20 and 0.21
        # See scikit-optimize#762
        # To be consistent with sklearn 0.21+, fit_params should be deprecated
        # in the constructor and be passed in ``fit``.
        self.fit_params = fit_params

        if iid != "deprecated":
            warnings.warn(
                "The `iid` parameter has been deprecated " "and will be ignored."
            )
        self.iid = iid  # For sklearn repr pprint

        super().__init__(
            estimator=estimator,
            scoring=scoring,
            n_jobs=n_jobs,
            refit=refit,
            cv=cv,
            verbose=verbose,
            pre_dispatch=pre_dispatch,
            error_score=error_score,
            return_train_score=return_train_score,
        )

    def _check_search_space(self, search_space):
        """Checks whether the search space argument is correct."""

        if len(search_space) == 0:
            raise ValueError(
                "The search_spaces parameter should contain at least one"
                "non-empty search space, got %s" % search_space
            )

        # check if space is a single dict, convert to list if so
        if isinstance(search_space, dict):
            search_space = [search_space]

        # check if the structure of the space is proper
        if isinstance(search_space, list):
            # convert to just a list of dicts
            dicts_only = []

            # 1. check the case when a tuple of space, n_iter is provided
            for elem in search_space:
                if isinstance(elem, tuple):
                    if len(elem) != 2:
                        raise ValueError(
                            "All tuples in list of search spaces should have"
                            "length 2, and contain (dict, int), got %s" % elem
                        )
                    subspace, n_iter = elem

                    if (not isinstance(n_iter, int)) or n_iter < 0:
                        raise ValueError(
                            "Number of iterations in search space should be"
                            "positive integer, got %s in tuple %s " % (n_iter, elem)
                        )

                    # save subspaces here for further checking
                    dicts_only.append(subspace)
                elif isinstance(elem, dict):
                    dicts_only.append(elem)
                else:
                    raise TypeError(
                        "A search space should be provided as a dict or"
                        "tuple (dict, int), got %s" % elem
                    )

            # 2. check all the dicts for correctness of contents
            for subspace in dicts_only:
                for _, v in subspace.items():
                    check_dimension(v)
        else:
            raise TypeError(
                "Search space should be provided as a dict or list of dict,"
                "got %s" % search_space
            )

    @property
    def optimizer_results_(self):
        check_is_fitted(self, '_optim_results')
        return self._optim_results

    def _make_optimizer(self, params_space):
        """Instantiate skopt Optimizer class.

        Parameters
        ----------
        params_space : dict
            Represents parameter search space. The keys are parameter
            names (strings) and values are skopt.space.Dimension instances,
            one of Real, Integer or Categorical.

        Returns
        -------
        optimizer: Instance of the `Optimizer` class used for for search
            in some parameter space.
        """

        kwargs = self.optimizer_kwargs_.copy()
        kwargs['dimensions'] = dimensions_aslist(params_space)
        optimizer = Optimizer(**kwargs)
        for i in range(len(optimizer.space.dimensions)):
            if optimizer.space.dimensions[i].name is not None:
                continue
            optimizer.space.dimensions[i].name = list(sorted(params_space.keys()))[i]

        return optimizer

    def _step(
        self, search_space, optimizer, score_name, evaluate_candidates, n_points=1
    ):
        """Generate n_jobs parameters and evaluate them in parallel."""
        # get parameter values to evaluate
        params = optimizer.ask(n_points=n_points)

        # convert parameters to python native types
        params = [[np.array(v).item() for v in p] for p in params]

        # make lists into dictionaries
        params_dict = [point_asdict(search_space, p) for p in params]

        all_results = evaluate_candidates(params_dict)

        # if self.scoring is a callable, we have to wait until here
        # to get the score name
        if score_name is None:
            score_names = _get_score_names(all_results)
            if len(score_names) > 1:
                # multimetric case
                # early check to fail before lengthy computations, as
                # BaseSearchCV only performs this check *after* _run_search
                self._check_refit_for_multimetric(score_names)
                score_name = f"mean_test_{self.refit}"
            elif len(score_names) == 1:
                # single metric, or a callable self.scoring returning a dict
                # with a single value
                # In both case, we just use the score that is available
                score_name = f"mean_test_{score_names.pop()}"
            else:
                # failsafe, shouldn't happen
                raise ValueError(
                    "No score was detected after fitting. This is probably "
                    "due to a callable 'scoring' returning an empty dict."
                )

        # Feed the point and objective value back into optimizer
        # Optimizer minimizes objective, hence provide negative score
        local_results = all_results[score_name][-len(params) :]
        # return the score_name to cache it if callable refit
        # this avoids checking self.refit all the time
        return (optimizer.tell(params, [-score for score in local_results]), score_name)

    @property
    def total_iterations(self):
        """Count total iterations that will be taken to explore all subspaces with `fit`
        method.

        Returns
        -------
        max_iter: int, total number of iterations to explore
        """
        total_iter = 0

        for elem in self.search_spaces:

            if isinstance(elem, tuple):
                space, n_iter = elem
            else:
                n_iter = self.n_iter

            total_iter += n_iter

        return total_iter

    # TODO: Accept callbacks via the constructor?
    def fit(self, X, y=None, *, groups=None, callback=None, **fit_params):
        """Run fit on the estimator with randomly drawn parameters.

        Parameters
        ----------
        X : array-like or sparse matrix, shape = [n_samples, n_features]
            The training input samples.

        y : array-like, shape = [n_samples] or [n_samples, n_output]
            Target relative to X for classification or regression (class
            labels should be integers or strings).

        groups : array-like, with shape (n_samples,), optional
            Group labels for the samples used while splitting the dataset into
            train/test set.

        callback: [callable, list of callables, optional]
            If callable then `callback(res)` is called after each parameter
            combination tested. If list of callables, then each callable in
            the list is called.
        """
        self._callbacks = check_callback(callback)

        if self.optimizer_kwargs is None:
            self.optimizer_kwargs_ = {}
        else:
            self.optimizer_kwargs_ = dict(self.optimizer_kwargs)

        if callable(self.refit):
            raise ValueError(
                "BayesSearchCV doesn't support a callable refit, "
                "as it doesn't define an implicit score to "
                "optimize"
            )

        super().fit(X=X, y=y, groups=groups, **fit_params)

        # BaseSearchCV never ranked train scores,
        # but apparently we used to ship this (back-compat)
        if self.return_train_score:
            for score in _get_score_names(self.cv_results_, kind="train"):
                self.cv_results_[f"rank_train_{score}"] = rankdata(
                    -np.array(self.cv_results_[f"mean_train_{score}"]), method='min'
                ).astype(int)
        return self

    def _run_search(self, evaluate_candidates):
        # check if space is a single dict, convert to list if so
        search_spaces = self.search_spaces
        if isinstance(search_spaces, dict):
            search_spaces = [search_spaces]

        callbacks = self._callbacks

        random_state = check_random_state(self.random_state)
        self.optimizer_kwargs_['random_state'] = random_state

        # Adapted from BaseSearchCV fit() method
        if callable(self.scoring):
            # will be determined later
            score_name = None
        elif self.scoring is None or isinstance(self.scoring, str):
            score_name = "mean_test_score"
        else:
            # proper checking took place before in BaseSearchCV.fit()
            score_name = f"mean_test_{self.refit}"

        # Instantiate optimizers for all the search spaces.
        optimizers = []
        for search_space in search_spaces:
            if isinstance(search_space, tuple):
                search_space = search_space[0]
            optimizers.append(self._make_optimizer(search_space))
        self.optimizers_ = optimizers  # will save the states of the optimizers

        self._optim_results = []

        n_points = self.n_points

        for search_space, optimizer in zip(search_spaces, optimizers):
            # if not provided with search subspace, n_iter is taken as
            # self.n_iter
            if isinstance(search_space, tuple):
                search_space, n_iter = search_space
            else:
                n_iter = self.n_iter

            # do the optimization for particular search space
            while n_iter > 0:
                # when n_iter < n_points points left for evaluation
                n_points_adjusted = min(n_iter, n_points)

                optim_result, score_name = self._step(
                    search_space,
                    optimizer,
                    score_name,
                    evaluate_candidates,
                    n_points=n_points_adjusted,
                )
                n_iter -= n_points

                if eval_callbacks(callbacks, optim_result):
                    break
            self._optim_results.append(optim_result)

    def _check_refit_for_multimetric(self, scores):
        """Check `refit` is compatible with `scores` and valid."""
        # override parent method to exclude False and callables
        multimetric_refit_msg = (
            "For multi-metric scoring, the 'refit' parameter must be set to a "
            "scorer key, used to guide the bayesian optimization process "
            "and refit an estimator with the best parameter settings on the "
            "whole dataset (making the best_* attributes available for that "
            f" metric). {self.refit!r} was passed."
        )

        is_refit_valid = isinstance(self.refit, str) and self.refit in scores

        if not is_refit_valid:
            raise ValueError(multimetric_refit_msg)
