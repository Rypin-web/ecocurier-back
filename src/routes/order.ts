import {Router} from "express";
import {ENDPOINTS} from "@config/server";
import {requireRole} from "@/middlewares/requireRole";
import {validateCancelMyOrder, validateGetOrdersFields} from "@config/validations/order";
import { validateFields } from "@/middlewares/validateFields.middleware";
import {getOrders} from "@controllers/order/getOrders";
import {cancelMyOrder} from "@controllers/order/cancelMyOrder";

export var orderRouter = Router();

orderRouter.get(
    ENDPOINTS.def,
    requireRole(['courier', 'admin']),
    validateGetOrdersFields(),
    validateFields,
    getOrders
)
orderRouter.delete(
    ENDPOINTS.byId,
    requireRole(['user', 'admin']),
    validateCancelMyOrder(),
    validateFields,
    cancelMyOrder
)