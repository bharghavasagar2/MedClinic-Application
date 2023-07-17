import React from 'react';
import _ from 'lodash';

const PatientFormView = ({ patientData }) => {
  if (!patientData || Object.keys(patientData).length === 0) {
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
      <h2 className="text-2xl font-bold mb-4">Patient Details</h2>
      <div className="border border-gray-300 rounded-md p-4">
        <table className="w-full">
          <tbody>
            {Object.keys(patientData.patient).map((field) => (
              <tr key={field} className="border-b border-gray-300">
                <td className="py-2 font-semibold">{capitalizeName(field)}</td>
                <td className="py-2">{patientData.patient[field]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {patientData.appointments && patientData.appointments.length > 0 ? (
          <>
            <h3 className="text-xl font-bold mt-4">Appointments</h3>
            {patientData.appointments.map((appointment) => (
              <div key={appointment.appointment_id} className="border border-gray-300 rounded-md p-4 mt-2">
                <table className="w-full">
                  <tbody>
                    {Object.keys(appointment).map((field) => {
                      if (field === 'doctor') {
                        return (
                          <tr key={field} className="border-b border-gray-300">
                            <td className="py-2 font-semibold">Doctor Details</td>
                            <td colSpan="3" className="py-2">
                              <table className="w-full">
                                <tbody>
                                  {Object.keys(appointment[field]).map((doctorField) => (
                                    <tr key={doctorField} className="border-b border-gray-300">
                                      <td className="py-2 font-semibold">{capitalizeName(doctorField)}</td>
                                      <td className="py-2">{appointment[field][doctorField]}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        );
                      } else {
                        return (
                          <tr key={field} className="border-b border-gray-300">
                            <td className="py-2 font-semibold">{capitalizeName(field)}</td>
                            <td className="py-2">{appointment[field]}</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </>
        ) : (
          <p className="mt-4 font-bold">No appointments added.</p>
        )}
      </div>
    </div>
  );
};

export default PatientFormView;
