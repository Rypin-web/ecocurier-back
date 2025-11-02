import {Router} from "express";
import {register} from "@controllers/user/register";
import {
    validateLoginFields,
    validateQueryGetAllUsers,
    validateRegisterFields, validateShowMyBasketFields,
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
import {validateFields} from "@/middlewares/validateFields.middleware";
import {showMyBasket} from "@controllers/user/showMyBasket";

var userRouter = Router()

userRouter.get(ENDPOINTS.def, requireAuthorization, getMe)
userRouter.get(ENDPOINTS.methods.refresh, refresh)
userRouter.get(
    ENDPOINTS.methods.basket,
    requireAuthorization,
    validateShowMyBasketFields(),
    validateFields,
    showMyBasket
)
userRouter.get(ENDPOINTS.methods.all, requireAuthorization, requireAdministrator, validateQueryGetAllUsers(), validateFields, getAllUsers)
userRouter.post(ENDPOINTS.methods.register, validateRegisterFields(), validateFields, register)
userRouter.post(ENDPOINTS.methods.login, validateLoginFields(), validateFields, login)
userRouter.put(ENDPOINTS.methods.me, requireAuthorization, validateUpdateMeFields(), validateFields, updateMe)
userRouter.delete(ENDPOINTS.methods.logout, requireAuthorization, logout)
userRouter.put(
    ENDPOINTS.byId + ENDPOINTS.methods.update,
    requireAuthorization,
    requireAdministrator,
    validateUpdatePersonFields(),
    validateFields,
    updateUser
)
export {userRouter}