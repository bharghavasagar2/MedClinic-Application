const createTriggers = (db) => {
  db.run(`
  CREATE TRIGGER IF NOT EXISTS update_doctor_name
  AFTER INSERT ON Appointments
  WHEN NEW.doctor_id IS NOT NULL
  BEGIN
    UPDATE Appointments
    SET doctor_name = (
      SELECT doctor_name
      FROM Doctors
      WHERE doctor_id = NEW.doctor_id
    )
    WHERE appointment_id = NEW.appointment_id;
  END;
`);

  // Create trigger to update patient name in Appointments table
  db.run(`
  CREATE TRIGGER IF NOT EXISTS update_patient_name
  AFTER INSERT ON Appointments
  WHEN NEW.patient_id IS NOT NULL
  BEGIN
    UPDATE Appointments
    SET patient_name = (
      SELECT patient_name
      FROM Patients
      WHERE patient_id = NEW.patient_id
    )
    WHERE appointment_id = NEW.appointment_id;
  END;
`);

}

module.exports = { createTriggers };