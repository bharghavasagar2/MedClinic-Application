import React from 'react';

const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Total Patients</h2>
        <p className="text-gray-600">100</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Total Appointments</h2>
        <p className="text-gray-600">50</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Total Doctors</h2>
        <p className="text-gray-600">10</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Total Payments</h2>
        <p className="text-gray-600">$5000</p>
      </div>
    </div>
  );
};

export default DashboardGrid;
