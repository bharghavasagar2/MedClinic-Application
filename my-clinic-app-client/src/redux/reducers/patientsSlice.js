// patientsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, updateById } from '../commonSlice/commonSlice';

const fetchAllRecords = getAllData('patients/fetchAllRecords', '/posts');
const getRecordById = getAllData('patients/getRecordById', '/posts');
const deleteRecordById = deleteById('patients/deleteRecordById', '/posts');
const updateRecordById = updateById('patients/updateRecordById', '/posts');


const patientsSlice = createSlice({
  name: 'patients',
  initialState: {
    allPatients: [],
    getAppPatientsById: null,
    deleteRecordById: null,
    updateRecordById: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecords.fulfilled, (state, action) => {
        console.log(action.payload);
        state.allPatients = action.payload;
      })
      .addCase(getRecordById.fulfilled, (state, action) => {
        state.getAppPatientsById = action.payload;
      })
      .addCase(deleteRecordById.fulfilled, (state, action) => {
        state.deleteRecordById = action.payload;
      })
      .addCase(updateRecordById.fulfilled, (state, action) => {
        state.updateRecordById = action.payload;
      });
  },
});

export { fetchAllRecords, getRecordById, deleteRecordById, updateRecordById };
export default patientsSlice.reducer;
