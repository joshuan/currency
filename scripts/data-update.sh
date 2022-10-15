#!/usr/bin/env bash

. ./.env

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
