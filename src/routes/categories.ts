import {Router} from "express";
import {ENDPOINTS} from "@config/server";
import {create} from "@controllers/categories/create";
import {requireAuthorization} from "@/middlewares/requireAuthorization";
import {requireAdministrator} from "@/middlewares/requireAdministrator";
import {upload} from "@config/multer";
import {validateCreateCategoryFields, validateGetAllCategoriesFields} from "@config/validations/categories";
import {getAll} from "@controllers/categories/getAll";

var categoriesRouter = Router()

categoriesRouter.get(ENDPOINTS.categories.def, requireAuthorization, validateGetAllCategoriesFields(), getAll)
categoriesRouter.post(
    ENDPOINTS.categories.def,
    requireAuthorization,
    requireAdministrator,
    upload.single('image'),
    validateCreateCategoryFields(),
    create
)

export {categoriesRouter}
