import {NextFunction, Response} from "express";
import {validationResult} from "express-validator";
import {ApiErrors} from "@utils/ApiErrors";
import {RequestWithUser} from "@/middlewares/requireAuthorization";
import {User} from "@models/User";

export async function getMe(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const result = validationResult(req)
        if (result.isEmpty()) {
            const userFromDb = await User.findByPk(req.user.id)
            if(!userFromDb) throw ApiErrors.userNotFound('User not found')

            return res.status(200).send({
                msg:'Success get user',
                user: {...userFromDb.dataValues, password:undefined}
            })
        }

        throw ApiErrors.validationFields('Invalid data', result.array())
    } catch (e) {
        next(e)
    }
}