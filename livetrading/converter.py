import pandas as pd

DEFAULT_DATAFRAME_COLUMNS = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume']

def ohlcv_to_dataframe(historical_data: list) -> pd.DataFrame:
    """
    Converts historical data to a Dataframe
    :param historical_data: list with candle (OHLCV) data
    :return: DataFrame
    """
    df = pd.DataFrame(
        [{fn: getattr(f, fn) for fn in DEFAULT_DATAFRAME_COLUMNS} for f in historical_data]
    )
    df['Date'] = pd.to_datetime(df['Date'], unit='ms', utc=True, )
    df = df.set_index('Date')
    df = df.sort_index(ascending=True)
    return df.head()
