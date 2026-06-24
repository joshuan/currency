#!/usr/bin/env bash

set -e

if [ -f ./.env ]; then
    set -a
    source ./.env
    set +a
fi

if [ -z "${YC_UPDATE_FUNC_ID}" ]; then
    echo "Error: YC_UPDATE_FUNC_ID is not set in .env"
    exit 1
fi

echo "Packing function..."
zip -j function.zip scripts/data-update.sh

echo "Deploying function version..."
yc serverless function version create \
  --function-id="${YC_UPDATE_FUNC_ID}" \
  --runtime="bash-2204" \
  --entrypoint="data-update.sh" \
  --memory="128m" \
  --execution-timeout="30s" \
  --environment AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}",AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}",API_LAYER_TOKEN="${API_LAYER_TOKEN}" \
  --source-path="./function.zip"

rm -f function.zip

echo "Function updated successfully!"
