# EcoCourier — серверная часть интернет‑магазина

[English version](./README.en.md)

## 📦 Обзор
Легковесный REST API на Express + Sequelize + MySQL с TypeScript, валидацией входящих данных и загрузкой файлов.

## 📦 Стек
- **TypeScript**
- **Express 5**
- **Sequelize 6** (+ mysql2)
- **JWT** (session/refresh)
- **express-validator**, **multer**, **helmet**, **cors**, **cookie-parser**

## ✨ Возможности
- **Аутентификация/авторизация** (JWT, роли)
- **CRUD-пользователей** (валидация `express-validator`)
- **Категории**: создание с загрузкой изображения (`multer.single('image')`)
- **Безопасность**: `helmet`, `cors`, cookies

## ✅ Требования
- [Node.js](https://nodejs.org/) (рекомендуется LTS)
- [MySQL](https://dev.mysql.com/downloads/installer/) (порт по умолчанию 3306)
- (Опционально) [MySQL Workbench](https://www.mysql.com/products/workbench/)

## ⚙️ Переменные окружения (.env)
Создайте в корне файл `.env` и заполните:

```dotenv
PORT=3000                   # Порт сервера
API_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password

SALT=13                     # Положительное число для bcrypt
SECRET_KEY_SESSION=your_long_session_secret
SECRET_KEY_REFRESH=your_long_refresh_secret
```

## 🛠 Установка и запуск (Dev)
```bash
npm install
npm run dev
```
Остановить сервер: `Ctrl + C`.

## 🏗 Сборка и запуск (Prod)
```bash
npm run build   # компиляция TS в ./dist (генерируются .d.ts)
npm start       # запуск dist/main.js с поддержкой алиасов через tsconfig-paths/register
```

## 🖼 Загрузка файлов
- Для загрузки изображений используется `multer` (см. `src/config/multer.ts`).
- Эндпоинт создания категории ожидает один файл в поле формы: `image` (`upload.single('image')`).
- Файлы сохраняются в директорию `uploads/` — убедитесь, что папка существует и у процесса есть права записи.

## 🗂 Структура проекта (кратко)
```
src/
  config/
    server.ts                # PORT, API_URL, JWT_INFO, CORS, ENDPOINTS
    multer.ts                # Настройки загрузки файла
    validations/
      user.ts                # Схемы валидаций пользователя
      categories.ts          # Схема валидации создания категории
      products.ts
  controllers/
    user/                    # Контроллеры пользователя
    categories/              # Контроллеры категорий
    products/                # Контроллеры продуктов
  models/                    # Sequelize-модели (User, Categories, ...)
  routes/                    # Роутеры (user, categories, ...) + Router.ts
  utils/                     # ApiErrors и пр.
main.ts                      # Точка входа
```