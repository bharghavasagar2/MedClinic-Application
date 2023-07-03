
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, create_Update_ById } from '../commonSlice/commonSlice';

const fetchAllRecords = getAllData('appointments/fetchAllRecords', '/posts');
const getRecordById = getAllData('appointments/getRecordById', '/posts');
const deleteRecordById = deleteById('appointments/deleteRecordById', '/posts');
const create_UpdateById = create_Update_ById('appointments/create_UpdateById', '/posts');


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
      .addCase(create_UpdateById.fulfilled, (state, action) => {
        state.create_UpdateById = action.payload;
      });
  },
});

export { fetchAllRecords, getRecordById, deleteRecordById, create_UpdateById };
export default appointmentsSlice.reducer;
