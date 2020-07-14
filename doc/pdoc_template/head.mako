<%!
    from pdoc.html_helpers import minify_css
%>
<%def name="homelink()" filter="minify_css">
    .homelink {
        display: block;
        font-size: 2em;
        font-weight: bold;
        color: #555;
        text-align: center;
        padding: .5em 0;
    }
    .homelink:hover {
        color: inherit;
    }
    .homelink img {
        display: block;
        max-width:40%;
        max-height: 5em;
        margin: auto;
        margin-bottom: .3em;
    }
</%def>

<style>${homelink()}</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css">
<link rel="canonical" href="https://kernc.github.io/backtesting.py/doc/${module.url()[:-len('index.html')] if module.is_package else module.url()}">
<link rel="icon" href="https://kernc.github.io/backtesting.py/logo.png">
