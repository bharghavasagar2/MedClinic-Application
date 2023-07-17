import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { FaUser, FaCalendar, FaFilePrescription, FaVideo } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import Card from '../commonComponents/CardComponent';
import doctorVideo from '../../videos/doctorVideo.mp4';
import VideoComponent from '../commonComponents/CommonVideoComponent';
import { resetProperty } from '../../redux/reducers/resetSlice.js'
import { getData, setData } from '../../security/sessionStorage.js';
import { apisToCallAppointmentRequestPatient, patientInitialState, resetScreen } from './initialStateDashboardScreen';
import { useSelector } from 'react-redux';
import Form from '../commonComponents/FormCommonComponent';
import Portal from '../commonComponents/PortalComponent';
import PaymentForm from '../commonComponents/PaymentFormComponent';
import { APPOINTMENT_STATUS, Cancel, EDIT, JOIN_MEETING, PAYMENT_STATUS, RESET_PROPERTY, USER_DETAILS, VIDEO_CONSULTATION_STATUS, VIEW_PRESCRIPTION, getUserId, useReduxHelpers } from '../../commonConfig/commonConfig';
import { create_Update_PatientById, getRecordById } from '../../redux/reducers/patientsSlice';
import { create_UpdateById, getAppointmentById, getAppointmentAllRecords } from '../../redux/reducers/appointmentsSlice';
import { createPaymentById } from '../../redux/reducers/paymentSlice';
import ConditionalRender from '../commonComponents/ConditionalRender';
import { filterRequestArray } from '../../commonConfig/commonFunction';
import { getSpecificPatientVideoRecords, getVideoRecordById } from '../../redux/reducers/videoSlice';
import { getNotificationsByUserId } from '../../redux/reducers/notificationSlice';

