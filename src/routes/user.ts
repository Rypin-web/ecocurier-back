import {Router} from "express";
import {register} from "@controllers/user/register";
import {validateGetUserFields, validateLoginFields, validateRegisterFields} from "@config/validations/user";
import {login} from "@controllers/user/login";
import {getMe} from "@controllers/user/getMe";
import {requireAuthorization} from "@/middlewares/requireAuthorization";

var userRouter = Router()

userRouter.post('/register', validateRegisterFields(), register)
userRouter.post('/login', validateLoginFields(), login)
userRouter.get('/', requireAuthorization, validateGetUserFields(), getMe)

export {userRouter}