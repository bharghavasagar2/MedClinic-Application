import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendar, FaUserMd, FaUserTimes, FaStethoscope, FaFilePrescription, FaVideo } from 'react-icons/fa';
import Card from '../commonComponents/CardComponent';
import { APPOINTMENT_STATUS, CHANGE_APPOINTMENT_STATUS, CHANGE_VIDEO_CONSULTATION_STATUS, EDIT, JOIN_MEETING, PRESCRIBE, USER_DETAILS, VIDEO_CONSULTATION_STATUS, VIEW_PRESCRIPTION, filterArray, useReduxHelpers } from '../../commonConfig/commonConfig';
import { getAppointmentAllRecords } from '../../redux/reducers/appointmentsSlice';
import { getData } from '../../security/sessionStorage';
import { getAppdoctorsById } from '../../redux/reducers/doctorsSlice';
import { apisToCallVideoConsultation, initialStateDoctor, patientInitialState } from './initialStateDashboardScreen';
import { filterRequestArray } from '../../commonConfig/commonFunction';
import { getSpecificDoctorVideoRecords } from '../../redux/reducers/videoSlice';

const DoctorDashboard = () => {

  let { globalState, dispatch } = useReduxHelpers();

  let { getdoctorById } = globalState.doctors;

  let { appointments, payments, patients, authentication, video } = globalState;

  let [state, setState] = useState({ ...initialStateDoctor })


  useEffect(() => {
    let reduxUserId = globalState.authentication?.userId;
    console.log(reduxUserId)
    let userId = reduxUserId || getData(USER_DETAILS)?.userId;
    console.log(getData(USER_DETAILS)?.userId);
    dispatch(getAppointmentAllRecords())
    dispatch(getAppdoctorsById(userId));
    dispatch(getSpecificDoctorVideoRecords(userId));
  }, [])


  let { apisToCallPrescribe, fieldsToShowPrescribeAdd, fieldsToShowAppintmentsAdd, apisToCallConsultation, fieldsToShowVideoConsultation } = state;
  console.log(getdoctorById)


  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* Doctor Profile */}
      <div className="max-w-7xl mx-auto px-4 py-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <Card
            title="Doctor Profile"
            icon={FaStethoscope}
            data={getdoctorById || {}}
            fieldsToShow={state.fieldsToShowView}
          />

          <Card
            title="Consultations"
            icon={FaFilePrescription}
            fieldsToShow={patientInitialState.fieldsToShowAppintmentsView}
            navigate='/list'
            data={filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.FOLLOW_UP], 'doctor_id', "department_name")}
            dataToBePassed={{
              condtionToRenderAllData: { filterKeys: [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.FOLLOW_UP], key: 'appointment_status', omit: ['department_name'] },
              rawData: filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.FOLLOW_UP, APPOINTMENT_STATUS.COMPLETED], 'doctor_id', "department_name"),
              linkConfiguration: [
                { field: CHANGE_APPOINTMENT_STATUS, label: CHANGE_APPOINTMENT_STATUS, showLink: false, condition: APPOINTMENT_STATUS.COMPLETED, conditionField: 'appointment_status' },
              ],
              apisToCall: apisToCallConsultation,
              role: 'doctor',
              specificState: 'appointment',
              reducer: 'appointmentReducer',
              fieldsToShowOnEdit: fieldsToShowAppintmentsAdd,
              mainRecordId: 'appointment_id',
            }}
          />

          <Card
            title="Upcoming Appointments"
            icon={FaCalendar}
            fieldsToShow={patientInitialState.fieldsToShowAppintmentsView}
            data={filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.FOLLOW_UP], 'doctor_id', "department_name")}
            navigate='/list'
            dataToBePassed={{
              condtionToRenderAllData: { filterKeys: [APPOINTMENT_STATUS.APPROVED], key: 'appointment_status' },
              rawData: filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.FOLLOW_UP], 'doctor_id', "department_name"),
              // linkFields: [PRESCRIBE],
              linkLabels: [PRESCRIBE],
              addToResponseIfActionSuccess: { PRESCRIBE: { appointment_status: APPOINTMENT_STATUS.COMPLETED } },
              apisToCall: apisToCallPrescribe,
              role: 'doctor',
              specificState: 'appointment',
              reducer: 'appointmentReducer',
              fieldsToShowOnEdit: fieldsToShowPrescribeAdd,
              mainRecordId: 'appointment_id',
            }}
          />

          <Card
            title="Patient List"
            icon={FaUser}
            navigate='/list'

            data={filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.FOLLOW_UP], 'doctor_id', "department_name").length.toString()}
            dataToBePassed={{
              condtionToRenderAllData: { filterKeys: [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.FOLLOW_UP], key: 'appointment_status' },
              rawData: filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.FOLLOW_UP], 'doctor_id', "department_name"),
              role: 'doctor',
              addToResponseIfActionSuccess: { PRESCRIBE: { appointment_status: APPOINTMENT_STATUS.COMPLETED } },
              apisToCall: apisToCallPrescribe,
              specificState: 'appointment',
              reducer: 'appointmentReducer',
              mainRecordId: 'appointment_id',
            }}
          />

          <Card
            title="Prescription Management"
            icon={FaFilePrescription}
            navigate='/list'
            data={filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.FOLLOW_UP], 'doctor_id', "department_name").length.toString()}
            dataToBePassed={{
              condtionToRenderAllData: { filterKeys: [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.FOLLOW_UP], key: 'appointment_status', omit: ['department_name'] },
              rawData: filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.FOLLOW_UP, APPOINTMENT_STATUS.COMPLETED], 'doctor_id', "department_name"),
              linkConfiguration: [
                { field: VIEW_PRESCRIPTION, label: VIEW_PRESCRIPTION, showLink: true },
                { field: PRESCRIBE, label: PRESCRIBE, showLink: false, condition: APPOINTMENT_STATUS.COMPLETED, conditionField: 'appointment_status' },
                // Other link configurations...
              ],

              omitForViewFields: ['doctor_id', 'patient_id', 'doctor_name', 'prescription_id', 'department_id', 'appointment_date', 'dosage', 'appointment_id'],
              //  addToResponseIfActionSuccess: { PRESCRIBE: { appointment_status: APPOINTMENT_STATUS.COMPLETED } },
              apisToCall: apisToCallPrescribe,
              role: 'doctor',
              specificState: 'appointment',
              reducer: 'appointmentReducer',
              fieldsToShowOnEdit: fieldsToShowPrescribeAdd,
              mainRecordId: 'appointment_id',
            }}
          />

          <Card
            title="Video Consultation"
            icon={FaVideo}
            navigate='/list'
            data={Array.isArray(video.getSpecificDoctorVideoRecords) && video.getSpecificDoctorVideoRecords.length > 0 ? video.getSpecificDoctorVideoRecords.length.toString() : []}
            dataToBePassed={{
              condtionToRenderAllData: { omit: ['doctor_name'] },
              apisToCall: apisToCallVideoConsultation,
              linkConfiguration: [
                {
                  field: JOIN_MEETING, label: JOIN_MEETING, showLink: false, condition: VIDEO_CONSULTATION_STATUS.COMPLETED_VIDEO_CONSULTATION,
                  conditionField: 'consultation_status', isRedirect: true, redirectUrl: 'video_consultation_link'
                },
                {
                  field: CHANGE_VIDEO_CONSULTATION_STATUS, label: CHANGE_VIDEO_CONSULTATION_STATUS, showLink: false,
                  condition: VIDEO_CONSULTATION_STATUS.COMPLETED_VIDEO_CONSULTATION, conditionField: 'consultation_status'
                },
              ],
              rawData: filterRequestArray(video.getSpecificDoctorVideoRecords, null, null, null, ['doctor_name']),
              fieldsToShowOnEdit: fieldsToShowVideoConsultation,
              role: 'doctor',
              mainRecordId: 'consultation_id'
            }}
          />


        </div>
      </div>
    </main>
  );
};

export default DoctorDashboard;
