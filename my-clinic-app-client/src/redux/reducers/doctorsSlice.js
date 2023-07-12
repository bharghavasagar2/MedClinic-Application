
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, create_Update_ById } from '../commonSlice/commonSlice';

const fetchAllDocRecords = getAllData('doctors/fetchAllRecords', '/doctors');
const getRecordById = getAllData('doctors/getRecordById', '/doctors');
const deleteRecordById = deleteById('doctors/deleteRecordById', '/doctors');
const create_Update_Doc_ById = create_Update_ById('doctors/create_UpdateById', '/login');


const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    alldoctors: [],
    getAppdoctorsById: null,
    deleteRecordById: null,
    create_Update_Doc_ById: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDocRecords.fulfilled, (state, action) => {
        console.log(action.payload);
        state.alldoctors = action.payload;
      })
      .addCase(getRecordById.fulfilled, (state, action) => {
        state.getAppdoctorsById = action.payload;
      })
      .addCase(deleteRecordById.fulfilled, (state, action) => {
        state.deleteRecordById = action.payload;
      })
      .addCase(create_Update_Doc_ById.fulfilled, (state, action) => {
        state.create_Update_Doc_ById = action.payload;
      });
  },
});

export { fetchAllDocRecords, getRecordById, deleteRecordById, create_Update_Doc_ById };
export default doctorsSlice.reducer;
