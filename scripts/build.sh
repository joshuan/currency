#!/usr/bin/env bash

set +e

npx --no-install webpack --mode production --config configs/webpack/webpack.config.js
