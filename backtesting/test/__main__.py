import unittest
import warnings


if __name__ == '__main__':
    warnings.filterwarnings('error')
    unittest.main(module='backtesting.test._test', verbosity=2)
