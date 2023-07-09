
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, create_Update_ById } from '../commonSlice/commonSlice';

const fetchAllRecords = getAllData('prescriptions/fetchAllRecords', '/payments');
const getRecordById = getAllData('prescriptions/getRecordById', '/payments');
const deleteRecordById = deleteById('prescriptions/deleteRecordById', '/payments');
const createPaymentById = create_Update_ById('prescriptions/create_UpdateById', '/payments');


const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    allpayments: [],
    getPaymentById: null,
    deleteRecordById: null,
    create_UpdateById: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecords.fulfilled, (state, action) => {
        console.log(action.payload);
        state.allpayments = action.payload;
      })
      .addCase(getRecordById.fulfilled, (state, action) => {
        state.getPaymentById = action.payload;
      })
      .addCase(deleteRecordById.fulfilled, (state, action) => {
        state.deleteRecordById = action.payload;
      })
      .addCase(createPaymentById.fulfilled, (state, action) => {
        state.create_UpdateById = action.payload;
      });
  },
});

export { fetchAllRecords, getRecordById, deleteRecordById, createPaymentById };
export default paymentSlice.reducer;
