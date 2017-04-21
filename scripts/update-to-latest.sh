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


browser_protocol_path="$chromium_src_path/third_party/WebKit/Source/core/inspector/browser_protocol.json"
js_protocol_path="$chromium_src_path/v8/src/inspector/js_protocol.json"

# copy the two protocol.json files over.
cp "$js_protocol_path" "$protocol_repo_path/json"
cp "$browser_protocol_path" "$protocol_repo_path/json"

# extract cr revision number
commit_pos_line=$(git log --no-color --max-count=1 | gtac | grep -E -o "Cr-Commit-Position.*")
commit_rev=$(echo "$commit_pos_line" | grep -E -o "\d+")

# generate externs
python "$chromium_src_path/third_party/WebKit/Source/devtools/scripts/build/generate_protocol_externs.py" -o "$protocol_repo_path/externs/protocol_externs.js" "$browser_protocol_path" "$js_protocol_path"

# => cd into protocol repo
cd "$protocol_repo_path" || exit 1

# commit and push
git commit --author="DevTools Bot <paulirish+bot@google.com>" --all -m "Roll protocol to r$commit_rev"
git pull && git push
