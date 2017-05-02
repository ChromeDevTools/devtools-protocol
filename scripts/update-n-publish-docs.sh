#!/bin/bash

# This script updates and publishes the protocol API documentation
# This script is intended to be run on a regular schedule, e.g. via cron.

set -x

# These locations are very machine specific.
protocol_repo_path="$HOME/code/pristine/devtools-protocol"
viewer_repo_path="$HOME/code/pristine/debugger-protocol-viewer-pristine"
local_script_path="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "$viewer_repo_path"
git remote add dtprotocol git@github.com:ChromeDevTools/devtools-protocol.git

git checkout master
git pull origin master
# first, publish any changes we got from the source repo over to gh-pages
git push dtprotocol master:gh-pages

# generate latest docs on updated protocol
./generate-docs.sh

git add _domains/*
git commit --author="DevTools Bot <paulirish+bot@google.com>" -am "bump protocol"
#    git config user.name "devtools-bot"
#    git config user.email "paulirish+bot@google.com"

# push changes back to source repo
git pull origin master && git push origin master

# publish to https://chromedevtools.github.io/devtools-protocol/
git pull origin master && git push dtprotocol master:gh-pages
