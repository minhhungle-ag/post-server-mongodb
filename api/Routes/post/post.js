const express = require('express')
const postController = require('./postController')
const router = express.Router()

router.get('/', (request, response) => postController.getAll(request, response))
router.get('/:postId', (request, response) => postController.get(request, response))
router.post('/', (request, response) => postController.add(request, response))
router.put('/:postId', (request, response) => postController.update(request, response))
router.delete('/:postId', (request, response) => postController.delete(request, response))

module.exports = router
