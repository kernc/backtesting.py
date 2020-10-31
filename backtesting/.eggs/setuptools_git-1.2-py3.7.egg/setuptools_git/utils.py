import sys
import os
import stat
import shutil
import unicodedata
import posixpath

if sys.version_info >= (3,):
    from urllib.parse import quote as url_quote
    unicode = str
else:
    from urllib import quote as url_quote

__all__ = ['check_call', 'check_output', 'rmtree',
           'b', 'posix', 'fsdecode', 'hfs_quote', 'compose', 'decompose']


try:
    from subprocess import CalledProcessError
except ImportError:
    # BBB for Python < 2.5
    class CalledProcessError(Exception):
        """
        This exception is raised when a process run by check_call() or
        check_output() returns a non-zero exit status.

        The exit status will be stored in the returncode attribute;
        check_output() will also store the output in the output attribute.
        """
        def __init__(self, returncode, cmd, output=None):
            self.returncode = returncode
            self.cmd = cmd
            self.output = output

        def __str__(self):
            return "Command '%s' returned non-zero exit status %d" % (self.cmd, self.returncode)


try:
    from subprocess import check_call
except ImportError:
    # BBB for Python < 2.5
    def check_call(*popenargs, **kwargs):
        from subprocess import call
        retcode = call(*popenargs, **kwargs)
        cmd = kwargs.get("args")
        if cmd is None:
            cmd = popenargs[0]
        if retcode:
            raise CalledProcessError(retcode, cmd)
        return retcode


try:
    from subprocess import check_output
except ImportError:
    # BBB for Python < 2.7
    def check_output(*popenargs, **kwargs):
        from subprocess import PIPE
        from subprocess import Popen
        if 'stdout' in kwargs:
            raise ValueError(
                    'stdout argument not allowed, it will be overridden.')
        process = Popen(stdout=PIPE, *popenargs, **kwargs)
        output, unused_err = process.communicate()
        retcode = process.poll()
        if retcode:
            cmd = kwargs.get("args")
            if cmd is None:
                cmd = popenargs[0]
            raise CalledProcessError(retcode, cmd)
        return output


# Windows cannot delete read-only Git objects
def rmtree(path):
    if sys.platform == 'win32':
        def onerror(func, path, excinfo):
            os.chmod(path, stat.S_IWRITE)
            func(path)
        shutil.rmtree(path, False, onerror)
    else:
        shutil.rmtree(path, False)


# Fake byte literals for Python < 2.6
def b(s, encoding='utf-8'):
    if sys.version_info >= (3,):
        return s.encode(encoding)
    return s


# Convert path to POSIX path on Windows
def posix(path):
    if sys.platform == 'win32':
        return path.replace(os.sep, posixpath.sep)
    return path


# Decode path from fs encoding under Python 3
def fsdecode(path):
    if sys.version_info >= (3,):
        if not isinstance(path, str):
            if sys.platform == 'win32':
                errors = 'strict'
            else:
                errors = 'surrogateescape'
            return path.decode(sys.getfilesystemencoding(), errors)
    return path


# HFS Plus quotes unknown bytes like so: %F6
def hfs_quote(path):
    if isinstance(path, unicode):
        raise TypeError('bytes are required')
    try:
        path.decode('utf-8')
    except UnicodeDecodeError:
        path = url_quote(path) # Not UTF-8
        if sys.version_info >= (3,):
            path = path.encode('ascii')
    return path


# HFS Plus uses decomposed UTF-8
def compose(path):
    if isinstance(path, unicode):
        return unicodedata.normalize('NFC', path)
    try:
        path = path.decode('utf-8')
        path = unicodedata.normalize('NFC', path)
        path = path.encode('utf-8')
    except UnicodeError:
        pass # Not UTF-8
    return path


# HFS Plus uses decomposed UTF-8
def decompose(path):
    if isinstance(path, unicode):
        return unicodedata.normalize('NFD', path)
    try:
        path = path.decode('utf-8')
        path = unicodedata.normalize('NFD', path)
        path = path.encode('utf-8')
    except UnicodeError:
        pass # Not UTF-8
    return path

