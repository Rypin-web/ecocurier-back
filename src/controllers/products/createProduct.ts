import {RequestWithUser} from "@/middlewares/requireAuthorization";
import {NextFunction, Response} from "express";
import {extractBodyData} from "@utils/extractBodyData";
import {Products} from "@models/Products";
import {convertToWebp} from "@utils/convertToWebp";

export async function createProduct(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const payload = extractBodyData<Products>(req.body, ['title', 'description', 'price'])
        await convertToWebp(req.file)
        if (req.file) payload.image = req.file.filename

        const product = await Products.create(payload as any)
        return res.status(201).send({
            msg: 'Product created successfully',
            data: {
                product: product.dataValues
            }
        })
    } catch (e) {
        next(e)
    }
}