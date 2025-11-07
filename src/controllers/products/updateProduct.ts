import {NextFunction, Request, Response} from "express";
import {extractBodyData} from "@utils/extractBodyData";
import {Products} from "@models/Products";
import {convertToWebp} from "@utils/convertToWebp";
import {ApiErrors} from "@utils/ApiErrors";

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
    await convertToWebp(req.file)

    const payload = extractBodyData<Products>(req.body, ['title', 'price', 'description', 'category_id'])
    if(req.file) payload.image = req.file.filename

    const product = await Products.findByPk(req.params.id)
    if(!product) throw ApiErrors.NotFound('Product not found')

    await product.update(payload)
    return res.status(200).send({
        msg: 'Product updated successfully',
        data: {
            product: product.dataValues,
            updateData: payload
        },

    })
}