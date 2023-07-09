import React from 'react';
import Table from '../commonComponents/DataTable.js';
import HeaderComponent from './HeaderCommonComponent.js';
import backgroundImage from '../../images/homepage.jpg';
import { useLocation } from 'react-router-dom';
const List = () => {
  const location = useLocation();
  console.log(location)
  const passedData = location.state && location.state;
  console.log(passedData)
  const columns = [
    { id: 1, label: 'Appointment ID', field: 'appointment_id' },
    { id: 2, label: 'Appointment Type', field: 'appointment_type' },
    { id: 3, label: 'Appointment Date', field: 'appointment_date' },
    { id: 4, label: 'Appointment Time', field: 'appointment_time' },
    // Add more columns as needed
  ];


  const data = passedData ? passedData.map(item => ({
    appointment_id: item.appointment_id,
    appointment_type: item.appointment_type,
    appointment_date: item.appointment_date,
    appointment_time: item.appointment_time,
    // Add more fields as needed
  })) : [];


  return (
    <div className="bg-gray-100 min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      {/* Header Common Component */}
      <HeaderComponent />
      <div className="container mx-auto px-4 py-6">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default List;
