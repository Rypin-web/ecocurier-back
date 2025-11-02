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
    ENDPOINTS.def,
    requireAuthorization,
    validateGetAllProductsFields(),
    validateFields,
    getAllProducts
)
productsRouter.post(
    ENDPOINTS.def,
    requireAuthorization,
    requireAdministrator,
    upload.single('image'),
    validateCreateProductFields(),
    validateFields,
    createProduct
)
productsRouter.post(
    ENDPOINTS.byId,
    requireAuthorization,
    validateAddToBasketFields(),
    validateFields,
    addToBasket
)
productsRouter.put(
    ENDPOINTS.byId,
    requireAuthorization,
    requireAdministrator,
    upload.single('image'),
    validateUpdateProductFields(),
    validateFields,
    updateProduct
)
productsRouter.delete(
    ENDPOINTS.byId,
    requireAuthorization,
    requireAdministrator,
    validateDeleteProductFields(),
    validateFields,
    deleteProduct
)

export {productsRouter}