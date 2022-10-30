const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    author: { type: String, required: true },
    shortDescription: { type: String, required: true },
    imageUrl: { type: String, required: true },

    description: String,
    createdAt: Number,
    updatedAt: Number,
})

module.exports = mongoose.model('Post', postSchema)
