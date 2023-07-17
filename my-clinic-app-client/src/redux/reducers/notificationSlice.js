
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, create_Update_ById } from '../commonSlice/commonSlice';

const fetchAllRecords = getAllData('notifications/fetchAllRecords', '/notifications');
const getNotificationsByUserId = getAllData('notifications/getNotificationsByUserId', '/notifications');
const deleteRecordById = deleteById('notifications/deleteRecordById', '/notifications');
const create_UpdateById = create_Update_ById('notifications/create_UpdateById', '/notifications');


const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    allnotifications: [],
    getNotificationsByUserId: null,
    deleteRecordById: null,
    create_UpdateById: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecords.fulfilled, (state, action) => {
        console.log(action.payload);
        state.allnotifications = action.payload;
      })
      .addCase(getNotificationsByUserId.fulfilled, (state, action) => {
        state.getNotificationsByUserId = action.payload;
      })
      .addCase(deleteRecordById.fulfilled, (state, action) => {
        state.deleteRecordById = action.payload;
      })
      .addCase(create_UpdateById.fulfilled, (state, action) => {
        state.create_UpdateById = action.payload;
      });
  },
});

export { fetchAllRecords, getNotificationsByUserId, deleteRecordById, create_UpdateById };
export default notificationsSlice.reducer;
