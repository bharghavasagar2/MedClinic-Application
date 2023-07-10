import React from 'react';
import { Link } from 'react-router-dom';
import { filterArray } from '../../commonConfig/commonConfig';
import { FaEye } from 'react-icons/fa';

const Card = ({ title, onClick, icon: Icon, data, dataToBePassed = null, navigate = null, fieldsToShow, buttonText = 'Show All', showLink = false, filterArrayKey }) => {
  const renderData = () => {
    if (Array.isArray(data) && data.length > 0) {
      let filterData = filterArray(data, filterArrayKey);

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
      return (
        <div className="relative">
          <p className="text-gray-600">{data}</p>
          {data !== '0' && (
            <Link to={navigate} state={data} className="text-sky-500 hover:text-blue-700 absolute top-0 right-0 mt-2 mr-2">
              <FaEye size={22} />
            </Link>
          )}
        </div>
      )
    } else {
      return <p>No {title}</p>;
    }
  };


  return (
    <div className="bg-white rounded-lg shadow p-6 bg-opacity-70">
      <h2 className="flex items-center text-xl font-bold mb-4">
        {Icon && <Icon className="mr-2" />}
        {title}
      </h2>
      {renderData()}

      {((Array.isArray(data) && Array.isArray(filterArray(data, filterArrayKey)) && filterArray(data, filterArrayKey).length > 0) && !showLink) ? (
        <Link to={navigate ? navigate : null} state={dataToBePassed} className="text-blue-500 hover:text-blue-600 font-semibold">
          {buttonText}
        </Link>
      ) : (
        <button onClick={showLink ? onClick : null} className="text-blue-500 hover:text-blue-600 font-semibold">
          {showLink && buttonText}
        </button>
      )}

    </div>
  );
};

export default Card;
