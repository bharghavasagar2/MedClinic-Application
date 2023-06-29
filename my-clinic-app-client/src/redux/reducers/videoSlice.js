
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, updateById } from '../commonSlice/commonSlice';

const fetchAllRecords = getAllData('video/fetchAllRecords', '/posts');
const getRecordById = getAllData('video/getRecordById', '/posts');
const deleteRecordById = deleteById('video/deleteRecordById', '/posts');
const updateRecordById = updateById('video/updateRecordById', '/posts');


const videoSlice = createSlice({
  name: 'video',
  initialState: {
    allvideo: [],
    getAppvideoById: null,
    deleteRecordById: null,
    updateRecordById: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecords.fulfilled, (state, action) => {
        console.log(action.payload);
        state.allvideo = action.payload;
      })
      .addCase(getRecordById.fulfilled, (state, action) => {
        state.getAppvideoById = action.payload;
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
export default videoSlice.reducer;


