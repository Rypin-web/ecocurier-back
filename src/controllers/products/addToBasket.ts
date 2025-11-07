import {NextFunction, Response} from "express";
import {Products} from "@models/Products";
import {ApiErrors} from "@utils/ApiErrors";
import {Basket} from "@models/Basket";
import {RequestWithUser} from "@/middlewares/requireRole";


export async function addToBasket(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const productId = req.params.id
        const userId = req.user?.id
        const quantity = Number(req.query.q)

        const product = await Products.findByPk(productId)
        if (!product) throw ApiErrors.NotFound('Product not found')

        const basket = await Basket.findOne({where: {userId: userId, productId: productId}})
        if(basket) {
            if(basket.quantity + quantity < 1) await basket.destroy()
            else await basket.update({quantity: basket.quantity + quantity})
        } else {
            await Basket.create({userId: userId!, productId: productId, quantity: Math.max(1, quantity)})
        }

        return res.status(200).send({
            msg: 'Success add to basket',
            data: {
                product: product,
                quantity: quantity
            }
        })
    } catch (e) {
        next(e)
    }
}