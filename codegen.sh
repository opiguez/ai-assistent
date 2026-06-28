#!/bin/bash

#Заменить на локальный
ENDPOINT=""
LOGIN="admin"
PASSWORD="admin"

# 2. Кодируем логин и пароль в формат Base64 для Basic auth
AUTH_STRING=$(echo -n "$LOGIN:$PASSWORD" | base64)

echo "⏳ Подключаемся к РАБИС ($ENDPOINT)..."
echo "🔄 Скачиваем схему и генерируем typed-клиент..."

# 3. Запускаем genql с передачей заголовка Authorization
npx genql --endpoint "$ENDPOINT" \
          --header "Authorization: Basic $AUTH_STRING" \
          --output ./src/generated/client

echo "✅ Клиент успешно обновлен в src/generated/client!"
