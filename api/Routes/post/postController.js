const postDb = require('../../models/post')
const appConstants = require('../../../constants/common')
const mongoose = require('mongoose')

const postController = {
    async getAll(request, response) {
        const page = parseInt(request.query.page) || appConstants.CURRENT_PAGE
        const limit = parseInt(request.query.limit) || appConstants.CURRENT_LIMIT

        const startIdx = (page - 1) * limit
        const endIdx = page * limit

        const postList = await postDb
            .find()
            .select('title author shortDescription description imageUrl updatedAt createdAt')
            .exec()
            .then()
            .catch((error) => {
                console.log('get all error', error)
                response.status(400).json({
                    error: {
                        message: error.message,
                    },
                })
            })

        const totalPage = Math.ceil(postList.length / limit)
        const total = postList.length

        const pagination = {
            page: page,
            limit: limit,
            totalPage: totalPage,
            total: total,
        }

        response.status(200).json({
            message: 'success',
            data: {
                data: postList.slice(startIdx, endIdx),
                pagination: pagination,
            },
        })
    },

    async get(request, response) {
        const postId = request.params.postId

        const post = await postDb
            .findById(postId)
            .select('title author shortDescription description imageUrl updatedAt createdAt')
            .exec()
            .then()
            .catch((error) => {
                console.log('get error', error)
                response.status(400).json({
                    error: {
                        message: error.message,
                    },
                })
            })

        response.status(200).json({
            message: 'success',
            data: {
                data: post,
            },
        })
    },

    async add(request, response) {
        const newPostDb = new postDb({
            _id: mongoose.Types.ObjectId(),
            createdAt: new Date(),

            title: request.body.title,
            author: request.body.author,
            shortDescription: request.body.shortDescription,
            imageUrl: request.body.imageUrl,
            description: request.body.description,
        })

        const result = await newPostDb
            .save()
            .then()
            .catch((error) => {
                console.log('add error', error)
                response.status(400).json({
                    error: {
                        message: error.message,
                    },
                })
            })

        response.status(200).json({
            message: 'success',
            data: {
                data: result,
            },
        })
    },

    async update(request, response) {
        const postId = request.params.postId

        const result = await postDb
            .updateOne(
                { _id: postId },
                {
                    $set: {
                        title: request.body.title,
                        author: request.body.author,
                        shortDescription: request.body.shortDescription,
                        description: request.body.description,
                        imageUrl: request.body.imageUrl,
                        updatedAt: new Date(),
                    },
                }
            )
            .catch((error) => {
                console.log('update  error', error)
                response.status(400).json({
                    error: {
                        message: error.message,
                    },
                })
            })

        response.status(200).json({
            message: 'success',
            data: {
                data: result,
            },
        })
    },

    async delete(request, response) {
        const postId = request.params.postId

        await postDb
            .remove({ _id: postId })
            .exec()
            .then()
            .catch((error) => {
                console.log(error)
                response.status(400).json({
                    error: {
                        message: error.message,
                    },
                })
            })

        response.status(200).json({
            message: `Deleted post ${postId} success`,
            data: null,
        })
    },
}

module.exports = postController
