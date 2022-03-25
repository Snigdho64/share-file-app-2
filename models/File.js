const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true,
        },
        mimetype: {
            type: String,
            required: true,
        },
        sizeInBytes: {
            type: Number,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        },
        sender: { type: String },
        reciever: { type: String },
    },
    { timestamps: true }
)

module.exports = mongoose.model('File', fileSchema)
