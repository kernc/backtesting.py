About
-----

This is a plugin for setuptools that enables git integration. Once
installed, Setuptools can be told to include in a package distribution
all the files tracked by git. This is an alternative to explicit
inclusion specifications with ``MANIFEST.in``.

A package distribution here refers to a package that you create using
setup.py, for example::

  $> python setup.py sdist
  $> python setup.py bdist_rpm
  $> python setup.py bdist_egg

This package was formerly known as gitlsfiles. The name change is the
result of an effort by the setuptools plugin developers to provide a
uniform naming convention.


Installation
------------

With easy_install::

  $> easy_install setuptools_git

Alternative manual installation::

  $> tar -zxvf setuptools_git-X.Y.Z.tar.gz
  $> cd setuptools_git-X.Y.Z
  $> python setup.py install

Where X.Y.Z is a version number.



Usage
-----

To activate this plugin, you must first package your python module
with ``setup.py`` and use setuptools. The former is well documented in
the `distutils manual <http://docs.python.org/dist/dist.html>`_.

To use setuptools instead of distutils, just edit ``setup.py`` and
change:

.. code-block:: python

  from distutils.core import setup

to:

.. code-block:: python

  from setuptools import setup, find_packages

When Setuptools builds a source package, it always includes all files
tracked by your revision control system, if it knows how to learn what
those files are.

When Setuptools builds a binary package, you can ask it to include all
files tracked by your revision control system, by adding these argument
to your invocation of `setup()`:

.. code-block:: python

  setup(...,
        packages=find_packages(),
        include_package_data=True,
        ...)

which will detect that a directory is a package if it contains a
``__init__.py`` file.  Alternatively, you can do without ``__init__.py``
files and tell Setuptools explicitly which packages to process:

.. code-block:: python

  setup(...,
        packages=["a_package", "another_one"],
        include_package_data=True,
        ...)

This plugin lets setuptools know what files are tracked by your git
revision control tool.  Setuptools ships with support for cvs and
subversion.  Other plugins like this one are available for bzr, darcs,
monotone, mercurial, and many others.

It might happen that you track files with your revision control system
that you don't want to include in your packages.  In that case, you
can prevent setuptools from packaging those files with a directive in
your ``MANIFEST.in``, for example::

  exclude .gitignore
  recursive-exclude images *.xcf *.blend

In this example, we prevent setuptools from packaging ``.gitignore`` and
the Gimp and Blender source files found under the ``images`` directory.

Files to exclude from the package can also be listed in the `setup()`
directive.  To do the same as the MANIFEST.in above, do:

.. code-block:: python

  setup(...,
        exclude_package_data={'': ['.gitignore'],
                              'images': ['*.xcf', '*.blend']},
        ...)

Here is another example:

.. code-block:: python

  setup(...,
        exclude_package_data={'': ['.gitignore', 'artwork/*'],
                              'model': ['config.py']},
        ...)


Gotchas
-------

Be aware that for this module to work properly, git and the git
meta-data must be available. That means that if someone tries to make
a package distribution out of a non-git distribution of yours, say a
tarball, setuptools will lack the information necessary to know which
files to include. A similar problem will happen if someone clones
your git repository but does not install this plugin.

Resolving those problems is out of the scope of this plugin; you
should add relevant warnings to your documentation if those situations
are a concern to you.

You can make sure that anyone who clones your git repository and uses
your setup.py file has this plugin by adding a `setup_requires`
argument:

.. code-block:: python

  setup(...,
        setup_requires=[ "setuptools_git >= 0.3", ],
        ...)


Changes
-------

1.2;  2017-02-17
~~~~~~~~~~~~~~~~
  - Add ability to get version from git tags (https://github.com/msabramo/setuptools-git/pull/9)
  - Return early if a directory isn't managed by git (https://github.com/msabramo/setuptools-git/pull/10)
  - Support universal wheels (https://github.com/msabramo/setuptools-git/pull/11)
  - Optimize directory scanning to skip ignored directories (https://github.com/msabramo/setuptools-git/pull/12)


References
----------

* `How to distribute Python modules with Distutils
  <http://docs.python.org/dist/dist.html>`_

* `Setuptools complete manual
  <http://peak.telecommunity.com/DevCenter/setuptools>`_

Thanks to `Zooko O'Whielacronx`_ for many improvements to the documentation.


.. _Zooko O'Whielacronx: https://bitbucket.org/zooko


