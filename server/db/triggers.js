const { deleteTableActivityLog } = require("./cancelledTables");

const createTriggers = (db) => {
  // Trigger to update department name in the Doctors table
  db.run(`
    CREATE TRIGGER IF NOT EXISTS update_doctor_department_name_insert
    AFTER INSERT ON Doctors
    BEGIN
      UPDATE Doctors
      SET department_name = (
        SELECT department_name
        FROM Departments
        WHERE department_id = NEW.department_id
      )
      WHERE doctor_id = NEW.doctor_id;
    END;
  `);

  db.run(`
    CREATE TRIGGER IF NOT EXISTS update_doctor_department_name_update
    AFTER UPDATE ON Doctors
    WHEN NEW.department_id IS NOT NULL AND OLD.department_id <> NEW.department_id
    BEGIN
      UPDATE Doctors
      SET department_name = (
        SELECT department_name
        FROM Departments
        WHERE department_id = NEW.department_id
      )
      WHERE doctor_id = NEW.doctor_id;
    END;
  `);

  // Trigger to update appointment department name in Appointments table
  db.run(`
    CREATE TRIGGER IF NOT EXISTS update_appointment_department_name_insert
    AFTER INSERT ON Appointments
    BEGIN
      UPDATE Appointments
      SET department_name = (
        SELECT department_name
        FROM Departments
        WHERE department_id = NEW.department_id
      )
      WHERE appointment_id = NEW.appointment_id;
    END;
  `);

  db.run(`
    CREATE TRIGGER IF NOT EXISTS update_appointment_department_name_update
    AFTER UPDATE ON Appointments
    WHEN NEW.department_id IS NOT NULL AND OLD.department_id <> NEW.department_id
    BEGIN
      UPDATE Appointments
      SET department_name = (
        SELECT department_name
        FROM Departments
        WHERE department_id = NEW.department_id
      )
      WHERE appointment_id = NEW.appointment_id;
    END;
  `);

  // Trigger to update patient name in Appointments table
  db.run(`
    CREATE TRIGGER IF NOT EXISTS update_patient_name_insert
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

  db.run(`
    CREATE TRIGGER IF NOT EXISTS update_patient_name_update
    AFTER UPDATE ON Appointments
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

  // Notification trigger
  db.run(`
  CREATE TRIGGER IF NOT EXISTS update_notifications_cancelled
  AFTER UPDATE ON Appointments
  FOR EACH ROW
  WHEN NEW.appointment_status = 'Cancelled' AND NEW.patient_id IS NOT NULL AND NEW.patient_name IS NOT NULL
  BEGIN
    INSERT INTO Notifications (user_id, message)
    VALUES (NEW.patient_id, 'Your appointment scheduled on ' || NEW.appointment_date || ' at ' || NEW.appointment_time || ' in the ' || NEW.department_name || ' has been cancelled.');
  END;
`);



  db.run(`
  CREATE TRIGGER IF NOT EXISTS update_notifications_approved
  AFTER UPDATE ON Appointments
  FOR EACH ROW
  WHEN NEW.appointment_status = 'Approved' AND NEW.patient_id IS NOT NULL AND NEW.doctor_id IS NOT NULL AND NEW.doctor_name IS NOT NULL AND NEW.patient_name IS NOT NULL
  BEGIN
    INSERT INTO Notifications (user_id, message)
    VALUES (NEW.patient_id, 'Your appointment scheduled on ' || NEW.appointment_date || ' at ' || NEW.appointment_time || ' in the ' || NEW.department_name || ' department with ' || NEW.doctor_name || ' has been approved.');

    INSERT INTO Notifications (user_id, message)
    VALUES (NEW.doctor_id, 'The appointment with patient ' || NEW.patient_name || ' scheduled on ' || NEW.appointment_date || ' at ' || NEW.appointment_time || ' in the ' || NEW.department_name || ' department has been approved.');
  END;
`);





  db.run(`
  CREATE TRIGGER IF NOT EXISTS update_doctor_name_insert
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

  db.run(`
  CREATE TRIGGER IF NOT EXISTS update_doctor_name_update
  AFTER UPDATE ON Appointments
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

  deleteTableActivityLog(db);
};

module.exports = { createTriggers };
