import {Router} from "express";
import {ENDPOINTS} from "@config/server";
import {createCategory} from "@controllers/categories/createCategory";
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
import {requireRole} from "@/middlewares/requireRole";

var categoriesRouter = Router()

categoriesRouter.get(
    ENDPOINTS.def,
    requireRole(),
    validateGetAllCategoriesFields(),
    validateFields,
    getAllCategories
)
categoriesRouter.post(
    ENDPOINTS.def,
    requireRole('admin'),
    upload.single('image'),
    validateCreateCategoryFields(),
    validateFields,
    createCategory
)
categoriesRouter.put(
    ENDPOINTS.byId,
    requireRole('admin'),
    upload.single('image'),
    validateUpdateCategoryFields(),
    validateFields,
    updateCategory
)
categoriesRouter.delete(
    ENDPOINTS.byId,
    requireRole('admin'),
    validateDeleteCategoryFields(),
    validateFields,
    deleteCategory
)

export {categoriesRouter}
