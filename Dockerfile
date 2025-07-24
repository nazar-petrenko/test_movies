# Dockerfile

# --- Етап 1: Збірка React-додатку ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Етап 2: Фінальний образ з Nginx та Node.js ---
FROM nginx:stable-alpine

RUN apk add --no-cache nodejs npm

WORKDIR /app
COPY generateToken.js ./
RUN npm install axios

# --- НОВІ РЯДКИ ---
# Копіюємо наш скрипт очікування і робимо його виконуваним
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
# --- КІНЕЦЬ НОВИХ РЯДКІВ ---

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]