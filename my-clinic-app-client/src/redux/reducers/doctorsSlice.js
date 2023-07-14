
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, create_Update_ById } from '../commonSlice/commonSlice';

const fetchAllDocRecords = getAllData('doctors/fetchAllRecords', '/doctors');
const getAppdoctorsById = getAllData('doctors/getAppdoctorsById', '/doctors');
const deleteRecordById = deleteById('doctors/deleteRecordById', '/doctors');
const create_Update_Doc_ById = create_Update_ById('doctors/create_UpdateById', '/login');


const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    alldoctors: [],
    getdoctorById: null,
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
      .addCase(getAppdoctorsById.fulfilled, (state, action) => {
        state.getdoctorById = action.payload;
      })
      .addCase(deleteRecordById.fulfilled, (state, action) => {
        state.deleteRecordById = action.payload;
      })
      .addCase(create_Update_Doc_ById.fulfilled, (state, action) => {
        state.create_Update_Doc_ById = action.payload;
      });
  },
});

export { fetchAllDocRecords, getAppdoctorsById, deleteRecordById, create_Update_Doc_ById };
export default doctorsSlice.reducer;
