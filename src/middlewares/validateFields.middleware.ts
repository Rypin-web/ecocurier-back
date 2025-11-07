import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {ApiErrors} from "@utils/ApiErrors";
import {RequestWithUser} from "@/middlewares/requireRole";

export function validateFields(req: Request | RequestWithUser, res: Response, next: NextFunction) {
    const result = validationResult(req)
    if(!result.isEmpty()) throw ApiErrors.invalidCredentials('Invalid data', result.array())
    next()
}