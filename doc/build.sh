#!/bin/bash
set -eu
IS_RELEASE=${TRAVIS_TAG+1}

die () { echo "ERROR: $*" >&2; exit 2; }

for cmd in pdoc     \
           jupytext ; do
    command -v "$cmd" >/dev/null ||
        die "Missing $cmd; \`pip install $cmd\`"
done
command -v "jupyter-nbconvert" >/dev/null ||
    die "Missing jupyter-nbconvert; \`pip install nbconvert\`"

DOCROOT="$(dirname "$(readlink -f "$0")")"
BUILDROOT="$DOCROOT/build"


echo
echo 'Building API reference docs'
echo
mkdir -p "$BUILDROOT"
rm -r "$BUILDROOT" 2>/dev/null || true
pushd "$DOCROOT/.." >/dev/null
pdoc --html --html-no-source \
     ${IS_RELEASE+--template-dir "$DOCROOT/pdoc_template"} \
     --html-dir "$BUILDROOT" \
     backtesting
popd >/dev/null


echo
echo 'Ensuring example notebooks match their py counterparts'
echo
strip_yaml () { awk -f "$DOCROOT/strip_yaml.awk" "$@"; }
for ipynb in "$DOCROOT"/examples/*.ipynb; do
    echo "Checking: '$ipynb'"
    diff <(strip_yaml "${ipynb%.ipynb}.py") <(jupytext --to py --output - "$ipynb" | strip_yaml) ||
        die "Notebook and its matching .py file differ. Maybe run: \`jupytext --to py '$ipynb'\` ?"
done


echo
echo 'Converting example notebooks → py → HTML'
echo
jupytext --test --update --to ipynb "$DOCROOT/examples"/*.py
{ mkdir -p ~/.ipython/profile_default/startup
  cp -f "$DOCROOT/ipython_config.py" ~/.ipython/profile_default/startup/99-backtesting-docs.py
  trap 'rm -f ~/.ipython/profile_default/startup/99-backtesting-docs.py' EXIT; }
PYTHONWARNINGS='ignore::UserWarning' \
    jupyter-nbconvert --execute --to=html \
        --ExecutePreprocessor.timeout=300 \
        --output-dir="$BUILDROOT/examples" "$DOCROOT/examples"/*.ipynb


if [ "$IS_RELEASE" ]; then
    echo -e '\nAdding GAnalytics code\n'

    ANALYTICS="<script>window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;ga('create','UA-43663477-4','auto');ga('send','pageview');</script><script async src='https://www.google-analytics.com/analytics.js'></script>"
    find "$BUILDROOT" -name '*.html' -print0 |
        xargs -0 -- sed -i "s#</body>#$ANALYTICS</body>#i"
fi


echo
echo 'Testing for broken links'
echo
pushd "$BUILDROOT" >/dev/null
WEBSITE='https://kernc\.github\.io/backtesting\.py'
grep -PR '<a .*?href=' |
    sed -E "s/:.*?<a .*?href=([\"'])(.*?)/\t\2/g" |
    tr "\"'" '#' |
    cut -d'#' -f1 |
    sort -u -t$'\t' -k 2 |
    sort -u |
    python -c '
import sys
from urllib.parse import urljoin
for line in sys.stdin.readlines():
    base, url = line.split("\t")
    print(base, urljoin(base, url.strip()), sep="\t")
    ' |
    sed "s,$WEBSITE/doc/,," |
    grep -Pv "$WEBSITE"'/?$' |
    grep -v $'\t''$' |
    while read -r line; do
        while IFS=$'\t' read -r file url; do
            [ -f "$url" ] ||
                curl --silent --fail --retry 2 --user-agent 'Mozilla/5.0 Firefox 61' "$url" >/dev/null 2>&1 ||
                die "broken link in $file:  $url"
        done
    done
popd >/dev/null


echo
echo "All good. Docs in: $BUILDROOT"
echo
echo "    file://$BUILDROOT/backtesting/index.html"
echo
