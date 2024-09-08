# Используем официальный Node.js образ для сборки
FROM node:20.17 as build-stage

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock, если используете Yarn)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Собираем проект Nuxt для production
RUN npm run build

# Используем второй этап для создания меньшего production-образа
FROM node:20.17 as production-stage

# Устанавливаем переменную окружения для production режима
ENV NODE_ENV=production

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта и зависимости из предыдущего этапа
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/.output ./.output

# Открываем порт, на котором будет работать Nuxt
EXPOSE 3000

# Команда для запуска Nuxt в режиме production
CMD ["node", ".output/server/index.mjs"]
