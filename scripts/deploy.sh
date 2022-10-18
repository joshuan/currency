#!/usr/bin/env bash

set -e

if [ -f ./.env ]; then
    source ./.env
fi

AWS_PROFILE="${AWS_PROFILE}" aws s3 \
  --endpoint-url=https://storage.yandexcloud.net \
  sync \
  ./dist/prod/ \
  s3://currency.joshuan.ru/ \
  --exclude '*LICENSE*' \
  --exclude '*.map' \
  --exclude 'data.json'
