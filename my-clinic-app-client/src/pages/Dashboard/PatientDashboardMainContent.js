import React, { useState } from 'react';
import { FaUser, FaCalendar, FaFilePrescription, FaVideo } from 'react-icons/fa';
import Card from '../commonComponents/CardComponent';
import doctorVideo from '../../videos/doctorVideo.mp4';
import VideoComponent from '../commonComponents/CommonVideoComponent';
import { patientInitialState } from './initialStateDashboardScreen';
import Form from '../commonComponents/FormCommonComponent';
import Portal from '../commonComponents/PortalComponent';
import PaymentForm from '../commonComponents/PaymentFormComponent';

const PatientDashboard = () => {
  const [patientState, setPatientState] = useState(patientInitialState);

  const openModal = () => {
    let state = { ...patientState, isOpen: true }
    setPatientState(state);
  };

  const closeModal = () => {
    let state = { ...patientState, isOpen: false, isShowPaymentScreen: false }
    setPatientState(state);
  };

  const handleSubmit = (formValues) => {
    // Handle form submission logic
    console.log(formValues);
    let state = { ...patientState, isShowPaymentScreen: true }
    setPatientState(state);
  };

  let { isOpen, isShowPaymentScreen } = patientState;
  console.log(isShowPaymentScreen)
  return (
    <main className="max-w-7xl mx-auto px-4 py-6 bg-opacity-70">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title=" Patient Profile"
          icon={FaUser}
          array={[]}
        />
        <Card
          title="Consultations"
          icon={FaCalendar}
          array={[]}
        />
        <Card
          title="Appointment Requests"
          icon={FaFilePrescription}
          array={[]}
        />
        <Card
          title="Video Consultations"
          icon={FaVideo}
          array={[]}
        />
      </div>
      <VideoComponent onClick={openModal} src={doctorVideo} style={{ width: '100%', height: 'auto', maxHeight: '50vh' }} />
      <Portal isOpen={isOpen} onClose={closeModal}>
        {/* Form content goes here */}
        {isShowPaymentScreen ? <PaymentForm /> : <Form fields={patientState.RaiseRequestFields}
          onSubmit={handleSubmit} submitButtonName='Proceed to Payment' />}
      </Portal>
    </main>
  );
};

export default PatientDashboard;
