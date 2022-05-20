DATE="$(date '+%Y-%m-%d')"

curl -H "apikey: st0Vz383WZXw4BJwVkH0fh4M4IbZZLms" \
 "https://api.apilayer.com/fixer/latest?symbols=&base=USD" | aws s3 cp \
  --endpoint-url=https://storage.yandexcloud.net \
  - s3://currency.joshuan.ru/data.json

aws s3 cp \
 --endpoint-url=https://storage.yandexcloud.net \
 s3://currency.joshuan.ru/data.json s3://currency.joshuan.ru/history/$DATE.json

echo "Uploaded https://currency.joshuan.ru/history/${DATE}.json"