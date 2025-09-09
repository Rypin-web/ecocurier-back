import Express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import helmet from "helmet";
import cookieParser from "cookie-parser";
import {router} from "@routes/Router";
import {CORS, ENDPOINTS, PORT} from "@config/server";

dotenv.config()

var app = Express()

app.use(Express.json())
app.use(cors(CORS))
app.use(helmet())
app.use(cookieParser())
app.use(ENDPOINTS.baseUrl ,router)

app.listen(PORT, () => {
    console.log('Server work on ' + PORT)
})