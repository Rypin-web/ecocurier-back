import * as fs from 'fs';
import * as path from "node:path";
import {rootPath} from "@config/server";

export async function deleteImage (file: Express.Multer.File | undefined) {
    if(!file) return
    const imagePath = path.isAbsolute(file.path)
        ? file.path
        : path.join(rootPath, file.path)
    await fs.promises.unlink(imagePath)
}