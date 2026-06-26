FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000-3010

# Запускаем в режиме разработки через tsx (команда npm run dev)
CMD ["npm", "run", "dev"]