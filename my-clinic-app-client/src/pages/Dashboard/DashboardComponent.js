import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from '../commonComponents/HeaderCommonComponent.js';
import DashboardGrid from './DashboardGridComponent.js';
import PatientScreen from './PatientDashboardMainContent.js';
import DoctorDashboard from './DoctorDashboardMain.js';
import backgroundImage from '../../images/homepage.jpg';
import { getData, setData } from '../../security/sessionStorage.js';
import { useSelector } from 'react-redux';
import NotFound from '../commonComponents/NotFoundComponent.js';
let token;
const Dashboard = () => {
  const authentication = useSelector(({ authentication }) => authentication);
  token = authentication.token || setData('userDetails')?.token;

  useEffect(() => {
    if (!!authentication.loggedIn && !!authentication.token) {
      setData('userDetails', { ...authentication });
    }
  }, [!!authentication.loggedIn, !!authentication.token]);

  let renderDashboardGrid = () => {
    let role = getData('userDetails')?.role || authentication.role;
    switch (role) {
      case 'admin':
        return <DashboardGrid />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'patient':
        return <PatientScreen />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      {/* Header Common Component */}
      <HeaderComponent />
      {/* Main Component */}
      {renderDashboardGrid()}


    </div>
  );
};

///export { token }

export default Dashboard;
