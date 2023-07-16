const { APPOINTMENT_STATUS, appointmentTypeWalkIn, appointmentTypeOnline } = require('../config.js');
const db = require('../db/db.js');
const _ = require('lodash');


const { createVideoConsultation } = require('./videoController.js');

// Get all appointments
exports.getAllAppointments = (req, res) => {
  const query = 'SELECT * FROM Appointments';
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
  const query = 'SELECT * FROM Appointments WHERE appointment_id = ?';
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
exports.createAppointment = async (req, res) => {
  const { patient_id, doctor_id, appointment_date, appointment_time, appointment_status, department_id, appointment_type } = req.body;
  const query = 'INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, appointment_status, department_id, appointment_type) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.run(query, [patient_id, doctor_id, appointment_date, appointment_time, appointment_status, department_id, appointment_type], function (err) {
    if (err) {
      console.log(err)
      res.status(500).json({ error: 'Error creating appointment' });
    } else {
      res.json({ id: this.lastID });
    }
  });
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  const { patient_id, doctor_id, appointment_date, appointment_time, appointment_status, department_id, appointment_type } = req.body;

  try {
    const previousAppointment = await appointmentCheck(appointmentId);
    const isCreateVideoLink = appointment_status === APPOINTMENT_STATUS.APPROVED && appointmentTypeOnline === appointment_type && previousAppointment.appointment_status !== APPOINTMENT_STATUS.APPROVED;

    const query = 'UPDATE Appointments SET patient_id = ?, doctor_id = ?, appointment_date = ?, appointment_time = ?, appointment_status = ?, department_id = ?, appointment_type = ? WHERE appointment_id = ?';
    const params = [patient_id, doctor_id, appointment_date, appointment_time, appointment_status, department_id, appointment_type, appointmentId];

    db.run(query, params, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating appointment' });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Appointment not found' });
      } else {
        if (isCreateVideoLink) {
          const isSuccess = createVideoConsultation(req.body, res);
          res.sendStatus(isSuccess ? 200 : 500);
        } else {
          res.sendStatus(200);
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating appointment' });
  }
};

// Delete an appointment
exports.deleteAppointment = (req, res) => {
  const appointmentId = req.params.id;
  const query = 'DELETE FROM Appointments WHERE appointment_id = ?';
  db.run(query, [appointmentId], (err) => {
    if (err) {
      console.log(err)
      res.status(500).json({ error: 'Error deleting appointment' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Appointment not found' });
    } else {
      res.json({ message: 'Appointment deleted successfully' });
    }
  });
};



const appointmentCheck = (id, res) => {
  const appointmentId = id;
  const query = 'SELECT * FROM Appointments WHERE appointment_id = ?';

  return new Promise((resolve, reject) => {
    db.get(query, [appointmentId], (err, row) => {
      if (err) {
        reject({ error: 'Error retrieving appointment from the database' });
      } else if (!row) {
        reject({ error: 'Appointment not found' });
      } else {
        resolve(row);
      }
    });
  });


};
