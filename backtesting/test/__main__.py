import unittest

suite = unittest.defaultTestLoader.discover('backtesting.test',
                                            pattern='_test*.py')
unittest.defaultTestLoader.suiteClass = lambda _: suite

if __name__ == '__main__':
    unittest.main(verbosity=2)
