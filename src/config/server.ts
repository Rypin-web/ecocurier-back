import dotenv from "dotenv";
import * as process from "node:process";
dotenv.config()

export const PORT = process.env.PORT || 5600
export const API_URL = process.env.API_URL || 'http://localhost:3000'
export const SALT = Number(process.env.SALT) || 13
export const CORS = {
    origin: API_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

export const ENDPOINTS = {
    baseUrl: '/api',
    endpoints: {
        user: '/user',
        auth: '/auth',
        products: '/prod'
    }
}