require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const fileRoute = require('./routes/file')
const path = require('path')

// CROSS_ORIGIN
app.use(cors())

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

// ROUTES HANDLING
app.use('/api', fileRoute)

// ERROR HANDLING
app.use((err, req, res, next) => {
    console.log(err.name, err.message, err.stack)
    res.status(err.httpCode || 500).json({ message: err.message })
})

// FOR PRODUCTION
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, './client/build')))

    app.get('*', function (request, response) {
        response.sendFile(
            path.resolve(__dirname, './client/build', 'index.html')
        )
    })
}

const mongoose = require('mongoose')
const cloudinaryConfig = require('./utils/cloudinary')

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI, (err, obj) => {
    if (err) return console.log(err)
    console.log('connected to Mongoose')
})

// CLOUDINARY CONFIG
cloudinaryConfig()

// SERVER CONNECTION
const server = app.listen(process.env.PORT, (err, obj) => {
    console.log('listening on port', process.env.PORT)
})

// SOCKET CONNECTION
const socket = require('socket.io')

const io = socket(server)

io.on('error', (err) => console.log(err))

io.on('connection', (socket) => {
    console.log('new socket connection', socket.id)
})
