from pkg_resources import iter_entry_points

from .version import _warn_if_setuptools_outdated
from .utils import do, trace_exception
from . import _get_version, Configuration


def version_keyword(dist, keyword, value):
    _warn_if_setuptools_outdated()
    if not value:
        return
    if value is True:
        value = {}
    if getattr(value, "__call__", None):
        value = value()
    config = Configuration(**value)
    dist.metadata.version = _get_version(config)


def find_files(path=""):
    for ep in iter_entry_points("setuptools_scm.files_command"):
        command = ep.load()
        if isinstance(command, str):
            # this technique is deprecated
            res = do(ep.load(), path or ".").splitlines()
        else:
            res = command(path)
        if res:
            return res
    return []


def _args_from_toml(name="pyproject.toml"):
    # todo: more sensible config initialization
    # move this elper back to config and unify it with the code from get_config

    with open(name) as strm:
        defn = __import__("toml").load(strm)
    return defn.get("tool", {})["setuptools_scm"]


def infer_version(dist):

    try:
        config = Configuration.from_file()
    except Exception:
        return trace_exception()
    dist.metadata.version = _get_version(config)
