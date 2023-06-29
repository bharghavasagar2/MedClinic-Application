const db = require('../db/db.js');

// Get all patients
exports.getAllPatients = (req, res) => {
  const query = 'SELECT * FROM patients';
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving patients from the database' });
    } else {
      res.json(rows);
    }
  });
};

// Get a patient by ID
exports.getPatientById = (req, res) => {
  const patientId = req.params.id;
  const query = 'SELECT * FROM patients WHERE patient_id = ?';
  db.get(query, [patientId], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving patient from the database' });
    } else if (!row) {
      res.status(404).json({ error: 'Patient not found' });
    } else {
      res.json(row);
    }
  });
};

// Create a new patient
exports.createPatient = (req, res) => {
  const { patient_name, patient_age, patient_gender, contact_number, address } = req.body;
  const query = 'INSERT INTO patients (patient_name, patient_age, patient_gender, contact_number, address) VALUES (?, ?, ?, ?, ?)';
  db.run(query, [patient_name, patient_age, patient_gender, contact_number, address], function (err) {
    if (err) {
      res.status(500).json({ error: 'Error creating patient' });
    } else {
      res.json({ id: this.lastID });
    }
  });
};

// Update a patient
exports.updatePatient = (req, res) => {
  const patientId = req.params.id;
  const { patient_name, patient_age, patient_gender, contact_number, address } = req.body;
  const query = 'UPDATE patients SET patient_name = ?, patient_age = ?, patient_gender = ?, contact_number = ?, address = ? WHERE patient_id = ?';
  db.run(query, [patient_name, patient_age, patient_gender, contact_number, address, patientId], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error updating patient' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Patient not found' });
    } else {
      res.sendStatus(200);
    }
  });
};

// Delete a patient
exports.deletePatient = (req, res) => {
  const patientId = req.params.id;
  const query = 'DELETE FROM patients WHERE patient_id = ?';
  db.run(query, [patientId], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting patient' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Patient not found' });
    } else {
      res.sendStatus(204);
    }
  });
};
