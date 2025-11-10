import {RequestWithUser} from "@/middlewares/requireRole";
import {NextFunction, Response} from "express";
import {sequelize} from "@config/database";
import {Order} from "@models/Order";
import {ApiErrors} from "@utils/ApiErrors";

export async function cancelMyOrder (req:RequestWithUser, res:Response, next:NextFunction) {
    try {
        const result = await sequelize.transaction(async (t) => {
            const orderId = req.params.id
            const order = await Order.findOne({
                where:{
                    id: orderId,
                    userId: req.user?.id,
                    status: 'pending'
                },
                transaction: t
            })
            if (!order) throw ApiErrors.NotFound('Order not found')
            await order.update({status: 'cancelled'}, {transaction: t})
            return order
        })
        return res.status(200).send({
            msg: 'Order cancelled successfully',
            data: result
        })
    } catch (e) {
        next(e)
    }
}