import {RequestWithUser} from "@/middlewares/requireAuthorization";
import {NextFunction, Response} from "express";
import {validationResult} from "express-validator";
import {Categories} from "@models/Categories";
import {ApiErrors} from "@utils/ApiErrors";

export async function deleteCategory(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const result = validationResult(req)
        if (result.isEmpty()) {
            const category = await Categories.findByPk(req.params.id)
            if (!category) throw ApiErrors.NotFound('Category not found')
            await category.destroy()
            return res.status(200).send({
                msg: 'Category deleted successfully',
                data: {}
            })
        }
        throw ApiErrors.invalidCredentials('Invalid Data', result.array())
    } catch (e) {
        next(e)
    }
}