import { RequestWithUser } from "@/middlewares/requireAuthorization";
import { NextFunction, Response } from "express";
import { Products } from "@models/Products";
import { ApiErrors } from "@utils/ApiErrors";

export async function deleteProduct(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const product = await Products.findByPk(req.params.id);

        if (!product) {
            throw ApiErrors.NotFound('Product not found');
        }

        await product.destroy();

        return res.status(200).send({
            msg: 'Product deleted successfully',
            data: {}
        });
    } catch (e) {
        next(e);
    }
}