from .lib import Bunch, TileProvider  # noqa
from .providers import providers  # noqa

from importlib.metadata import version, PackageNotFoundError
import contextlib

with contextlib.suppress(PackageNotFoundError):
    __version__ = version("xyzservices")