const PatientDashboard = () => {
  const [patientState, setPatientState] = useState(patientInitialState);


  const { globalState, dispatch, navigate } = useReduxHelpers();

  let { getAppPatientsById } = globalState.patients;

  let { appointments, payments, patients, authentication, video, notification } = globalState;

  useEffect(() => {
    let reduxUserId = globalState.authentication?.userId;
    console.log(reduxUserId)
    let userId = reduxUserId || getData(USER_DETAILS)?.userId;
    console.log(getData(USER_DETAILS)?.userId);
    dispatch(getAppointmentAllRecords())
    dispatch(getRecordById(userId));
    dispatch(getSpecificPatientVideoRecords(userId));
    dispatch(getNotificationsByUserId(userId));
  }, [])

  const openModal = () => {
    let state = { ...patientState, isOpen: true, ...resetScreen }
    setPatientState(state);
  };

  const closeModal = () => {
    let state = { ...patientState, isOpen: false, ...resetScreen }
    setPatientState(state);
  };

  const handleEditDashboardScreen = () => {
    let state = {
      ...patientState, isOpen: true, ...resetScreen, isShowPatientEditDetails: true

    }
    setPatientState(state);
  }


  const handleAppntFormSubmit = (formValues) => {
    // Handle form submission logic
    let state = { ...patientState, patientFormValues: formValues, isShowPaymentScreen: true }
    console.log(formValues);

    setPatientState(state);
  };

  let { isOpen, isShowPaymentScreen, appointmentList,
    isShowPatientEditDetails, fieldsToShowEditPatient, fieldsToShowAppintmentsAdd,
    fieldsToShowAppintments } = patientState;

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
      setPatientState({ ...patientState, isShowPaymentScreen: false });
      dispatch(getAppointmentAllRecords())
      closeModal();
      toast('Sucessfully raised appointment request')
    }
    if (!!appointments && !!appointments.allappointments && appointments.allappointments.length > 0) {
      let reduxUserId = globalState.authentication?.userId;
      let userId = reduxUserId || getData(USER_DETAILS)?.userId;
      dispatch(resetProperty('appointments', 'allappointments'))
      let filter = appointments.allappointments.filter(({ patient_id }) => patient_id === userId);
      setPatientState({ ...patientState, isShowPaymentScreen: false, appointmentList: filter });
    }
    if (!!appointments && !!appointments.allappointments && appointments.allappointments.length > 0) {
      let reduxUserId = globalState.authentication?.userId;
      let userId = reduxUserId || getData(USER_DETAILS)?.userId;
      dispatch(resetProperty('appointments', 'allappointments'))
      let filter = appointments.allappointments.filter(({ patient_id }) => patient_id === userId);
      setPatientState({ ...patientState, isShowPaymentScreen: false, appointmentList: filter });
    }

    if (!!patients && !!patients.create_UpdateById) {
      toast('Sucessfully Updated Patient details')
      dispatch(resetProperty('patients', 'create_UpdateById'));

      dispatch(getRecordById(getUserId(authentication)));
      setPatientState({ ...patientState, ...resetScreen, isOpen: false });
    }

    if (notification && !_.isEmpty(notification.getNotificationsByUserId)) {
      let notifications = _.uniqBy(notification.getNotificationsByUserId, 'created_at').filter(({ viewed }) => !viewed);
      if (!_.isEmpty(notifications)) {
        notifications.forEach(({ message }) => {
          toast(message, {
            autoClose: 60000,
          });
        })
      }
      dispatch(resetProperty('notification', 'getNotificationsByUserId'));
    }

  }, [appointments, payments, patients, notification]);

  const handleEditPatientFormSubmission = (formValues) => {

    dispatch(create_Update_PatientById({ data: { ...formValues }, id: getAppPatientsById.patient_id }));
  }


  console.log(appointments)
  return (
    <main className="max-w-7xl mx-auto px-4 py-6 bg-opacity-70">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Patient Profile"
          icon={FaUser}
          data={getAppPatientsById || {}}
          fieldsToShow={patientInitialState.fieldsToShowView}
          isEdit={true}
          onClick={handleEditDashboardScreen}
          buttonText='Edit Details'
          showLink={true}
        />
        <Card
          title="Consultations"
          icon={FaCalendar}
          navigate='/list'
          fieldsToShow={patientInitialState.fieldsToShowAppintmentsView}
          data={filterRequestArray(appointmentList, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.FOLLOW_UP, APPOINTMENT_STATUS.COMPLETED], 'patient_id')}
          dataToBePassed={{
            headerName: 'Consultations List',
            condtionToRenderAllData: { filterKeys: [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.FOLLOW_UP], key: 'appointment_status' },
            rawData: filterRequestArray(appointmentList, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.FOLLOW_UP, APPOINTMENT_STATUS.COMPLETED], 'patient_id'),
            linkConfiguration: [
              { field: VIEW_PRESCRIPTION, label: VIEW_PRESCRIPTION, showLink: true },
            ],
            omitForViewFields: ['department_id', 'dosage', 'appointment_id', 'patient_id', 'prescription_id', 'doctor_id', 'appointment_status'],
            //  addToResponseIfActionSuccess: { PRESCRIBE: { appointment_status: APPOINTMENT_STATUS.COMPLETED } },
            apisToCall: patientState.apisToCallPrescribe,
            role: 'patient',
            specificState: 'appointment',
            reducer: 'appointmentReducer',
            mainRecordId: 'appointment_id',
          }}
        />

        <Card
          title="Appointment Requests"
          icon={FaFilePrescription}
          fieldsToShow={patientInitialState.fieldsToShowAppintmentsView}
          data={filterRequestArray(appointmentList, 'appointment_status', [APPOINTMENT_STATUS.PENDING])}
          navigate='/list'
          dataToBePassed={{
            headerName: 'Appointment Requests List',
            condtionToRenderAllData: { filterKeys: [APPOINTMENT_STATUS.PENDING], key: 'appointment_status' },
            rawData: filterRequestArray(appointmentList, 'appointment_status', [APPOINTMENT_STATUS.PENDING]),
            linkConfiguration: [
              { field: Cancel, label: Cancel, showLink: true },
              { field: EDIT, label: EDIT, showLink: true },
            ],
            apisToCall: apisToCallAppointmentRequestPatient,
            role: 'patient',
            specificState: 'appointment',
            reducer: 'appointmentReducer',
            fieldsToShowOnEdit: fieldsToShowAppintmentsAdd,
            mainRecordId: 'appointment_id',
            confirmationMessage: 'Are you sure you want to Cancel the appointment'
          }}
        />
        <Card
          title="Video Consultations"
          icon={FaVideo}
          navigate='/list'
          data={Array.isArray(video.getSpecificPatientVideoRecords) && video.getSpecificPatientVideoRecords.length > 0 ? video.getSpecificPatientVideoRecords.length.toString() : []}
          dataToBePassed={{
            headerName: 'Video Consultations List',
            linkConfiguration: [
              {
                field: JOIN_MEETING, label: JOIN_MEETING, showLink: false, condition: VIDEO_CONSULTATION_STATUS.COMPLETED_VIDEO_CONSULTATION,
                conditionField: 'consultation_status', isRedirect: true, redirectUrl: 'video_consultation_link'
              },
              //   { field: JOIN_MEETING, label: JOIN_MEETING, showLink: false, redirect: true, checkLink },
            ],
            rawData: video.getSpecificPatientVideoRecords,

            role: 'patient',
          }}
        />
      </div>
      <VideoComponent onClick={openModal} src={doctorVideo} style={{ width: '100%', height: 'auto', maxHeight: '50vh' }} />
      <Portal isOpen={isOpen} onClose={closeModal}>
        <ConditionalRender
          conditions={[
            { condition: isShowPaymentScreen, content: <PaymentForm onPaymentSubmit={handlePaymentSubmit} /> },
            //    { condition: isAppointmentAdded, content: <div><p>Successfully Raised Appointment Request</p></div> },
            { condition: isShowPatientEditDetails, content: <Form initialValues={getAppPatientsById || ''} fields={fieldsToShowEditPatient} onSubmit={handleEditPatientFormSubmission} formName="Edit Patient" submitButtonName="Edit Details" /> },
            { condition: true, content: <Form fields={patientState.RaiseRequestFields} onSubmit={handleAppntFormSubmit} formName="Appointment" submitButtonName="Proceed to Payment" /> },
          ]}
        />
      </Portal>

    </main>
  );
};

export default PatientDashboard;
