const { Post } = require('../models'); // Import from models/index.js


async function createPost(req, res) {
    try {
        const { title, content, imageUrl, categoryId, userId } = req.body;

        const newPost = await Post.create({
            title,
            content,
            imageUrl,
            categoryId,
            userId,
        });

        res.status(201).json({
            ok: true,
            message: 'Post created successfully',
            post: newPost,
        });
    } catch (error) {
        console.error('Error creating a post:', error);
        res.status(500).json({
            message: 'An error occurred while creating the post',
            error: error.message,
        });
    }
}

async function getAllPosts(req, res) {
    try {
        // Fetch all posts from the database
        const posts = await Post.findAll(); // Use Sequelize's `findAll` method

        // Send the response with the retrieved posts
        res.status(200).json({
            ok: true,
            status: 'success',
            message: 'Posts retrieved successfully',
            posts: posts,
        });
    } catch (error) {
        console.error('Error retrieving posts:', error);

        // Handle errors and send appropriate response
        res.status(500).json({
            ok: false,
            message: 'An error occurred while retrieving the posts',
            error: error.message,
        });
    }
}


async function updatePost(req, res) {
    try {
        // Extract post ID from the request parameters
        const { id } = req.query;


        // Extract fields to update from the request body
        const { title, content, imageUrl, categoryId, userId } = req.body;

        console.log(id);
        // Find the post by ID
        const post = await Post.findByPk(id);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({
                ok: false,
                message: 'Post not found',
            });
        }

        // Update the post with the new data
        const updatedPost = await post.update({
            title,
            content,
            imageUrl,
            categoryId,
            userId,
            updatedAt: new Date(), // Update the timestamp
        });

        // Send the updated post as the response
        res.status(200).json({
            ok: true,
            message: 'Post updated successfully',
            post: updatedPost,
        });
    } catch (error) {
        console.error('Error updating post:', error);

        // Handle errors and send appropriate response
        res.status(500).json({
            ok: false,
            message: 'An error occurred while updating the post',
            error: error.message,
        });
    }
}

module.exports = { updatePost };






function sayHello(req, resp) {
    resp.json({
        "ok": true,
        "status": "Success",
        "message": "Hellos Sammy Mureithi"
    })
}

module.exports = {
    createPost: createPost,
    getAllPosts: getAllPosts,
    updatePost: updatePost
}