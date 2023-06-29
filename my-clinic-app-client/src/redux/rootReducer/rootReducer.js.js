import { combineReducers } from '@reduxjs/toolkit';
import patientsReducer from '../reducers/patientsSlice';
import doctorsReducer from '../reducers/doctorsSlice';
import appointmentsReducer from '../reducers/appointmentsSlice';
import prescriptionsReducer from '../reducers/prescriptionsSlice';
import authenticationReducer from '../reducers/authenticationSlice';
import videoReducer from '../reducers/videoSlice';

const rootReducer = combineReducers({
  patients: patientsReducer,
  doctors: doctorsReducer,
  appointments: appointmentsReducer,
  prescriptions: prescriptionsReducer,
  authentication: authenticationReducer,
  video: videoReducer,
});

export default rootReducer;
