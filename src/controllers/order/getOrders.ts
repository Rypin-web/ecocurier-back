import {RequestWithUser} from "@/middlewares/requireRole";
import {NextFunction, Response} from "express";
import {Order} from "@models/Order";
import {User} from "@models/User";


export async function getOrders(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const offset = (page - 1) * limit
        const status = req.query.status as string || 'pending'
        const order = req.query.order as string || 'DESC'

        const orders = req.user?.role === 'courier'
            ? await Order.findAndCountAll({
                where: {
                    status: 'pending'
                },
                offset,
                limit,
                include: {
                    model: User,
                    as: 'customer',
                    attributes: ['id', 'first_name', 'last_name']
                },
                order: [['createdAt', 'ASC']]
            })
            : req.user?.role === 'user'
                ? await Order.findAndCountAll({
                    where: {
                        userId: req.user?.id
                    },
                    offset,
                    limit,
                    include: {
                        model: User,
                        as: 'customer',
                        attributes: ['id', 'first_name', 'last_name']
                    },
                    order: [['createdAt', 'DESC']]
                })
                : await Order.findAndCountAll({
                    where: {
                        status: status
                    },
                    offset: offset,
                    limit: limit,
                    include: {
                        model: User,
                        as: 'customer',
                        attributes: ['id', 'first_name', 'last_name', 'email', 'phone']
                    },
                    order: [['createdAt', order]]
                })

        return res.status(200).send({
            msg: 'Success get orders',
            data: {
                total: orders.count,
                orders: orders.rows
            }
        })
    } catch (e) {
        next(e)
    }
}