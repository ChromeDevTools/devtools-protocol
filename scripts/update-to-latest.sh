#!/bin/bash

# This script rolls new protocol files into https://github.com/ChromeDevTools/devtools-protocol
# This script is intended to be run on a regular schedule, e.g. via cron.

set -x

# These locations are very machine specific.
chromium_src_path="$HOME/chromium-tot/src"
protocol_repo_path="$HOME/code/pristine/devtools-protocol"

# => cd into chromium
cd "$chromium_src_path" || exit 1

# get latest from chromium master
git fetch origin
git checkout -f origin/master
env GYP_DEFINES=disable_nacl=1 gclient sync --jobs=70 --nohooks


browser_protocol_path="$chromium_src_path/third_party/blink/renderer/core/inspector/browser_protocol.pdl"
js_protocol_path="$chromium_src_path/v8/src/inspector/js_protocol.pdl"

# copy the two protocol.pdl files over.
cp "$js_protocol_path" "$protocol_repo_path/pdl"
cp "$browser_protocol_path" "$protocol_repo_path/pdl"

# extract cr revision number
commit_pos_line=$(git log --date=iso --no-color --max-count=1 | gtac | grep -E -o "Cr-Commit-Position.*")
commit_rev=$(echo "$commit_pos_line" | grep -E -o "\d+")

# generate json from pdl
convert_script="$protocol_repo_path/scripts/inspector_protocol/convert_protocol_to_json.py"
python "$convert_script" "$protocol_repo_path/pdl/browser_protocol.pdl" "$protocol_repo_path/json/browser_protocol.json"
python "$convert_script" "$protocol_repo_path/pdl/js_protocol.pdl" "$protocol_repo_path/json/js_protocol.json"


# generate externs
python "$chromium_src_path/third_party/blink/renderer/devtools/scripts/build/generate_protocol_externs.py" -o "$protocol_repo_path/externs/protocol_externs.js" "$browser_protocol_path" "$js_protocol_path"

# => cd into protocol repo
cd "$protocol_repo_path" || exit 1

git diff

# commit, push and publish, but only if there's a diff. ;)
if ! git diff --no-ext-diff --quiet --ignore-submodules --exit-code; then
	# dirty repo, ready to commit.

	# commit so we can use the new commit in the changelog
	git commit --author="DevTools Bot <paulirish+bot@google.com>" --all -m "Roll protocol to r$commit_rev"

	# generate changelog
	cd "$protocol_repo_path/scripts" || exit 1
	$HOME/bin/yarn install --non-interactive
	$HOME/bin/yarn run build-protocol-dts
	$HOME/bin/yarn run changelog

	# publish to npm
	. $protocol_repo_path/scripts/publish-to-npm.sh "$commit_rev"

	# amend previous commit
	git commit --amend --author="DevTools Bot <paulirish+bot@google.com>" --all -m "Roll protocol to r$commit_rev"
	# push to devtools-protocol repo
	git pull && git push
fi
