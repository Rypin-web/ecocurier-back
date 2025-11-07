import {NextFunction, Request, Response} from "express";
import {Categories} from "@models/Categories";
import {ApiErrors} from "@utils/ApiErrors";
import {deleteImage} from "@utils/deleteImage";

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const category = await Categories.findByPk(req.params.id)
        if (!category) throw ApiErrors.NotFound('Category not found')
        await deleteImage(req.file)
        await category.destroy()
        return res.status(200).send({
            msg: 'Category deleted successfully',
            data: {}
        })
    } catch (e) {
        next(e)
    }
}