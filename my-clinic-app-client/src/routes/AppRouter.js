import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landingPage/LandingPageComponent';
import LoginPage from '../pages/loginComponent/login.js';
import PatientSignup from '../pages/loginComponent/patientSignUp.js';
import AdminLogin from '../pages/loginComponent/AdminLoginPageComponent';
import Dashboard from '../pages/Dashboard/DashboardComponent';
import { Loading } from '../api/api';
import PrivateRoutes from '../token/withTokenAuth';
import NotFound from '../pages/commonComponents/NotFoundComponent';
import List from '../pages/commonComponents/commonListComponent';
import PatientSignupWalkinForm from '../pages/Dashboard/WalkinPatientSignUpComponent.js'
import { ToastContainer } from 'react-toastify';

// Import other pages as needed

const AppRouter = () => {

  return (
    <Router>
      <Loading />
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/homepage" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<PatientSignup />} />
          <Route path="/adminLogin" element={<AdminLogin />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list" element={<List />} />
            <Route path="/adminPatientSignup" element={<PatientSignupWalkinForm />} />
          </Route>
          {/* Fallback route for handling undefined routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
