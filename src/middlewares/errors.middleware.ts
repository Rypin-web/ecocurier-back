import {NextFunction, Response} from 'express'
import {ApiErrorsType} from "@utils/ApiErrors";
import { RequestWithUser } from './requireRole';

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

    res.status(err.status || 500).send({
        msg: err.msg,
        ...responseData
    })
}