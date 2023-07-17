import React from 'react';
import _ from 'lodash';

const FormView = ({ formData }) => {
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

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Form View</h2>
      <div className="border border-gray-300 rounded-md p-4">
        <table className="w-full">
          <tbody>
            {Object.keys(formData).map((field) => (
              <tr key={field} className="border-b border-gray-300">
                <td className="py-2 font-semibold">{capitalizeName(field)}</td>
                <td className="py-2">{formData[field]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormView;
