import {RequestWithUser} from "@/middlewares/requireAuthorization";
import {NextFunction, Response} from "express";
import {validationResult} from "express-validator";
import {ApiErrors} from "@utils/ApiErrors";
import {User} from "@models/User";
import {getUpdateData} from "@utils/getUpdateData";

export async function updateUser(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const result = validationResult(req)
        if (result.isEmpty()) {
            const userId = req.params.id
            if (!userId) throw ApiErrors.invalidCredentials('suerId is required')
            const user = await User.findByPk(userId)
            if (!user) throw ApiErrors.NotFound('Not found')

            let updateData: any = getUpdateData(req.body, ['role', 'first_name', 'last_name', 'email', 'phone'])
            await user.update(updateData)
            return res.status(201).send({
                msg: 'success update',
                data:{
                    user: {
                        ...user.dataValues,
                        password:undefined
                    }
                }
            })
        }
        throw ApiErrors.validationFields('Invalid data')
    } catch (e) {
        next(e)
    }
}