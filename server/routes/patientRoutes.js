const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authController = require('../controllers/authController.js');
// Get all patients
router.get('/patients', authController.authenticateToken, patientController.getAllPatients);

// Get a patient by ID
router.get('/patients/:id', authController.authenticateToken, patientController.getPatientById);

// Create a new patient
router.post('/patients', authController.authenticateToken, patientController.createPatient);

// Update a patient
router.put('/patients/:id', authController.authenticateToken, patientController.updatePatient);

// Delete a patient
router.delete('/patients/:id', authController.authenticateToken, patientController.deletePatient);

module.exports = router;
