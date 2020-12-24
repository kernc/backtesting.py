Contributing guidelines
=======================

Issues
------
Before reporting an issue, see if a similar issue is already open.
Also check if a similar issue was recently closed — your bug might
have been fixed already.

To have your issue dealt with promptly, it's best to construct a
[minimal working example] that exposes the issue in a clear and
reproducible manner. Make sure to understand
[how to report bugs effectively][bugs].

Show verbatim code in [fenced code blocks], and use the
preview function!

[minimal working example]: https://en.wikipedia.org/wiki/Minimal_working_example
[bugs]: https://www.chiark.greenend.org.uk/~sgtatham/bugs.html
[fenced code blocks]: https://www.markdownguide.org/extended-syntax/#fenced-code-blocks


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

    python -m backtesting.test

Also ensure that idiomatic code style is respected by running:

    flake8  
    mypy backtesting


Documentation
-------------
See _doc/README.md_. Besides Jupyter Notebook examples, all documentation
is generated from [pdoc]-compatible docstrings in code.

[pdoc]: https://pdoc3.github.io/pdoc


Pull requests
-------------
A general recommended reading:
[How to make your code reviewer fall in love with you][code-review].
Please use explicit commit messages. See [NumPy's development workflow]
for inspiration.

[code-review]: https://mtlynch.io/code-review-love/
[NumPy's development workflow]: https://numpy.org/doc/stable/dev/development_workflow.html
