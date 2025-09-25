import {Router} from "express";
import {register} from "@controllers/user/register";
import {validateLoginFields, validateQueryGetAllUsers, validateRegisterFields} from "@config/validations/user";
import {login} from "@controllers/user/login";
import {getMe} from "@controllers/user/getMe";
import {requireAuthorization} from "@/middlewares/requireAuthorization";
import {requireAdministrator} from "@/middlewares/requireAdministrator";
import {getAll} from "@controllers/user/getAll";

var userRouter = Router()

userRouter.post('/register', validateRegisterFields(), register)
userRouter.post('/login', validateLoginFields(), login)
userRouter.get('/', requireAuthorization, getMe)
userRouter.get('/all', requireAuthorization, requireAdministrator, validateQueryGetAllUsers(), getAll)

export {userRouter}