import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/medclinic-logo.jpg';

const HeaderComponent = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="w-64 h-15">
          <img className="w-full h-full object-cover" src={logo} alt="icon" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <div>
          <Link to="/logout" className="text-blue-500 hover:text-blue-600 font-semibold">
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
