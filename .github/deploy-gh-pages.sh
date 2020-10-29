#!/bin/bash
set -eu

set -x

if [ ! -d doc/build ]; then
    echo 'Error: invalid directory. Deploy from repo root.'
    exit 1
fi

[ "$GH_PASSWORD" ] || exit 12

sitemap() {
    WEBSITE='https://kernc.github.io/backtesting.py'
    find -name '*.html' |
        sed "s,^\.,$WEBSITE," |
        sed 's/index.html$//' |
        grep -v '/google.*\.html$' |
        sort -u  > 'sitemap.txt'
    echo "Sitemap: $WEBSITE/sitemap.txt" > 'robots.txt'
}

head=$(git rev-parse HEAD)

git clone -b gh-pages "https://kernc:$GH_PASSWORD@github.com/$GITHUB_REPOSITORY.git" gh-pages
mkdir -p gh-pages/doc
cp -R doc/build/* gh-pages/doc/
cd gh-pages
sitemap
git add *
if git diff --staged --quiet; then
  echo "$0: No changes to commit."
  exit 0
fi
git commit -a -m "CI: Update docs for ${GITHUB_REF#refs/tags/} ($head)"



git push --dry-run
