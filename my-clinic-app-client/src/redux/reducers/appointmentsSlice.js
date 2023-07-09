
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, create_Update_ById } from '../commonSlice/commonSlice';

const getAppointmentAllRecords = getAllData('appointments/fetchAllRecords', '/appointments');
const getAppointmentById = getAllData('appointments/getRecordById', '/appointments');
const deleteRecordById = deleteById('appointments/deleteRecordById', '/appointments');
const create_UpdateById = create_Update_ById('appointments/create_UpdateById', '/appointments');


const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    allappointments: [],
    getAppappointmentsById: null,
    deleteRecordById: null,
    create_UpdateById: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppointmentAllRecords.fulfilled, (state, action) => {
        console.log(action.payload);
        state.allappointments = action.payload;
      })
      .addCase(getAppointmentById.fulfilled, (state, action) => {
        state.getAppappointmentsById = action.payload;
      })
      .addCase(deleteRecordById.fulfilled, (state, action) => {
        state.deleteRecordById = action.payload;
      })
      .addCase(create_UpdateById.fulfilled, (state, action) => {
        state.create_UpdateById = action.payload;
      });
  },
});

export { getAppointmentAllRecords, getAppointmentById, deleteRecordById, create_UpdateById };
export default appointmentsSlice.reducer;
