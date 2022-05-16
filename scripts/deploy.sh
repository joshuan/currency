#!/usr/bin/env bash

. ../.env

aws s3 \
  --endpoint-url=https://storage.yandexcloud.net \
  sync \
  ./dist/ \
  s3://currency.joshuan.ru/ \
  --exclude '*LICENSE*' \
  --exclude 'data.json'
