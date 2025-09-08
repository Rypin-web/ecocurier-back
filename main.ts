import Express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import helmet from "helmet";
import cookieParser from "cookie-parser";
import * as process from "node:process";
import {router} from "@routes/Router";

dotenv.config()

var app = Express()
var PORT = process.env.PORT || 5600
var API_URL = process.env.API_URL || 'http://localhost:3000'

app.use(Express.json())
app.use(cors({
    origin: API_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(helmet())
app.use(cookieParser())
app.use('/api' ,router)

app.listen(PORT, () => {
    console.log('Server work on ' + PORT)
})

