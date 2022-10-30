const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const postRouter = require('./api/Routes/post/post')
const MONGO_DB_URI = require('./constants/mongoDb')
const app = express()

mongoose.connect(MONGO_DB_URI, () => console.log('mongoose connected'))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATH, DELETE')
        return res.status(200).json({})
    }

    next()
})

app.use('/api/posts', postRouter)

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
        },
    })
})

module.exports = app
