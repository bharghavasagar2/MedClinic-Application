
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, create_Update_ById } from '../commonSlice/commonSlice';

const fetchAllPaymentRecords = getAllData('payments/fetchAllRecords', '/payments');
const getRecordById = getAllData('payments/getRecordById', '/payments');
const deleteRecordById = deleteById('payments/deleteRecordById', '/payments');
const createPaymentById = create_Update_ById('payments/create_UpdateById', '/payments');


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
      .addCase(fetchAllPaymentRecords.fulfilled, (state, action) => {
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

export { fetchAllPaymentRecords, getRecordById, deleteRecordById, createPaymentById };
export default paymentSlice.reducer;
