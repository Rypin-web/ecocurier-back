import {NextFunction, Request, Response} from 'express'
import {ApiErrorsType} from "@utils/ApiErrors";

export function errorsMiddleware(err: ApiErrorsType, req: Request, res: Response, next: NextFunction) {
    var responseData = {
        reqData: {
            body: req.body,
            params: req.query,
            headers: {
                auth: req.headers.authorization
            },
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