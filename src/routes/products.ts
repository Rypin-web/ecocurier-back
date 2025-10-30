import {Router} from "express";
import {ENDPOINTS} from "@config/server";
import {requireAuthorization} from "@/middlewares/requireAuthorization";
import {requireAdministrator} from "@/middlewares/requireAdministrator";
import {upload} from "@config/multer";
import {validateCreateProductFields} from "@config/validations/products";
import {validateFields} from "@/middlewares/validateFields.middleware";
import {createProduct} from "@controllers/products/createProduct";

var productsRouter = Router()

productsRouter.post(
    ENDPOINTS.products.def,
    requireAuthorization,
    requireAdministrator,
    upload.single('image'),
    validateCreateProductFields(),
    validateFields,
    createProduct
)

export {productsRouter}