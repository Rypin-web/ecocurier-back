import {NextFunction, Request, Response} from "express";
import {User} from "@models/User";
import {Op} from "sequelize";

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const q = req.query.q
        const sort = req.query.sort as 'ASC' | 'DESC' || 'ASC'
        const sortBy = req.query.sortBy as string || 'createdAt'
        const page = Number(req.query.page) || 1
        const limit = Math.min(Number(req.query.limit) || 10, 100)
        const offset = (page - 1) * limit
        const users = await User.findAndCountAll({
            where: !!q ? { first_name: {[Op.like]: `%${String(q)}%`}}
            : {},
            offset: offset,
            limit: limit,
            order: [[sortBy, sort]],
            attributes: {exclude: ['password']}
        })

        await sleep(1000)

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