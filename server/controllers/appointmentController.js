const db = require('../db/db.js');

// Get all appointments
exports.getAllAppointments = (req, res) => {
  const query = 'SELECT * FROM appointments';
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving appointments from the database' });
    } else {
      res.json(rows);
    }
  });
};

// Get an appointment by ID
exports.getAppointmentById = (req, res) => {
  const appointmentId = req.params.id;
  const query = 'SELECT * FROM appointments WHERE appointment_id = ?';
  db.get(query, [appointmentId], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving appointment from the database' });
    } else if (!row) {
      res.status(404).json({ error: 'Appointment not found' });
    } else {
      res.json(row);
    }
  });
};

// Create a new appointment
exports.createAppointment = (req, res) => {
  const { patient_id, doctor_id, appointment_date, appointment_time, appointment_status } = req.body;
  const query = 'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, appointment_status) VALUES (?, ?, ?, ?, ?)';
  db.run(query, [patient_id, doctor_id, appointment_date, appointment_time, appointment_status], function (err) {
    if (err) {
      res.status(500).json({ error: 'Error creating appointment' });
    } else {
      res.json({ id: this.lastID });
    }
  });
};

// Update an appointment
exports.updateAppointment = (req, res) => {
  const appointmentId = req.params.id;
  const { patient_id, doctor_id, appointment_date, appointment_time, appointment_status } = req.body;
  const query = 'UPDATE appointments SET patient_id = ?, doctor_id = ?, appointment_date = ?, appointment_time = ?, appointment_status = ? WHERE appointment_id = ?';
  db.run(query, [patient_id, doctor_id, appointment_date, appointment_time, appointment_status, appointmentId], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error updating appointment' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Appointment not found' });
    } else {
      res.sendStatus(200);
    }
  });
};

// Delete an appointment
exports.deleteAppointment = (req, res) => {
  const appointmentId = req.params.id;
  const query = 'DELETE FROM appointments WHERE appointment_id = ?';
  db.run(query, [appointmentId], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting appointment' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Appointment not found' });
    } else {
      res.sendStatus(204);
    }
  });
};



