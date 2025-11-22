import dotenv from "dotenv";
import * as process from "node:process";
import * as path from "node:path";

dotenv.config()

export var PORT = process.env.PORT || 5600
export var API_URL = process.env.API_URL || 'http://localhost:3000'
export var SALT = Number(process.env.SALT) || 13
export var JWT_INFO = {
    SECRET_KEY_SESSION: process.env.SECRET_KEY_SESSION || 'secret_key_session',
    SECRET_KEY_REFRESH: process.env.SECRET_KEY_REFRESH || 'secret_key-refresh',
    SESSION_EXPIRES_IN: 600, // 3m
    REFRESH_EXPIRES_IN: 1209600, // 14d
}
export var imagePath = 'uploads'
export var rootPath = path.resolve()

export var CORS = {
    origin: API_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

export var ENDPOINTS = {
    base: '/api',
    def: '/',
    byId: '/:id',
    resources: {
        users: '/users',
        categories: '/categories',
        products: '/products',
        basket: '/baskets',
        order: '/orders',
        static: '/uploads'
    },
    methods: {
        update: '/update',
        register: '/register',
        login: '/login',
        logout: '/logout',
        refresh: '/refresh',
        me: '/me',
        all: '/all',
        basket: '/basket',
        order: '/order',
    }
}