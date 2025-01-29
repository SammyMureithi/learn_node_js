const { body, validationResult } = require('express-validator');

const validatePost = [
    // Validate title
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),

    // Validate content
    body('content')
        .notEmpty().withMessage('Content is required'),

    // Validate imageUrl
    body('imageUrl')
        .notEmpty()
        .isURL().withMessage('Image URL must be a valid URL'),

    // Validate categoryId
    body('categoryId')
        .notEmpty()
        .isInt({ gt: 0 }).withMessage('Category ID must be a positive integer'),

    // Validate userId
    body('userId')
        .notEmpty().withMessage('User ID is required')
        .isInt({ gt: 0 }).withMessage('User ID must be a positive integer'),

    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validatePost;
