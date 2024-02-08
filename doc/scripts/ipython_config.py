# In build.sh, this file is copied into (and removed from)
# ~/.ipython/profile_default/startup/

import pandas as pd
pd.set_option("display.max_rows", 30)
# This an alternative to setting display.preceision=2,
# which doesn't work well for our dtype=object Series.
pd.set_option('display.float_format', '{:.2f}'.format)
del pd
