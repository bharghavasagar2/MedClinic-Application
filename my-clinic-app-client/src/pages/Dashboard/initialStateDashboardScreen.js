export const patientInitialState = {
  isOpen: false,
  isShowPaymentScreen: false,
  RaiseRequestFields: [
    { name: 'name', label: 'Name', type: 'text', required: true, },
    { name: 'email', label: 'Email', type: 'email', required: true, },
    {
      name: 'gender',
      label: 'Gender', required: true,
      type: 'select',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ],
    },
  ]
}