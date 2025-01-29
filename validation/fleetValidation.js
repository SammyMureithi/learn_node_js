const { body, validationResult } = require('express-validator');
const { Drones, Medication } = require('../models'); // Import models

const validateFleet = [
    body('location')
        .notEmpty().withMessage('Please provide the location'),

    body('drone_id')
        .notEmpty().withMessage('Please provide the drone ID')
        .isInt().withMessage('Drone ID must be a number')
        .custom(async (value) => {
            const drone = await Drones.findByPk(value);
            if (!drone) {
                throw new Error('Drone ID does not exist');
            }
            return true;
        }),

    body('medication_id')
        .notEmpty().withMessage('Please provide the medication ID')
        .isInt().withMessage('Medication ID must be a number')
        .custom(async (value) => {
            const medication = await Medication.findByPk(value);
            if (!medication) {
                throw new Error('Medication ID does not exist');
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateFleet;
