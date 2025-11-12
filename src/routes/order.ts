import {Router} from "express";
import {ENDPOINTS} from "@config/server";
import {requireRole} from "@/middlewares/requireRole";
import {validateCancelMyOrderFields, validateChangeOrderStatusFields, validateGetOrdersFields} from "@config/validations/order";
import { validateFields } from "@/middlewares/validateFields.middleware";
import {getOrders} from "@controllers/order/getOrders";
import {cancelMyOrder} from "@controllers/order/cancelMyOrder";
import {changeOrderStatus} from "@controllers/order/changeOrderStatus";
import {validateMakeOrderFields} from "@config/validations/user";
import {makeOrder} from "@controllers/order/makeOrder";

export var orderRouter = Router();

orderRouter.get(
    ENDPOINTS.def,
    requireRole(['courier', 'admin']),
    validateGetOrdersFields(),
    validateFields,
    getOrders
)
orderRouter.post(
    ENDPOINTS.methods.order,
    requireRole(['user', 'admin']),
    validateMakeOrderFields(),
    validateFields,
    makeOrder
)
orderRouter.put(
    ENDPOINTS.byId,
    requireRole(['courier', 'admin']),
    validateChangeOrderStatusFields(),
    validateFields,
    changeOrderStatus
)
orderRouter.delete(
    ENDPOINTS.byId,
    requireRole(['user', 'admin']),
    validateCancelMyOrderFields(),
    validateFields,
    cancelMyOrder
)