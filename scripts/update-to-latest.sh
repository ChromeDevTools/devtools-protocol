#!/bin/bash

# This script rolls new protocol files into https://github.com/ChromeDevTools/devtools-protocol
# This script is intended to be run on a regular schedule, e.g. via cron.

set -euxo pipefail

# This location is very *machine specific*
# Ideally we'd only need just the frontend repo and its deps, but we need the cr rev. And its pretty much only avail in the full repo
chromium_src_path="$HOME/chromium-tot/src"


pwd="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
protocol_repo_path="$pwd/../"

# => cd into protocol repo
cd "$protocol_repo_path" || exit 1
git pull origin master
git submodule update --init
# always work with the latest inspector_protocol repo
git submodule foreach git pull origin main

# => cd into chromium
cd "$chromium_src_path" || exit 1

# get latest from chromium main
git fetch origin main
git checkout -f origin/main
gclient sync --nohooks --delete_unversioned_trees --reset --force # no hooks needed.

python_bin="$chromium_src_path/third_party/depot_tools/vpython3"

browser_protocol_path="$chromium_src_path/third_party/blink/public/devtools_protocol/browser_protocol.pdl"
js_protocol_path="$chromium_src_path/v8/include/js_protocol.pdl"

# copy the two protocol.pdl files over.
cp "$js_protocol_path" "$protocol_repo_path/pdl"
cp "$browser_protocol_path" "$protocol_repo_path/pdl"

# extract cr revision number
commit_pos_line=$(git log --date=iso --no-color --max-count=1 | gtac | grep -E -o "Cr-Commit-Position.*" | head -n1)
commit_rev=$(echo "$commit_pos_line" | grep -E -o "\d+")

# generate json from pdl
convert_script="$protocol_repo_path/scripts/inspector_protocol/convert_protocol_to_json.py"
"$python_bin" "$convert_script" --map_binary_to_string=true "$protocol_repo_path/pdl/browser_protocol.pdl" "$protocol_repo_path/json/browser_protocol.json"
"$python_bin" "$convert_script" --map_binary_to_string=true "$protocol_repo_path/pdl/js_protocol.pdl" "$protocol_repo_path/json/js_protocol.json"
# The conversion script leaves json files next to the pdl's. Because reasons.
rm -f "$protocol_repo_path"/pdl/*.json

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
