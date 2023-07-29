import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../images/homepage.jpg';

const LandingPage = () => {

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
    >
      <div className="mx-auto p-8 bg-white bg-opacity-70 rounded-lg shadow-lg max-w-lg">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to Medclinic</h1>
        <p className="text-lg text-center text-gray-700 mb-8">
          We provide high-quality healthcare services for patients worldwide.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded">
            Sign Up/Login
          </Link>
          <Link to="/adminLogin" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};


export default LandingPage;
