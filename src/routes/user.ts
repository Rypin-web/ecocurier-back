import {Router} from "express";
import {register} from "@controllers/user/register";
import {checkSchema} from 'express-validator'

var userRouter = Router()

userRouter.post('/register', checkSchema({
    email:{
        errorMessage: 'Invalid email',
        notEmpty:{errorMessage:'Email is required'},
        isEmail: true,
        isLength: {
            options: {min: 6, max: 128},
            errorMessage: 'Email must be between 6 and 128 characters long'
        }
    },
    password:{
        errorMessage: 'Invalid password',
        notEmpty: {errorMessage:'Password is required'},
        isLength: {
            options: {min:8, max:32},
            errorMessage: 'Password must be between 8 and 32 characters long'
        }
    }
}),  register)

export {userRouter}