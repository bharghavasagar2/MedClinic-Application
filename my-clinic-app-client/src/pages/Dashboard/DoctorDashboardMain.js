import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendar, FaUserMd, FaUserTimes, FaStethoscope, FaFilePrescription, FaVideo } from 'react-icons/fa';

const DoctorDashboard = () => {
  // Dummy data for demonstration
  const appointmentRequests = [
    { id: 1, patientName: 'John Doe', dateTime: '2022-10-01 10:00 AM' },
    { id: 2, patientName: 'Jane Smith', dateTime: '2022-10-02 11:30 AM' },
    { id: 3, patientName: 'David Johnson', dateTime: '2022-10-03 09:45 AM' },
  ];

  const upcomingAppointments = [
    { id: 1, patientName: 'Michael Brown', dateTime: '2022-10-05 03:15 PM' },
    { id: 2, patientName: 'Emily Davis', dateTime: '2022-10-06 02:30 PM' },
    { id: 3, patientName: 'Sophia Wilson', dateTime: '2022-10-07 11:00 AM' },
  ];

  const patientList = [
    { id: 1, patientName: 'Oliver Thompson', gender: 'Male', age: 35 },
    { id: 2, patientName: 'Emma Anderson', gender: 'Female', age: 28 },
    { id: 3, patientName: 'William Davis', gender: 'Male', age: 42 },
  ];

  const prescriptions = [
    { id: 1, patientName: 'Oliver Thompson', medication: 'Aspirin', dosage: '1 tablet daily' },
    { id: 2, patientName: 'Emma Anderson', medication: 'Amoxicillin', dosage: '500 mg three times a day' },
    { id: 3, patientName: 'William Davis', medication: 'Lisinopril', dosage: '10 mg daily' },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-gray-100 min-h-screen bg-opacity-70">
        {/* Doctor Profile */}
        <div className="max-w-7xl mx-auto px-4 py-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6 bg-opacity-70">
              <h2 className="flex items-center text-2xl font-bold mb-4">
                <FaStethoscope className="mr-2" />
                Doctor Profile
              </h2>
              {/* Display doctor's profile information */}
              {/* Edit profile button */}
              <Link to="/edit-profile" className="text-blue-500 hover:text-blue-600 font-semibold">
                Edit Profile
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow p-6 bg-opacity-70">
              <h2 className="flex items-center text-2xl font-bold mb-4">
                <FaCalendar className="mr-2" />
                Appointment Requests
              </h2>
              {/* Display and manage appointment requests */}
              {appointmentRequests.length > 0 ? (
                <>
                  <ul>
                    {appointmentRequests.map((request) => (
                      <li key={request.id}>
                        <p>Patient Name: {request.patientName}</p>
                        <p>Date and Time: {request.dateTime}</p>
                        {/* View appointment details button */}
                        {/* Accept/Reject appointment buttons */}
                      </li>
                    ))}
                  </ul>
                  <Link to="/appointment-requests" className="text-blue-500 hover:text-blue-600 font-semibold">
                    Show All
                  </Link>
                </>
              ) : (
                <p>No appointment requests.</p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-6 bg-opacity-70">
              <h2 className="flex items-center text-2xl font-bold mb-4">
                <FaCalendar className="mr-2" />
                Upcoming Appointments
              </h2>
              {/* Display and manage upcoming appointments */}
              {upcomingAppointments.length > 0 ? (
                <>
                  <ul>
                    {upcomingAppointments.map((appointment) => (
                      <li key={appointment.id}>
                        <p>Patient Name: {appointment.patientName}</p>
                        <p>Date and Time: {appointment.dateTime}</p>
                        {/* View appointment details button */}
                        {/* Reschedule/Cancel appointment buttons */}
                      </li>
                    ))}
                  </ul>
                  <Link to="/upcoming-appointments" className="text-blue-500 hover:text-blue-600 font-semibold">
                    Show All
                  </Link>
                </>
              ) : (
                <p>No upcoming appointments.</p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-6 bg-opacity-70">
              <h2 className="flex items-center text-2xl font-bold mb-4">
                <FaUser className="mr-2" />
                Patient List
              </h2>
              {/* Display and manage the list of patients */}
              {patientList.length > 0 ? (
                <>
                  <ul>
                    {patientList.map((patient) => (
                      <li key={patient.id}>
                        <p>Patient Name: {patient.patientName}</p>
                        <p>Gender: {patient.gender}</p>
                        <p>Age: {patient.age}</p>
                        {/* View patient details button */}
                        {/* Delete patient button */}
                      </li>
                    ))}
                  </ul>
                  <Link to="/patient-list" className="text-blue-500 hover:text-blue-600 font-semibold">
                    Show All
                  </Link>
                </>
              ) : (
                <p>No patients found.</p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-6 bg-opacity-70">
              <h2 className="flex items-center text-2xl font-bold mb-4">
                <FaFilePrescription className="mr-2" />
                Prescription Management
              </h2>
              {/* Display and manage prescriptions */}
              {prescriptions.length > 0 ? (
                <>
                  <ul>
                    {prescriptions.map((prescription) => (
                      <li key={prescription.id}>
                        <p>Patient Name: {prescription.patientName}</p>
                        <p>Medication: {prescription.medication}</p>
                        <p>Dosage: {prescription.dosage}</p>
                        {/* View prescription details button */}
                        {/* Delete prescription button */}
                      </li>
                    ))}
                  </ul>
                  <Link to="/prescription-management" className="text-blue-500 hover:text-blue-600 font-semibold">
                    Show All
                  </Link>
                </>
              ) : (
                <p>No prescriptions found.</p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-6 bg-opacity-70">
              <h2 className="flex items-center text-2xl font-bold mb-4">
                <FaVideo className="mr-2" />
                Video Consultation
              </h2>
              <p className="text-gray-600">Schedule and manage video consultations with patients.</p>
              <Link to="/video-consultations" className="text-blue-500 hover:text-blue-600 font-semibold mt-4">
                Schedule Video Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DoctorDashboard;
