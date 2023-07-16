
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteById, getAllData, create_Update_ById } from '../commonSlice/commonSlice';

const fetchAllVideoRecords = getAllData('video/fetchAllRecords', '/video');
const getVideoRecordById = getAllData('video/getRecordById', '/video');
const deleteRecordById = deleteById('video/deleteRecordById', '/video');
const create_UpdateVideo_Record_ById = create_Update_ById('video/create_UpdateById', '/video');

const getSpecificDoctorVideoRecords = getAllData('video/getSpecificDoctorVideoRecords', '/video/doctor');

const getSpecificPatientVideoRecords = getAllData('video/getSpecificPatientVideoRecords', '/video/patient');


const videoSlice = createSlice({
  name: 'video',
  initialState: {
    allvideo: [],
    getAppvideoById: null,
    deleteRecordById: null,
    create_UpdateById: null,
    getSpecificDoctorVideoRecords: [],
    getSpecificDoctorVideoRecords: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVideoRecords.fulfilled, (state, action) => {
        console.log(action.payload);
        state.allvideo = action.payload;
      })
      .addCase(getVideoRecordById.fulfilled, (state, action) => {
        state.getAppvideoById = action.payload;
      })
      .addCase(deleteRecordById.fulfilled, (state, action) => {
        state.deleteRecordById = action.payload;
      }).addCase(getSpecificPatientVideoRecords.fulfilled, (state, action) => {
        state.getSpecificPatientVideoRecords = action.payload;
      }).addCase(getSpecificDoctorVideoRecords.fulfilled, (state, action) => {
        state.getSpecificDoctorVideoRecords = action.payload;
      })
      .addCase(create_UpdateVideo_Record_ById.fulfilled, (state, action) => {
        state.create_UpdateVideo_Record_ById = action.payload;
      });
  },
});

export {
  fetchAllVideoRecords, getVideoRecordById, getSpecificPatientVideoRecords,
  deleteRecordById, create_UpdateVideo_Record_ById, getSpecificDoctorVideoRecords
};
export default videoSlice.reducer;


