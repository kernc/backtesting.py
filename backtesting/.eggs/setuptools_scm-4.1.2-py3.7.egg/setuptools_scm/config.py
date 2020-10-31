""" configuration """
from __future__ import print_function, unicode_literals
import os
import re
import warnings

from .utils import trace

DEFAULT_TAG_REGEX = r"^(?:[\w-]+-)?(?P<version>[vV]?\d+(?:\.\d+){0,2}[^\+]*)(?:\+.*)?$"
DEFAULT_VERSION_SCHEME = "guess-next-dev"
DEFAULT_LOCAL_SCHEME = "node-and-date"


def _check_tag_regex(value):
    if not value:
        value = DEFAULT_TAG_REGEX
    regex = re.compile(value)

    group_names = regex.groupindex.keys()
    if regex.groups == 0 or (regex.groups > 1 and "version" not in group_names):
        warnings.warn(
            "Expected tag_regex to contain a single match group or a group named"
            " 'version' to identify the version part of any tag."
        )

    return regex


def _check_absolute_root(root, relative_to):
    if relative_to:
        if os.path.isabs(root) and not root.startswith(relative_to):
            warnings.warn(
                "absolute root path '%s' overrides relative_to '%s'"
                % (root, relative_to)
            )
        root = os.path.join(os.path.dirname(relative_to), root)
    return os.path.abspath(root)


class Configuration(object):
    """ Global configuration model """

    def __init__(
        self,
        relative_to=None,
        root=".",
        version_scheme=DEFAULT_VERSION_SCHEME,
        local_scheme=DEFAULT_LOCAL_SCHEME,
        write_to=None,
        write_to_template=None,
        tag_regex=DEFAULT_TAG_REGEX,
        parentdir_prefix_version=None,
        fallback_version=None,
        fallback_root=".",
        parse=None,
        git_describe_command=None,
    ):
        # TODO:
        self._relative_to = relative_to
        self._root = "."

        self.root = root
        self.version_scheme = version_scheme
        self.local_scheme = local_scheme
        self.write_to = write_to
        self.write_to_template = write_to_template
        self.parentdir_prefix_version = parentdir_prefix_version
        self.fallback_version = fallback_version
        self.fallback_root = fallback_root
        self.parse = parse
        self.tag_regex = tag_regex
        self.git_describe_command = git_describe_command

    @property
    def fallback_root(self):
        return self._fallback_root

    @fallback_root.setter
    def fallback_root(self, value):
        self._fallback_root = os.path.abspath(value)

    @property
    def absolute_root(self):
        return self._absolute_root

    @property
    def relative_to(self):
        return self._relative_to

    @relative_to.setter
    def relative_to(self, value):
        self._absolute_root = _check_absolute_root(self._root, value)
        self._relative_to = value
        trace("root", repr(self._absolute_root))

    @property
    def root(self):
        return self._root

    @root.setter
    def root(self, value):
        self._absolute_root = _check_absolute_root(value, self._relative_to)
        self._root = value
        trace("root", repr(self._absolute_root))

    @property
    def tag_regex(self):
        return self._tag_regex

    @tag_regex.setter
    def tag_regex(self, value):
        self._tag_regex = _check_tag_regex(value)

    @classmethod
    def from_file(cls, name="pyproject.toml"):
        """
        Read Configuration from pyproject.toml (or similar).
        Raises exceptions when file is not found or toml is
        not installed or the file has invalid format or does
        not contain the [tool.setuptools_scm] section.
        """
        with open(name) as strm:
            defn = __import__("toml").load(strm)
        section = defn.get("tool", {})["setuptools_scm"]
        return cls(**section)
