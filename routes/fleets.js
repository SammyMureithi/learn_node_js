const express = require('express');
const fleetController = require('../controllers/fleets.controller');
const validateFleet = require('../validation/fleetValidation');
const router = express.Router();


router.post('/', validateFleet, fleetController.registerFleet);
router.put('/:activity/:fleet_id', fleetController.startActivity);

module.exports = router