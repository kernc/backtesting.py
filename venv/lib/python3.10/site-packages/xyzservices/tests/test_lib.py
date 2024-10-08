from urllib.error import URLError

import pytest

import xyzservices.providers as xyz
from xyzservices import Bunch, TileProvider


@pytest.fixture
def basic_provider():
    return TileProvider(
        url="https://myserver.com/tiles/{z}/{x}/{y}.png",
        attribution="(C) xyzservices",
        name="my_public_provider",
    )


@pytest.fixture
def retina_provider():
    return TileProvider(
        url="https://myserver.com/tiles/{z}/{x}/{y}{r}.png",
        attribution="(C) xyzservices",
        name="my_public_provider2",
        r="@2x",
    )


@pytest.fixture
def silent_retina_provider():
    return TileProvider(
        url="https://myserver.com/tiles/{z}/{x}/{y}{r}.png",
        attribution="(C) xyzservices",
        name="my_public_retina_provider3",
    )


@pytest.fixture
def private_provider():
    return TileProvider(
        url="https://myserver.com/tiles/{z}/{x}/{y}?access_token={accessToken}",
        attribution="(C) xyzservices",
        accessToken="<insert your access token here>",
        name="my_private_provider",
    )


@pytest.fixture
def html_attr_provider():
    return TileProvider(
        url="https://myserver.com/tiles/{z}/{x}/{y}.png",
        attribution="(C) xyzservices",
        html_attribution='&copy; <a href="https://xyzservices.readthedocs.io">xyzservices</a>',  # noqa
        name="my_public_provider_html",
    )


@pytest.fixture
def subdomain_provider():
    return TileProvider(
        url="https://{s}.myserver.com/tiles/{z}/{x}/{y}.png",
        attribution="(C) xyzservices",
        subdomains="abcd",
        name="my_subdomain_provider",
    )


@pytest.fixture
def test_bunch(
    basic_provider,
    retina_provider,
    silent_retina_provider,
    private_provider,
    html_attr_provider,
    subdomain_provider,
):
    return Bunch(
        basic_provider=basic_provider,
        retina_provider=retina_provider,
        silent_retina_provider=silent_retina_provider,
        private_provider=private_provider,
        bunched=Bunch(
            html_attr_provider=html_attr_provider, subdomain_provider=subdomain_provider
        ),
    )


def test_expect_name_url_attribution():
    msg = (
        "The attributes `name`, `url`, and `attribution` are "
        "required to initialise a `TileProvider`. Please provide "
        "values for: "
    )
    with pytest.raises(AttributeError, match=msg + "`name`, `url`, `attribution`"):
        TileProvider({})
    with pytest.raises(AttributeError, match=msg + "`url`, `attribution`"):
        TileProvider({"name": "myname"})
    with pytest.raises(AttributeError, match=msg + "`attribution`"):
        TileProvider({"url": "my_url", "name": "my_name"})
    with pytest.raises(AttributeError, match=msg + "`attribution`"):
        TileProvider(url="my_url", name="my_name")


def test_build_url(
    basic_provider,
    retina_provider,
    silent_retina_provider,
    private_provider,
    subdomain_provider,
):
    expected = "https://myserver.com/tiles/{z}/{x}/{y}.png"
    assert basic_provider.build_url() == expected

    expected = "https://myserver.com/tiles/3/1/2.png"
    assert basic_provider.build_url(1, 2, 3) == expected
    assert basic_provider.build_url(1, 2, 3, scale_factor="@2x") == expected
    assert silent_retina_provider.build_url(1, 2, 3) == expected

    expected = "https://myserver.com/tiles/3/1/2@2x.png"
    assert retina_provider.build_url(1, 2, 3) == expected
    assert silent_retina_provider.build_url(1, 2, 3, scale_factor="@2x") == expected

    expected = "https://myserver.com/tiles/3/1/2@5x.png"
    assert retina_provider.build_url(1, 2, 3, scale_factor="@5x") == expected

    expected = "https://myserver.com/tiles/{z}/{x}/{y}?access_token=my_token"
    assert private_provider.build_url(accessToken="my_token") == expected

    with pytest.raises(ValueError, match="Token is required for this provider"):
        private_provider.build_url()

    expected = "https://{s}.myserver.com/tiles/{z}/{x}/{y}.png"
    assert subdomain_provider.build_url(fill_subdomain=False)

    expected = "https://a.myserver.com/tiles/{z}/{x}/{y}.png"
    assert subdomain_provider.build_url()


def test_requires_token(private_provider, basic_provider):
    assert private_provider.requires_token() is True
    assert basic_provider.requires_token() is False


