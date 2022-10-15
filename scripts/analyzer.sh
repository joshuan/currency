#!/usr/bin/env bash

webpack --mode production --profile --json > stat.json

npx webpack-bundle-analyzer stat.json
