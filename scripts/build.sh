#!/usr/bin/env bash

set -e

rm -rf dist

npx --no-install webpack --config configs/webpack/ssr.config.js

npx --no-install webpack --config configs/webpack/prod.config.js
