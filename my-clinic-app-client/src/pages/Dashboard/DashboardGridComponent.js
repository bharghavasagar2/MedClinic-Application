import React, { useEffect, useState } from 'react';
import { FaUser, FaCalendar, FaStethoscope, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import AnalyticalInfo from '../commonComponents/AnalyticalReportsComponent';
import Card from '../commonComponents/CardComponent';
import { getAppointmentAllRecords } from '../../redux/reducers/appointmentsSlice';
import { APPOINTMENT_STATUS, Cancel, EDIT, getUserId, useReduxHelpers } from '../../commonConfig/commonConfig';
import { filterRequestArray } from '../../commonConfig/commonFunction';
import { fetchAllPatientRecords, getRecordById } from '../../redux/reducers/patientsSlice';
import { create_Update_Doc_ById, fetchAllDocRecords } from '../../redux/reducers/doctorsSlice';
import { fetchAllPaymentRecords } from '../../redux/reducers/paymentSlice';
import { apisToCallAppointmentRequestAdmin, initalStateDashboardGrid } from './initialStateDashboardScreen';
import Portal from '../commonComponents/PortalComponent';
import ConditionalRender from '../commonComponents/ConditionalRender';
import Form from '../commonComponents/FormCommonComponent';
import { resetProperty } from '../../redux/reducers/resetSlice';
import { login } from '../../redux/reducers/authenticationSlice';

const DashboardGrid = () => {
  const { globalState, dispatch, navigate } = useReduxHelpers();

  const [state, setState] = useState({ ...initalStateDashboardGrid });

  let { appointments, payments, patients, doctors } = globalState;

  useEffect(() => {
    dispatch(getAppointmentAllRecords());
    dispatch(fetchAllPatientRecords());
    dispatch(fetchAllDocRecords());
    dispatch(fetchAllPaymentRecords());
  }, []);

  const openModal = () => {
    let stateObj = { ...state, isOpen: true, isShowAddDoctorScreen: true }
    setState(stateObj);
  };

  const closeModal = (obj = false) => {
    if (!!obj) {
      setState({ ...state, ...initalStateDashboardGrid, ...obj });
    } else {
      setState({ ...state, ...initalStateDashboardGrid });
    }
  };

  const handleAddDoctorFormSubmit = (formValues) => {
    let stateObj = { ...state, isShowAddDoctorScreen: false, doctorFormValues: formValues, isAddCredenForDoctor: true }
    setState(stateObj);
  }
  const handleAddCredSubmit = (formDetails) => {
    let stateObj = { ...state, doctorCredFormValues: formDetails, isAddFlag: true };
    let formValues = { ...formDetails, ...state.doctorFormValues, role: 'doctor', isSignUp: true };
    setState(stateObj);
    dispatch(create_Update_Doc_ById({ data: formValues }));
  }

  useEffect(() => {
    if (doctors.create_Update_Doc_ById && !!doctors.create_Update_Doc_ById && !!state.isAddFlag) {
      dispatch(resetProperty('doctors', 'create_Update_Doc_ById'));
      closeModal();
      dispatch(fetchAllDocRecords());
    }
  }, [doctors]);

  const { isShowAddDoctorScreen, isOpen, addDoctorFields, addCredentialFields, isAddCredenForDoctor, doctorFormValues, doctorCredFormValues } = state;

  console.log(state)

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 bg-opacity-70">
      <div className="flex justify-end mb-4">
        <button className="px-4 py-2 rounded bg-blue-500 text-white" onClick={openModal} style={{ cursor: 'pointer !important' }}>Add Doctor</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Total Patients" navigate="/list" icon={FaUser} data={patients.allPatients.length.toString()} />
        <Card
          title="Pending Appointment Requests"
          dataToBePassed={{
            rawData: filterRequestArray(appointments.appointmentList, 'appointment_status', [APPOINTMENT_STATUS.PENDING]),
            linkFields: [Cancel, EDIT],
            linkLabels: [Cancel, EDIT],
            apisToCall: apisToCallAppointmentRequestAdmin,
            addToResponseIfActionSuccess: { Cancel: { appointment_status: APPOINTMENT_STATUS.CANCELLED } },
            role: 'patient',
            specificState: 'appointment',
            reducer: 'appointmentReducer',
            mainRecordId: 'appointment_id',
            confirmationMessage: 'Are you sure you want to cancel the appointment?',
          }}
          icon={FaClock}
          navigate="/list"
          data={filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.PENDING]).length.toString()}
        />
        <Card
          title="Total Appointments Scheduled"
          navigate="/list"
          icon={FaCalendar}
          data={filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.APPROVED]).length.toString()}
        />
        <Card title="Total Doctors" icon={FaStethoscope} navigate="/doctors" data={doctors.alldoctors.length.toString()} />
        <Card title="Total Payments" icon={FaMoneyBillWave} navigate="/list" data={payments.allpayments.length.toString()} />
      </div>

      <AnalyticalInfo width={800} height={500} barColor="#ff7f50" />

      <Portal isOpen={isOpen} onClose={closeModal}>
        <ConditionalRender
          conditions={[
            { condition: isShowAddDoctorScreen, content: <Form fields={addDoctorFields} onSubmit={handleAddDoctorFormSubmit} formName="Add Doctor" submitButtonName="Next" /> },
            { condition: isAddCredenForDoctor, content: <Form fields={addCredentialFields} onSubmit={handleAddCredSubmit} formName="Add Credentials for Doctor" submitButtonName="Add" /> },
          ]}
        />
      </Portal>
    </main>
  );
};

export default DashboardGrid;
