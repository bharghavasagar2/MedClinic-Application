import React from 'react';
import _ from 'lodash';

const DoctorFormView = ({ formData }) => {
  if (!formData || Object.keys(formData).length === 0) {
    return (
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Form View</h2>
        <p>No records added.</p>
      </div>
    );
  }

  const capitalizeName = (name) => {
    return _.startCase(name);
  };

  // Function to recursively render data (flattening nested objects and arrays)
  const renderData = (data) => {
    return Object.keys(data).map((field) => {
      const value = data[field];
      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          return (
            <div key={field}>
              <h4 className="text-lg font-bold mt-4">{capitalizeName(field)}</h4>
              {value.map((item) => (
                <div key={item.patient_id || item.appointment_id} className="border border-gray-300 rounded-md p-4 mt-2">
                  {renderData(item)}
                </div>
              ))}
            </div>
          );
        } else {
          return (
            <div key={field}>
              <h3 className="text-xl font-bold mt-4">{capitalizeName(field)}</h3>
              {renderData(value)}
            </div>
          );
        }
      } else {
        return (
          <div key={field} className="border-b border-gray-300">
            <div className="py-2 font-semibold">{capitalizeName(field)}</div>
            <div className="py-2">{value}</div>
          </div>
        );
      }
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Form View</h2>
      <div className="border border-gray-300 rounded-md p-4">
        {renderData(formData)}
      </div>
    </div>
  );
};

export default DoctorFormView;
