import sys
import unittest
import warnings


if __name__ == '__main__':
    warnings.filterwarnings('error')
    # Raised from within pandas (<= 2.3) with NumPy >= 2.5; not actionable here
    warnings.filterwarnings('ignore', category=DeprecationWarning,
                            message="The 'generic' unit for NumPy timedelta is deprecated")
    # But avoid multiprocessing RuntimeWarning on Widnose
    if sys.platform.startswith('win'):
        warnings.filterwarnings('ignore', message='.*multi-process', category=RuntimeWarning)

    unittest.main(module='backtesting.test._test', verbosity=2)
