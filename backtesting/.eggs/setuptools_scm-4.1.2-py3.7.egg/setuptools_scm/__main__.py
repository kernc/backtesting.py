from __future__ import print_function
import sys
from setuptools_scm import get_version
from setuptools_scm.integration import find_files
from setuptools_scm.version import _warn_if_setuptools_outdated


def main():
    _warn_if_setuptools_outdated()
    print("Guessed Version", get_version())
    if "ls" in sys.argv:
        for fname in find_files("."):
            print(fname)


if __name__ == "__main__":
    main()
