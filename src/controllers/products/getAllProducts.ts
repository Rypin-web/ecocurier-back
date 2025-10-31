import {NextFunction, Response} from "express";
import {Products} from "@models/Products";
import {Categories} from "@models/Categories";
import {RequestWithUser} from "@/middlewares/requireAuthorization";

export async function getAllProducts(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 10, 100);
        const offset = (page - 1) * limit;
        const products = await Products.findAndCountAll({
            offset: offset,
            limit: limit,
            include: [{
                model: Categories,
                attributes: ['id', 'name', 'image']
            }]
        });
        
        return res.status(200).send({
            msg: 'Success get products',
            data: {
                total: products.count,
                products: products.rows
            }
        });
    } catch (e) {
        next(e);
    }
}