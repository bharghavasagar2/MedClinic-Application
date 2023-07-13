export const initialState = {
  isView: false,
  isEdit: false,
  isCancel: false,
  getAddUpdateFlag: false,
  getAlldataFlag: false,
  dataArrayList: []
}

export const actionTypeInitialState = {
  isView: false,
  isEdit: false,
  isCancel: false,
  getAddUpdateFlag: false,
  getAlldataFlag: false,
  isAssignDoc: false
}

export const resetCommonSlice = (dispatch, resetProperty, specificKeyreset = false) => {
  if (specificKeyreset === false) {
    dispatch(resetProperty('common', 'createUpdateDataById'))
    dispatch(resetProperty('common', 'allData'))
    dispatch(resetProperty('common', 'dataById'))
    dispatch(resetProperty('common', 'deleteDataById'))
  } else {
    dispatch(resetProperty('common', specificKeyreset))
  }
}

// export const handleApiCall = (reducer, apiAction, reducer) => {
//   let actionCreators;//ssds
//   switch (reducer) {
//     case 'patientsReducer':
//       actionCreators = patientsReducer[apiAction];
//       break;
//     case 'appointmentReducer':
//       actionCreators = appointmentReducer[apiAction];
//       break;
//     case 'notificationReducer':
//       actionCreators = notificationReducer[apiAction];
//       break;
//     case 'doctorsReducer':
//       actionCreators = doctorsReducer[apiAction];
//       break;
//     case 'videosReducer':
//       actionCreators = patientsReducer[apiAction];
//       break;
//     case 'prescriptionReducer':
//       actionCreators = prescriptionReducer[apiAction];
//       break;
//     case 'paymentsReducer':
//       actionCreators = paymentsReducer[apiAction];
//       break;
//     default:
//       break;
//   }
//   return actionCreators;
// }



// import * as patientsReducer from '../../redux/reducers/patientsSlice.js';
// import * as appointmentReducer from '../../redux/reducers/appointmentsSlice.js'
// import * as notificationReducer from '../../redux/reducers/notificationSlice.js'
// import * as doctorsReducer from '../../redux/reducers/doctorsSlice.js'
// import * as videosReducer from '../../redux/reducers/videoSlice.js';
// import * as prescriptionReducer from '../../redux/reducers/prescriptionsSlice.js'
// import * as paymentsReducer from '../../redux/reducers/paymentSlice.js';