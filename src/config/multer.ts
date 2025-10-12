import multer from "multer";

var types = ['image/png', 'image/jpeg', 'image/jpg']
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + '-' + Math.random() * 1e9)
    }
})

function fileFilter(req, file, cb) {
    if (types.includes(file.mimetype)) {
        return cb(null, true)
    }
    return cb(new Error('File type not supported'), false)
}

var upload = multer({storage, fileFilter})
export {upload}