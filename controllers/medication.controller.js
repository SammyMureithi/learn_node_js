const { Medication } = require('../models');

/**
 * Create a new medication
 */
async function createMedication(req, res) {
    try {
        const { name, code, weight } = req.body;

        // Create the medication record
        const newMedication = await Medication.create({
            name,
            code,
            weight
        });

        res.status(201).json({
            ok: true,
            message: "Medication created successfully",
            status: "success",
            medication: newMedication
        });
    } catch (error) {
        console.error("Error creating medication:", error);
        res.status(500).json({
            message: 'An error occurred while creating the medication',
            error: error.errors ? error.errors.map((err) => err.message) : error.message,
        });
    }
}


async function getAllMedications(req, res) {
    try {
        const medications = await Medication.findAll(); // Retrieve all records
        res.status(200).json({
            ok: true,
            message: 'Medications retrieved successfully',
            medications,
        });
    } catch (error) {
        console.error("Error fetching medications:", error);
        res.status(500).json({
            message: 'An error occurred while fetching medications',
            error: error.message,
        });
    }
}

/**
 * Update a medication
 */
async function updateMedication(req, res) {
    try {
        const { id } = req.params;
        const { name, code, weight } = req.body;

        // Check if the medication exists
        const medication = await Medication.findByPk(id);
        if (!medication) {
            return res.status(404).json({ message: 'Medication not found' });
        }

        // Update the medication
        await medication.update({
            name: name || medication.name,
            code: code || medication.code,
            weight: weight || medication.weight,
        });

        res.status(200).json({
            ok: true,
            message: 'Medication updated successfully',
            medication,
        });
    } catch (error) {
        console.error("Error updating medication:", error);
        res.status(500).json({
            message: 'An error occurred while updating the medication',
            error: error.errors ? error.errors.map((err) => err.message) : error.message,
        });
    }
}

module.exports = {
    createMedication,
    getAllMedications,
    updateMedication,
};
