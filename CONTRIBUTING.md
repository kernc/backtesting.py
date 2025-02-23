Contributing guidelines
=======================

Issues
------
Before reporting an issue, see if a similar issue is already open.
Also check if a similar issue was recently closed — your bug might
have been fixed already.

To have your issue dealt with promptly, it's best to construct a
[minimal working example] that exposes the issue in a clear and
reproducible manner. Review [how to report bugs effectively][bugs]
and, particularly, how to
[craft useful bug reports][bugs2] in Python.

In case of bugs, please submit **full** tracebacks.

Remember that GitHub Issues supports [markdown] syntax, so
please **wrap verbatim example code**/traceback in
triple-backtick-[fenced code blocks],
such as:
~~~markdown
```python
def foo():
    ...
```
~~~
and use the post preview function before posting!

Many thanks from the maintainers!

Note, In most cases, the issues are most readily dealt with when
accompanied by [respective fixes/PRs].

[minimal working example]: https://en.wikipedia.org/wiki/Minimal_working_example
[bugs]: https://www.chiark.greenend.org.uk/~sgtatham/bugs.html
[bugs2]: https://matthewrocklin.com/blog/work/2018/02/28/minimal-bug-reports
[markdown]: https://www.markdownguide.org/cheat-sheet/
[fenced code blocks]: https://www.markdownguide.org/extended-syntax/#syntax-highlighting
[respective fixes/PRs]: https://github.com/kernc/backtesting.py/blob/master/CONTRIBUTING.md#pull-requests


Installation
------------
To install a _developmental_ version of the project,
first [fork the project]. Then:

    git clone git@github.com:YOUR_USERNAME/backtesting.py
    cd backtesting.py
    pip install -e '.[doc,test,dev]'

[fork the project]: https://help.github.com/articles/fork-a-repo/


Testing
-------
Please write reasonable unit tests for any new / changed functionality.
See _backtesting/test_ directory for existing tests.
Before submitting a PR, ensure the tests pass:

    python -m backtesting.test

Also ensure that idiomatic code style is respected by running:

    flake8 backtesting
    mypy backtesting


Documentation
-------------
See _doc/README.md_. Besides Jupyter Notebook examples, all documentation
is generated from [pdoc]-compatible markdown docstrings in code.

[pdoc]: https://pdoc3.github.io/pdoc


Pull requests
-------------
A general recommended reading:
[How to make your code reviewer fall in love with you][code-review].

Use explicit commit messages — see [NumPy's development workflow]
for inspiration.

Every new feature must be accompanied by a unit test.

Please help review [existing PRs] you wish to see included.

[code-review]: https://mtlynch.io/code-review-love/
[NumPy's development workflow]: https://numpy.org/doc/stable/dev/development_workflow.html
[existing PRs]: https://github.com/kernc/backtesting.py/pulls
