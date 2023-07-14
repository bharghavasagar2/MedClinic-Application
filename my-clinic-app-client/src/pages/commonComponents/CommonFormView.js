import React from 'react';

const FormView = ({ formData }) => {
  if (!formData || Object.keys(formData).length === 0) {
    return (
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Form View</h2>
        <p>No records added.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Form View</h2>
      <form>
        {Object.keys(formData).map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block font-semibold mb-1">{field}</label>
            <p className="border border-gray-300 px-3 py-2 rounded-md w-full">{formData[field]}</p>
          </div>
        ))}
      </form>
    </div>
  );
};

export default FormView;
