import {Router} from 'express'
import {userRouter} from "@routes/user";
import {categoriesRouter} from "@routes/categories";
import {ENDPOINTS} from "@config/server";
import {productsRouter} from "@routes/products";
import {orderRouter} from "@routes/order";

var router = Router()

router.use(ENDPOINTS.resources.users, userRouter)
router.use(ENDPOINTS.resources.categories, categoriesRouter)
router.use(ENDPOINTS.resources.products, productsRouter)
router.use(ENDPOINTS.resources.order, orderRouter)

export {router}