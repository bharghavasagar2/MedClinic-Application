
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, updateById } from '../commonSlice/commonSlice';

const fetchAllRecords = getAllData('appointments/fetchAllRecords', '/posts');
const getRecordById = getAllData('appointments/getRecordById', '/posts');
const deleteRecordById = deleteById('appointments/deleteRecordById', '/posts');
const updateRecordById = updateById('appointments/updateRecordById', '/posts');


const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    allappointments: [],
    getAppappointmentsById: null,
    deleteRecordById: null,
    updateRecordById: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecords.fulfilled, (state, action) => {
        console.log(action.payload);
        state.allappointments = action.payload;
      })
      .addCase(getRecordById.fulfilled, (state, action) => {
        state.getAppappointmentsById = action.payload;
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
export default appointmentsSlice.reducer;
