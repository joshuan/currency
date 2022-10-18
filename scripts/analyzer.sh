#!/usr/bin/env bash

webpack --config configs/webpack/webpack.config.js --mode production --profile --json > stat.json

npx webpack-bundle-analyzer stat.json
