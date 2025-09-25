import {NextFunction, Response} from "express";
import {validationResult} from "express-validator";
import {ApiErrors} from "@utils/ApiErrors";
import {RequestWithUser} from "@/middlewares/requireAuthorization";

export async function getAll(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const result = validationResult(req)
        if (result.isEmpty()) {

        }
        throw ApiErrors.validationFields('Invalid data', result.array())
    } catch (e) {

    }
}