import React from 'react';
import { FaUser, FaCalendar, FaStethoscope, FaMoneyBillWave } from 'react-icons/fa';
import AnalyticalInfo from '../commonComponents/AnalyticalReportsComponent';
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
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <FaUser className="mr-2" />
            Total Patients
          </h2>
          <p className="text-gray-600">100</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <FaCalendar className="mr-2" />
            Total Appointments
          </h2>
          <p className="text-gray-600">50</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <FaStethoscope className="mr-2" />
            Total Doctors
          </h2>
          <p className="text-gray-600">10</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <FaMoneyBillWave className="mr-2" />
            Total Payments
          </h2>
          <p className="text-gray-600">$5000</p>
        </div>
      </div>
      <AnalyticalInfo />
    </main>
  );
};

export default DashboardGrid;
