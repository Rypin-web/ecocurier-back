import {Router} from 'express'
import {userRouter} from "@routes/user";
import {categoriesRouter} from "@routes/categories";
import {ENDPOINTS} from "@config/server";
import {productsRouter} from "@routes/products";

var router = Router()

router.use(ENDPOINTS.user.base, userRouter)
router.use(ENDPOINTS.categories.base, categoriesRouter)
router.use(ENDPOINTS.products.base, productsRouter)

export {router}