import React, { useEffect } from 'react';
import { FaUser, FaCalendar, FaStethoscope, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import AnalyticalInfo from '../commonComponents/AnalyticalReportsComponent';
import Card from '../commonComponents/CardComponent';
import { getAppointmentAllRecords } from '../../redux/reducers/appointmentsSlice';
import { APPOINTMENT_STATUS, getUserId, useReduxHelpers } from '../../commonConfig/commonConfig';
import { filterRequestArray } from '../../commonConfig/commonFunction';
import { fetchAllPatientRecords } from '../../redux/reducers/patientsSlice';
import { fetchAllDocRecords } from '../../redux/reducers/doctorsSlice';
import { fetchAllPaymentRecords } from '../../redux/reducers/paymentSlice';

const DashboardGrid = () => {

  const { globalState, dispatch, navigate } = useReduxHelpers();

  let { appointments, payments, patients, doctors } = globalState;


  useEffect(() => {
    dispatch(getAppointmentAllRecords())
    dispatch(fetchAllPatientRecords())
    dispatch(fetchAllDocRecords())
    dispatch(fetchAllPaymentRecords())
  }, []);

  let requestLength = !!appointments.allappointments ? appointments.allappointments.length.toString() : '';

  //let filterRequestArray = !!appointments.allappointments ? appointments.allappointments.filter(({ appointment_status }, i) => appointment_status === APPOINTMENT_STATUS.PENDING) : '';

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 bg-opacity-70">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <Card title="Total Patients" navigate='/list' icon={FaUser} data={patients.allPatients.length.toString()}
        />
        <Card
          title="Pending Appointment Requests"
          icon={FaClock} navigate='/list'
          data={filterRequestArray(appointments.allappointments, 'appointment_status', APPOINTMENT_STATUS.PENDING).length.toString()}
        />

        <Card title="Total Appointments Scheduled" navigate='/list' icon={FaCalendar} data={filterRequestArray(appointments.allappointments, 'appointment_status', APPOINTMENT_STATUS.APPROVED).length.toString()}
        />
        <Card title="Total Doctors" icon={FaStethoscope} navigate='/list' data={doctors.alldoctors.length.toString()} />
        <Card title="Total Payments" icon={FaMoneyBillWave} navigate='/list' data={payments.allpayments.length.toString()} />
      </div>
      <AnalyticalInfo
        //data={}
        width={800} height={500} barColor="#ff7f50" />
    </main>

  );
};

export default DashboardGrid;
