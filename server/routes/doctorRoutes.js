const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Get all doctors
router.get('/doctors', authController.authenticateToken, doctorController.getAllDoctors);

// Get a doctor by ID
router.get('/doctors/:id', doctorController.getDoctorById);

// Create a new doctor
router.post('/doctors', doctorController.createDoctor);

// Update a doctor
router.put('/doctors/:id', doctorController.updateDoctor);

// Delete a doctor
router.delete('/doctors/:id', doctorController.deleteDoctor);

module.exports = router;
