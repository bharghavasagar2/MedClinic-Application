import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/medclinic-logo.jpg';

const HeaderComponent = () => {
  return (
    <header className="bg-white shadow-sm bg-opacity-40">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to='/dashboard' className="w-64 h-15">
          <img className="w-full h-full object-cover" src={logo} alt="icon" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold" style={{ marginRight: '10rem' }}>Dashboard</h1>
        </div>


        <div>
          <Link to="/logout" className="text-red-500 hover:text-red-600 font-semibold">
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
