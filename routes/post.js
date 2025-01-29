const express = require('express');
const postsController = require('../controllers/post.controller');
const validatePost = require('../validation/postValidation');
const router = express.Router();

router.get('/', postsController.getAllPosts);
router.put('/', validatePost, postsController.updatePost);
router.post('/', validatePost, postsController.createPost);


module.exports = router