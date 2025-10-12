import {Router} from "express";
import {ENDPOINTS} from "@config/server";
import {create} from "@controllers/categories/create";
import {requireAuthorization} from "@/middlewares/requireAuthorization";
import {requireAdministrator} from "@/middlewares/requireAdministrator";
import {upload} from "@config/multer";
import {validateCreateCategoryFields} from "@config/validations/categories";

var categoriesRouter = Router()

categoriesRouter.post(
    ENDPOINTS.categories.def,
    requireAuthorization,
    requireAdministrator,
    upload.single('image'),
    validateCreateCategoryFields(),
    create
)

export {categoriesRouter}
