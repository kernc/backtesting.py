import os

import mercantile
import pytest
import requests

import xyzservices.providers as xyz

flat_free = xyz.filter(requires_token=False).flatten()


def check_provider(provider):
    for key in ["attribution", "name"]:
        assert key in provider
    assert provider.url.startswith("http")
    for option in ["{z}", "{y}", "{x}"]:
        assert option in provider.url


def get_tile(provider):
    bounds = provider.get("bounds", [[-180, -90], [180, 90]])
    lat = (bounds[0][0] + bounds[1][0]) / 2
    lon = (bounds[0][1] + bounds[1][1]) / 2
    zoom = (provider.get("min_zoom", 0) + provider.get("max_zoom", 20)) // 2
    tile = mercantile.tile(lon, lat, zoom)
    z = tile.z
    x = tile.x
    y = tile.y
    return (z, x, y)


def get_response(url):
    s = requests.Session()
    a = requests.adapters.HTTPAdapter(max_retries=3)
    s.mount("http://", a)
    s.mount("https://", a)
    try:
        r = s.get(url, timeout=30)
    except requests.ConnectionError:
        pytest.xfail("Timeout.")
    return r.status_code


def get_test_result(provider, allow_403=True):
    if provider.get("status"):
        pytest.xfail("Provider is known to be broken.")

    z, x, y = get_tile(provider)

    try:
        r = get_response(provider.build_url(z=z, x=x, y=y))
        assert r == requests.codes.ok
    except AssertionError:
        if r == 403 and allow_403:
            pytest.xfail("Provider not available due to API restrictions (Error 403).")

        elif r == 503:
            pytest.xfail("Service temporarily unavailable (Error 503).")

        elif r == 502:
            pytest.xfail("Bad Gateway (Error 502).")

        # check another tiles
        elif r == 404:
            # in some cases, the computed tile is not available. trying known tiles.
            options = [
                (12, 2154, 1363),
                (6, 13, 21),
                (16, 33149, 22973),
                (0, 0, 0),
                (2, 6, 7),
                (6, 21, 31),
                (6, 21, 32),
                (6, 21, 33),
                (6, 22, 31),
                (6, 22, 32),
                (6, 22, 33),
                (6, 23, 31),
                (6, 23, 32),
                (6, 23, 33),
                (9, 259, 181),
                (12, 2074, 1410),
            ]
            results = []
            for o in options:
                z, x, y = o
                r = get_response(provider.build_url(z=z, x=x, y=y))
                results.append(r)
            if not any(x == requests.codes.ok for x in results):
                raise ValueError(f"Response code: {r}")
        else:
            raise ValueError(f"Response code: {r}")


@pytest.mark.parametrize("provider_name", xyz.flatten())
def test_minimal_provider_metadata(provider_name):
    provider = xyz.flatten()[provider_name]
    check_provider(provider)


@pytest.mark.request
@pytest.mark.parametrize("name", flat_free)
def test_free_providers(name):
    provider = flat_free[name]
    if "Stadia" in name:
        pytest.skip("Stadia doesn't support tile download in this way.")
    get_test_result(provider)


# test providers requiring API keys. Store API keys in GitHub secrets and load them as
# environment variables in CI Action. Note that env variable is loaded as empty on PRs
# from a fork.


@pytest.mark.request
@pytest.mark.parametrize("provider_name", xyz.Thunderforest)
def test_thunderforest(provider_name):
    try:
        token = os.environ["THUNDERFOREST"]
    except KeyError:
        pytest.xfail("Missing API token.")
    if token == "":
        pytest.xfail("Token empty.")

    provider = xyz.Thunderforest[provider_name](apikey=token)
    get_test_result(provider, allow_403=False)


@pytest.mark.request
@pytest.mark.parametrize("provider_name", xyz.Jawg)
def test_jawg(provider_name):
    try:
        token = os.environ["JAWG"]
    except KeyError:
        pytest.xfail("Missing API token.")
    if token == "":
        pytest.xfail("Token empty.")

    provider = xyz.Jawg[provider_name](accessToken=token)
    get_test_result(provider, allow_403=False)


@pytest.mark.request
def test_mapbox():
    try:
        token = os.environ["MAPBOX"]
    except KeyError:
        pytest.xfail("Missing API token.")
    if token == "":
        pytest.xfail("Token empty.")

    provider = xyz.MapBox(accessToken=token)
    get_test_result(provider, allow_403=False)


@pytest.mark.request
@pytest.mark.parametrize("provider_name", xyz.MapTiler)
def test_maptiler(provider_name):
    try:
        token = os.environ["MAPTILER"]
    except KeyError:
        pytest.xfail("Missing API token.")
    if token == "":
        pytest.xfail("Token empty.")

    provider = xyz.MapTiler[provider_name](key=token)
    get_test_result(provider, allow_403=False)


@pytest.mark.request
@pytest.mark.parametrize("provider_name", xyz.TomTom)
def test_tomtom(provider_name):
    try:
        token = os.environ["TOMTOM"]
    except KeyError:
        pytest.xfail("Missing API token.")
    if token == "":
        pytest.xfail("Token empty.")

    provider = xyz.TomTom[provider_name](apikey=token)
    get_test_result(provider, allow_403=False)


@pytest.mark.request
@pytest.mark.parametrize("provider_name", xyz.OpenWeatherMap)
def test_openweathermap(provider_name):
    try:
        token = os.environ["OPENWEATHERMAP"]
    except KeyError:
        pytest.xfail("Missing API token.")
    if token == "":
        pytest.xfail("Token empty.")

    provider = xyz.OpenWeatherMap[provider_name](apiKey=token)
    get_test_result(provider, allow_403=False)


@pytest.mark.request
@pytest.mark.parametrize("provider_name", xyz.HEREv3)
def test_herev3(provider_name):
    try:
        token = os.environ["HEREV3"]
    except KeyError:
        pytest.xfail("Missing API token.")
    if token == "":
        pytest.xfail("Token empty.")

    provider = xyz.HEREv3[provider_name](apiKey=token)
    get_test_result(provider, allow_403=False)


@pytest.mark.request
@pytest.mark.parametrize("provider_name", xyz.Stadia)
def test_stadia(provider_name):
    try:
        token = os.environ["STADIA"]
    except KeyError:
        pytest.xfail("Missing API token.")
    if token == "":
        pytest.xfail("Token empty.")

    provider = xyz.Stadia[provider_name](api_key=token)
    provider["url"] = provider["url"] + "?api_key={api_key}"
    get_test_result(provider, allow_403=False)


@pytest.mark.request
@pytest.mark.parametrize("provider_name", xyz.OrdnanceSurvey)
def test_os(provider_name):
    try:
        token = os.environ["ORDNANCESURVEY"]
    except KeyError:
        pytest.xfail("Missing API token.")
    if token == "":
        pytest.xfail("Token empty.")

    provider = xyz.OrdnanceSurvey[provider_name](key=token)
    get_test_result(provider, allow_403=False)


# NOTE: AzureMaps are not tested as their free account is limited to
# 5000 downloads (total, not per month)
