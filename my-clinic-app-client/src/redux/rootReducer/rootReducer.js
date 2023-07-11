import { combineReducers } from '@reduxjs/toolkit';
import patientsReducer from '../reducers/patientsSlice';
import doctorsReducer from '../reducers/doctorsSlice';
import appointmentsReducer from '../reducers/appointmentsSlice';
import prescriptionsReducer from '../reducers/prescriptionsSlice';
import authenticationReducer from '../reducers/authenticationSlice';
import videoReducer from '../reducers/videoSlice';
import notificationReducer from '../reducers/notificationSlice';
import { LOGOUT, RESET_PROPERTY } from '../../commonConfig/commonConfig.js';
import paymentReducer from '../reducers/paymentSlice';
import commonReducer from '../commonSlice/slice.js';


const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = {
      patients: patientsReducer(undefined, {}),
      doctors: doctorsReducer(undefined, {}),
      appointments: appointmentsReducer(undefined, {}),
      prescriptions: prescriptionsReducer(undefined, {}),
      authentication: authenticationReducer(undefined, {}),
      video: videoReducer(undefined, {}),
      notification: notificationReducer(undefined, {}),
      payments: paymentReducer(undefined, {}),
      common: commonReducer(undefined, {}),
    };
  }
  if (action.type === RESET_PROPERTY) {
    const { reducer, property } = action;
    const initialState = combineReducers({
      patients: patientsReducer,
      doctors: doctorsReducer,
      appointments: appointmentsReducer,
      prescriptions: prescriptionsReducer,
      authentication: authenticationReducer,
      video: videoReducer,
      notification: notificationReducer,
      payments: paymentReducer,
      common: commonReducer,
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
    notification: notificationReducer,
    payments: paymentReducer,
    common: commonReducer,
  })(state, action);
};

export { patientsReducer, doctorsReducer, appointmentsReducer, prescriptionsReducer, authenticationReducer, videoReducer }
export default rootReducer;



