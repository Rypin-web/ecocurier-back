import {NextFunction, Request, Response} from "express";
import {Categories} from "@models/Categories";
import {Op} from "sequelize";

const delay = (t:number) => new Promise(resolve => setTimeout(resolve, t))

export async function getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
        const page = Number(req.query.page) || 1
        const limit = Math.min(Number(req.query.limit) || 10, 100)
        const q = req.query.q
        const offset = (page - 1) * limit
        await delay(1000)
        const categories = await Categories.findAndCountAll({
            where: !!q ? { name: {[Op.like]: `%${String(q)}%`}}
            : {},
            offset: offset,
            limit: limit,
        })
        return res.status(200).send({
            msg: 'Success get categories',
            data: {
                total: categories.count,
                data: categories.rows
            }
        })
    } catch (e) {
        next(e)
    }
}