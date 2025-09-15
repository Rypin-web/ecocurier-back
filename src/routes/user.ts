import {Router} from "express";
import {register} from "@controllers/user/register";
import {validateLoginFields, validateRegisterFields} from "@config/validations/user";
import {login} from "@controllers/user/login";

var userRouter = Router()

userRouter.post('/register', validateRegisterFields(), register)
userRouter.post('/login', validateLoginFields(), login)

export {userRouter}