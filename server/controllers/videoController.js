const db = require('../db/db.js');

// Get all video consultations
exports.getAllVideoConsultations = (req, res) => {
  const sql = 'SELECT * FROM VideoConsultations';
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to retrieve video consultations' });
    } else {
      res.json(rows);
    }
  });
};

// Get a video consultation by ID
exports.getVideoConsultationById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM VideoConsultations WHERE consultation_id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to retrieve video consultation' });
    } else if (!row) {
      res.status(404).json({ error: 'Video consultation not found' });
    } else {
      res.json(row);
    }
  });
};

// Create a new video consultation
exports.createVideoConsultation = (req, res) => {
  const { patient_id, doctor_id, consultation_date, consultation_duration, consultation_status } = req.body;
  const sql = 'INSERT INTO VideoConsultations (patient_id, doctor_id, consultation_date, consultation_duration, consultation_status) VALUES (?, ?, ?, ?, ?)';
  db.run(sql, [patient_id, doctor_id, consultation_date, consultation_duration, consultation_status], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to create video consultation' });
    } else {
      res.status(201).json({ message: 'Video consultation created', consultation_id: this.lastID });
    }
  });
};

// Update a video consultation by ID
exports.updateVideoConsultation = (req, res) => {
  const { id } = req.params;
  const { patient_id, doctor_id, consultation_date, consultation_duration, consultation_status } = req.body;
  const sql = 'UPDATE VideoConsultations SET patient_id = ?, doctor_id = ?, consultation_date = ?, consultation_duration = ?, consultation_status = ? WHERE consultation_id = ?';
  db.run(sql, [patient_id, doctor_id, consultation_date, consultation_duration, consultation_status, id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to update video consultation' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Video consultation not found' });
    } else {
      res.json({ message: 'Video consultation updated' });
    }
  });
};

// Delete a video consultation by ID
exports.deleteVideoConsultation = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM VideoConsultations WHERE consultation_id = ?';
  db.run(sql, [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to delete video consultation' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Video consultation not found' });
    } else {
      res.json({ message: 'Video consultation deleted' });
    }
  });
};
