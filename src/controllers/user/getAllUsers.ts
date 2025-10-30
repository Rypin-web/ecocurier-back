import {NextFunction, Response} from "express";
import {RequestWithUser} from "@/middlewares/requireAuthorization";
import {User} from "@models/User";

export async function getAllUsers(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const page = Number(req.query.page) || 1
        const limit = Math.min(Number(req.query.limit) || 10, 100)
        const offset = (page - 1) * limit
        const users = await User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: {exclude: ['password']}
        })
        return res.status(200).send({
            msg: 'Success get users',
            data: {
                total: users.count,
                users: users.rows
            }
        })
    } catch (e) {
        next(e)
    }
}