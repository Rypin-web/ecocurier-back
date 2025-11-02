import {RequestWithUser} from "@/middlewares/requireAuthorization";
import {NextFunction, Response} from "express";
import {Basket} from "@models/Basket";
import { Products } from "@/models/Products";

export async function showMyBasket(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.id
        const page = Number(req.query.page) || 1
        const limit = Math.min(Number(req.query.limit) || 10, 100)
        const offset = (page - 1) * limit

        const basket = await Basket.findAndCountAll({
            where:{
                userId: userId
            },
            offset: offset,
            include: {
                model: Products,
                attributes: ['id', 'title', 'image', 'price', 'description']
            },
            attributes: ['id', 'quantity']
        })

        return res.status(200).send({
            msg: 'Success get basket',
            data: {
                total: basket.count,
                basket: basket.rows
            }
        })
    } catch (e) {
        next(e)
    }
}