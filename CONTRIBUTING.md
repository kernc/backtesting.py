Contributing guidelines
=======================

Issues
------
Before reporting an issue, see if a similar issue is already open.
Also check if a similar issue was recently closed — your bug might
have been fixed already.

To have your issue dealt with promptly, it's best to construct a
[minimal working example] that exposes the issue in a clear and
reproducible manner.

[minimal working example]: https://en.wikipedia.org/wiki/Minimal_working_example


Installation
------------
To install a developmental version of the project,
first [fork the project]. Then:

    git clone git@github.com:YOUR_USERNAME/backtesting.py
    cd backtesting.py
    pip3 install -e .[doc,test,dev]

[fork the project]: https://help.github.com/articles/fork-a-repo/


Testing
-------
Please write reasonable unit tests for any new / changed functionality.
See _backtesting/test_ directory for existing tests.
Before submitting a PR, ensure the tests pass:

    python setup.py test

Also ensure that idiomatic code style is respected by running:

    flake8  


Documentation
-------------
See _doc/README.md_. Besides Jupyter Notebook examples, all documentation
is generated from [pdoc]-compatible docstrings in code.

[pdoc]: https://pdoc3.github.io/pdoc


Pull requests
-------------
Please use explicit commit messages. See [NumPy's development workflow]
for inspiration.

[NumPy's development workflow]: https://docs.scipy.org/doc/numpy/dev/gitwash/development_workflow.html
