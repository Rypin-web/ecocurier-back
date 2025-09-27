import {Router} from 'express'
import {userRouter} from "@routes/user";
import {ENDPOINTS} from "@config/server";

var router = Router()

router.use(ENDPOINTS._.user._, userRouter)

export {router}