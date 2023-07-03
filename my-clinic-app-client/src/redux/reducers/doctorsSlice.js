
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, create_Update_ById } from '../commonSlice/commonSlice';

const fetchAllRecords = getAllData('doctors/fetchAllRecords', '/posts');
const getRecordById = getAllData('doctors/getRecordById', '/posts');
const deleteRecordById = deleteById('doctors/deleteRecordById', '/posts');
const create_UpdateById = create_Update_ById('doctors/create_UpdateById', '/posts');


const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    alldoctors: [],
    getAppdoctorsById: null,
    deleteRecordById: null,
    create_UpdateById: null,
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
      .addCase(create_UpdateById.fulfilled, (state, action) => {
        state.create_UpdateById = action.payload;
      });
  },
});

export { fetchAllRecords, getRecordById, deleteRecordById, create_UpdateById };
export default doctorsSlice.reducer;
