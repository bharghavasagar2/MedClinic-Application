import React, { useEffect, useState } from 'react';
import { FaUser, FaCalendar, FaFilePrescription, FaVideo } from 'react-icons/fa';
import Card from '../commonComponents/CardComponent';
import doctorVideo from '../../videos/doctorVideo.mp4';
import VideoComponent from '../commonComponents/CommonVideoComponent';
import { resetProperty } from '../../redux/reducers/resetSlice.js'
import { getData, setData } from '../../security/sessionStorage.js';
import { patientInitialState } from './initialStateDashboardScreen';
import { useSelector } from 'react-redux';
import Form from '../commonComponents/FormCommonComponent';
import Portal from '../commonComponents/PortalComponent';
import PaymentForm from '../commonComponents/PaymentFormComponent';
import { APPOINTMENT_STATUS, PAYMENT_STATUS, RESET_PROPERTY, USER_DETAILS, useReduxHelpers } from '../../commonConfig/commonConfig';
import { getRecordById } from '../../redux/reducers/patientsSlice';
import { create_UpdateById, getAppointmentById, getAppointmentAllRecords } from '../../redux/reducers/appointmentsSlice';
import { createPaymentById } from '../../redux/reducers/paymentSlice';

const PatientDashboard = () => {
  const [patientState, setPatientState] = useState(patientInitialState);


  const { globalState, dispatch, navigate } = useReduxHelpers();

  let { getAppPatientsById } = globalState.patients;

  let { appointments, payments } = globalState;

  useEffect(() => {
    let reduxUserId = globalState.authentication?.userId;
    console.log(reduxUserId)
    let userId = reduxUserId || getData(USER_DETAILS)?.userId;
    console.log(getData(USER_DETAILS)?.userId);
    dispatch(getAppointmentAllRecords())
    dispatch(getRecordById(userId));
  }, [])

  const openModal = () => {
    let state = { ...patientState, isOpen: true }
    setPatientState(state);
  };

  const closeModal = () => {
    let state = { ...patientState, isOpen: false, isShowPaymentScreen: false, isAppintmentAdded: false }
    setPatientState(state);
  };

  const handleSubmit = (formValues) => {
    // Handle form submission logic
    let state = { ...patientState, patientFormValues: formValues, isShowPaymentScreen: true }
    console.log(formValues);

    setPatientState(state);
  };

  let { isOpen, isShowPaymentScreen, isAppintmentAdded, appointmentList, fieldsToShowAppintments } = patientState;

  console.log(patientState)

  const createAppintment = () => {
    let userDetails = getData('userDetails');
    let { patientFormValues } = patientState;
    patientFormValues = {
      ...patientFormValues, patient_id: userDetails.userId,
      appointment_status: APPOINTMENT_STATUS.PENDING
    }
    dispatch(create_UpdateById({ data: patientFormValues }));
  }

  const createPayment = (appintmentId) => {
    let userDetails = getData('userDetails');
    let { paymentFormValues } = patientState;
    paymentFormValues = {
      ...paymentFormValues, patient_id: userDetails.userId,
      payment_status: PAYMENT_STATUS.PENDING, appointment_id: appintmentId
    }
    dispatch(resetProperty('appointments', 'create_UpdateById'))
    setPatientState({ ...patientState, isGetPaymentFlag: true });
    dispatch(createPaymentById({ data: paymentFormValues }));
  }

  const handlePaymentSubmit = (paymentDetails) => {
    let { paymentFormValues } = patientState;
    paymentFormValues = {
      ...paymentDetails
    }
    setPatientState({ ...patientState, paymentFormValues, isGetFlag: true });
    createAppintment();
  }



  useEffect(() => {
    if (!!appointments && !!appointments.create_UpdateById?.id && patientState.isGetFlag) {
      dispatch(resetProperty('appointments', 'create_UpdateById'))
      createPayment(appointments.create_UpdateById.id);
    }
    if (!!payments && !!payments.create_UpdateById?.id && patientState.isGetPaymentFlag) {

      dispatch(resetProperty('payments', 'create_UpdateById'))
      setPatientState({ ...patientState, isAppintmentAdded: true, isShowPaymentScreen: false });
      dispatch(getAppointmentAllRecords())
    }
    if (!!appointments && !!appointments.allappointments && appointments.allappointments.length > 0) {
      let reduxUserId = globalState.authentication?.userId;
      let userId = reduxUserId || getData(USER_DETAILS)?.userId;
      dispatch(resetProperty('appointments', 'allappointments'))
      let filter = appointments.allappointments.filter(({ patient_id }) => patient_id === userId);
      setPatientState({ ...patientState, isAppintmentAdded: true, isShowPaymentScreen: false, appointmentList: filter });
    }
  }, [appointments, payments]);


  console.log(fieldsToShowAppintments)
  return (
    <main className="max-w-7xl mx-auto px-4 py-6 bg-opacity-70">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Patient Profile"
          icon={FaUser}
          data={getAppPatientsById || {}}
          fieldsToShow={patientInitialState.fieldsToShow}
          isEdit={true}
          navigate='/edit'
          buttonText='Edit Details'
          showLink={true}
        />
        <Card
          title="Consultations"
          icon={FaCalendar}
          fieldsToShow={patientInitialState.fieldsToShowAppintments}
          data={appointmentList}
          navigate='/list'
          filterArrayKey={APPOINTMENT_STATUS.APPROVED}
        />
        <Card
          title="Appointment Requests"
          icon={FaFilePrescription}
          fieldsToShow={patientInitialState.fieldsToShowAppintments}
          data={appointmentList}
          navigate='/list'
          filterArrayKey={APPOINTMENT_STATUS.PENDING}
        />
        <Card
          title="Video Consultations"
          icon={FaVideo}
          array={[]}
          navigate='/list'
        />
      </div>
      <VideoComponent onClick={openModal} src={doctorVideo} style={{ width: '100%', height: 'auto', maxHeight: '50vh' }} />
      <Portal isOpen={isOpen} onClose={closeModal}>
        {/* Form content goes here */}
        {isShowPaymentScreen ? <PaymentForm onPaymentSubmit={handlePaymentSubmit} /> : isAppintmentAdded ? <div><p>Successfully Raised Appointment Request</p> </div> : < Form fields={patientState.RaiseRequestFields}
          onSubmit={handleSubmit} formName='Appointment' submitButtonName='Proceed to Payment' />}
      </Portal>
    </main>
  );
};

export default PatientDashboard;
