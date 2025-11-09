import {Router} from "express";
import {ENDPOINTS} from "@config/server";
import {requireRole} from "@/middlewares/requireRole";
import {validateGetOrdersFields} from "@config/validations/order";
import { validateFields } from "@/middlewares/validateFields.middleware";
import {getOrders} from "@controllers/order/getOrders";

export var orderRouter = Router();

orderRouter.get(
    ENDPOINTS.def,
    requireRole(['courier', 'admin']),
    validateGetOrdersFields(),
    validateFields,
    getOrders
)