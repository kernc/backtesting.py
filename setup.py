import os
import sys

if sys.version_info < (3, 4):
    sys.exit('ERROR: Backtesting.py requires Python 3.4+')


def _discover_tests():
    import unittest
    return unittest.defaultTestLoader.discover('backtesting.test',
                                               pattern='*test*.py',
                                               top_level_dir='.')


if __name__ == '__main__':
    from setuptools import setup, find_packages

    setup(
        name='Backtesting',
        description="Backtest trading strategies in Python",
        license='AGPL-3.0',
        url="https://github.com/kernc/backtesting.py",
        long_description=open(os.path.join(os.path.dirname(__file__), 'README.md')).read(),
        long_description_content_type='text/markdown',
        packages=find_packages(),
        include_package_data=True,
        setup_requires=[
            'setuptools_git',
            'setuptools_scm',
        ],
        use_scm_version={
            'write_to': os.path.join('backtesting', '_version.py'),
        },
        install_requires=[
            'typing ; python_version < "3.5"',
            'numpy',
            'pandas',
            'bokeh >= 0.12.15',
        ],
        extras_require={
            'doc': [
                'pdoc3',
                'jupytext >= 0.7.0',
                'nbconvert',
            ],
            'test': [
                'seaborn',
            ]
        },
        test_suite="setup._discover_tests",
        python_requires='>=3.4',
        author='Zach Lûster',
        classifiers=[
            'Intended Audience :: Financial and Insurance Industry',
            'Intended Audience :: Science/Research',
            'License :: OSI Approved :: GNU Affero General Public License v3 or later (AGPLv3+)',
            'Operating System :: OS Independent',
            'Programming Language :: Python :: 3 :: Only',
            'Topic :: Office/Business :: Financial :: Investment',
            'Topic :: Scientific/Engineering :: Visualization',
        ],
        keywords=(
            'algo',
            'algorithmic',
            'ashi',
            'backtest',
            'backtesting',
            'bitcoin',
            'bokeh',
            'bonds',
            'candles',
            'candlestick',
            'cboe',
            'chart',
            'cme',
            'commodities',
            'crash',
            'crypto',
            'currency',
            'drawdown',
            'equity',
            'ethereum',
            'exchange',
            'finance',
            'financial',
            'forex',
            'fund',
            'futures',
            'fx',
            'fxpro',
            'gold',
            'heiken',
            'historical',
            'indicator',
            'invest',
            'investing',
            'investment',
            'macd',
            'market',
            'mechanical',
            'money',
            'oanda',
            'ohlc',
            'ohlcv',
            'order',
            'profit',
            'quant',
            'quantitative',
            'silver',
            'stocks',
            'strategy',
            'ticker',
            'trader',
            'trading',
            'tradingview',
            'usd',
        ),
    )
