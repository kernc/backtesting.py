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
        --output-dir="$BUILDROOT/examples" "$DOCROOT/examples"/*.ipynb


if [ "$IS_RELEASE" ]; then
    echo -e '\nAdding GAnalytics code\n'

    ANALYTICS="<script>window.dataLayer=[['js',new Date()],['config','UA-43663477-4']]</script><script async src='https://www.googletagmanager.com/gtag/js?id=UA-43663477-4'></script>"
    find "$BUILDROOT" -name '*.html' -print0 |
        xargs -0 -- sed -i "s#<head>#<head>$ANALYTICS#i"
fi


echo
echo 'Testing for broken links'
echo
pushd "$BUILDROOT" >/dev/null
tmpdir="$(mktemp -d)"
python3 -m http.server 51296 & sleep 1
trap '{ rm -r "$tmpdir"; kill %1; wait; } >/dev/null 2>&1' EXIT
[ ! "$(jobs -p)" ] && die 'Server not running. See above.'
find -name '*.html' -print0 |
    sed --null-data 's/^/http:\/\/127.0.0.1:51296\//' |
    xargs -0 -- \
        wget --user-agent "Mozilla/5.0 Firefox 61"  -e 'robots=off' --random-wait \
             --no-verbose --recursive --span-hosts --level=1 --tries=2  \
             --directory-prefix "$tmpdir" --no-clobber \
             --reject-regex='\bfonts\b|\.css\b|\bjs\b|\.png\b' |&
        grep -B1 'ERROR 404'
popd >/dev/null


echo
echo "All good. Docs in: $BUILDROOT"
echo
echo "    file://$BUILDROOT/backtesting/index.html"
echo
