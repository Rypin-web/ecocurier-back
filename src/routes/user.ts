import {Router} from "express";
import {register} from "@controllers/user/register";
import {validateRegisterFields} from "@config/validations/user";

var userRouter = Router()

userRouter.post('/register', validateRegisterFields(), register)

export {userRouter}