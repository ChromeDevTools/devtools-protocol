#!/bin/bash

# This script rolls new protocol files into https://github.com/ChromeDevTools/devtools-protocol
# This script is intended to be run on a regular schedule, e.g. via cron.

set -euxo pipefail

pwd="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
protocol_repo_path="$pwd/.."

# => cd into protocol repo
cd "$protocol_repo_path" || exit 1
git pull origin master
git submodule update --init
# always work with the latest inspector_protocol repo
git submodule foreach git pull origin main

# get latest commit hash + cr revision number
chromium_git_log_url="https://chromium.googlesource.com/chromium/src.git/+log/refs/heads/main?format=JSON"
curl --silent "${chromium_git_log_url}" | tail -n +2 > tmp.json
commit_sha=$(python3 -c 'import json;print(json.load(open("tmp.json"))["log"][0]["commit"])')
commit_rev=$(python3 -c 'import json;print(json.load(open("tmp.json"))["log"][0]["message"])' | \
  grep -E -o "^Cr-Commit-Position.*" | grep -E -o "[0-9]+")
rm tmp.json

# Fetch PDL files via sparse checkout
mkdir -p tmp
cd tmp

# Chromium PDLs
if [ ! -d chromium ]; then
  git init chromium
  cd chromium
  git remote add origin https://chromium.googlesource.com/chromium/src.git
  git config core.sparseCheckout true
  echo "/third_party/blink/public/devtools_protocol/" >> .git/info/sparse-checkout
  echo "/DEPS" >> .git/info/sparse-checkout
else
  cd chromium
fi
git fetch --depth 1 origin "$commit_sha"
git checkout FETCH_HEAD
cd ..

v8_revision=$(grep "'v8_revision':" chromium/DEPS | cut -d "'" -f4)

# V8 PDL
if [ ! -d v8 ]; then
  git init v8
  cd v8
  git remote add origin https://chromium.googlesource.com/v8/v8.git
  git config core.sparseCheckout true
  echo "include/js_protocol.pdl" >> .git/info/sparse-checkout
else
  cd v8
fi
git fetch --depth 1 origin "$v8_revision"
git checkout FETCH_HEAD
cd ../..

# Copy files
cp tmp/chromium/third_party/blink/public/devtools_protocol/browser_protocol.pdl pdl/
if [ -d tmp/chromium/third_party/blink/public/devtools_protocol/domains ]; then
  mkdir -p pdl/domains
  cp tmp/chromium/third_party/blink/public/devtools_protocol/domains/*.pdl pdl/domains/
fi
cp tmp/v8/include/js_protocol.pdl pdl/

# generate json from pdl
convert_script="$protocol_repo_path/scripts/inspector_protocol/convert_protocol_to_json.py"
python3 "$convert_script" --map_binary_to_string=true "$protocol_repo_path/pdl/browser_protocol.pdl" "$protocol_repo_path/json/browser_protocol.json"
python3 "$convert_script" --map_binary_to_string=true "$protocol_repo_path/pdl/js_protocol.pdl" "$protocol_repo_path/json/js_protocol.json"
# The conversion script leaves json files next to the PDLs. Because reasons.
rm -f -- "$protocol_repo_path"/pdl/*.json

# => cd into protocol repo
cd "$protocol_repo_path" || exit 1

git --no-pager diff

# commit, push and publish, but only if there's a diff. ;)
if ! git diff --no-ext-diff --quiet --exit-code; then
	# dirty repo, ready to commit.

	git config user.name 'DevTools Bot'
	git config user.email '24444246+devtools-bot@users.noreply.github.com'

	# if new Domain is added include it in the tracked files
	git add *.pdl
	# commit so we can use the new commit in the changelog
	git commit --all -m "Roll protocol to r$commit_rev"

	# generate changelog
	cd "$protocol_repo_path/scripts" || exit 1
	npm install
	npm run build-protocol-dts
	npm run changelog

	# bump npm version
	cd "$protocol_repo_path"
	npm version --no-git-tag-version "0.0.$commit_rev"

	# amend previous commit
	git commit --amend --all -m "Roll protocol to r$commit_rev"

	# tag this version
	git tag "v0.0.$commit_rev"

	# push to devtools-protocol repo
	git push && git push --tags
fi
