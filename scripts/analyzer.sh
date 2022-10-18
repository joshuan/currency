#!/usr/bin/env bash

set -e

webpack --config configs/webpack/prod.config.js --profile --json > stat.json

npx --no-install webpack-bundle-analyzer stat.json
