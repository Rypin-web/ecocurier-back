import {Router} from "express";
import {register} from "@controllers/user/register";
import {validateLoginFields, validateQueryGetAllUsers, validateRegisterFields} from "@config/validations/user";
import {login} from "@controllers/user/login";
import {getMe} from "@controllers/user/getMe";
import {requireAuthorization} from "@/middlewares/requireAuthorization";
import {requireAdministrator} from "@/middlewares/requireAdministrator";
import {getAll} from "@controllers/user/getAll";
import {ENDPOINTS} from "@config/server";
import {updateMe} from "@controllers/user/updateMe";
import {validateUpdateMeFields} from "@config/validations/user";
import {refresh} from "@controllers/user/refresh";
import {logout} from "@controllers/user/logout";

var userRouter = Router()

userRouter.get(ENDPOINTS.user.def, requireAuthorization, getMe)
userRouter.get(ENDPOINTS.user.refresh, refresh)
userRouter.get(ENDPOINTS.user.all, requireAuthorization, requireAdministrator, validateQueryGetAllUsers(), getAll)
userRouter.post(ENDPOINTS.user.register, validateRegisterFields(), register)
userRouter.post(ENDPOINTS.user.login, validateLoginFields(), login)
userRouter.post(ENDPOINTS.user.updateMe, requireAuthorization, validateUpdateMeFields(), updateMe)
userRouter.delete(ENDPOINTS.user.logout, requireAuthorization, logout)

export {userRouter}