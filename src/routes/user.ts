import {Router} from "express";
import {register} from "@controllers/user/register";
import {
    validateGetUserBasketFields,
    validateLoginFields,
    validateQueryGetAllUsers,
    validateRegisterFields,
    validateShowMyBasketFields,
    validateUpdateMeFields,
    validateUpdatePersonFields
} from "@config/validations/user";
import {login} from "@controllers/user/login";
import {getMe} from "@controllers/user/getMe";
import {getAllUsers} from "@controllers/user/getAllUsers";
import {ENDPOINTS} from "@config/server";
import {updateMe} from "@controllers/user/updateMe";
import {refresh} from "@controllers/user/refresh";
import {logout} from "@controllers/user/logout";
import {updateUser} from "@controllers/user/updateUser";
import {validateFields} from "@/middlewares/validateFields.middleware";
import {showMyBasket} from "@controllers/user/showMyBasket";
import {getUserBasket} from "@controllers/user/getUserBasket";
import {requireRole} from "@/middlewares/requireRole";

var userRouter = Router()

userRouter.get(ENDPOINTS.def, requireRole(), getMe)
userRouter.get(ENDPOINTS.methods.refresh, refresh)
userRouter.get(
    ENDPOINTS.methods.basket,
    requireRole(['user', 'admin']),
    validateShowMyBasketFields(),
    validateFields,
    showMyBasket
)
userRouter.get(
    ENDPOINTS.byId + ENDPOINTS.methods.basket,
    requireRole(['admin']),
    validateGetUserBasketFields(),
    validateFields,
    getUserBasket
)
userRouter.get(ENDPOINTS.methods.all, requireRole(['admin']), validateQueryGetAllUsers(), validateFields, getAllUsers)
userRouter.post(ENDPOINTS.methods.register, validateRegisterFields(), validateFields, register)
userRouter.post(ENDPOINTS.methods.login, validateLoginFields(), validateFields, login)
userRouter.put(ENDPOINTS.methods.me, requireRole(), validateUpdateMeFields(), validateFields, updateMe)
userRouter.delete(ENDPOINTS.methods.logout, requireRole(), logout)
userRouter.put(
    ENDPOINTS.byId + ENDPOINTS.methods.update,
    requireRole(['admin']),
    validateUpdatePersonFields(),
    validateFields,
    updateUser
)
export {userRouter}