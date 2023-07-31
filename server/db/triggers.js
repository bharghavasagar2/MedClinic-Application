const { deleteTableActivityLog } = require("./cancelledTables");

const createTriggers = (db) => {
  // Notification trigger
  db.run(`
  CREATE TRIGGER IF NOT EXISTS update_notifications_cancelled
  AFTER UPDATE ON Appointments
  FOR EACH ROW
  WHEN NEW.appointment_status = 'Cancelled' AND NEW.patient_id IS NOT NULL
  BEGIN
    INSERT INTO Notifications (user_id, message)
    VALUES (NEW.patient_id, 'Your appointment scheduled on ' || NEW.appointment_date || ' at ' || NEW.appointment_time || (
      CASE WHEN (
        SELECT department_id FROM Appointments WHERE appointment_id = NEW.appointment_id
      ) IS NOT NULL THEN 
        ' in the ' || (
          SELECT department_name FROM Departments WHERE department_id = (
            SELECT department_id FROM Appointments WHERE appointment_id = NEW.appointment_id
          )
        )
      ELSE
        ''
      END
    ) || ' department has been cancelled.');
  END;`, function (error) {
    if (error) {
      console.error(error.message);
    } else {
      console.log("Trigger 'Cancelled' created successfully.");
    }
  });

  db.run(`
    CREATE TRIGGER IF NOT EXISTS update_notifications_approved
    AFTER UPDATE ON Appointments
    FOR EACH ROW
    WHEN NEW.appointment_status = 'Scheduled' AND NEW.patient_id IS NOT NULL AND NEW.doctor_id IS NOT NULL
    BEGIN
      INSERT INTO Notifications (user_id, message)
      VALUES (NEW.patient_id, 'Your appointment scheduled on ' || NEW.appointment_date || ' at ' || NEW.appointment_time || ' in the ' || (
        SELECT department_name
        FROM Departments
        WHERE department_id = (
          SELECT department_id
          FROM Doctors
          WHERE doctor_id = NEW.doctor_id
        )
      ) || ' department with ' || (
        SELECT doctor_name
        FROM Doctors
        WHERE doctor_id = NEW.doctor_id
      ) || ' has been approved.');
  
      INSERT INTO Notifications (user_id, message)
      VALUES (NEW.doctor_id, 'The appointment with patient ' || (
        SELECT patient_name
        FROM Patients
        WHERE patient_id = NEW.patient_id
      ) || ' scheduled on ' || NEW.appointment_date || ' at ' || NEW.appointment_time || ' in the ' || (
        SELECT department_name
        FROM Departments
        WHERE department_id = (
          SELECT department_id
          FROM Doctors
          WHERE doctor_id = NEW.doctor_id
        )
      ) || ' department has been approved.');
    END;
  `, function (error) {
    if (error) {
      console.error(error.message);
    } else {
      console.log("Trigger 'update_notifications_approved' created successfully.");
    }
  });

  // Trigger to update payment status in Payments table
  db.run(`
    CREATE TRIGGER IF NOT EXISTS update_payment_status
    AFTER UPDATE ON Appointments
    FOR EACH ROW
    WHEN NEW.appointment_status = 'Cancelled'
    BEGIN
      UPDATE Payments
      SET payment_status = 'Cancelled'
      WHERE appointment_id = NEW.appointment_id;
    END;
  `);

  db.run(`
    CREATE TRIGGER IF NOT EXISTS update_payment_status_approved
    AFTER UPDATE ON Appointments
    FOR EACH ROW
    WHEN NEW.appointment_status = 'Scheduled'
    BEGIN
      UPDATE Payments
      SET payment_status = 'Approved'
      WHERE appointment_id = NEW.appointment_id;
    END;
  `);

  deleteTableActivityLog(db);
};

module.exports = { createTriggers };
