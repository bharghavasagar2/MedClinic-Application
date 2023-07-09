
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, create_Update_ById } from '../commonSlice/commonSlice';

const fetchAllRecords = getAllData('prescriptions/fetchAllRecords', '/prescriptions');
const getRecordById = getAllData('prescriptions/getRecordById', '/prescriptions');
const deleteRecordById = deleteById('prescriptions/deleteRecordById', '/prescriptions');
const create_UpdateById = create_Update_ById('prescriptions/create_UpdateById', '/prescriptions');


const prescriptionsSlice = createSlice({
  name: 'prescriptions',
  initialState: {
    allprescriptions: [],
    getAppprescriptionsById: null,
    deleteRecordById: null,
    create_UpdateById: null,
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
      .addCase(create_UpdateById.fulfilled, (state, action) => {
        state.create_UpdateById = action.payload;
      });
  },
});

export { fetchAllRecords, getRecordById, deleteRecordById, create_UpdateById };
export default prescriptionsSlice.reducer;
