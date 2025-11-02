import {Router} from "express";
import {ENDPOINTS} from "@config/server";
import {createCategory} from "@controllers/categories/createCategory";
import {requireAuthorization} from "@/middlewares/requireAuthorization";
import {requireAdministrator} from "@/middlewares/requireAdministrator";
import {upload} from "@config/multer";
import {
    validateCreateCategoryFields,
    validateDeleteCategoryFields,
    validateGetAllCategoriesFields,
    validateUpdateCategoryFields
} from "@config/validations/categories";
import {getAllCategories} from "@controllers/categories/getAllCategories";
import {updateCategory} from "@controllers/categories/updateCategory";
import {deleteCategory} from "@controllers/categories/deleteCategory";
import {validateFields} from "@/middlewares/validateFields.middleware";

var categoriesRouter = Router()

categoriesRouter.get(
    ENDPOINTS.def,
    requireAuthorization,
    validateGetAllCategoriesFields(),
    validateFields,
    getAllCategories
)
categoriesRouter.post(
    ENDPOINTS.def,
    requireAuthorization,
    requireAdministrator,
    upload.single('image'),
    validateCreateCategoryFields(),
    validateFields,
    createCategory
)
categoriesRouter.put(
    ENDPOINTS.byId,
    requireAuthorization,
    requireAdministrator,
    upload.single('image'),
    validateUpdateCategoryFields(),
    validateFields,
    updateCategory
)
categoriesRouter.delete(
    ENDPOINTS.byId,
    requireAuthorization,
    requireAdministrator,
    validateDeleteCategoryFields(),
    validateFields,
    deleteCategory
)

export {categoriesRouter}
