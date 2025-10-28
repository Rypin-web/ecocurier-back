import {Router} from "express";
import {ENDPOINTS} from "@config/server";
import {createCategory} from "@controllers/categories/createCategory";
import {requireAuthorization} from "@/middlewares/requireAuthorization";
import {requireAdministrator} from "@/middlewares/requireAdministrator";
import {upload} from "@config/multer";
import {
    validateCreateCategoryFields,
    validateGetAllCategoriesFields,
    validateUpdateCategoryFields
} from "@config/validations/categories";
import {getAllCategories} from "@controllers/categories/getAllCategories";
import {updateCategory} from "@controllers/categories/updateCategory";

var categoriesRouter = Router()

categoriesRouter.get(ENDPOINTS.categories.def, requireAuthorization, validateGetAllCategoriesFields(), getAllCategories)
categoriesRouter.post(
    ENDPOINTS.categories.def,
    requireAuthorization,
    requireAdministrator,
    upload.single('image'),
    validateCreateCategoryFields(),
    createCategory
)
categoriesRouter.put(
    ENDPOINTS.categories.update,
    requireAuthorization,
    requireAdministrator,
    upload.single('image'),
    validateUpdateCategoryFields(),
    updateCategory
)

export {categoriesRouter}
