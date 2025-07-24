#!/bin/sh
# entrypoint.sh

echo "Запуск контейнера..."

/wait-for-it.sh backend:8000 --timeout=60 --strict -- echo "Бекенд доступний. Продовжуємо запуск."

if [ $? -ne 0 ]; then
  echo "❌ Бекенд не запустився за 60 секунд. Зупинка."
  exit 1
fi


echo "Отримання токена доступу..."
AUTH_TOKEN=$(node /app/generateToken.js)

if [ -z "$AUTH_TOKEN" ]; then
  echo "Критична помилка: не вдалося отримати токен. Перевірте логіку generateToken.js та змінні оточення."
  exit 1
fi
echo "Токен успішно отримано."

echo "Створення конфігурації для React..."
echo "window.API_URL = \"${API_URL}\";" > /usr/share/nginx/html/env-config.js
echo "window.AUTH_TOKEN = \"${AUTH_TOKEN}\";" >> /usr/share/nginx/html/env-config.js

sed -i '/<head>/a <script src="/env-config.js"></script>' /usr/share/nginx/html/index.html
echo "Конфігурацію впроваджено в index.html."

echo "Запуск веб-сервера Nginx..."
nginx -g 'daemon off;'