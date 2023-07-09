import { departments, appointmentType } from "../../commonConfig/commonConfig";

export const patientInitialState = {
  patientFormValues: {},
  paymentFormValues: {},
  appointmentList: [],
  isGetFlag: false,
  isOpen: false,
  isGetPaymentFlag: false,
  isAppintmentAdded: false,
  isShowPaymentScreen: false,
  fieldsToShow: [{ label: 'Patient Name', name: 'patient_name' },
  { label: 'Address', name: 'address' },
  { label: 'Contact Number', name: 'contact_number' },
  { label: 'Age', name: 'patient_age' },
  { label: 'Gender', name: 'patient_gender' }
  ],
  fieldsToShowAppintments: [{ label: 'Date', name: 'appointment_date' },
  { label: 'Time', name: 'appointment_time' },
  { label: 'Appointment Type', name: 'appointment_type' },
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