import { combineReducers } from '@reduxjs/toolkit';
import patientsReducer from '../reducers/patientsSlice';
import doctorsReducer from '../reducers/doctorsSlice';
import appointmentsReducer from '../reducers/appointmentsSlice';
import prescriptionsReducer from '../reducers/prescriptionsSlice';
import authenticationReducer from '../reducers/authenticationSlice';
import videoReducer from '../reducers/videoSlice';
import { RESET_PROPERTY } from '../../commonConfig/commonConfig.js';

const rootReducer = (state, action) => {
  if (action.type === RESET_PROPERTY) {
    const { reducer, property } = action;
    const initialState = combineReducers({
      patients: patientsReducer,
      doctors: doctorsReducer,
      appointments: appointmentsReducer,
      prescriptions: prescriptionsReducer,
      authentication: authenticationReducer,
      video: videoReducer,
    })(undefined, {});
    const updatedState = {
      ...state,
      [reducer]: {
        ...state[reducer],
        [property]: initialState[reducer][property],
      },
    };
    return updatedState;
  }
  return combineReducers({
    patients: patientsReducer,
    doctors: doctorsReducer,
    appointments: appointmentsReducer,
    prescriptions: prescriptionsReducer,
    authentication: authenticationReducer,
    video: videoReducer,
  })(state, action);
};

export { patientsReducer, doctorsReducer, appointmentsReducer, prescriptionsReducer, authenticationReducer, videoReducer }
export default rootReducer;



