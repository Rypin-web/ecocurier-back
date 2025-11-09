import {Router} from "express";
import {ENDPOINTS} from "@config/server";
import {upload} from "@config/multer";
import {
    validateAddToBasketFields,
    validateCreateProductFields,
    validateDeleteProductFields,
    validateGetAllProductsFields,
    validateGetProductInBasketsFields,
    validateUpdateProductFields
} from "@config/validations/products";
import {validateFields} from "@/middlewares/validateFields.middleware";
import {createProduct} from "@controllers/products/createProduct";
import {getAllProducts} from "@controllers/products/getAllProducts";
import {deleteProduct} from "@controllers/products/deleteProduct";
import {updateProduct} from "@controllers/products/updateProduct";
import {addToBasket} from "@controllers/products/addToBasket";
import {getProductInBaskets} from "@controllers/products/getProductInBaskets";
import {requireRole} from "@/middlewares/requireRole";

var productsRouter = Router({mergeParams: true})

productsRouter.get(
    ENDPOINTS.def,
    requireRole(),
    validateGetAllProductsFields(),
    validateFields,
    getAllProducts
)
// Блять, какого хуя это говно не работало??? Express не видел ссаный параметр
// Потом после дебага, через миддлвару и отключения всех эндпоинтов с byId он, сука, заработал
// и когда я вернул все обратно, он снова начал работать и видеть параметр
// .. это пиздец. Он оказывается все время видел параметры, а я еблан вставлял id пользователя и получал 404
// потому что idшник не правильный, а дебаг в миддваре ошибки не помогал, потому что он какого-то хера не видит
// параметры, но query видит, что блять?
productsRouter.get(
    ENDPOINTS.resources.basket + ENDPOINTS.byId, // /api/products/baskets/:id?...
    requireRole(['admin']),
    validateGetProductInBasketsFields(),
    validateFields,
    getProductInBaskets
)
productsRouter.post(
    ENDPOINTS.def,
    requireRole(['admin']),
    upload.single('image'),
    validateCreateProductFields(),
    validateFields,
    createProduct
)
productsRouter.post(
    ENDPOINTS.byId,
    requireRole(['user', 'admin']),
    validateAddToBasketFields(),
    validateFields,
    addToBasket
)
productsRouter.put(
    ENDPOINTS.byId,
    requireRole(['admin']),
    upload.single('image'),
    validateUpdateProductFields(),
    validateFields,
    updateProduct
)
productsRouter.delete(
    ENDPOINTS.byId,
    requireRole(['admin']),
    validateDeleteProductFields(),
    validateFields,
    deleteProduct
)

export {productsRouter}