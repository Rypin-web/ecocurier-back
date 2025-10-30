import * as path from "node:path";
import {rootPath} from "@config/server";
import sharp from "sharp";
import * as fs from "node:fs";

export async function convertToWebp(file: Express.Multer.File | undefined) {
    if (!file) return

    const imagePath = path.resolve(rootPath, file.path)
    const filetype = file.filename.split('.').pop()
    const wepbPath = path.resolve(rootPath, file.path.replace(filetype!, 'webp'))

    await sharp(imagePath).webp({quality: 80}).toFile(wepbPath)
    await fs.promises.unlink(imagePath)
    file.filename = file.filename.replace(filetype!, 'webp')
}