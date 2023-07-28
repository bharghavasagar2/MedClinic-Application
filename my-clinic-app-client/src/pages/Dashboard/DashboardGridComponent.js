import React, { useEffect, useState } from 'react';
import { FaCalendar, FaStethoscope, FaMoneyBillWave, FaClock, FaUserInjured, FaUserShield, FaWalking, FaVideo } from 'react-icons/fa';
import AnalyticalInfo from '../commonComponents/AnalyticalReportsComponent';
import Card from '../commonComponents/CardComponent';
import { getAppointmentAllRecords } from '../../redux/reducers/appointmentsSlice';
import { APPOINTMENT_STATUS, ASSIGN_DOC, Cancel, DELETE, EDIT, JOIN_MEETING, VIDEO_CONSULTATION_STATUS, VIEW_DOCTOR_COMPLETE_PROFILE, VIEW_PATIENT_COMPLETE_PROFILE, VIEW_PRESCRIPTION, getUserId, useReduxHelpers } from '../../commonConfig/commonConfig';
import { filterRequestArray } from '../../commonConfig/commonFunction';
import { fetchAllPatientRecords } from '../../redux/reducers/patientsSlice';
import { create_Update_Doc_ById, fetchAllDocRecords } from '../../redux/reducers/doctorsSlice';
import { fetchAllPaymentRecords } from '../../redux/reducers/paymentSlice';
import { apisToCallAppointmentRequestAdmin, apisToCallDoctor, apisToCallPatientAdmin, apisToCallVideoConsultation, assignDoctorFields, initalStateDashboardGrid, initialStateDoctor } from './initialStateDashboardScreen';
import Portal from '../commonComponents/PortalComponent';
import ConditionalRender from '../commonComponents/ConditionalRender';
import Form from '../commonComponents/FormCommonComponent';
import { resetProperty } from '../../redux/reducers/resetSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchAllVideoRecords } from '../../redux/reducers/videoSlice';
import { getAllData } from '../../redux/commonSlice/slice';

