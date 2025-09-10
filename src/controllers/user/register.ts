import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {User} from "@models/User";
import {ValidationError} from 'sequelize'

export async function register (req:Request, res:Response) {
    try{
        const result = validationResult(req)
        if (result.isEmpty()) {
            const user = await User.create(req.body)
            res.status(200).send({
                msg: 'user is created: ' + user.dataValues.first_name,
                user: {...user, password: undefined}
            })
        }

        res.status(400).send({
            msg:'bad',
            errors: result.array()
        })
    } catch (e) {
        if(e instanceof ValidationError)
            res.status(400).send({
            msg: 'Conflict data',
            error:e
        })
        res.status(500).send({
            msg: 'Internal server error',
            error:e
        })
    }
}