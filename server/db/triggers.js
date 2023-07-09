const createTriggers = (db) => {

  // // Create trigger for inserting patient details into the Patients table
  // db.run(`
  //   CREATE TRIGGER insert_patient_details AFTER INSERT ON AuthenticationUsers
  //   BEGIN
  //     INSERT INTO Patients (patient_id, patient_name, patient_age, patient_gender, contact_number, address, user_id)
  //     VALUES (NEW.user_id, '', 0, '', '', '', NEW.user_id);
  //   END;
  // `)

  // // Create trigger for inserting doctor details into the Doctors table
  // db.run(`
  //   CREATE TRIGGER insert_doctor_details AFTER INSERT ON AuthenticationUsers
  //   BEGIN
  //     INSERT INTO Doctors (doctor_id, doctor_name, department_id, contact_number, email, user_id)
  //     VALUES (NEW.user_id, '', '', '', '', NEW.user_id);
  //   END;
  // `)
}

module.exports = { createTriggers };