const db = require('../db/db.js');
const _ = require('lodash');
const { VIDEO_CONSULTATION_STATUS } = require('../config.js');

exports.getVideoConsultaionsByDoctorId = (req, res) => {
  const doctor_id = req.params.doctor_id;
  const query = `
    SELECT VideoConsultations.*, Patients.patient_name, Appointments.appointment_time, Doctors.doctor_name, Appointments.appointment_date
    FROM VideoConsultations
    LEFT JOIN Patients ON VideoConsultations.patient_id = Patients.patient_id
    LEFT JOIN Appointments ON VideoConsultations.appointment_id = Appointments.appointment_id
    LEFT JOIN Doctors ON VideoConsultations.doctor_id = Doctors.doctor_id
    WHERE VideoConsultations.doctor_id = ?`;

  db.all(query, [doctor_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving doctors from the database' });
    } else {
      res.json(rows);
    }
  });
};

exports.getVideoConsultaionsByPatientId = (req, res) => {
  const patient_id = req.params.patient_id;
  const query = `
    SELECT VideoConsultations.*, Patients.patient_name, Appointments.appointment_time, Doctors.doctor_name, Appointments.appointment_date
    FROM VideoConsultations
    LEFT JOIN Patients ON VideoConsultations.patient_id = Patients.patient_id
    LEFT JOIN Appointments ON VideoConsultations.appointment_id = Appointments.appointment_id
    LEFT JOIN Doctors ON VideoConsultations.doctor_id = Doctors.doctor_id
    WHERE VideoConsultations.patient_id = ?`;

  db.all(query, [patient_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving video consultations from the database' });
    } else {
      res.json(rows);
    }
  });
};

exports.getAllVideoConsultations = (req, res) => {
  const sql = `
    SELECT
      VideoConsultations.*,
      Patients.patient_name,
      Appointments.appointment_time,
      Doctors.doctor_name,
      Appointments.appointment_date
    FROM VideoConsultations
    LEFT JOIN Patients ON VideoConsultations.patient_id = Patients.patient_id
    LEFT JOIN Appointments ON VideoConsultations.appointment_id = Appointments.appointment_id
    LEFT JOIN Doctors ON VideoConsultations.doctor_id = Doctors.doctor_id;
  `;

  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to retrieve video consultations' });
    } else {
      res.json(rows);
    }
  });
};

exports.getVideoConsultationById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT
      VideoConsultations.*,
      Patients.patient_name,
      Appointments.appointment_time,
      Doctors.doctor_name,
      Appointments.appointment_date
    FROM VideoConsultations
    LEFT JOIN Patients ON VideoConsultations.patient_id = Patients.patient_id
    LEFT JOIN Appointments ON VideoConsultations.appointment_id = Appointments.appointment_id
    LEFT JOIN Doctors ON VideoConsultations.doctor_id = Doctors.doctor_id
    WHERE VideoConsultations.consultation_id = ?`;

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
exports.createVideoConsultation = (req) => {
  try {
    const fetchMeetingLink = generateJitsiMeetLink();
    const {
      patient_id,
      doctor_id,
      appointment_id
    } = req;

    const sql = `INSERT INTO VideoConsultations (
      patient_id,
      doctor_id,
      video_consultation_link,
      appointment_id,
      consultation_status
    ) VALUES (?, ?, ?, ?, ?)`;

    const values = [
      patient_id,
      doctor_id,
      fetchMeetingLink,
      appointment_id,
      VIDEO_CONSULTATION_STATUS.PENDING_VIDEO_CONSULTATION
    ];

    return new Promise((resolve, reject) => {
      db.run(sql, values, function (err) {
        if (err) {
          console.error(err.message);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  } catch (e) {
    console.log(e);
    return false;
  }
};

// Update a video consultation by ID
exports.updateVideoConsultation = (req, res) => {
  const { id } = req.params;
  const {
    patient_id,
    doctor_id,
    video_consultation_link,
    appointment_id,
    consultation_status,
  } = req.body;

  const sql = `UPDATE VideoConsultations SET
    patient_id = ?,
    doctor_id = ?,
    video_consultation_link = ?,
    appointment_id = ?,
    consultation_status = ?
    WHERE consultation_id = ?`;

  const values = [
    patient_id,
    doctor_id,
    video_consultation_link,
    appointment_id,
    consultation_status,
    id,
  ];

  db.run(sql, values, function (err) {
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

const generateJitsiMeetLink = () => {
  const jitsiMeetUrl = 'https://meet.jit.si'; // Change this if you have your own Jitsi Meet server

  // Generate a random room name or use a unique identifier for each meeting
  const roomName = generateRandomRoomName();

  // Construct the meeting link
  const meetingLink = `${jitsiMeetUrl}/${roomName}`;

  return meetingLink;
};

// Function to generate a random room name
const generateRandomRoomName = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let roomName = 'MedClinic';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    roomName += characters.charAt(randomIndex);
  }
  return roomName;
};

// Example usage


