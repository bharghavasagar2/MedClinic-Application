import { departments, appointmentType, GENDER_OPTIONS } from "../../commonConfig/commonConfig";

export const patientInitialState = {
  patientFormValues: {},
  paymentFormValues: {},
  patientEditDetailsForm: {},
  appointmentList: [],
  isShowPatientEditDetails: false,
  isGetFlag: false,
  isOpen: false,
  isGetPaymentFlag: false,
  isAppointmentAdded: false,
  isShowPaymentScreen: false,
  fieldsToShowView: [{ label: 'Patient Name', name: 'patient_name' },
  { label: 'Address', name: 'address' },
  { label: 'Contact Number', name: 'contact_number' },
  { label: 'Age', name: 'patient_age' },
  { label: 'Gender', name: 'patient_gender' }
  ],
  fieldsToShowAppintmentsAdd: [{ name: 'appointment_date', label: 'Date', type: 'date', required: true, },
  { name: 'appointment_time', label: 'Time', type: 'time', required: true, },
  {
    name: 'department_id',
    label: 'Select Department', required: true,
    type: 'select',
    options: departments,
  },
  {
    name: 'appointment_type',
    label: 'Select Appointment Type', required: true,
    type: 'select',
    options: appointmentType,
  },
  ],
  fieldsToShowAppintmentsView: [{ label: 'Date', name: 'appointment_date' },
  { label: 'Time', name: 'appointment_time' },
  { label: 'Appointment Type', name: 'appointment_type' },
  { label: 'Department', name: 'department_name' }
  ],
  fieldsToShowEditPatient: [{ label: 'Patient Name', name: 'patient_name', required: true },
  { label: 'Address', name: 'address', required: true },
  { label: 'Contact Number', name: 'contact_number', required: true },
  { label: 'Age', name: 'patient_age', required: true },
  { label: 'Gender', name: 'patient_gender', type: 'select', options: GENDER_OPTIONS, required: true },
  ],
  RaiseRequestFields: [
    // { name: 'name', label: 'Name', type: 'text', required: true, },
    { name: 'appointment_date', label: 'Date', type: 'date', required: true, },
    { name: 'appointment_time', label: 'Time', type: 'time', required: true, },
    {
      name: 'department_id',
      label: 'Select Department', required: true,
      type: 'select',
      options: departments,
    },
    {
      name: 'appointment_type',
      label: 'Select Appointment Type', required: true,
      type: 'select',
      options: appointmentType,
    },
  ]
}


export const apisToCall = {
  view: {
    endpoint: '/appointments',
    // id: 'dataId',
  },
  create: {
    endpoint: '/appointments',             // Replace with the actual endpoint for your API
    // id: 'dataId',
  },
  delete: {
    endpoint: '/appointments',                 // Replace with the actual endpoint for your API
    // id: 'dataId',
  },
  update: {
    endpoint: '/appointments',       // Replace with the actual endpoint for your API
    id: 'dataId',
  },
  getAll: {
    endpoint: 'appointments', // Replace with the actual endpoint for your API
    // id: 'dataId',
  }
}


export let resetScreen = { isAppointmentAdded: false, isShowPaymentScreen: false, isShowPatientEditDetails: false, }