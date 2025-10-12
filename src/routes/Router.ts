import {Router} from 'express'
import {userRouter} from "@routes/user";
import {categoriesRouter} from "@routes/categories";
import {ENDPOINTS} from "@config/server";

var router = Router()

router.use(ENDPOINTS.user.base, userRouter)
router.use(ENDPOINTS.categories.base, categoriesRouter)

export {router}