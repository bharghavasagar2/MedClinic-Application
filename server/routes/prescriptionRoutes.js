const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController.js');

// Get all prescriptions
router.get('/prescriptions', prescriptionController.getAllPrescriptions);

// Get a prescription by ID
router.get('/prescriptions/:id', prescriptionController.getPrescriptionById);

// Create a new prescription
router.post('/prescriptions', prescriptionController.createPrescription);

// Update a prescription
router.put('/prescriptions/:id', prescriptionController.updatePrescription);

// Delete a prescription
router.delete('/prescriptions/:id', prescriptionController.deletePrescription);

module.exports = router;
