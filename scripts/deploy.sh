#!/usr/bin/env bash

set -e

if [ -f ./.env ]; then
    . ./.env
fi

aws s3 \
  --endpoint-url=https://storage.yandexcloud.net \
  sync \
  ./dist/ \
  s3://currency.joshuan.ru/ \
  --exclude '*LICENSE*' \
  --exclude 'data.json'
