import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getData } from '../security/sessionStorage';


export const USER_DETAILS = 'userDetails';



export const APPOINTMENT_STATUS = {
  PENDING: 'Pending with admin',
  APPROVED: 'Approved',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
};
export const LOGOUT = 'LOGOUT';
export const PAYMENT_STATUS = {
  PENDING: 'Pending',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
};
let globalState;
export const useReduxHelpers = () => {

  let globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return { globalState, dispatch, navigate };
}

export { globalState }

export const RESET_PROPERTY = 'resetProperty';
export const departments = [
  { value: 1, label: 'Cardiology' },
  { value: 2, label: 'Dermatology' },
  { value: 3, label: 'Gastroenterology' },
  { value: 4, label: 'Neurology' },
  { value: 5, label: 'Orthopedics' },
  { value: 6, label: 'General physician' }
];
export const appointmentType = [
  { value: 'Walk-in', label: 'Walk-in' },
  { value: 'Online', label: 'Online' },
];


export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'others', label: 'Others' },
]

export const getUserId = (authentication) => {
  let reduxUserId = authentication?.userId;
  let userId = reduxUserId || getData(USER_DETAILS)?.userId;
  return userId;
}

export const filterArray = (data, filterArrayKey) => {
  if (Array.isArray(data) && data.length > 0) {
    let filterData = data;
    if (filterArrayKey) {
      filterData = data.filter(({ appointment_status }) => !!appointment_status && appointment_status === filterArrayKey);
    }

    if (Array.isArray(filterData) && filterData.length > 0) {
      filterData = filterData.slice(0, 1);
    }
    return filterData;
  } else {
    return [];
  }
}

export const EDIT = 'Edit';
export const VIEW = 'View';
export const Cancel = 'Cancel';
export const Config = 'Config';
export const Approve = 'Approve';



