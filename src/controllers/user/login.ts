import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {ApiErrors} from "@utils/ApiErrors";
import {User} from "@models/User";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import {SECRET_KEY} from "@config/server";

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const result = validationResult(req)
        if (result.isEmpty()) {
            const user = await User.findOne({where: {email: req.body.email}})
            if (!user) throw ApiErrors.userNotFound('User not found')

            const isPasswordValid = await bcrypt.compare(req.body.password, user.dataValues.password)
            if (!isPasswordValid) throw ApiErrors.invalidCredentials('Invalid credentials')

            const token = jwt.sign({...user.dataValues, password: undefined}, SECRET_KEY, {expiresIn: '30d'})
            return res.status(200).send({
                msg: 'Success login. Hello ' + user.dataValues.first_name,
                data: {
                    user: {...user.dataValues, password: undefined},
                    token
                }
            })
        }

        throw ApiErrors.validationFields('Invalid data', result.array())
    } catch (e) {
        next(e)
    }
}