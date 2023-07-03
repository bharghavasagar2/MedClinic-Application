import React from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from '../commonComponents/HeaderCommonComponent.js';
import DashboardGrid from './DashboardGridComponent.js';
import PatientScreen from './PatientDashboardMainContent.js';
import DoctorDashboard from './DoctorDashboardMain.js';

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Common Component */}
      <HeaderComponent />
      {/* Main Component */}
      {/* <DashboardGrid /> */}
      <PatientScreen />
      {/* <DoctorDashboard /> */}
    </div>
  );
};

export default Dashboard;
