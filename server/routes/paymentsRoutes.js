const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentControllers.js');

// GET all payments
router.get('/payments', paymentController.getAllPayments);

// GET a payment by ID
router.get('/payments/:id', paymentController.getPaymentById);

// POST create a new payment
router.post('/payments', paymentController.createPayment);

// PUT update a payment by ID
router.put('/payments/:id', paymentController.updatePayment);

// DELETE a payment by ID
router.delete('/payments/:id', paymentController.deletePayment);

module.exports = router;
