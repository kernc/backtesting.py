import json
import logging
import requests

from typing import Optional
from urllib.parse import urljoin

logger = logging.getLogger(__name__)


class RestClient:
    """"Class for REST API.
     :param config: Config settings for exchange.
    """
    def __init__(self, config):
        self.url = config['api_url']
        self.session = requests.Session()
        self.session.auth = (config.get('username'), config.get('password'))

    def call(self, method, apipath, params: Optional[dict] = None, data=None):

        if str(method).upper() not in ('GET', 'POST', 'PUT', 'DELETE'):
            raise ValueError(f'invalid method <{method}>')

        headers = {"Accept": "application/json",
                   "Content-Type": "application/json"
                   }
        url = urljoin(self.url, apipath)

        try:
            resp = self.session.request(method, url, headers=headers, data=json.dumps(data),
                                        params=params)
            if resp.status_code == 200:
                return resp.json()
            return resp.text
        except ConnectionError:
            logger.warning("Connection error")
