#!/bin/bash
set -eu
IS_RELEASE="$([[ "${GITHUB_REF:-}" == refs/tags/* ]] && echo 1 || true)"

die () { echo "ERROR: $*" >&2; exit 2; }

for cmd in pdoc3    \
           jupytext \
           jupyter-nbconvert; do
    command -v "$cmd" >/dev/null ||
        die "Missing $cmd; \`pip install backtesting[doc]\`"
done

DOCROOT="$(dirname "$(readlink -f "$0")")"
BUILDROOT="$DOCROOT/build"


echo
echo 'Building API reference docs'
echo
mkdir -p "$BUILDROOT"
rm -r "$BUILDROOT" 2>/dev/null || true
pushd "$DOCROOT/.." >/dev/null
pdoc3 --html \
     ${IS_RELEASE+--template-dir "$DOCROOT/pdoc_template"} \
     --output-dir "$BUILDROOT" \
     backtesting
popd >/dev/null


echo
echo 'Ensuring example notebooks match their py counterparts'
echo
strip_yaml () { awk -f "$DOCROOT/scripts/strip_yaml.awk" "$@"; }
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
  cp -f "$DOCROOT/scripts/ipython_config.py" ~/.ipython/profile_default/startup/99-backtesting-docs.py
  trap 'rm -f ~/.ipython/profile_default/startup/99-backtesting-docs.py' EXIT; }
PYTHONWARNINGS='ignore::UserWarning,ignore::RuntimeWarning' \
    time jupyter-nbconvert --execute --to=html \
        --ExecutePreprocessor.timeout=300 \
        --output-dir="$BUILDROOT/examples" "$DOCROOT/examples"/*.ipynb


if [ "$IS_RELEASE" ]; then
    echo -e '\nAdding GAnalytics code\n'

    ANALYTICS="<script async src='https://www.googletagmanager.com/gtag/js?id=G-C4YF12M4PY'></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-C4YF12M4PY');</script>"
    find "$BUILDROOT" -name '*.html' -print0 |
        xargs -0 -- sed -i "s#</head>#$ANALYTICS</head>#i"
    ANALYTICS='<script data-ad-client="ca-pub-2900001379782823" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'
    find "$BUILDROOT" -name '*.html' -print0 |
        xargs -0 -- sed -i "s#</head>#$ANALYTICS</head>#i"
fi


echo
echo 'Testing for broken links'
echo
problematic_urls='
https://www.gnu.org/licenses/agpl-3.0.html
'
pushd "$BUILDROOT" >/dev/null
WEBSITE='https://kernc\.github\.io/backtesting\.py'
grep -PR '<a .*?href=' |
    sed -E "s/:.*?<a .*?href=([\"'])(.*?)/\t\2/g" |
    tr "\"'" '#' |
    cut -d'#' -f1 |
    sort -u -t$'\t' -k 2 |
    sort -u |
    tee >(cat 1>&2) |
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
            target_file="$(python -c '
import html, sys                  # fixes &amp;
from urllib.parse import unquote  # fixes %20
print(html.unescape(unquote(sys.argv[-1])))' "$url")"
            if [ -f "$target_file" ]; then continue; fi

            url="${url// /%20}"
            echo "$url"
            curl --silent --fail --retry 2 --retry-delay 2 --connect-timeout 10 \
                    --user-agent 'Mozilla/5.0 Firefox 128' "$url" >/dev/null 2>&1 ||
                grep -qF "$url" <(echo "$problematic_urls") ||
                die "broken link in $file:  $url"
        done
    done
popd >/dev/null


echo
echo "All good. Docs in: $BUILDROOT"
echo
echo "    file://$BUILDROOT/backtesting/index.html"
echo
