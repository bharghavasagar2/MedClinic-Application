
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, create_Update_ById } from '../commonSlice/commonSlice';

const fetchAllRecords = getAllData('video/fetchAllRecords', '/posts');
const getRecordById = getAllData('video/getRecordById', '/posts');
const deleteRecordById = deleteById('video/deleteRecordById', '/posts');
const create_UpdateById = create_Update_ById('video/create_UpdateById', '/posts');


const videoSlice = createSlice({
  name: 'video',
  initialState: {
    allvideo: [],
    getAppvideoById: null,
    deleteRecordById: null,
    create_UpdateById: null,
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
      .addCase(create_UpdateById.fulfilled, (state, action) => {
        state.create_UpdateById = action.payload;
      });
  },
});

export { fetchAllRecords, getRecordById, deleteRecordById, create_UpdateById };
export default videoSlice.reducer;


