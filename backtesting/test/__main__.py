import unittest

suite = unittest.defaultTestLoader.discover('backtesting.test',
                                            pattern='_test*.py')
if __name__ == '__main__':
    unittest.TextTestRunner().run(suite)
