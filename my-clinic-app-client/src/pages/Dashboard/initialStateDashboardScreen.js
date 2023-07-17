import moment from "moment";
import { departments, appointmentType, GENDER_OPTIONS, appointmentPrescribeStatus, VIDEO_CONSULTATION_FIELDS } from "../../commonConfig/commonConfig";

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
  apisToCallPrescribe: {
    view: {
      endpoint: '/prescriptions/appointments',
      // id: 'dataId',
    },
    create: {
      endpoint: '/prescriptions',             // Replace with the actual endpoint for your API
      // id: 'dataId',
    },
    delete: {
      endpoint: '/prescriptions',                 // Replace with the actual endpoint for your API
      // id: 'dataId',
    },
    update: {
      endpoint: '/prescriptions',       // Replace with the actual endpoint for your API
      // id: 'dataId',
    },
    getAll: {
      endpoint: '/appointments', // Replace with the actual endpoint for your API
      // id: 'dataId',
    }
  },
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



export const apisToCallAppointmentRequestPatient = {
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
    endpoint: '/appointments', // Replace with the actual endpoint for your API
    // id: 'dataId',
  }
}

export const apisToCallAppointmentRequestAdmin = {
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
    endpoint: '/appointments', // Replace with the actual endpoint for your API
    // id: 'dataId',
  }
}



export let resetScreen = {
  isAppointmentAdded: false,
  isShowPaymentScreen: false, isShowPatientEditDetails: false,
}

///Admin >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const initalStateDashboardGrid = {
  isShowAddDoctorScreen: false,
  isAddCredenForDoctor: false,
  isOpen: false,
  isAddFlag: false,
  doctorFormValues: {},
  doctorCredFormValues: {},
  addCredentialFields: [
    { name: 'username', label: 'Username', type: 'text', required: true, },
    { name: 'password', label: 'Password', type: 'text', required: true, },
  ],
  addDoctorFields: [
    { name: 'doctor_name', label: 'Doctor Name', type: 'text', required: true, },
    { name: 'contact_number', label: 'Contact Number', type: 'text', required: true, },
    { name: 'email', label: 'Email', type: 'text', required: true, },
    {
      name: 'department_id',
      label: 'Select Department', required: true,
      type: 'select',
      options: departments,
    },
  ],
  fieldsToShowVideoConsultation: [//video_consultation_link
    { name: 'appointment_date', label: 'Appointment Date', type: 'date', disabled: true, },
    { name: 'appointment_time', label: 'Appointment Time', type: 'time', disabled: true, },
    { name: 'patient_name', label: 'Patient', type: 'text', disabled: true, },
    { name: 'video_consultation_link', label: 'Video Consultation Link', type: 'text', disabled: true, },
    {
      name: 'consultation_status',
      label: 'Select consultation_status', required: true,
      type: 'select',
      options: VIDEO_CONSULTATION_FIELDS,
    },
  ]
}

export const assignDoctorFields = [

  { name: 'appointment_date', label: 'Date', type: 'date', required: true, disabled: true },
  { name: 'appointment_time', label: 'Time', type: 'time', required: true, disabled: true },
  {
    name: 'department_id',
    label: 'Select Department', required: true,
    type: 'select',
    options: departments, disabled: true
  },
  {
    name: 'appointment_type', disabled: true,
    label: 'Select Appointment Type', required: true,
    type: 'select',
    options: appointmentType,
  },
  {
    name: 'doctor_id',
    label: 'Select Doctor', required: true,
    type: 'select',
    options: [],
    isFetchLookUp: true,
    endpoint: '/doctors/department',
    filterValueAmongTheForm: 'department_id',
    labelValueToShow: { value: 'doctor_id', label: 'doctor_name' }
  },

]

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DOCTOR

