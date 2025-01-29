const { body, validationResult } = require('express-validator');

const validateMedication = [
    body('code')
        .notEmpty().withMessage('Please provide the code'),

    body('weight')
        .notEmpty().withMessage('Please provide the weight'),

    body('name')
        .notEmpty(),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

];

module.exports = validateMedication;