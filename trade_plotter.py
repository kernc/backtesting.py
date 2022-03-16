""" Trade Plotter: Plots a list of trades as html. """
import datetime
from typing import List

import numpy as np
import pandas as pd
from timeutil import Time

from backtesting_graphs._plotting import plot
from backtesting_graphs._stats import compute_stats
from backtesting_graphs.trade_model import Trade

# TODO: These functions are already written in Cargo and should be imported here
def make_dt(timestamp: int) -> datetime.datetime:
    return datetime.datetime.fromtimestamp(int(timestamp), tz=datetime.timezone.utc)

def get_candle_df(asset: str, start: Time, end: Time) -> pd.DataFrame:
    """ Returns a data frame with candles for the given asset between the given
        start and end times.

        Args:
            asset: Symbol of token to get candles for
            start: Start time to get data from
            end: End time to get data until, inclusive

        Returns: Pandas dataframe indexed by time with candle columns """
    # TODO (CASA-406): Pull data from Postgres
    try:
        df: pd.DataFrame = pd.read_csv(
            f"data/{asset}-candles.csv", sep=",", index_col=0,
            converters={"Timestamp": make_dt}
        )
    except FileNotFoundError as e:
        print("Trying to get candles for %s failed because CSV file %s "
                     "wasn't found.", f"{asset}-candles.csv", asset)
        raise e

    df = df.loc[start.dt:end.dt]
    return df

def graph_trades(trades: List[Trade], asset: str, start_time: Time,
                 end_time: Time, init_cash: int, init_tokens: int) -> str:
    """ Plots a list of trades for a given asset using the backtesting.py library
        and returns the contents of the html file as a string.

        Args:
            trades: List of trades to plot
            asset: Name of asset being plotted
            start_time: Start time of candles
            end_time: End time of candles
            init_cash: Initial cash in portfolio prior to trading
            init_tokens: Initial tokens in portfolio prior to trading """
    candles_df = get_candle_df("eth", start_time, end_time)

    num_candles_indices = int((end_time - start_time).total_seconds() // 60) + 1
    calc_df = pd.DataFrame([], index=candles_df.index)
    _gather_total_trade_deltas(
        num_candles_indices, init_cash, init_tokens, calc_df, start_time, trades
    )
    _calculate_equity(calc_df, candles_df)

    stats = compute_stats(
        trades=trades, calc_df=calc_df, equity=calc_df.net_position_value,
        ohlc_data=candles_df
    )
    filename = f"{asset}_trades_from_{start_time}_to_{end_time}"
    # Set show_plot to False to not have the file outputted
    return plot(results=stats, df=candles_df, filename=filename,
                show_plot=True)

def _calculate_equity(calc_df: pd.DataFrame, candles_df: pd.DataFrame) -> None:
    """ Calculates the positions net cash balance and value, net token balance
        and value, and the gross balance and value. After calculating, stores
        them in the calculations dataframe to be used for plotting.

        Args:
            calc_df: DF containing delta calculations
            candles_df: OHLC price data for an asset """
    net_cash_bal = np.cumsum(calc_df["net_cash_deltas"])
    net_token_bal = np.cumsum(calc_df["net_token_deltas"])
    gross_cash_bal = np.cumsum(calc_df["gross_cash_deltas"])

    calc_df["net_cash_balance"] = net_cash_bal
    calc_df["net_token_balance"] = net_token_bal
    calc_df["gross_cash_balance"] = gross_cash_bal

    token_value = net_token_bal * candles_df.Close

    calc_df["net_position_value"] = net_cash_bal + token_value
    calc_df["gross_position_value"] = gross_cash_bal + token_value
    bnh_token_balance = calc_df.iloc[0].gross_cash_deltas / candles_df.iloc[0].Close
    bnh_token_balance +=  calc_df.iloc[0].net_token_deltas
    calc_df["bnh_position_value"] = bnh_token_balance *  candles_df.Close


def _gather_total_trade_deltas(
    num_candles: int, init_cash: int, init_tokens: int,
    calc_df: pd.DataFrame, start: Time, trades: List[Trade]
) -> None:
    """ Calculates the change at each candle index of a positions cash with fees,
        cash without fees, and the total tokens in a position over time. These
        values are then stored in the calc dataframe.

        Args:
            num_candles: The total number of candles that occurred throughout
                the trading window
            init_cash: Initial cash in the position
            init_tokens: Initial tokens in a position
            calc_df: Dataframe that contains calculations for different line graphs
            start: The start time of the candles_df
            trades: The list of Trades to plot """
    net_cash_deltas = np.zeros((num_candles,), dtype=float)
    net_token_deltas = np.zeros((num_candles,), dtype=float)
    gross_cash_deltas = np.zeros((num_candles,), dtype=float)
    net_cash_deltas[0], net_token_deltas[0] = init_cash, init_tokens
    gross_cash_deltas[0] = init_cash

    for trade in trades:
        entry_candle = trade.entry_time - datetime.timedelta(seconds=trade.entry_time.second,
                                                             microseconds=trade.entry_time.microsecond)
        entry_index = int((entry_candle - start).total_seconds() // 60)

        exit_candle = trade.exit_time - datetime.timedelta(seconds=trade.exit_time.second,
                                                           microseconds=trade.exit_time.microsecond)
        exit_index = int((exit_candle - start).total_seconds() // 60)
        # Since the entry and exit bars are not set at the constructor they need
        #   to be set here. This is critical for accurate looking graphs.
        trade._replace(entry_bar=entry_index, exit_bar=exit_index)
        gross_cash_deltas[entry_index] -= trade.entry_price * trade.size
        gross_cash_deltas[exit_index] += trade.exit_price * trade.size

        net_cash_deltas[entry_index] -= trade.entry_price * trade.size + trade.buy_fee
        net_token_deltas[entry_index] += trade.size

        # TODO: Find the exchange to determine what the sell_fee should be
        #   Coinbase should set the fee to 0
        net_cash_deltas[exit_index] += trade.exit_price * trade.size - trade.sell_fee
        net_token_deltas[exit_index] -= trade.size

    calc_df["net_cash_deltas"] = net_cash_deltas
    calc_df["net_token_deltas"] = net_token_deltas
    calc_df["gross_cash_deltas"] = gross_cash_deltas
i_cash = 5000
i_tokens = 2
start = Time.fromisoformat("2022-01-01")
end = Time.fromisoformat("2022-01-01T06:00:00")
trades = [Trade(2, 3704, 3759, Time.fromisoformat("2022-01-01T05:10:00"),
                Time.fromisoformat("2022-01-01T05:36:00"), 25.0, 14.0,)]
print(graph_trades(trades, "eth", start, end, i_cash, i_tokens))
