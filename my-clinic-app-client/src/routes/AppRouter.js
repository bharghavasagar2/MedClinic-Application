import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage'));
const AppointmentsPage = lazy(() => import('../pages/AppointmentsPage'));
// Import other pages as needed

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          {/* Add more routes for other pages */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
