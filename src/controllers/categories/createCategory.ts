import {NextFunction, Request, Response} from "express";
import {Categories} from "@models/Categories";
import {ApiErrors} from "@utils/ApiErrors";
import {convertToWebp} from "@utils/convertToWebp";

export async function createCategory(req: Request, res: Response, next: NextFunction) {
    try {
        await convertToWebp(req.file)
        const {name, description} = req.body
        const file = req.file as Express.Multer.File | undefined
        const image = file ? file.filename : undefined

        const exists = await Categories.findOne({where: {name}})
        if (exists) throw ApiErrors.alreadyExist('Category already exists')

        const payload: Partial<Categories> = {
            name,
        }
        if (description) payload.description = description
        if (image) payload.image = image

        const category = await Categories.create(payload as any)

        res.status(201).send({
            msg: 'category is created: ' + category.dataValues.name,
            data: {
                category: category.dataValues
            }
        })
        return
    } catch (e) {
        next(e)
    }
}

