
import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const data = useSelector((state) => {
    console.log(state)
  });

  return (
    <div>
      <h1>Mawa</h1>
      fafdsfdsdfdhhgfdfghjhdgfsfgh
      {/* <p>Data: {data}</p> */}
    </div>
  );
};

export default HomePage;
