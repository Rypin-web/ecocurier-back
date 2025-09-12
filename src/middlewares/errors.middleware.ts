import {Request, Response} from 'express'
import {ValidationError} from "sequelize";
import {QueryError} from 'mysql2'

export function errorsMiddleware(err: unknown, req: Request, res: Response) {
    var responseData = {
        reqData: {
            body: req.body,
            params: req.query,
            headers: {
                auth: req.headers.authorization
            },
        },
        errors:err
    }
    console.warn('@@@ Error response!')

    if (err instanceof ValidationError) {
        console.warn('@@@ Validation error!')
        console.warn(err)
        res.status(400).send({
            msg: 'Invalid data',
            ...responseData
        })
        return
    }

    console.warn('@@@ Unknown error')
    console.warn(err)
    res.status(500).send({
        msg: 'Internal server error',
        ...responseData
    })
}