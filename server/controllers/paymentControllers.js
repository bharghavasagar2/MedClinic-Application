const db = require('../db/db.js');

// Get all payments
exports.getAllPayments = (req, res) => {
  const sql = 'SELECT * FROM Payments';
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to retrieve payments' });
    } else {
      res.json(rows);
    }
  });
};

// Get a payment by ID
exports.getPaymentById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM Payments WHERE payment_id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to retrieve payment' });
    } else if (!row) {
      res.status(404).json({ error: 'Payment not found' });
    } else {
      res.json(row);
    }
  });
};

// Create a new payment
exports.createPayment = (req, res) => {
  const { patient_id, appointment_id, payment_date, payment_amount, payment_status } = req.body;
  const sql = 'INSERT INTO Payments (patient_id, appointment_id, payment_date, payment_amount, payment_status) VALUES (?, ?, ?, ?, ?)';
  db.run(sql, [patient_id, appointment_id, payment_date, payment_amount, payment_status], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to create payment' });
    } else {
      res.status(201).json({ message: 'Payment created', payment_id: this.lastID });
    }
  });
};

// Update a payment by ID
exports.updatePayment = (req, res) => {
  const { id } = req.params;
  const { patient_id, appointment_id, payment_date, payment_amount, payment_status } = req.body;
  const sql = 'UPDATE Payments SET patient_id = ?, appointment_id = ?, payment_date = ?, payment_amount = ?, payment_status = ? WHERE payment_id = ?';
  db.run(sql, [patient_id, appointment_id, payment_date, payment_amount, payment_status, id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to update payment' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Payment not found' });
    } else {
      res.json({ message: 'Payment updated' });
    }
  });
};

// Delete a payment by ID
exports.deletePayment = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Payments WHERE payment_id = ?';
  db.run(sql, [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to delete payment' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Payment not found' });
    } else {
      res.json({ message: 'Payment deleted' });
    }
  });
};
