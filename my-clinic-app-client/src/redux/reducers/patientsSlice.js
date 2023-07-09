// patientsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, create_Update_ById } from '../commonSlice/commonSlice';

const fetchAllPatientRecords = getAllData('patients/fetchAllRecords', '/patients');
const getRecordById = getAllData('patients/getRecordById', '/patients');
const deleteRecordById = deleteById('patients/deleteRecordById', '/patients');
const create_Update_PatientById = create_Update_ById('patients/create_UpdateById', '/patients');


const patientsSlice = createSlice({
  name: 'patients',
  initialState: {
    allPatients: [],
    getAppPatientsById: null,
    deleteRecordById: null,
    create_UpdateById: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPatientRecords.fulfilled, (state, action) => {
        console.log(action.payload);
        state.allPatients = action.payload;
      })
      .addCase(getRecordById.fulfilled, (state, action) => {
        state.getAppPatientsById = action.payload;
      })
      .addCase(deleteRecordById.fulfilled, (state, action) => {
        state.deleteRecordById = action.payload;
      })
      .addCase(create_Update_PatientById.fulfilled, (state, action) => {
        state.create_UpdateById = action.payload;
      });
  },
});

export { fetchAllPatientRecords, getRecordById, deleteRecordById, create_Update_PatientById };
export default patientsSlice.reducer;
