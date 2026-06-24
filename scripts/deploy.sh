#!/usr/bin/env bash

set -e

if [ -f ./.env ]; then
    set -a
    source ./.env
    set +a
fi

if [[ -n "$AWS_PROFILE" ]];
then
    export AWS_PROFILE="${AWS_PROFILE}"
fi

aws s3 \
  --endpoint-url=https://storage.yandexcloud.net \
  --region=us-east-1 \
  sync \
  ./dist/prod/ \
  s3://currency.joshuan.ru/ \
  --exclude '*LICENSE*' \
  --exclude '*.map' \
  --exclude 'data.json'
