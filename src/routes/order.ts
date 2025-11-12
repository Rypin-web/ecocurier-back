import {Router} from "express";
import {ENDPOINTS} from "@config/server";
import {requireRole} from "@/middlewares/requireRole";
import {validateCancelMyOrderFields, validateChangeOrderStatusFields, validateGetOrdersFields} from "@config/validations/order";
import { validateFields } from "@/middlewares/validateFields.middleware";
import {getOrders} from "@controllers/order/getOrders";
import {cancelMyOrder} from "@controllers/order/cancelMyOrder";
import {changeOrderStatus} from "@controllers/order/changeOrderStatus";

export var orderRouter = Router();

orderRouter.get(
    ENDPOINTS.def,
    requireRole(['courier', 'admin']),
    validateGetOrdersFields(),
    validateFields,
    getOrders
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