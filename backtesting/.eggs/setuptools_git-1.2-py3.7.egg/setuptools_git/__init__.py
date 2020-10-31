"""
A hook into setuptools for Git.
"""
import sys
import os
import posixpath

from os.path import realpath, join
from subprocess import PIPE

from setuptools_git.utils import check_output
from setuptools_git.utils import b
from setuptools_git.utils import posix
from setuptools_git.utils import fsdecode
from setuptools_git.utils import hfs_quote
from setuptools_git.utils import compose
from setuptools_git.utils import decompose
from setuptools_git.utils import CalledProcessError


def version_calc(dist, attr, value):
    """
    Handler for parameter to setup(use_vcs_version=value)
    bool(value) should be true to invoke this plugin.
    """
    if attr == 'use_vcs_version' and value:
        dist.metadata.version = calculate_version()


def calculate_version():
    return check_output(['git', 'describe', '--tags', '--dirty']).strip()


def ntfsdecode(path):
    # We receive the raw bytes from Git and must decode by hand
    if sys.version_info >= (3,):
        try:
            path = path.decode('utf-8')
        except UnicodeDecodeError:
            path = path.decode(sys.getfilesystemencoding())
    else:
        try:
            path = path.decode('utf-8').encode(sys.getfilesystemencoding())
        except UnicodeError:
            pass  # Already in filesystem encoding (hopefully)
    return path


def gitlsfiles(dirname=''):
    # NB: Passing the '-z' option to 'git ls-files' below returns the
    # output as a blob of null-terminated filenames without canonical-
    # ization or use of double-quoting.
    #
    # So we'll get back e.g.:
    #
    # 'pyramid/tests/fixtures/static/h\xc3\xa9h\xc3\xa9.html'
    #
    # instead of:
    #
    # '"pyramid/tests/fixtures/static/h\\303\\251h\\303\\251.html"'
    #
    # for each file.
    res = set()

    try:
        topdir = check_output(
            ['git', 'rev-parse', '--show-toplevel'], cwd=dirname or None,
            stderr=PIPE).strip()

        if sys.platform == 'win32':
            cwd = ntfsdecode(topdir)
        else:
            cwd = topdir

        filenames = check_output(
            ['git', 'ls-files', '-z'], cwd=cwd, stderr=PIPE)
    except (CalledProcessError, OSError):
        # Setuptools mandates we fail silently
        return res

    for filename in filenames.split(b('\x00')):
        if filename:
            filename = posixpath.join(topdir, filename)
            if sys.platform == 'darwin':
                filename = hfs_quote(filename)
            if sys.platform == 'win32':
                filename = ntfsdecode(filename)
            else:
                filename = fsdecode(filename)
            if sys.platform == 'darwin':
                filename = decompose(filename)
            res.add(filename)
    return res


def _gitlsdirs(files, prefix_length):
    # Return directories managed by Git
    dirs = set()
    for file in files:
        dir = posixpath.dirname(file)
        while len(dir) > prefix_length:
            dirs.add(dir)
            dir = posixpath.dirname(dir)
    return dirs


def listfiles(dirname=''):
    git_files = gitlsfiles(dirname)
    if not git_files:
        return

    cwd = realpath(dirname or os.curdir)
    prefix_length = len(cwd) + 1

    git_dirs = _gitlsdirs(git_files, prefix_length)

    if sys.version_info >= (2, 6):
        walker = os.walk(cwd, followlinks=True)
    else:
        walker = os.walk(cwd)

    for root, dirs, files in walker:
        dirs[:] = [x for x in dirs if posix(realpath(join(root, x))) in git_dirs]
        for file in files:
            filename = join(root, file)
            if posix(realpath(filename)) in git_files:
                yield filename[prefix_length:]


if __name__ == '__main__':
    if len(sys.argv) > 1:
        dirname = sys.argv[1]
    else:
        dirname = ''
    for filename in listfiles(dirname):
        try:
            print(compose(filename))
        except UnicodeEncodeError:
            print(repr(filename)[1:-1])

