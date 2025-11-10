import {RequestWithUser} from "@/middlewares/requireRole";
import {NextFunction, Response} from "express";
import {extractBodyData} from "@utils/extractBodyData";
import {Order} from "@models/Order";
import {Basket} from "@models/Basket";
import {Products} from "@models/Products";
import {ApiErrors} from "@utils/ApiErrors";
import {sequelize} from "@config/database";
import {OrderItem} from "@models/OrderItem";

export async function makeOrder(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const result = await sequelize.transaction(async (t) => {
            const orderPayload = extractBodyData<Order>(req.body, ['deliveryAddress'])
            orderPayload.userId = req.user?.id
            orderPayload.status = 'pending'

            const userBasket = await Basket.findAll({
                where: {
                    userId: req.user?.id
                },
                include: {
                    model: Products,
                    attributes: ['id', 'title', 'image', 'price', 'description']
                },
                attributes: ['id', 'quantity'],
                transaction: t
            }) as (Basket & { product: Products })[]

            if (userBasket.length < 1) throw ApiErrors.validationFields('Basket is empty')

            orderPayload.totalPrice = userBasket.reduce(
                (pv, cv) => pv + cv.quantity * cv.product.price,
                0
            )

            const order = await Order.create(orderPayload as any, {transaction: t})
            const orderItemsData = userBasket.map((item) => ({
                orderId: order.id,
                productId: item.product.id,
                quantity: item.quantity
            }))
            const orderItems = await OrderItem.bulkCreate(orderItemsData, {transaction: t})
            await Basket.destroy({where: {userId: req.user?.id}, transaction: t})

            return {order, orderItems}
        })
        return res.status(201).send({
            msg: 'Success make order',
            data: {
                order: result.order,
                orderItems: result.orderItems
            }
        })
    } catch (e) {
        next(e)
    }
}