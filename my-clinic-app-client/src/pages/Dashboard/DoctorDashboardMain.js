import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendar, FaUserMd, FaUserTimes, FaStethoscope, FaFilePrescription, FaVideo } from 'react-icons/fa';
import Card from '../commonComponents/CardComponent';
import { APPOINTMENT_STATUS, CHANGE_APPOINTMENT_STATUS, EDIT, PRESCRIBE, USER_DETAILS, VIEW_PRESCRIPTION, filterArray, useReduxHelpers } from '../../commonConfig/commonConfig';
import { getAppointmentAllRecords } from '../../redux/reducers/appointmentsSlice';
import { getData } from '../../security/sessionStorage';
import { getAppdoctorsById } from '../../redux/reducers/doctorsSlice';
import { initialStateDoctor } from './initialStateDashboardScreen';
import { filterRequestArray } from '../../commonConfig/commonFunction';

const DoctorDashboard = () => {

  let { globalState, dispatch } = useReduxHelpers();

  let { getdoctorById } = globalState.doctors;

  let { appointments, payments, patients, authentication } = globalState;

  let [state, setState] = useState({ ...initialStateDoctor })


  useEffect(() => {
    let reduxUserId = globalState.authentication?.userId;
    console.log(reduxUserId)
    let userId = reduxUserId || getData(USER_DETAILS)?.userId;
    console.log(getData(USER_DETAILS)?.userId);
    dispatch(getAppointmentAllRecords())
    dispatch(getAppdoctorsById(userId));
  }, [])


  let { apisToCallPrescribe, fieldsToShowPrescribeAdd, fieldsToShowAppintmentsAdd, apisToCallConsultation } = state;
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
            navigate='/list'
            data={filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.FOLLOW_UP], 'doctor_id', "department_name").length.toString()}
            dataToBePassed={{
              condtionToRenderAllData: { filterKeys: [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.FOLLOW_UP], key: 'appointment_status', omit: ['department_name'] },
              rawData: filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.FOLLOW_UP, APPOINTMENT_STATUS.COMPLETED], 'doctor_id', "department_name"),
              linkFields: [CHANGE_APPOINTMENT_STATUS],
              linkLabels: [CHANGE_APPOINTMENT_STATUS],
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
            data={filterRequestArray(appointments.allappointments, 'appointment_status', [APPOINTMENT_STATUS.APPROVED, APPOINTMENT_STATUS.FOLLOW_UP], 'doctor_id', "department_name").length.toString()}
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
              linkFields: [VIEW_PRESCRIPTION, PRESCRIBE],
              linkLabels: [VIEW_PRESCRIPTION, PRESCRIBE],
              conditionField2: 'appointment_status',
              conditionValue2: APPOINTMENT_STATUS.COMPLETED,
              omitForViewFields: ['doctor_id', 'patient_id', 'doctor_name', 'prescription_id', 'department_id', 'appointment_date', 'dosage', 'appointment_id', 'appointment_status'],
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
          />


        </div>
      </div>
    </main>
  );
};

export default DoctorDashboard;
