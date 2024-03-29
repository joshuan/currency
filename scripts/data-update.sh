#!/usr/bin/env bash

set -e

if [ -f ./.env ]; then
    source ./.env
fi

DATE="$(date '+%Y-%m-%d')"

curl -H "apikey: ${API_LAYER_TOKEN}" \
 "https://api.apilayer.com/fixer/latest?symbols=&base=USD" | aws s3 cp \
  --endpoint-url=https://storage.yandexcloud.net \
  - s3://currency.joshuan.ru/data.json

echo "Uploaded https://currency.joshuan.ru/data.json"

aws s3 cp \
 --endpoint-url=https://storage.yandexcloud.net \
 s3://currency.joshuan.ru/data.json s3://currency.joshuan.ru/history/$DATE.json

echo "Uploaded https://currency.joshuan.ru/history/${DATE}.json"
