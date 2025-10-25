import {Router} from "express";
import {register} from "@controllers/user/register";
import {
    validateLoginFields,
    validateQueryGetAllUsers,
    validateRegisterFields,
    validateUpdateMeFields,
    validateUpdatePersonFields
} from "@config/validations/user";
import {login} from "@controllers/user/login";
import {getMe} from "@controllers/user/getMe";
import {requireAuthorization} from "@/middlewares/requireAuthorization";
import {requireAdministrator} from "@/middlewares/requireAdministrator";
import {getAllUsers} from "@controllers/user/getAllUsers";
import {ENDPOINTS} from "@config/server";
import {updateMe} from "@controllers/user/updateMe";
import {refresh} from "@controllers/user/refresh";
import {logout} from "@controllers/user/logout";
import {updateUser} from "@controllers/user/updateUser";

var userRouter = Router()

userRouter.get(ENDPOINTS.user.def, requireAuthorization, getMe)
userRouter.get(ENDPOINTS.user.refresh, refresh)
userRouter.get(ENDPOINTS.user.all, requireAuthorization, requireAdministrator, validateQueryGetAllUsers(), getAllUsers)
userRouter.post(ENDPOINTS.user.register, validateRegisterFields(), register)
userRouter.post(ENDPOINTS.user.login, validateLoginFields(), login)
userRouter.put(ENDPOINTS.user.updateMe, requireAuthorization, validateUpdateMeFields(), updateMe)
userRouter.delete(ENDPOINTS.user.logout, requireAuthorization, logout)
userRouter.put(ENDPOINTS.user.updatePerson, requireAuthorization, requireAdministrator, validateUpdatePersonFields(), updateUser)
export {userRouter}