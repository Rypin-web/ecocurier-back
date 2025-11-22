import {NextFunction, Response} from 'express'
import {ApiErrorsType} from "@utils/ApiErrors";
import {RequestWithUser} from './requireRole';
import {JsonWebTokenError} from "jsonwebtoken";

export function errorsMiddleware(err: ApiErrorsType, req: RequestWithUser, res: Response, _next: NextFunction) {
    var responseData = {
        reqData: {
            body: req.body,
            query: req.query,
            params: req.params,
            headers: {
                auth: req.headers.authorization
            },
            userData: req.user
        },
        errors: err.errors
    }
    console.log('@@@ Error response!')
    console.log(err)

    if (err instanceof JsonWebTokenError) {
        return res.status(401).send({
            msg: err.msg,
            ...responseData
        })
    }


    return res.status(err.status || 500).send({
        msg: err.msg,
        ...responseData
    })
}