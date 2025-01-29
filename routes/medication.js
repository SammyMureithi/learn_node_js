const express = require('express');
const medicationController = require('../controllers/medication.controller');
const validateMedication = require('../validation/medicationValidation');
const router = express.Router();


router.post('/', validateMedication, medicationController.createMedication);
router.get('/', medicationController.getAllMedications);
router.put('/', validateMedication, medicationController.updateMedication);


module.exports = router