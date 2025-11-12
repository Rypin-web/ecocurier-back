import {RequestWithUser} from "@/middlewares/requireRole";
import {NextFunction, Response} from "express";
import {Order} from "@models/Order";
import {ApiErrors} from "@utils/ApiErrors";
import {sequelize} from "@config/database";
import {User} from "@/models/User";

type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled';

type changeOrderStatusBody = {
    status: OrderStatus;
    courierId?: string;
}

export async function changeOrderStatus(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const result = await sequelize.transaction(async (t) => {
            const {orderId} = req.params;
            const {status, courierId} = req.body as changeOrderStatusBody;
            const userRole = req.user?.role;
            const userId = req.user?.id;
            if (!status) throw ApiErrors.validationFields('Status is required');

            const order = await Order.findByPk(orderId, {transaction: t});
            if (!order) throw ApiErrors.validationFields('Order not found');

            if (userRole === 'courier') {
                if (status !== 'shipped' && status !== 'delivered') throw ApiErrors.requireAdministrator('Courier can only accept (shipped) or deliver orders');
                if (status === 'shipped') {
                    const activeOrders = await Order.count({
                        where: {
                            courierId: userId,
                            status: 'shipped'
                        },
                        transaction: t
                    });
                    if (activeOrders > 0) throw ApiErrors.validationFields('Courier cannot accept more than one order at a time');

                    if (order.status !== 'pending') throw ApiErrors.validationFields('Only pending orders can be accepted');
                    await order.update({courierId: userId, status: 'shipped'}, {transaction: t})
                }

                if (status === 'delivered') {
                    if (order.status !== 'shipped') throw ApiErrors.validationFields('Only shipped orders can be delivered');
                    if (order.courierId !== userId) throw ApiErrors.requireAdministrator('You can only deliver orders assigned to you');

                    await order.update({status: 'delivered'}, {transaction: t})
                }
            } else if (userRole === 'admin') {
                if (status === 'shipped') {
                    if (!courierId) throw ApiErrors.validationFields('Admin must specify courierId when accepting order');

                    const courier = await User.findOne({
                        where: {id: courierId, role: 'courier'},
                        transaction: t
                    });
                    if (!courier) throw ApiErrors.validationFields('Invalid courier ID');

                    const activeOrders = await Order.count({
                        where: {
                            courierId: courier.id,
                            status: 'shipped'
                        },
                        transaction: t
                    });
                    if (activeOrders > 0) throw ApiErrors.validationFields('This courier already has an active order');

                    await order.update({courierId: courier.id}, {transaction: t})
                } else {
                    if (status === 'delivered' && order.status !== 'shipped') throw ApiErrors.validationFields('Only shipped orders can be delivered');
                    if (status === 'pending' && order.status !== 'pending') throw ApiErrors.validationFields('Cannot revert order to pending status');

                    await order.update({status: status}, {transaction: t})
                }
            } else throw ApiErrors.requireAdministrator('Only couriers and admins can update order status');

            return order;
        });

        return res.status(200).send({
            msg: 'Order status updated successfully',
            data: {
                order: result
            }
        });
    } catch (e) {
        next(e);
    }
}