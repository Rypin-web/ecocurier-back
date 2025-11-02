import {Router} from "express";
import {ENDPOINTS} from "@config/server";
import {requireAuthorization} from "@/middlewares/requireAuthorization";
import {requireAdministrator} from "@/middlewares/requireAdministrator";
import {upload} from "@config/multer";
import {
    validateAddToBasketFields,
    validateCreateProductFields,
    validateDeleteProductFields,
    validateGetAllProductsFields, validateUpdateProductFields
} from "@config/validations/products";
import {validateFields} from "@/middlewares/validateFields.middleware";
import {createProduct} from "@controllers/products/createProduct";
import {getAllProducts} from "@controllers/products/getAllProducts";
import {deleteProduct} from "@controllers/products/deleteProduct";
import {updateProduct} from "@controllers/products/updateProduct";
import {addToBasket} from "@controllers/products/addToBasket";

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
productsRouter.post(
    ENDPOINTS.products.update,
    requireAuthorization,
    validateAddToBasketFields(),
    validateFields,
    addToBasket
)
productsRouter.put(
    ENDPOINTS.products.update,
    requireAuthorization,
    requireAdministrator,
    upload.single('image'),
    validateUpdateProductFields(),
    validateFields,
    updateProduct
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