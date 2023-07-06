import React from 'react';

const NotFound = () => {
  return (
    <>
      <header />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-red-500">404 Not Found</h1>
        <p className="text-gray-500 mt-2">Oops! The page you're looking for does not exist.</p>
      </div>
    </>

  );
};

export default NotFound;