export const initialStateDoctor = {
  isGetFlag: false,
  isOpen: false,
  fieldsToShowPrescribeAdd: [
    { name: 'patient_name', label: 'Patient Name', type: 'text', disabled: true },
    { label: 'Prescription Date', name: 'prescription_date', type: 'date', required: true, disabled: true },
    {
      label: 'Prescription Details',
      type: 'textarea',
      name: 'prescription_details',
      required: true,
      initialValue: "Medication: \nDosage: \nFrequency: \nDuration: \nAdditional Instructions: ",
    },
  ],
  apisToCallPrescribe: {
    view: {
      endpoint: '/prescriptions/appointments',
      // id: 'dataId',
    },
    create: {
      endpoint: '/prescriptions',             // Replace with the actual endpoint for your API
      // id: 'dataId',
    },
    delete: {
      endpoint: '/prescriptions',                 // Replace with the actual endpoint for your API
      // id: 'dataId',
    },
    update: {
      endpoint: '/prescriptions',       // Replace with the actual endpoint for your API
      // id: 'dataId',
    },
    getAll: {
      endpoint: '/appointments', // Replace with the actual endpoint for your API
      // id: 'dataId',
    }
  },
  fieldsToShowAppintmentsAdd: [{ name: 'appointment_date', label: 'Date', type: 'date', required: true, },
  { name: 'appointment_time', label: 'Time', type: 'time', required: true, },
  {
    name: 'department_id',
    label: 'Select Department', required: true,
    type: 'select',
    options: departments,
  },
  {
    name: 'appointment_status',
    label: 'Select Appointment Status', required: true,
    type: 'select',
    options: appointmentPrescribeStatus,
  },
  ],
  fieldsToShowView: [
    { name: 'doctor_name', label: 'Doctor Name' },
    { name: 'contact_number', label: 'Contact Number' },
    { name: 'email', label: 'Email' },
    {
      name: 'department_name',
      label: 'Department',
    },
  ],
  apisToCallConsultation: {
    view: {
      endpoint: '/appointments',
      // id: 'dataId',
    },
    create: {
      endpoint: '/appointments',      // Replace with the actual endpoint for your API
      // id: 'dataId',
    },
    delete: {
      endpoint: '/appointments',      // Replace with the actual endpoint for your API
      // id: 'dataId',
    },
    update: {
      endpoint: '/appointments', // Replace with the actual endpoint for your API
      // id: 'dataId',
    },
    getAll: {
      endpoint: '/appointments', // Replace with the actual endpoint for your API
      // id: 'dataId',
    }
  },
  fieldsToShowVideoConsultation: [//video_consultation_link
    { name: 'appointment_date', label: 'Appointment Date', type: 'date', disabled: true, },
    { name: 'appointment_time', label: 'Appointment Time', type: 'time', disabled: true, },
    { name: 'patient_name', label: 'Patient', type: 'text', disabled: true, },
    { name: 'video_consultation_link', label: 'Video Consultation Link', type: 'text', disabled: true, },
    {
      name: 'consultation_status',
      label: 'Select consultation_status', required: true,
      type: 'select',
      options: VIDEO_CONSULTATION_FIELDS,
    },
  ]
}

export const apisToCallVideoConsultation = {
  view: {
    endpoint: '/video',
    // id: 'dataId',
  },
  create: {
    endpoint: '/video',             // Replace with the actual endpoint for your API
    // id: 'dataId',
  },
  delete: {
    endpoint: '/video',                 // Replace with the actual endpoint for your API
    // id: 'dataId',
  },
  update: {
    endpoint: '/video',       // Replace with the actual endpoint for your API
    //id: 'dataId',
  },
  getAll: {
    endpoint: '/video', // Replace with the actual endpoint for your API
    // id: 'dataId',
  }
}

export const apisToCallDoctor = {
  view: {
    endpoint: '/doctors/appointmentDetails',
    // id: 'dataId',
  },
  create: {
    endpoint: '/doctors',             // Replace with the actual endpoint for your API
    // id: 'dataId',
  },
  delete: {
    endpoint: '/doctors',                 // Replace with the actual endpoint for your API
    // id: 'dataId',
  },
  update: {
    endpoint: '/doctors',       // Replace with the actual endpoint for your API
    //id: 'dataId',
  },
  getAll: {
    endpoint: '/doctors', // Replace with the actual endpoint for your API
    // id: 'dataId',
  }
}

export const apisToCallPatientAdmin = {
  view: {
    endpoint: '/patients/appointmentDetails',
    // id: 'dataId',
  },
  create: {
    endpoint: '/patients',             // Replace with the actual endpoint for your API
    // id: 'dataId',
  },
  delete: {
    endpoint: '/patients',                 // Replace with the actual endpoint for your API
    // id: 'dataId',
  },
  update: {
    endpoint: '/patients',       // Replace with the actual endpoint for your API
    //id: 'dataId',
  },
  getAll: {
    endpoint: '/patients', // Replace with the actual endpoint for your API
    // id: 'dataId',
  }
}