const DashboardGrid = () => {
  const { globalState, dispatch, navigate } = useReduxHelpers();

  const [state, setState] = useState({ ...initalStateDashboardGrid });

  let { appointments, payments, patients, doctors, video, common } = globalState;

  useEffect(() => {
    dispatch(getAppointmentAllRecords());
    dispatch(fetchAllPatientRecords());
    dispatch(fetchAllDocRecords());
    dispatch(fetchAllPaymentRecords());
    dispatch(fetchAllVideoRecords());
    dispatch(getAllData('/api/getAllReports'));
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
      toast("Successfully added Doctor");
      closeModal();
      dispatch(fetchAllDocRecords());
    }
  }, [doctors]);

  const { fieldsToShowVideoConsultation, isShowAddDoctorScreen, isOpen, addDoctorFields, addCredentialFields, isAddCredenForDoctor, doctorFormValues, doctorCredFormValues } = state;

  console.log(state)

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 bg-opacity-70">
      <div className="flex justify-end mb-4">
        <Link to='/adminPatientSignup' className="px-4 py-2 rounded bg-blue-500 text-white flex items-center mr-2" style={{ cursor: 'pointer !important' }}><FaWalking className="mr-2" />Add Walkin Patient</Link>
        <button className="px-4 py-2 rounded bg-blue-500 text-white flex items-center" onClick={openModal} style={{ cursor: 'pointer !important' }}>
          <FaUserShield className="mr-2" />
          Add Doctor
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <Card title="Total Patients"
          dataToBePassed={{
            headerName: 'All Patient Records',
            isShowPatientDetailsView: true,
            rawData: patients.allPatients,
            linkConfiguration: [
              { field: DELETE, label: DELETE, showLink: true },
              { field: VIEW_PATIENT_COMPLETE_PROFILE, label: VIEW_PATIENT_COMPLETE_PROFILE, showLink: true },
            ],
            apisToCall: apisToCallPatientAdmin,
            role: 'admin',
            mainRecordId: 'patient_id',
          }}
          navigate="/list" icon={FaUserInjured} data={patients.allPatients.length.toString()} />

        <Card
          title="Pending Appointment Requests"
          dataToBePassed={{
            headerName: 'All Pending Appointment',
            rawData: filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.PENDING]),
            linkConfiguration: [
              { field: ASSIGN_DOC, label: ASSIGN_DOC, showLink: true },
              { field: Cancel, label: Cancel, showLink: true },
            ],
            fieldsToShowOnEdit: assignDoctorFields,
            apisToCall: apisToCallAppointmentRequestAdmin,
            condtionToRenderAllData: { filterKeys: [APPOINTMENT_STATUS.PENDING], key: 'appointment_status' },
            addToResponseIfActionSuccess: { Cancel: { appointment_status: APPOINTMENT_STATUS.CANCELLED }, ASSIGN_DOC: { appointment_status: APPOINTMENT_STATUS.APPROVED } },
            role: 'admin',
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
          title="Confirmed Appointments"
          navigate="/list"
          icon={FaCalendar}
          data={filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.FOLLOW_UP], null).length.toString()}
          dataToBePassed={{
            headerName: 'All Confirmed Appointment',
            condtionToRenderAllData: { filterKeys: [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.FOLLOW_UP], key: 'appointment_status', omit: ['department_name'] },
            rawData: filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.FOLLOW_UP], null),
            linkConfiguration: [
              { field: VIEW_PRESCRIPTION, label: VIEW_PRESCRIPTION, showLink: true },
            ],
            omitForViewFields: ['doctor_id', 'patient_id', 'doctor_name', 'prescription_id', 'department_id', 'appointment_date', 'dosage', 'appointment_id'],
            apisToCall: initialStateDoctor.apisToCallPrescribe,
            role: 'admin',
            specificState: 'appointment',
            reducer: 'appointmentReducer',
            mainRecordId: 'appointment_id',
          }}
        />
        <Card title="Total Doctors" icon={FaStethoscope} navigate="/list"
          data={doctors.alldoctors.length.toString()}
          dataToBePassed={{
            headerName: 'Total Doctors List',
            isShowDoctorDetailsView: true,
            rawData: doctors.alldoctors,
            fieldsToShowOnEdit: addDoctorFields,
            linkConfiguration: [
              { field: VIEW_DOCTOR_COMPLETE_PROFILE, label: VIEW_DOCTOR_COMPLETE_PROFILE, showLink: true },
              { field: EDIT, label: EDIT, showLink: true },
              { field: DELETE, label: DELETE, showLink: true },
            ],
            omitForViewFields: ['doctor_id', 'patient_id', 'prescription_id', 'department_id', 'appointment_date', 'dosage', 'appointment_id'],
            apisToCall: apisToCallDoctor,
            role: 'admin',
            mainRecordId: 'doctor_id',
          }}
        />

        <Card title="Total Payments"
          dataToBePassed={{
            headerName: 'Total Payments List',
            rawData: payments.allpayments,
            role: 'admin',
          }}
          icon={FaMoneyBillWave} navigate="/list" data={payments.allpayments.length.toString()} />

        <Card
          title="Video Consultation"
          icon={FaVideo}
          navigate='/list'
          data={Array.isArray(video.allvideo) && video.allvideo.length > 0 ? video.allvideo.length.toString() : []}
          dataToBePassed={{
            headerName: 'Total Video Consultation List',
            apisToCall: apisToCallVideoConsultation,
            linkConfiguration: [
              {
                field: JOIN_MEETING, label: JOIN_MEETING, showLink: false, condition: VIDEO_CONSULTATION_STATUS.COMPLETED_VIDEO_CONSULTATION,
                conditionField: 'consultation_status', isRedirect: true, redirectUrl: 'video_consultation_link'
              },
              {
                field: DELETE, label: DELETE, showLink: true
              },
            ],
            rawData: video.allvideo,
            fieldsToShowOnEdit: fieldsToShowVideoConsultation,
            role: 'admin',
            mainRecordId: 'consultation_id'
          }}
        />

      </div>

      <div className="flex justify-center">
        <AnalyticalInfo initialData={common.allData} width={800} height={500} barColor="#ff7f50" />
      </div>


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
