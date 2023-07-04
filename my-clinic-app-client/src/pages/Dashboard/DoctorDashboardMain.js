import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendar, FaUserMd, FaUserTimes, FaStethoscope, FaFilePrescription, FaVideo } from 'react-icons/fa';
import Card from '../commonComponents/CardComponent';

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
      {/* Doctor Profile */}
      <div className="max-w-7xl mx-auto px-4 py-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <Card
            title="Doctor Profile"
            icon={FaStethoscope}
            info='s'
            navigate='/editProfile'
          />

          <Card
            title="Appointment Requests"
            icon={FaCalendar}
            infoToShow={['Patient Name', 'Date and Time']}
            array={appointmentRequests}
            navigate='/list'
          />

          <Card
            title="Upcoming Appointments"
            icon={FaCalendar}
            infoToShow={['Patient Name', 'Gender', 'Age']}
            array={upcomingAppointments}
            navigate='/list'
          />

          <Card
            title="Patient List"
            icon={FaUser}
            array={patientList}
            infoToShow={['Patient Name', 'Medication', 'Dosage']}
            navigate='/list'
          />

          <Card
            title="Prescription Management"
            icon={FaFilePrescription}
            array={prescriptions}
            infoToShow={['Patient Name', 'Medication', 'Dosage']}
            navigate='/list'
          />

          <Card
            title="Video Consultation"
            icon={FaVideo}
            array={prescriptions}
            navigate='/list'
          //infoToShow={['Patient Name', 'Medication', 'Dosage']}
          />


        </div>
      </div>
    </main>
  );
};

export default DoctorDashboard;
