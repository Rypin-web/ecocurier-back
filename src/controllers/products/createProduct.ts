import {NextFunction, Request, Response} from "express";
import {extractBodyData} from "@utils/extractBodyData";
import {Products} from "@models/Products";
import {convertToWebp} from "@utils/convertToWebp";

export async function createProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const payload = extractBodyData<Products>(req.body, ['title', 'description', 'price', "category_id"])
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