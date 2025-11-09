import {NextFunction, Request, Response} from "express";
import {ApiErrors} from "@utils/ApiErrors";
import {User} from "@models/User";
import {extractBodyData} from "@utils/extractBodyData";
import {sequelize} from "@config/database";

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await sequelize.transaction(async (t) => {
            const userId = req.params.id
            if (!userId) throw ApiErrors.invalidCredentials('userId is required')
            const user = await User.findByPk(userId, {transaction: t})
            if (!user) throw ApiErrors.NotFound('Not found')

            let payload = extractBodyData<User>(req.body, ['role', 'first_name', 'last_name', 'email', 'phone'])
            await user.update(payload, {transaction: t})
            return {user, payload}
        })
        return res.status(201).send({
            msg: 'success update',
            data: {
                user: {
                    ...result.user.dataValues,
                    password: undefined
                },
                updatedData: result.payload
            }
        })
    } catch (e) {
        next(e)
    }
}