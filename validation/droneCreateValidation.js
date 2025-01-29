const { body, validationResult } = require('express-validator');

const validateDrone = [
    body('serial_number')
        .notEmpty().withMessage('Please provide the serial number'),

    body('max_weight')
        .notEmpty().withMessage('Please provide the maximum weight'),

    body('battery')
        .notEmpty().withMessage('Please provide the battery'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

];

module.exports = validateDrone;