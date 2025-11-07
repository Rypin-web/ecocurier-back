import {NextFunction, Request, Response} from "express";
import {Basket} from "@models/Basket";
import {Products} from "@models/Products";
import {User} from "@models/User";
import {ApiErrors} from "@utils/ApiErrors";

export async function getUserBasket(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.params.id
        const page = Number(req.query.page) || 1
        const limit = Math.min(Number(req.query.limit) || 10, 100)
        const offset = (page - 1) * limit

        const user = await User.findByPk(userId)
        if (!user) throw ApiErrors.NotFound('User not found')

        const basket = await Basket.findAndCountAll({
            where: {
                userId: userId
            },
            offset: offset,
            limit: limit,
            include: {
                model: Products,
                attributes: ['id', 'title', 'image', 'price', 'description']
            },
            attributes: ['id', 'quantity']
        })

        return res.status(200).send({
            msg: 'Success get user basket',
            data: {
                userId: userId,
                userName: `${user.first_name} ${user.last_name || ''}`.trim(),
                userEmail: user.email,
                total: basket.count,
                basket: basket.rows
            }
        })
    } catch (e) {
        next(e)
    }
}
