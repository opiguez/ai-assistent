
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./

# УСТАНАВЛИВАЕМ ПРОДАКШН ЗАВИСИМОСТИ (Создаем чистую node_modules)
# Флаг --only=production гарантирует, что установятся только рабочие пакеты
RUN npm ci --only=production

# Копируем наш скомпилированный код из предыдущего этапа
COPY --from=builder /app/dist ./dist

EXPOSE 3000-3010

CMD ["node", "dist/app.js"]