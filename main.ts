import Express from "express";
import cors from 'cors'
import helmet from "helmet";
import cookieParser from "cookie-parser";
import {router} from "@routes/Router";
import {CORS, ENDPOINTS, PORT} from "@config/server";
import {sequelize} from "@config/database";
import {errorsMiddleware} from "@/middlewares/errors.middleware";
import {initAssociations} from "@utils/initAssociations";

var app = Express()

app.use(Express.json())
app.use(cors(CORS))
app.use(helmet())
app.use(cookieParser())
app.use(ENDPOINTS.baseUrl, router)
app.use(errorsMiddleware)

sequelize.sync().then(() => {
    console.log('Database connected!')
    console.log('Init associations...')
    initAssociations()
    console.log('Associations initialized!')
    app.listen(PORT, () => {
        console.log('Server work on ' + PORT)
        console.warn('http://localhost:' + PORT + '/api')
    })
}).catch((err) => {
    console.log('Database connection error!')
    console.log(err)
})

