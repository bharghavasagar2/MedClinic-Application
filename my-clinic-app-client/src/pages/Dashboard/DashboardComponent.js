import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from '../commonComponents/HeaderCommonComponent.js';
import DashboardGrid from './DashboardGridComponent.js';
import PatientScreen from './PatientDashboardMainContent.js';
import DoctorDashboard from './DoctorDashboardMain.js';
import backgroundImage from '../../images/homepage.jpg';
import { setData } from '../../security/sessionStorage.js';
import { useSelector } from 'react-redux';
const Dashboard = () => {
  const authentication = useSelector(({ authentication }) => authentication);

  useEffect(() => {
    if (!!authentication.loggedIn && !!authentication.token) {
      setData('userDetails', { ...authentication });
    }
  }, [!!authentication.loggedIn, !!authentication.token]);

  return (
    <div className="bg-gray-100 min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
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
