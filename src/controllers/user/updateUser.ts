import {NextFunction, Request, Response} from "express";
import {ApiErrors} from "@utils/ApiErrors";
import {User} from "@models/User";
import {extractBodyData} from "@utils/extractBodyData";

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.params.id
        if (!userId) throw ApiErrors.invalidCredentials('suerId is required')
        const user = await User.findByPk(userId)
        if (!user) throw ApiErrors.NotFound('Not found')

        let payload = extractBodyData<User>(req.body, ['role', 'first_name', 'last_name', 'email', 'phone'])
        await user.update(payload)
        return res.status(201).send({
            msg: 'success update',
            data: {
                user: {
                    ...user.dataValues,
                    password: undefined
                },
                updatedData: payload
            }
        })
    } catch (e) {
        next(e)
    }
}