import {NextFunction, Request, Response} from "express";
import {ApiErrors} from "@utils/ApiErrors";
import {extractBodyData} from "@utils/extractBodyData";
import {Categories} from "@models/Categories";
import {convertToWebp} from "@utils/convertToWebp";

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
        await convertToWebp(req.file)
        const payload = extractBodyData<Categories>(req.body, ['name', 'description', 'image'])
        if(req.file) payload.image = req.file.filename
        const category = await Categories.findByPk(req.params.id)
        if (!category) throw ApiErrors.NotFound('Category not found')
        await category.update(payload)
        return res.status(200).send({
            msg: 'Category updated successfully',
            data: {
                category: category.dataValues,
                updateData: payload
            }
        })
    } catch (e) {
        next(e)
    }
}