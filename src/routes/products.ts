import {Router} from "express";
import {ENDPOINTS} from "@config/server";
import {requireAuthorization} from "@/middlewares/requireAuthorization";
import {requireAdministrator} from "@/middlewares/requireAdministrator";
import {upload} from "@config/multer";
import {
    validateCreateProductFields,
    validateDeleteProductFields,
    validateGetAllProductsFields
} from "@config/validations/products";
import {validateFields} from "@/middlewares/validateFields.middleware";
import {createProduct} from "@controllers/products/createProduct";
import {getAllProducts} from "@controllers/products/getAllProducts";
import {deleteProduct} from "@controllers/products/deleteProduct";

var productsRouter = Router()

productsRouter.get(
    ENDPOINTS.products.def,
    requireAuthorization,
    validateGetAllProductsFields(),
    validateFields,
    getAllProducts
)
productsRouter.post(
    ENDPOINTS.products.def,
    requireAuthorization,
    requireAdministrator,
    upload.single('image'),
    validateCreateProductFields(),
    validateFields,
    createProduct
)
productsRouter.delete(
    ENDPOINTS.products.update,
    requireAuthorization,
    requireAdministrator,
    validateDeleteProductFields(),
    validateFields,
    deleteProduct
)

export {productsRouter}