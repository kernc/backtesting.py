import sys
import unittest
import warnings


if __name__ == '__main__':
    warnings.filterwarnings('error')
    # But avoid multiprocessing RuntimeWarning on Widnose
    if sys.platform.startswith('win'):
        warnings.filterwarnings('ignore', message='.*multi-process', category=RuntimeWarning)

    unittest.main(module='backtesting.test._test', verbosity=2)