def test_html_repr(basic_provider, retina_provider):
    provider_strings = [
        '<div class="xyz-wrap">',
        '<div class="xyz-header">',
        '<div class="xyz-obj">xyzservices.TileProvider</div>',
        '<div class="xyz-name">my_public_provider</div>',
        '<div class="xyz-details">',
        '<dl class="xyz-attrs">',
        "<dt><span>url</span></dt><dd>https://myserver.com/tiles/{z}/{x}/{y}.png</dd>",
        "<dt><span>attribution</span></dt><dd>(C) xyzservices</dd>",
    ]

    for html_string in provider_strings:
        assert html_string in basic_provider._repr_html_()

    bunch = Bunch({"first": basic_provider, "second": retina_provider})

    bunch_strings = [
        '<div class="xyz-obj">xyzservices.Bunch</div>',
        '<div class="xyz-name">2 items</div>',
        '<ul class="xyz-collapsible">',
        '<li class="xyz-child">',
        "<span>xyzservices.TileProvider</span>",
        '<div class="xyz-inside">',
    ]

    bunch_repr = bunch._repr_html_()
    for html_string in provider_strings + bunch_strings:
        assert html_string in bunch_repr
    assert bunch_repr.count('<li class="xyz-child">') == 2
    assert bunch_repr.count('<div class="xyz-wrap">') == 3
    assert bunch_repr.count('<div class="xyz-header">') == 3


def test_copy(basic_provider):
    basic2 = basic_provider.copy()
    assert isinstance(basic2, TileProvider)


def test_callable():
    # only testing the callable functionality to override a keyword, as we
    # cannot test the actual providers that need an API key
    original_key = str(xyz.OpenWeatherMap.CloudsClassic["apiKey"])
    updated_provider = xyz.OpenWeatherMap.CloudsClassic(apiKey="mykey")
    assert isinstance(updated_provider, TileProvider)
    assert "url" in updated_provider
    assert updated_provider["apiKey"] == "mykey"
    # check that original provider dict is not modified
    assert xyz.OpenWeatherMap.CloudsClassic["apiKey"] == original_key


def test_html_attribution_fallback(basic_provider, html_attr_provider):
    # TileProvider.html_attribution falls back to .attribution if the former not present
    assert basic_provider.html_attribution == basic_provider.attribution
    assert (
        html_attr_provider.html_attribution
        == '&copy; <a href="https://xyzservices.readthedocs.io">xyzservices</a>'
    )


@pytest.mark.xfail(reason="timeout error", raises=URLError)
def test_from_qms():
    provider = TileProvider.from_qms("OpenStreetMap Standard aka Mapnik")
    assert isinstance(provider, TileProvider)


@pytest.mark.xfail(reason="timeout error", raises=URLError)
def test_from_qms_not_found_error():
    with pytest.raises(ValueError):
        TileProvider.from_qms("LolWut")


def test_flatten(
    basic_provider, retina_provider, silent_retina_provider, private_provider
):
    nested_bunch = Bunch(
        first_bunch=Bunch(first=basic_provider, second=retina_provider),
        second_bunch=Bunch(first=silent_retina_provider, second=private_provider),
    )

    assert len(nested_bunch) == 2
    assert len(nested_bunch.flatten()) == 4


def test_filter(test_bunch):
    assert len(test_bunch.filter(keyword="private").flatten()) == 1
    assert len(test_bunch.filter(keyword="public").flatten()) == 4
    assert len(test_bunch.filter(keyword="{s}").flatten()) == 1
    assert len(test_bunch.filter(name="retina").flatten()) == 1
    assert len(test_bunch.filter(requires_token=True).flatten()) == 1
    assert len(test_bunch.filter(requires_token=False).flatten()) == 5
    assert len(test_bunch.filter(requires_token=False)) == 4  # check nested structure
    assert len(test_bunch.filter(keyword="{s}", requires_token=False).flatten()) == 1
    assert len(test_bunch.filter(name="nonsense").flatten()) == 0

    def custom(provider):
        if hasattr(provider, "subdomains") and provider.subdomains == "abcd":
            return True
        return bool(hasattr(provider, "r"))

    assert len(test_bunch.filter(function=custom).flatten()) == 2


def test_query_name():
    options = [
        "CartoDB Positron",
        "cartodbpositron",
        "cartodb-positron",
        "carto db/positron",
        "CARTO_DB_POSITRON",
        "CartoDB.Positron",
        "Carto,db,positron",
    ]

    for option in options:
        queried = xyz.query_name(option)
        assert isinstance(queried, TileProvider)
        assert queried.name == "CartoDB.Positron"

    with pytest.raises(ValueError, match="No matching provider found"):
        xyz.query_name("i don't exist")

    # Name with underscore GH124
    option_with_underscore = "NASAGIBS.ASTER_GDEM_Greyscale_Shaded_Relief"
    queried = xyz.query_name(option_with_underscore)
    assert isinstance(queried, TileProvider)
    assert queried.name == option_with_underscore
