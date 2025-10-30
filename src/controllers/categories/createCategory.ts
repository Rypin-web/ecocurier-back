import {NextFunction, Request, Response} from "express";
import {Categories} from "@models/Categories";
import {ApiErrors} from "@utils/ApiErrors";
import {convertToWebp} from "@utils/convertToWebp";
import {extractBodyData} from "@utils/extractBodyData";

export async function createCategory(req: Request, res: Response, next: NextFunction) {
    try {
        await convertToWebp(req.file)
        const payload = extractBodyData<Categories>(req.body, ['name', 'description'])
        const file = req.file as Express.Multer.File | undefined
        const image = file ? file.filename : undefined

        const exists = await Categories.findOne({where: {name: payload.name}})
        if (exists) throw ApiErrors.alreadyExist('Category already exists')
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

