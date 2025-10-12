# EcoCourier — серверная часть интернет‑магазина

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
  controllers/
    user/                    # Контроллеры пользователя
    categories/              # Контроллеры категорий
  models/                    # Sequelize-модели (User, Categories, ...)
  routes/                    # Роутеры (user, categories, ...) + Router.ts
  utils/                     # ApiErrors и пр.
main.ts                      # Точка входа
```
##  Доступные эндпоинты

Базовый префикс для всех маршрутов: `ENDPOINTS.baseUrl = /api` (см. `src/config/server.ts`).

### Пользователи (`/api/user`)

- **GET `/api/user/`** — Профиль текущего пользователя
  - **Auth**: требуется (`Authorization: Bearer <token>`)
  - **Response 200**: `{ data: { user: { ... } } }`

- **GET `/api/user/refresh`** — Обновить session-токен по refresh
  - **Auth**: не требуется (работает с refresh-cookie)
  - **Response 200**: токены/куки обновлены

- **GET `/api/user/all?page=1&limit=20`** — Список пользователей
  - **Auth**: требуется, только администратор
  - **Query**: `page` int≥1, `limit` int 1..100
  - **Response 200**: `{ data: { users: [...], total } }`

- **POST `/api/user/register`** — Регистрация
  - **Body (JSON)**:
    - `first_name` string [3..128]
    - `phone` string [8..32], формат ru-RU
    - `email` string [6..128], email
    - `password` string [8..32]
  - **Response 201**: `{ data: { user: { ... } } }`

- **POST `/api/user/login`** — Вход
  - **Body (JSON)**: `email`, `password`
  - **Response 200**: `{ data: { user: { ... } } }` (и/или установка токенов/куки)

- **PUT `/api/user/update`** — Обновить свой профиль
  - **Auth**: требуется
  - **Body (JSON)**: `firstName?`, `lastName?`, `email?`, `phone?`
  - **Response 200**: `{ data: { user: { ... } } }`

- **PUT `/api/user/:id/update`** — Обновить пользователя по id
  - **Auth**: требуется, только администратор
  - **Params**: `id` — UUID
  - **Body (JSON)**: `role? ('user'|'admin')`, `firstName?`, `lastName?`, `email?`, `phone?`
  - **Response 200**: `{ data: { user: { ... } } }`

- **DELETE `/api/user/logout`** — Выход
  - **Auth**: требуется
  - **Response 200**: `{ msg: 'ok' }`

### Категории (`/api/categories`)

- **POST `/api/categories/`** — Создать категорию
  - **Auth**: требуется, только администратор
  - **Content-Type**: `multipart/form-data`
  - **Form fields**:
    - `name` string [2..255] — обязательно
    - `description` string (≤10000) — опционально
    - `image` file (jpeg/png/jpg) — опционально (`upload.single('image')`)
  - **Response 201**:
    ```json
    {
      "msg": "category is created: <name>",
      "data": { "category": { "id": "...", "name": "...", "description": "...", "image": "...", "createdAt": "..." } }
    }
    ```
  - **Errors**: `400` (валидация), `401/403` (auth/admin), `409` (уже существует)