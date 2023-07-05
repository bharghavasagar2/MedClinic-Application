import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landingPage/LandingPageComponent';
import LoginPage from '../pages/loginComponent/login.js';
import PatientSignup from '../pages/loginComponent/patientSignUp.js';
import AdminLogin from '../pages/loginComponent/AdminLoginPageComponent';
import Dashboard from '../pages/Dashboard/DashboardComponent';
import { Loading } from '../api/api';
import PrivateRoutes from '../token/withTokenAuth';

// Import other pages as needed

const AppRouter = () => {

  return (
    <Router>
      <Loading />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/homepage" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<PatientSignup />} />
          <Route path="/adminLogin" element={<AdminLogin />} />

          {/* Auth Protected Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          {/* Add more routes for other pages */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
