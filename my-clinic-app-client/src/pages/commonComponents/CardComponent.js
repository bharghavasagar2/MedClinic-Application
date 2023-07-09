import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, icon: Icon, data, navigate, fieldsToShow, buttonText = 'Show All', showLink = false, filterArrayKey }) => {
  const renderData = () => {
    if (Array.isArray(data) && data.length > 0) {
      let filterData = data;
      if (filterArrayKey) {
        filterData = data.filter(({ appointment_status }) => !!appointment_status && appointment_status === filterArrayKey);
      }

      if (Array.isArray(filterData) && filterData.length > 0) {
        filterData = filterData.slice(0, 3);
      }

      return (
        <ul>
          {filterData.map((item, index) => (
            <li key={index}>
              {fieldsToShow?.map((field, i) => (
                <p key={i}>
                  {field.label}: {item[field.name]}
                </p>
              ))}
            </li>
          ))}
        </ul>
      );
    } else if (typeof data === 'object' && Object.keys(data).length > 0) {

      return (
        <>
          {fieldsToShow?.map((field, index) => (
            <p key={index} className="text-gray-600">
              {field.label}: {data[field.name]}
            </p>
          ))}
        </>
      );
    } else if (typeof data === 'string') {
      return <p className="text-gray-600">{data}</p>;
    } else {
      return <p>No {title}</p>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 bg-opacity-70">
      <h2 className="flex items-center text-2xl font-bold mb-4">
        {Icon && <Icon className="mr-2" />}
        {title}
      </h2>
      {renderData()}

      {((Array.isArray(data) && data.length > 0) || showLink) && (
        <Link to={navigate ? navigate : null} state={data} className="text-blue-500 hover:text-blue-600 font-semibold">
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default Card;
