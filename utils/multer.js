const path = require('path')
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const filename =
            new Date().toLocaleString().replace(/[ :,\/]/gi, '-') +
            file.originalname
        cb(null, filename)
    },
    // destination: (req, file, cb) => {
    //     const dir = path.join(__dirname, '..', 'uploads')
    //     if (!fs.existsSync(dir)) {
    //         fs.mkdirSync(dir, { recursive: true })
    //     }
    //     cb(null, dir)
    // },
})

const fileFilter = (req, file, cb) => {
    const mimetypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/jpg',
        'audio/mpeg',
        'audio/mp3',
        'audio/m4a',
        'audio/mpeg2',
        'video/mp4',
        'video/quicktime',
    ]
    if (!mimetypes.includes(file.mimetype)) {
        req.fileValidationError = 'goes wrong on the mimetype'
        return cb(null, false, new Error('goes wrong on the mimetype'))
    }

    cb(null, true)
}

const upload = multer({ storage, fileFilter })

module.exports = upload
