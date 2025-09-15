import dotenv from "dotenv";
import * as process from "node:process";
dotenv.config()

export var PORT = process.env.PORT || 5600
export var API_URL = process.env.API_URL || 'http://localhost:3000'
export var SALT = Number(process.env.SALT) || 13
export var SECRET_KEY = process.env.SECRET_KEY || 'secret_key'
export var CORS = {
    origin: API_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

export var ENDPOINTS = {
    baseUrl: '/api',
    endpoints: {
        user: '/user',
        auth: '/auth',
        products: '/prod'
    }
}