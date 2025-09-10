import {Router} from 'express'
import {userRouter} from "@routes/user";

var router = Router()

router.use('/user', userRouter)

export {router}