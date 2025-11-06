import {Router} from "express";
import {ENDPOINTS} from "@config/server";
import {requireAuthorization} from "@/middlewares/requireAuthorization";
import {requireAdministrator} from "@/middlewares/requireAdministrator";
import {upload} from "@config/multer";
import {
    validateAddToBasketFields,
    validateCreateProductFields,
    validateDeleteProductFields,
    validateGetAllProductsFields,
    validateUpdateProductFields,
    validateGetProductInBasketsFields
} from "@config/validations/products";
import {validateFields} from "@/middlewares/validateFields.middleware";
import {createProduct} from "@controllers/products/createProduct";
import {getAllProducts} from "@controllers/products/getAllProducts";
import {deleteProduct} from "@controllers/products/deleteProduct";
import {updateProduct} from "@controllers/products/updateProduct";
import {addToBasket} from "@controllers/products/addToBasket";
import {getProductInBaskets} from "@controllers/products/getProductInBaskets";

var productsRouter = Router({mergeParams: true})

productsRouter.get(
    ENDPOINTS.def,
    requireAuthorization,
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
    requireAuthorization,
    requireAdministrator,
    validateGetProductInBasketsFields(),
    validateFields,
    getProductInBaskets
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