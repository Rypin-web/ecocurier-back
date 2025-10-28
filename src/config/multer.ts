import multer, {FileFilterCallback} from "multer";
import {Request} from "express";
import * as path from "node:path";

var types = ['image/png', 'image/jpeg', 'image/jpg']
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  'uploads/')
    },
    filename: function (req, file, cb) {
        const filenameArray = file.originalname.split('.')
        const filetype = filenameArray.pop()
        cb(null, filenameArray.join('.') + '-' + Date.now() + '-' + Math.round(Math.random() * 1e9) + '.' + filetype)
    }
})

function fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    console.log(file)
    if (types.includes(file.originalname.split('.').join('/'))) {
        return cb(null, true)
    } else
        return cb(null, false)
}

var upload = multer({storage, fileFilter})
export {upload}