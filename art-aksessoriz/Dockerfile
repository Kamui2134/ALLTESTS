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
RUN npm run build && npm run generate

# Используем второй этап для создания меньшего production-образа
FROM nginx:1.21.1-alpine as production-stage

# Удаляем дефолтный nginx.conf
RUN rm -rf /usr/share/nginx/html/*

# Копируем nginx конфигурацию
COPY ./nginx/default.conf /etc/nginx/conf.d

# Копируем статические файлы
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Открываем порт, на котором будет работать nginx
EXPOSE 80

#Включаем nginx
CMD ["nginx", "-g", "daemon off;"]
