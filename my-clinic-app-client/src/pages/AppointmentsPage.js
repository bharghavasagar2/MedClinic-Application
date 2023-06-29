import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteRecordById, getRecordById, fetchAllRecords, updateRecordById } from '../redux/reducers/patientsSlice.js';

const AppointmentsPage = () => {
  const dispatch = useDispatch();

  const handleButtonClick = (i) => {
    dispatch(deleteRecordById(i))
    dispatch(getRecordById(i))
    dispatch(fetchAllRecords());

    let data = {
      "userId": 1,
      "id": 1,
      "title": "Prabhas",
      "body": "Not Good"
    }
    dispatch(updateRecordById({ id: i, data }));
    console.log(i)
    //dispatch(deleteById(i));
  };

  return (
    <div>
      appointmnts
      <button onClick={(e) => handleButtonClick(1)}>Set Data</button>
      <button onClick={(e) => handleButtonClick(2)}>Welcome bro</button>
    </div>
  );
};

export default AppointmentsPage;
