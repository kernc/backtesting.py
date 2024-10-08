import os
import pkgutil
import sys

from .lib import _load_json

data_path = os.path.join(sys.prefix, "share", "xyzservices", "providers.json")

if os.path.exists(data_path):
    with open(data_path) as f:
        json = f.read()
else:
    json = pkgutil.get_data("xyzservices", "data/providers.json")

providers = _load_json(json)
