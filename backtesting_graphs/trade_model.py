""" Trade Model: Trades that will be graphed in _plotting.plot."""

from copy import copy
from math import copysign
from typing import Optional, Union

import pandas as pd
from timeutil import Time

class Trade:
    """
    Trade Class

    Represents a Trade object representing trades of an asset.

    Class Attributes:
        size: Size of the trade
        entry_price: Price of buying a single token when entering the market
        exit_price: Price of selling a single token when entering the market
        entry_time: Time at market entry
        exit_time: Time at market exit
        buy_fee: Total fees accrued through entering into the market
        sell_fee: Total fees accrued from exiting the market
    """
    def __init__(self, size: float, entry_price: float, exit_price: float,
                 entry_time: Time, exit_time: Time, buy_fee: int, sell_fee: int
    ) -> None:
        self.__size = size
        self.__exit_time: Time = exit_time
        self.__entry_time: Time = entry_time
        self.__entry_price = entry_price
        self.__exit_price: float = exit_price
        self.__entry_bar: int = None
        self.__exit_bar: int = None
        self.__buy_fee: int = buy_fee
        self.__sell_fee: int = sell_fee

    def _replace(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, f'_{self.__class__.__qualname__}__{k}', v)
        return self

    def _copy(self, **kwargs):
        return copy(self)._replace(**kwargs)

    @property
    def size(self) -> float:
        """ Size of the trade in tokens. """
        return self.__size

    @property
    def entry_price(self) -> float:
        """ The price of a token at the entrance of a trade. """
        return self.__entry_price

    @property
    def buy_fee(self) -> float:
        """ Fee from the entrance of a Trade. """
        return self.__buy_fee

    @property
    def sell_fee(self) -> float:
        """ Fee from the exit of a Trade. """
        return self.__sell_fee

    @property
    def exit_price(self) -> float:
        """ Price of a token at the exit of a Trade. """
        return self.__exit_price

    @property
    def entry_bar(self) -> int:
        """ Index of where in the candles_df the entrance of the trade should
            be inserted. NOTE: This value is not set in a Trade object
            constructor. """
        return self.__entry_bar

    @property
    def exit_bar(self) -> int:
        """ Index of where in the candles_df the exit of the trade should
            be inserted. NOTE: This value is not set in a Trade object
            constructor. """
        return self.__exit_bar

    @property
    def entry_time(self) -> Union[pd.Timestamp, int]:
        """ Time of Trade's entrance into the market. """
        return self.__entry_time

    @property
    def exit_time(self) -> Optional[Union[pd.Timestamp, int]]:
        """ Time of Trade's exit from the market. """
        return self.__exit_time

    @property
    def pl(self) -> float:
        """ Trade profit (positive) or loss (negative) in cash units. """
        price = self.__exit_price
        return self.__size * (price - self.__entry_price)

    @property
    def pl_pct(self) -> float:
        """ Trade profit (positive) or loss (negative) in percent. """
        price = self.__exit_price
        return copysign(1, self.__size) * (price / self.__entry_price - 1)

    @property
    def value(self) -> float:
        """ Trade total value in cash (volume * price). """
        price = self.__exit_price
        return abs(self.__size) * price
