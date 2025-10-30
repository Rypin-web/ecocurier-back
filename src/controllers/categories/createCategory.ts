import {NextFunction, Request, Response} from "express";
import {Categories} from "@models/Categories";
import {convertToWebp} from "@utils/convertToWebp";
import {extractBodyData} from "@utils/extractBodyData";

export async function createCategory(req: Request, res: Response, next: NextFunction) {
    try {
        await convertToWebp(req.file)
        const payload = extractBodyData<Categories>(req.body, ['name', 'description'])
        const file = req.file as Express.Multer.File | undefined
        const image = file ? file.filename : undefined
        if (image) payload.image = image

        const category = await Categories.create(payload as any)
        return res.status(201).send({
            msg: 'category is created: ' + category.dataValues.name,
            data: {
                category: category.dataValues
            }
        })
    } catch (e) {
        next(e)
    }
}

