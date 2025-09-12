import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {User} from "@models/User";

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const result = validationResult(req)
        if (result.isEmpty()) {
            const hasUser = await User.findOne({where:{email: req.body.email}})
            if(hasUser) {
                res.status(409).send({
                    msg:'user has already been created'
                })
                return
            }

            const user = await User.create(req.body)
            res.status(200).send({
                msg: 'user is created: ' + user.dataValues.first_name,
                user: {...user.dataValues, password: undefined}
            })
            return
        }

        res.status(400).send({
            msg: 'bad',
            errors: result.array()
        })
    } catch (e) {
        next(e)
    }
}