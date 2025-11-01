import * as fs from 'fs';

export async function deleteImage (file: Express.Multer.File | undefined) {
    if(!file) return
    await fs.promises.unlink(imagePath)
}