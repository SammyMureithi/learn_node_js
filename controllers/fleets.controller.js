const { Fleet, Drones, Medication } = require('../models');

async function registerFleet(req, res) {
    try {
        const { location, drone_id, medication_id } = req.body;

        // Find the drone by its ID
        const myDrone = await Drones.findByPk(drone_id);
        if (!myDrone) {
            return res.status(404).json({
                ok: false,
                status: "Failed",
                message: "Drone not found"
            });
        }

        // Find the medication by its ID
        const myMedication = await Medication.findByPk(medication_id);
        if (!myMedication) {
            return res.status(404).json({
                ok: false,
                status: "Failed",
                message: "Medication not found"
            });
        }

        // Retrieve drone attributes
        const droneWeight = myDrone.max_weight;
        const medicationWeight = myMedication.weight;
        const droneBattery = myDrone.battery;

        // Validate if the drone can carry the medication
        if (droneWeight < medicationWeight) {
            return res.status(400).json({
                ok: false,
                status: "Failed",
                message: "Medication is too heavy for the drone"
            });
        }

        // Validate if the drone has enough battery
        if (droneBattery < 10) {
            return res.status(400).json({
                ok: false,
                status: "Failed",
                message: "Battery too low, please recharge the drone"
            });
        }

        // Validate if the drone is available
        if (myDrone.state !== "IDLE") {
            return res.status(400).json({
                ok: false,
                status: "Failed",
                message: "Drone is currently in use, please wait"
            });
        }

        // Register a new fleet
        const newFleet = await Fleet.create({
            location,
            drone_id,
            medication_id,
            status: "LOADING"
        });

        // Update the drone state to LOADING
        await myDrone.update({
            state: "LOADING"
        });

        // Include drone and medication names in the response
        res.status(201).json({
            ok: true,
            status: "Success",
            message: "Fleet started successfully",
            fleet: {
                id: newFleet.id,
                location: newFleet.location,
                status: newFleet.status,
                drone: {
                    id: myDrone.id,
                    name: myDrone.name,  // Include drone name
                    serial_number: myDrone.serial_number,
                    max_weight: myDrone.max_weight,
                    battery: myDrone.battery,
                    state: myDrone.state
                },
                medication: {
                    id: myMedication.id,
                    name: myMedication.name,  // Include medication name
                    weight: myMedication.weight,
                    code: myMedication.code
                },
                createdAt: newFleet.createdAt,
                updatedAt: newFleet.updatedAt
            }
        });

    } catch (error) {
        console.error("Error registering fleet:", error);
        res.status(500).json({
            ok: false,
            status: "Failed",
            message: "Error occurred while starting a fleet",
            error: error.message
        });
    }
}


async function startActivity(req, res) {
    try {
        const { fleet_id, activity } = req.params;

        // Map activity to fleet state
        const activityStates = {
            load: "LOADING",
            transport: "IN TRANSIT",
            deliver: "DELIVERING",
            return: "IDLE"
        };

        // Validate if the provided activity is valid
        if (!activityStates[activity]) {
            return res.status(400).json({
                ok: false,
                status: "Failed",
                message: "Invalid activity. Allowed values: 'load', 'transport', 'deliver' ,'return'."
            });
        }

        const state = activityStates[activity];

        // Find the fleet by its ID
        const myFleet = await Fleet.findByPk(fleet_id);
        if (!myFleet) {
            return res.status(404).json({
                ok: false,
                status: "Failed",
                message: "Fleet not found"
            });
        }

        // Find the related drone and medication
        const myDrone = await Drones.findByPk(myFleet.drone_id);
        const myMedication = await Medication.findByPk(myFleet.medication_id);

        if (!myDrone || !myMedication) {
            return res.status(404).json({
                ok: false,
                status: "Failed",
                message: "Drone or Medication not found"
            });
        }

        // Validate if the medication is too heavy for the drone
        if (myMedication.weight > myDrone.max_weight) {
            return res.status(400).json({
                ok: false,
                status: "Failed",
                message: `Medication is too heavy for the drone. Maximum weight: ${myDrone.max_weight}, Medication weight: ${myMedication.weight}`
            });
        }

        // Ensure the fleet is in a valid state before updating
        if (activity === "load" && myFleet.status !== "IDLE") {
            return res.status(400).json({
                ok: false,
                status: "Failed",
                message: "The fleet must be IDLE before loading."
            });
        }
        if (activity === "transport" && myFleet.status !== "LOADING") {
            return res.status(400).json({
                ok: false,
                status: "Failed",
                message: "The fleet must be LOADING before transport."
            });
        }
        if (activity === "deliver" && myFleet.status !== "IN TRANSIT") {
            return res.status(400).json({
                ok: false,
                status: "Failed",
                message: "The fleet must be IN TRANSIT before delivery."
            });
        }

        // Update the drone and fleet status
        await myDrone.update({ state });
        await myFleet.update({ status: state });

        // Include drone and medication names in the response
        res.status(200).json({
            ok: true,
            status: "Success",
            message: `Goods are now in ${activity.toUpperCase()}`,
            fleet: {
                id: myFleet.id,
                location: myFleet.location,
                status: myFleet.status,
                drone: {
                    id: myDrone.id,
                    name: myDrone.name,
                    serial_number: myDrone.serial_number,
                    max_weight: myDrone.max_weight,
                    battery: myDrone.battery,
                    state: myDrone.state
                },
                medication: {
                    id: myMedication.id,
                    name: myMedication.name,
                    weight: myMedication.weight,
                    code: myMedication.code
                },
                createdAt: myFleet.createdAt,
                updatedAt: myFleet.updatedAt
            }
        });

    } catch (error) {
        console.error("Error starting fleet activity:", error);
        res.status(500).json({
            ok: false,
            status: "Failed",
            message: "Error occurred while updating fleet activity",
            error: error.message
        });
    }
}



module.exports = {
    registerFleet: registerFleet,
    startActivity: startActivity
};
