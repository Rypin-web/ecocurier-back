import Express from "express";
import cors from 'cors'
import helmet from "helmet";
import cookieParser from "cookie-parser";
import {router} from "@routes/Router";
import {CORS, ENDPOINTS, imagePath, PORT, rootPath} from "@config/server";
import {sequelize} from "@config/database";
import {errorsMiddleware} from "@/middlewares/errors.middleware";
import {initAssociations} from "@utils/initAssociations";
import * as path from "node:path";
import * as process from "node:process";

var app = Express()

app.use(Express.json())
app.use(helmet())
app.use(cors(CORS))
app.use(cookieParser())
app.use(ENDPOINTS.base + ENDPOINTS.resources.staticContent,
    cors(CORS),
    Express.static(path.join(rootPath, imagePath), {
        setHeaders: (res) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
            res.setHeader('Access-Control-Allow-Credentials', 'true')
            res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
            res.setHeader('Access-Control-Allow-Methods', 'GET')
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
            res.setHeader('Cache-Control', 'public, max-age=86400')
        }
    })
)
app.use(ENDPOINTS.base, router)
app.use(errorsMiddleware)

sequelize.sync().then(() => {
    console.log('Database connected!')
    console.log('Init associations...')
    initAssociations()
    console.log('Associations initialized!')
    app.listen(PORT, () => {
        console.log('Server work on ' + PORT)
        console.warn('http://localhost:' + PORT + '/api')
        console.log('http://localhost:' + PORT + '/api' + ENDPOINTS.resources.staticContent)
    })
}).catch((err) => {
    console.log('Database connection error!')
    console.log(err)
})

