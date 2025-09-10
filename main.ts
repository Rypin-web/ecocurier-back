import Express from "express";
import cors from 'cors'
import helmet from "helmet";
import cookieParser from "cookie-parser";
import {router} from "@routes/Router";
import {CORS, ENDPOINTS, PORT} from "@config/server";
import {sequelize} from "@config/database";

var app = Express()

app.use(Express.json())
app.use(cors(CORS))
app.use(helmet())
app.use(cookieParser())
app.use(ENDPOINTS.baseUrl, router)

sequelize.sync({alter: true}).then(() => {
    console.log('Database connected!')
    app.listen(PORT, () => {
        console.log('Server work on ' + PORT)
        console.warn('http://localhost:' + PORT + '/api')
    })
}).catch((err) => {
    console.log('Database connection error!')
    console.warn(err)
})

