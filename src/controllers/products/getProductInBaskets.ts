import {RequestWithUser} from "@/middlewares/requireAuthorization";
import {NextFunction, Response} from "express";
import {Basket} from "@models/Basket";
import {Products} from "@models/Products";
import {User} from "@models/User";
import {ApiErrors} from "@utils/ApiErrors";

export async function getProductInBaskets(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const productId = req.params.id
        const page = Number(req.query.page) || 1
        const limit = Math.min(Number(req.query.limit) || 10, 100)
        const offset = (page - 1) * limit

        const product = await Products.findByPk(productId)
        if (!product) throw ApiErrors.NotFound('Product not found')

        const baskets = await Basket.findAndCountAll({
            where: {
                productId: productId
            },
            offset: offset,
            limit: limit,
            include: {
                model: User,
                attributes: ['id', 'first_name', 'last_name', 'email', 'phone']
            },
            attributes: ['id', 'quantity', 'createdAt'],
            order: [['createdAt', 'DESC']]
        })

        const totalQuantity = await Basket.sum('quantity', {
            where: {
                productId: productId
            }
        }) || 0

        return res.status(200).send({
            msg: 'Success get product in baskets',
            data: {
                productId: productId,
                productTitle: product.title,
                productPrice: product.price,
                totalUsersWithProduct: baskets.count,
                totalQuantityInBaskets: totalQuantity,
                baskets: baskets.rows
            }
        })
    } catch (e) {
        next(e)
    }
}
