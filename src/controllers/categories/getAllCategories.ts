import {RequestWithUser} from "@/middlewares/requireAuthorization";
import {NextFunction, Response} from "express";
import {validationResult} from "express-validator";
import {ApiErrors} from "@utils/ApiErrors";
import {Categories} from "@models/Categories";

export async function getAllCategories (req:RequestWithUser, res:Response, next:NextFunction) {
    try{
        const result = validationResult(req)

        if(result.isEmpty()){
            const page = Number(req.query.page) || 1
            const limit = Math.min(Number(req.query.limit) || 10, 100)
            const offset = (page - 1) * limit
            const categories = await Categories.findAndCountAll({
                offset:offset,
                limit:limit,
                attributes:{exclude:['password']}
            })
            return res.status(200).send({
                msg:'Success get categories',
                data:{
                    total: categories.count,
                    categories: categories.rows
                }
            })
        }

        throw ApiErrors.validationFields('Invalid data', result.array())
    } catch (e) {
        next(e)
    }
}