import React, { useEffect } from 'react';
import AppRouter from './routes/AppRouter';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from "react-ga";

const App = () => {

  useEffect(() => {
    console.log(process.env.NODE_ENV)
    const initializeGoogleAnalytics = () => {
      if (process.env.NODE_ENV === 'production') {
        ReactGA.initialize('G-BX0SGJ8J4W');
        ReactGA.pageview(window.location.pathname + window.location.search);
      }
    };
    initializeGoogleAnalytics();
  }, []);

  return (
    <AppRouter />
  );
};

export default App;
