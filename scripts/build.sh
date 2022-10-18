#!/usr/bin/env bash

set -e

npx --no-install webpack --config configs/webpack/prod.config.js
