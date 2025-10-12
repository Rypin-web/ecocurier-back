import dotenv from "dotenv";
import * as process from "node:process";

dotenv.config()

export var PORT = process.env.PORT || 5600
export var API_URL = process.env.API_URL || 'http://localhost:3000'
export var SALT = Number(process.env.SALT) || 13
export var JWT_INFO = {
    SECRET_KEY_SESSION: process.env.SECRET_KEY_SESSION || 'secret_key_session',
    SECRET_KEY_REFRESH: process.env.SECRET_KEY_REFRESH || 'secret_key-refresh',
    SESSION_EXPIRES_IN: 180, // 3m
    REFRESH_EXPIRES_IN: 1209600, // 14d
}

export var CORS = {
    origin: API_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

export var ENDPOINTS = {
    baseUrl: '/api',
    user: {
        base: '/user',
        def: '/',
        register: '/register',
        login: '/login',
        all: '/all',
        logout:'/logout',
        refresh:'/refresh',
        updateMe: '/update',
        updatePerson: '/:id/update'
    },
    categories: {
        base: '/categories',
        def: '/',
    },
}