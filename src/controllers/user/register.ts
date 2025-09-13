import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {User} from "@models/User";
import {ApiErrors} from "@utils/ApiErrors";
import bcrypt from 'bcrypt'
import {SALT} from "@config/server";

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const result = validationResult(req)
        if (result.isEmpty()) {
            const hasUser = await User.findOne({where: {email: req.body.email}})
            if (hasUser) throw ApiErrors.userAlreadyCreated('User already created')

            const passwordHash = await bcrypt.hash(req.body.password, SALT)
            const user = await User.create({
                role: 'user',
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone: req.body.phone,
                email: req.body.email,
                password: passwordHash
            })
            res.status(201).send({
                msg: 'user is created: ' + user.dataValues.first_name,
                user: {...user.dataValues, password: undefined}
            })
            return
        }

        throw ApiErrors.validationFields('Invalid data', result.array())
    } catch (e) {
        next(e)
    }
}