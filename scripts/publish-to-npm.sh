#!/bin/bash

# This script publishes this repo to NPM

# It must be called with the Chromium commit rev as an argument
#     sh scripts/publish-to-npm.sh 485940

set -x

commit_rev=$1

# verify we have a real number
re='^[0-9]+$'
if ! [[ $commit_rev =~ $re ]] ; then
   echo "error: Not a number" >&2; exit 1
fi

# bump and publish
if npm version --no-git-tag-version "0.0.$commit_rev"
then npm publish
fi

