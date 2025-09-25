import {NextFunction, Response} from "express";
import {RequestWithUser} from "@/middlewares/requireAuthorization";
import {ApiErrors} from "@utils/ApiErrors";
import {User} from "@models/User";

export async function requireAdministrator(req: RequestWithUser, _res: Response, next: NextFunction) {
    try {
        if(!req.user) throw ApiErrors.userNotFound('Unauthorized: user not found')
        const {role} = req.user
        if(!role || role !== 'admin') throw ApiErrors.requireAdministrator('Forbidden: require administrator')

        return next()
    } catch (e) {
        return next(e)
    }
}

