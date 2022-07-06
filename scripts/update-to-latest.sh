#!/bin/bash

# This script rolls new protocol files into https://github.com/ChromeDevTools/devtools-protocol
# This script is intended to be run on a regular schedule, e.g. via cron.

set -euxo pipefail

pwd="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
protocol_repo_path="$pwd/../"

# => cd into protocol repo
cd "$protocol_repo_path" || exit 1
git pull origin master
git submodule update --init
# always work with the latest inspector_protocol repo
git submodule foreach git pull origin main

python_bin="python3"

# get latest commit hash + cr revision number
chromium_git_log_url="https://chromium.googlesource.com/chromium/src.git/+log/refs/heads/main?format=JSON"
curl --silent "${chromium_git_log_url}" | tail -n +2 > tmp.json
commit_sha=$(cat tmp.json | \
  "$python_bin" -c 'import json,sys;print(json.load(sys.stdin)["log"][0]["commit"])')
commit_rev=$(cat tmp.json | \
  "$python_bin" -c 'import json,sys;print(json.load(sys.stdin)["log"][0]["message"])' | \
  grep -E -o "^Cr-Commit-Position.*" | grep -E -o "\d+")
rm tmp.json

chromium_deps_url="https://chromium.googlesource.com/chromium/src.git/+/${commit_sha}/DEPS?format=TEXT"
v8_revision=$(curl --silent "${chromium_deps_url}" | base64 --decode | grep "'v8_revision':" | cut -d "'" -f4)
browser_protocol_url="https://chromium.googlesource.com/chromium/src.git/+/${commit_sha}/third_party/blink/public/devtools_protocol/browser_protocol.pdl?format=TEXT"
js_protocol_url="https://chromium.googlesource.com/v8/v8.git/+/${v8_revision}/include/js_protocol.pdl?format=TEXT"

curl --silent "${browser_protocol_url}" | base64 --decode > pdl/browser_protocol.pdl
curl --silent "${js_protocol_url}" | base64 --decode > pdl/js_protocol.pdl

# generate json from pdl
convert_script="$protocol_repo_path/scripts/inspector_protocol/convert_protocol_to_json.py"
"$python_bin" "$convert_script" --map_binary_to_string=true "$protocol_repo_path/pdl/browser_protocol.pdl" "$protocol_repo_path/json/browser_protocol.json"
"$python_bin" "$convert_script" --map_binary_to_string=true "$protocol_repo_path/pdl/js_protocol.pdl" "$protocol_repo_path/json/js_protocol.json"
# The conversion script leaves json files next to the PDLs. Because reasons.
rm -f -- "$protocol_repo_path"/pdl/*.json

# => cd into protocol repo
cd "$protocol_repo_path" || exit 1

git --no-pager diff

# commit, push and publish, but only if there's a diff. ;)
if ! git diff --no-ext-diff --quiet --exit-code; then
	# dirty repo, ready to commit.

	# commit so we can use the new commit in the changelog
	git commit --author="DevTools Bot <24444246+devtools-bot@users.noreply.github.com>" --all -m "Roll protocol to r$commit_rev"

	# generate changelog
	cd "$protocol_repo_path/scripts" || exit 1
	$HOME/bin/yarn install --non-interactive
	$HOME/bin/yarn run build-protocol-dts
	$HOME/bin/yarn run changelog

	# publish to npm
	. $protocol_repo_path/scripts/publish-to-npm.sh "$commit_rev"

	# amend previous commit
	git commit --amend --author="DevTools Bot <24444246+devtools-bot@users.noreply.github.com>" --all -m "Roll protocol to r$commit_rev"
	# push to devtools-protocol repo
	git pull && git push
fi
