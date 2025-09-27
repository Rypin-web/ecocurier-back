import {Router} from "express";
import {register} from "@controllers/user/register";
import {validateLoginFields, validateQueryGetAllUsers, validateRegisterFields} from "@config/validations/user";
import {login} from "@controllers/user/login";
import {getMe} from "@controllers/user/getMe";
import {requireAuthorization} from "@/middlewares/requireAuthorization";
import {requireAdministrator} from "@/middlewares/requireAdministrator";
import {getAll} from "@controllers/user/getAll";
import {ENDPOINTS} from "@config/server";

var userRouter = Router()

userRouter.post(ENDPOINTS._.user.register, validateRegisterFields(), register)
userRouter.post(ENDPOINTS._.user.login, validateLoginFields(), login)
userRouter.get(ENDPOINTS._.user.def, requireAuthorization, getMe)
userRouter.get(ENDPOINTS._.user.all, requireAuthorization, requireAdministrator, validateQueryGetAllUsers(), getAll)

export {userRouter}