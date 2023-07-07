import React, { useState } from 'react';

const Form = ({ fields, onSubmit, submitButtonName = 'Submit' }) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

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

  let buttonClassName = 'w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600';
  let inputClassName = 'w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500';
  let selectClassName = 'w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              className={`${inputClassName} ${errors[field.name] && 'border-red-500'}`}
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
