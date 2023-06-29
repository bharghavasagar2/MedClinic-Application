
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, updateById } from '../commonSlice/commonSlice';

const fetchAllRecords = getAllData('prescriptions/fetchAllRecords', '/posts');
const getRecordById = getAllData('prescriptions/getRecordById', '/posts');
const deleteRecordById = deleteById('prescriptions/deleteRecordById', '/posts');
const updateRecordById = updateById('prescriptions/updateRecordById', '/posts');


const prescriptionsSlice = createSlice({
  name: 'prescriptions',
  initialState: {
    allprescriptions: [],
    getAppprescriptionsById: null,
    deleteRecordById: null,
    updateRecordById: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecords.fulfilled, (state, action) => {
        console.log(action.payload);
        state.allprescriptions = action.payload;
      })
      .addCase(getRecordById.fulfilled, (state, action) => {
        state.getAppprescriptionsById = action.payload;
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
export default prescriptionsSlice.reducer;
