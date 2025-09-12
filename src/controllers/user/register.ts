import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {User} from "@models/User";
import {ApiErrors} from "@utils/ApiErrors";

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const result = validationResult(req)
        if (result.isEmpty()) {
            const hasUser = await User.findOne({where: {email: req.body.email}})
            if (hasUser) throw ApiErrors.userAlreadyCreated('User already created')

            const user = await User.create(req.body)
            res.status(200).send({
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