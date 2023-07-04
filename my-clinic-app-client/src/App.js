import React from 'react';
import AppRouter from './routes/AppRouter';
import './styles.css';
import { Loading } from './api/api';

const App = () => {
  return (
    <div>
      <Loading />
      <AppRouter />
    </div>
  );
};

export default App;
