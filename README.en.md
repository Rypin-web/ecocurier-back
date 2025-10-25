# EcoCourier — Backend for the Online Store

## 📦 Overview
Lightweight REST API built with Express + Sequelize + MySQL and TypeScript, featuring input validation and file uploads.

## 📦 Stack
- **TypeScript**
- **Express 5**
- **Sequelize 6** (+ mysql2)
- **JWT** (session/refresh)
- **express-validator**, **multer**, **helmet**, **cors**, **cookie-parser**

## ✨ Features
- **Authentication/Authorization** (JWT, roles)
- **Users CRUD** (validated via `express-validator`)
- **Categories**: createCategory with image upload (`multer.single('image')`)
- **Security**: `helmet`, `cors`, cookies

## ✅ Requirements
- [Node.js](https://nodejs.org/) (LTS recommended)
- [MySQL](https://dev.mysql.com/downloads/installer/) (default port 3306)
- (Optional) [MySQL Workbench](https://www.mysql.com/products/workbench/)

## ⚙️ Environment variables (.env)
Create a `.env` file in the project root and fill in:

```dotenv
PORT=3000                   # Server port
API_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password

SALT=13                     # Positive number for bcrypt
SECRET_KEY_SESSION=your_long_session_secret
SECRET_KEY_REFRESH=your_long_refresh_secret
```

## 🛠 Setup & Run (Dev)
```bash
npm install
npm run dev
```
Stop the server: `Ctrl + C`.

## 🏗 Build & Run (Prod)
```bash
npm run build   # compile TS into ./dist (also generates .d.ts)
npm start       # run dist/main.js with path aliases via tsconfig-paths/register
```

## 🖼 File uploads
- Uses `multer` (`src/config/multer.ts`).
- Category creation expects one file under form field `image` (`upload.single('image')`).
- Files are stored under `uploads/` — ensure the folder exists and the process has write permissions.

## 🗂 Project structure (brief)
```
src/
  config/
    server.ts                # PORT, API_URL, JWT_INFO, CORS, ENDPOINTS
    multer.ts                # Multer upload settings
    validations/
      user.ts                # User validation schemas
      categories.ts          # Category creation validation schema
  controllers/
    user/                    # User controllers
    categories/              # Categories controllers
  models/                    # Sequelize models (User, Categories, ...)
  routes/                    # Routers (user, categories, ...) + Router.ts
  utils/                     # ApiErrors, etc.
main.ts                      # Entry point
```

## 📚 Available endpoints
Base prefix for all routes: `ENDPOINTS.baseUrl = /api` (see `src/config/server.ts`).

### Users (`/api/user`)

- **GET `/api/user/`** — Get current user profile
  - **Auth**: required (`Authorization: Bearer <token>`)
  - **Response 200**: `{ data: { user: { ... } } }`

- **GET `/api/user/refresh`** — Refresh session token using the refresh token
  - **Auth**: not required (works with refresh cookie)
  - **Response 200**: tokens/cookies updated

- **GET `/api/user/all?page=1&limit=20`** — List users (pagination)
  - **Auth**: required, admin only
  - **Query**: `page` int≥1, `limit` int 1..100
  - **Response 200**: `{ data: { users: [...], total } }`

- **POST `/api/user/register`** — Register
  - **Body (JSON)**:
    - `first_name` string [3..128]
    - `phone` string [8..32], ru-RU format
    - `email` string [6..128], email
    - `password` string [8..32]
  - **Response 201**: `{ data: { user: { ... } } }`

- **POST `/api/user/login`** — Login
  - **Body (JSON)**: `email`, `password`
  - **Response 200**: `{ data: { user: { ... } } }` (and/or sets tokens/cookies)

- **PUT `/api/user/update`** — Update own profile
  - **Auth**: required
  - **Body (JSON)**: `firstName?`, `lastName?`, `email?`, `phone?`
  - **Response 200**: `{ data: { user: { ... } } }`

- **PUT `/api/user/:id/update`** — Update user by id
  - **Auth**: required, admin only
  - **Params**: `id` — UUID
  - **Body (JSON)**: `role? ('user'|'admin')`, `firstName?`, `lastName?`, `email?`, `phone?`
  - **Response 200**: `{ data: { user: { ... } } }`

- **DELETE `/api/user/logout`** — Logout
  - **Auth**: required
  - **Response 200**: `{ msg: 'ok' }`

### Categories (`/api/categories`)

- **POST `/api/categories/`** — Create category
  - **Auth**: required, admin only
  - **Content-Type**: `multipart/form-data`
  - **Form fields**:
    - `name` string [2..255] — required
    - `description` string (≤10000) — optional
    - `image` file (jpeg/png/jpg) — optional (`upload.single('image')`)
  - **Response 201**:
    ```json
    {
      "msg": "category is created: <name>",
      "data": { "category": { "id": "...", "name": "...", "description": "...", "image": "...", "createdAt": "..." } }
    }
    ```
  - **Errors**: `400` (validation), `401/403` (auth/admin), `409` (already exists)
