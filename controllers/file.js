const asyncError = require('../errors/asyncError')
const APIError = require('../errors/error')
const cloudinary = require('cloudinary')
const File = require('../models/File')
const https = require('https')
const sendMail = require('../utils/nodeMailer')

exports.uploadFile = asyncError(async (req, res, next) => {
    if (!req.file) {
        throw new APIError(404, 'No File Provided')
    }
    const {
        originalname: filename,
        mimetype,
        path,
        size: sizeInBytes,
    } = req.file

    const cloudResult = await cloudinary.v2.uploader.upload(path, {
        folder: 'file_share_app',
        resource_type: 'auto',
        use_filename: true,
        filename_override: filename,
    })

    const { secure_url, public_id: pid } = cloudResult

    const public_id = pid.split('/')[1]

    const saved_file = await File.create({
        filename,
        mimetype,
        sizeInBytes,
        secure_url,
        public_id,
    })

    return res.status(201).send({ success: true, file: saved_file })
})

exports.deleteFile = asyncError(async (req, res, next) => {
    const { public_id } = req.params
    if (!public_id) throw new APIError(404, 'No id Provided')

    const response = await cloudinary.v2.uploader.destroy(
        'file_share_app/' + public_id
    )
    if (response.result !== 'ok') throw new APIError(404, 'No File Found')
    res.send({ success: true, message: 'File deleted Successfully' })
})

exports.getFile = asyncError(async (req, res, next) => {
    const { fileId } = req.params

    const file = await File.findById(fileId)
    if (!file) throw new APIError(404, 'No File Found')
    return res.status(200).send({ success: true, file })
})

exports.downloadFile = asyncError(async (req, res, next) => {
    const { fileId } = req.params

    const file = await File.findById(fileId)
    if (!file) throw new APIError(404, 'No File Found')

    https.get(file.secure_url, (fileStream) => fileStream.pipe(res))
})

exports.sendDownloadEmail = asyncError(async (req, res, next) => {
    const { fileId, to, from } = req.body

    const file = await File.findById(fileId)
    if (!file) throw new APIError(404, 'No File Found')

    const { filename, sizeInBytes, mimetype } = file
    const filesize = (sizeInBytes / (1024 * 1024)).toFixed(2) + 'MB'

    const downloadLink = `${req.protocol}://${req.hostname}:${process.env.PORT}/download/${file._id}`

    
    sendMail(to, from, filename, filesize, mimetype, downloadLink)
    return res
        .status(202)
        .send({ success: true, message: 'Email Sent Successfully' })
})
