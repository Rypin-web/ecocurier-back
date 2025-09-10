import {Request, Response} from "express";
import {validationResult} from "express-validator";

export function register (req:Request, res:Response) {
    const result = validationResult(req)
    if (result.isEmpty()) {
        res.status(200).send('good')
    }

    res.status(400).send({
        msg:'bad',
        errors: result.array()
    })
}