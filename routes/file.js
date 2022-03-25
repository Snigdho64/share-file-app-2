const {
    uploadFile,
    deleteFile,
    getFile,
    downloadFile,
    sendDownloadEmail,
} = require('../controllers/file')
const upload = require('../utils/multer')

const router = require('express').Router()

router.post('/upload', upload.single('file'), uploadFile)

router.get('/file/:fileId', getFile)
router.get('/file/:fileId/download', downloadFile)

router.post('/file/send_mail', sendDownloadEmail)

router.delete('/delete/:public_id', deleteFile)

module.exports = router
