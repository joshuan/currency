#!/usr/bin/env bash

set -e

echo "Cleaning up temporary and build files..."
rm -rf dist stat.json test-results playwright-report function.zip tests/screenshot-*.png
echo "Cleanup complete."
