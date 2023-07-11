import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import 'react-datepicker/dist/react-datepicker.css';

const Form = ({ fields, onSubmit, submitButtonName = 'Submit', disabled = false, formName, initialValues }) => {
  const timeValue = !!initialValues?.appointment_time ? moment(initialValues?.appointment_time, 'hh:mm A').toDate() : ''
  const dateValue = !!initialValues?.appointment_date ? moment(initialValues?.appointment_date, 'DD-MM-YYYY').toDate() : ''

  const [formValues, setFormValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [time, setTime] = useState(timeValue);
  const [date, setDate] = useState(dateValue);


  // useEffect(() => {
  //   return () => {
  //     setTime('')
  //     setDate('')
  //   }
  // })


  // Update form values when initial values change
  useEffect(() => {
    setFormValues(initialValues || {});
  }, [initialValues]);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(formValues);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };



  const handleDateChange = (name, date, fieldType) => {
    const value = fieldType === 'time' ? moment(date).format('hh:mm A') : date;
    //  setTime(date);
    let obj
    if (fieldType === 'date') {
      setTime('');
      setDate(date);
    } else {
      setTime(date);
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: moment(date).format(fieldType === 'time' ? 'hh:mm A' : 'DD-MM-YYYY'),
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    fields.forEach((field) => {
      if (field.required && !formValues[field.name]) {
        newErrors[field.name] = 'This field is required.';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };



  const filterPassedTime = useCallback(
    (time) => {
      const currentTime = new Date();
      const minTime = new Date(currentTime.getTime() + 3 * 60 * 60 * 1000); // Add 3 hours
      const selectedTime = new Date(time);
      const selectedDate = selectedTime.toDateString();
      const currentDate = currentTime.toDateString();
      const datePickerDate = new Date(date).toDateString();

      if (selectedDate === currentDate && datePickerDate === currentDate) { // Check if it's the current date
        return selectedTime >= minTime;
      }

      return true;
    },
    [date]
  );


  let buttonClassName = 'w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600';
  let inputClassName = 'w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500';
  let selectClassName = 'w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-header">
        <h2>{formName}</h2>
      </div>
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block font-medium text-gray-700" htmlFor={field.name}>
            {field.label}:
          </label>
          {field.type === 'select' ? (
            <select
              name={field.name}
              id={field.name}
              className={`${selectClassName} ${errors[field.name] && 'border-red-500'}`}
              value={formValues[field.name] || ''}
              onChange={handleInputChange}
            >
              <option value=''>
                --Select--
              </option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'time' ? (
            <DatePicker
              autoComplete="off"
              id={field.name}
              name={field.name}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              filterTime={filterPassedTime}
              selected={time || null}
              onChange={(date) => handleDateChange(field.name, date, field.type)}
              className={`${inputClassName} ${errors[field.name] && 'border-red-500'} datepicker-input`}
            />

          ) : (field.type === 'date') ? (
            <DatePicker
              showIcon
              autoComplete="off"
              id={field.name}
              name={field.name}
              minDate={moment().toDate()}
              selected={date || null}
              onChange={(date) => handleDateChange(field.name, date, field.type)}
              className={`${inputClassName} ${errors[field.name] && 'border-red-500'} datepicker-input`}
            />
          ) : (
            <input
              disabled={disabled}
              className={`${inputClassName} ${errors[field.name] && 'border-red-500'} datepicker-input`}
              type={field.type}
              name={field.name}
              id={field.name}
              value={formValues[field.name] || ''}
              onChange={handleInputChange}
            />
          )}
          {errors[field.name] && <p className="text-red-500">{errors[field.name]}</p>}
        </div>
      ))}
      <button className={buttonClassName} type="submit">
        {submitButtonName}
      </button>
    </form>
  );
};

export default Form;
