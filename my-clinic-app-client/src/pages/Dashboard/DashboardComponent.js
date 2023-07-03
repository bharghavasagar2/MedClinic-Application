import React from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from '../commonComponents/HeaderCommonComponent.js';
import DashboardGrid from './DashboardGridComponent.js';

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <HeaderComponent />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <DashboardGrid />
      </main>
    </div>
  );
};

export default Dashboard;
