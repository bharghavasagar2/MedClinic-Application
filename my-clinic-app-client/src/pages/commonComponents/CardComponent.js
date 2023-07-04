import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, icon: Icon, data, navigate, fieldsToShow }) => {
  const renderData = () => {
    if (Array.isArray(data) && data.length > 0) {
      return (
        <ul>
          {data.map((item, index) => (
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
      {Array.isArray(data) && data.length > 0 && (
        <Link to={navigate} className="text-blue-500 hover:text-blue-600 font-semibold">
          Show All
        </Link>
      )}
    </div>
  );
};

export default Card;
