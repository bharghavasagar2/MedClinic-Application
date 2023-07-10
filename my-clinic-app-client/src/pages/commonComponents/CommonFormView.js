import React from 'react';

const FormView = ({ formData }) => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Form View</h2>
      <form>
        {Object.keys(formData).map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block font-semibold mb-1">{field}</label>
            <input
              type="text"
              id={field}
              value={formData[field]}
              readOnly
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default FormView;
