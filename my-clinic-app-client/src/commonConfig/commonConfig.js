import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getData } from '../security/sessionStorage';


export const USER_DETAILS = 'userDetails';



export const APPOINTMENT_STATUS = {
  PENDING: 'Pending with admin',
  APPROVED: 'Scheduled',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
  AWAITING_RESULTS: 'Awaiting Results',
  FOLLOW_UP: 'Follow-up',
};
export const LOGOUT = 'LOGOUT';
export const PAYMENT_STATUS = {
  PENDING: 'Pending',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
};

export const useReduxHelpers = () => {

  let globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return { globalState, dispatch, navigate };
}



export const RESET_PROPERTY = 'resetProperty';
export const departments = [
  { value: 1, label: 'Cardiology' },
  { value: 2, label: 'General physician' },
  { value: 3, label: 'Dermatology' },
  { value: 4, label: 'Orthopedics' },
  { value: 5, label: 'Gastroenterology' },
  { value: 6, label: 'Neurology' }
];

export const appointmentType = [
  { value: 'Walk-in', label: 'Walk-in' },
  { value: 'Online', label: 'Online' },
];

export const appointmentTypeWalkIn = 'Walk-in';
export const appointmentTypeOnline = 'Online';

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

export const JOIN_MEETING = 'Join Meeting';

export let VIDEO_CONSULTATION_STATUS = {
  PENDING_VIDEO_CONSULTATION: 'Pending Video Consultation',
  COMPLETED_VIDEO_CONSULTATION: 'Completed Video Consultation',
  CANCELLED_VIDEO_CONSULTATION: 'Cancelled Video Consultation',
}
export const DELETE = 'DELETE';
export const VIEW_DOCTOR_COMPLETE_PROFILE = 'View Doctor Complete Profile';
export const EDIT = 'EDIT';
export const VIEW = 'VIEW';
export const Cancel = 'Cancel';
export const CHANGE_VIDEO_CONSULTATION_STATUS = 'Change Video Consultation Status';
export const Config = 'Config';
export const Approve = 'Approve';
export const ASSIGN_DOC = 'ASSIGN_DOC';
export const PRESCRIBE = 'PRESCRIBE';

export const VIDEO_CONSULTATION_FIELDS = [
  { value: VIDEO_CONSULTATION_STATUS.PENDING_VIDEO_CONSULTATION, label: VIDEO_CONSULTATION_STATUS.PENDING_VIDEO_CONSULTATION },
  { value: VIDEO_CONSULTATION_STATUS.COMPLETED_VIDEO_CONSULTATION, label: VIDEO_CONSULTATION_STATUS.COMPLETED_VIDEO_CONSULTATION },
  { value: VIDEO_CONSULTATION_STATUS.CANCELLED_VIDEO_CONSULTATION, label: VIDEO_CONSULTATION_STATUS.CANCELLED_VIDEO_CONSULTATION },
]


export const USER_ROLES = ['patient', 'doctor'];

export const AWAITING_RESULTS = 'Awaiting Results';

export const CHANGE_APPOINTMENT_STATUS = 'Change Appointment Status';

export const VIEW_PRESCRIPTION = 'View Prescription Details';

export const appointmentPrescribeStatus = [
  { value: APPOINTMENT_STATUS.FOLLOW_UP, label: APPOINTMENT_STATUS.FOLLOW_UP },
  { value: APPOINTMENT_STATUS.COMPLETED, label: APPOINTMENT_STATUS.COMPLETED },
];




