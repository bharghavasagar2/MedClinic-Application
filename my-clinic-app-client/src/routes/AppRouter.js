import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landingPage/LandingPageComponent';
import LoginPage from '../pages/loginComponent/login.js';
import PatientSignup from '../pages/loginComponent/patientSignUp.js';

const HomePage = lazy(() => import('../pages/HomePage'));
const AppointmentsPage = lazy(() => import('../pages/AppointmentsPage'));
// Import other pages as needed

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/homepage" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<PatientSignup />} />
          {/* Add more routes for other pages */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
