import {RequestWithUser} from "@/middlewares/requireAuthorization";
import {NextFunction, Response} from "express";
import {validationResult} from "express-validator";
import {ApiErrors} from "@utils/ApiErrors";
import {getUpdateData} from "@utils/getUpdateData";
import {Categories} from "@models/Categories";

export async function updateCategory (req: RequestWithUser, res: Response, next: NextFunction) {
    try{
        const result = validationResult(req)
        if(result.isEmpty()){
            const file = req.file
            const image = file ? file.originalname : undefined
            const payload = getUpdateData(req.body, ['name', 'description', 'image'])
            payload.image = image
            const category = await Categories.findByPk(req.params.id)
            if(!category) throw ApiErrors.NotFound('Category not found')
            await category.update(payload)
            return res.status(200).send({
                msg: 'Category updated successfully',
                data: {
                    category: category.dataValues
                }
            })
        }
        throw ApiErrors.invalidCredentials('Invalid Data', result.array())
    }catch (e) {
        next(e)
    }
}