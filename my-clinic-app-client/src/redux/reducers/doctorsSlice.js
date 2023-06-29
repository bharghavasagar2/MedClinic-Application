
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, updateById } from '../commonSlice/commonSlice';

const fetchAllRecords = getAllData('doctors/fetchAllRecords', '/posts');
const getRecordById = getAllData('doctors/getRecordById', '/posts');
const deleteRecordById = deleteById('doctors/deleteRecordById', '/posts');
const updateRecordById = updateById('doctors/updateRecordById', '/posts');


const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    alldoctors: [],
    getAppdoctorsById: null,
    deleteRecordById: null,
    updateRecordById: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecords.fulfilled, (state, action) => {
        console.log(action.payload);
        state.alldoctors = action.payload;
      })
      .addCase(getRecordById.fulfilled, (state, action) => {
        state.getAppdoctorsById = action.payload;
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
export default doctorsSlice.reducer;
