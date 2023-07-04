import React from 'react';
import { FaUser, FaCalendar, FaStethoscope, FaMoneyBillWave } from 'react-icons/fa';
import Card from '../commonComponents/CardComponent';
import AnalyticalInfo from '../commonComponents/AnalyticalReportsComponent';

const Dashboard = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6 bg-opacity-70">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Total Patients"
          icon={FaUser}
          array={[]}
        />
        <Card
          title="Total Appointments"
          icon={FaCalendar}
          array={[]}
        />
        <Card
          title="Total Doctors"
          icon={FaStethoscope}
          array={[]}
        />
        <Card
          title="Total Payments"
          icon={FaMoneyBillWave}
          array={[]}
        />
      </div>
      <AnalyticalInfo />
    </main>
  );
};

export default Dashboard;
