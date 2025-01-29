const express = require('express');
const droneController = require('../controllers/drones.controller');
const validateDrone = require('../validation/droneCreateValidation');
const router = express.Router();


router.post('/', validateDrone, droneController.createDrone);
router.get('/', droneController.getAllDrones);
router.put('/', validateDrone, droneController.updateDrone);

module.exports = router