#!/bin/sh
echo "DEBUG: API_URL = $API_URL"

set -e

echo "Запуск контейнера..."

AUTH_TOKEN=""
while [ -z "$AUTH_TOKEN" ]; do
  echo "Спроба отримати токен авторизації..."

  AUTH_TOKEN=$(node /app/generateToken.js 2>/dev/null || true)
  
  if [ -z "$AUTH_TOKEN" ]; then
    echo "Бекенд ще не готовий або помилка авторизації. Повторна спроба через 5 секунд..."
    sleep 5
  fi
done

echo "Токен успішно отримано!"

echo "Створення конфігурації для React..."

echo "window.API_URL = \"${API_URL}\";" > /usr/share/nginx/html/env-config.js

echo "window.AUTH_TOKEN = \"${AUTH_TOKEN}\";" >> /usr/share/nginx/html/env-config.js


sed -i 's|</head>|<script src="/env-config.js"></script>\n</head>|' /usr/share/nginx/html/index.html
echo "Конфігурацію впроваджено в index.html."

echo "Запуск веб-сервера Nginx..."
exec nginx -g 'daemon off;'