const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Get all appointments
router.get('/appointments', appointmentController.getAllAppointments);

// Get an appointment by ID
router.get('/appointments/:id', appointmentController.getAppointmentById);

// Create a new appointment
router.post('/appointments', appointmentController.createAppointment);

// Update an appointment
router.put('/appointments/:id', appointmentController.updateAppointment);

// Delete an appointment
router.delete('/appointments/:id', appointmentController.deleteAppointment);

module.exports = router;
