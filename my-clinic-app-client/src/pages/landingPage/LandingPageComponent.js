import React from 'react';
import { Link } from 'react-router-dom';

import backgroundImage from '../../images/homepage.jpg';

const LandingPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
    >
      <div className="max-w-3xl mx-auto px-4 py-8 bg-white bg-opacity-90 rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to MetClinic</h1>
        <p className="text-lg text-center text-gray-700 mb-8">
          We provide high-quality healthcare services for patients worldwide.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded">
            Sign Up/Login
          </Link>
          <Link className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};


export default LandingPage;
