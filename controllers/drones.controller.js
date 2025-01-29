const { Drones } = require('../models');

/**
 * Create a new drone
 */
async function createDrone(req, res) {
    try {
        const { serial_number, max_weight, battery, name } = req.body;

        const newDrone = await Drones.create({
            name,
            serial_number,
            max_weight,
            battery,
            state: "IDLE"
        });

        res.status(201).json({
            ok: true,
            message: 'Drone created successfully',
            drone: newDrone,
        });
    } catch (error) {
        console.error('Error creating a drone:', error);
        res.status(500).json({
            message: 'An error occurred while creating the drone',
            error: error.errors ? error.errors.map((err) => err.message) : error.message,
        });
    }
}

/**
 * Get all drones
 */
async function getAllDrones(req, res) {
    try {
        const drones = await Drones.findAll(); // Retrieve all records
        res.status(200).json({
            ok: true,
            message: 'Drones retrieved successfully',
            drones,
        });
    } catch (error) {
        console.error('Error fetching drones:', error);
        res.status(500).json({
            message: 'An error occurred while fetching drones',
            error: error.message,
        });
    }
}

/**
 * Update an existing drone
 */
async function updateDrone(req, res) {
    try {
        const { id } = req.params;
        const { serial_number, max_weight, battery, name, state } = req.body;

        // Check if the drone exists
        const drone = await Drones.findByPk(id);
        if (!drone) {
            return res.status(404).json({ message: 'Drone not found' });
        }

        // Update the drone
        await drone.update({
            name: name || drone.name,
            serial_number: serial_number || drone.serial_number,
            max_weight: max_weight || drone.max_weight,
            battery: battery || drone.battery,
            state: state || drone.state,
        });

        res.status(200).json({
            ok: true,
            message: 'Drone updated successfully',
            drone,
        });
    } catch (error) {
        console.error('Error updating a drone:', error);
        res.status(500).json({
            message: 'An error occurred while updating the drone',
            error: error.errors ? error.errors.map((err) => err.message) : error.message,
        });
    }
}

module.exports = {
    createDrone,
    getAllDrones,
    updateDrone
};
