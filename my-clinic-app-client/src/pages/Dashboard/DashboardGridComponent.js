import React from 'react';
import { FaUser, FaCalendar, FaStethoscope, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import AnalyticalInfo from '../commonComponents/AnalyticalReportsComponent';
import Card from '../commonComponents/CardComponent';

const DashboardGrid = () => {
  const data = [
    { month: 'Jan', revenue: 1500 },
    { month: 'Feb', revenue: 2100 },
    { month: 'Mar', revenue: 1800 },
    { month: 'Apr', revenue: 2200 },
    { month: 'May', revenue: 2800 },
    { month: 'Jun', revenue: 3200 },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 bg-opacity-70">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Total Patients" icon={FaUser} infoToShow={['Total Patients']} info={['100']} />
        <Card
          title="Pending Appointment Requests"
          icon={FaClock}
          data='$5000'
        />

        <Card title="Total Appointments" icon={FaCalendar} infoToShow={['Total Appointments']} info={['50']} />
        <Card title="Total Doctors" icon={FaStethoscope} infoToShow={['Total Doctors']} info={['10']} />
        <Card title="Total Payments" icon={FaMoneyBillWave} infoToShow={['Total Payments']} info={['$5000']} />
      </div>
      <AnalyticalInfo data={data} width={800} height={500} barColor="#ff7f50" />
    </main>

  );
};

export default DashboardGrid;
