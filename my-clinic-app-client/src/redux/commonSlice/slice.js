import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { globalState } from '../../commonConfig/commonConfig.js';
import { getData } from '../../security/sessionStorage.js';
import { api } from '../../api/api.js';

const setAuthToken = (userToken) => {

  let tokenAuth = getData('userDetails')?.token || userToken;
  if (tokenAuth) {
    api.defaults.headers.common['Authorization'] = `Bearer ${tokenAuth}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
// Async Thunks
export const getAllData = createAsyncThunk('common/getAllData', async (endpoint) => {
  debugger
  try {
    const userData = getData('userDetails');
    setAuthToken(userData?.token);
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
});

export const getDataById = createAsyncThunk('common/getDataById', async ({ endpoint, id }) => {
  try {
    const userData = getData('userDetails');
    setAuthToken(userData?.token);
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
});

export const deleteDataById = createAsyncThunk('common/deleteDataById', async ({ endpoint, id }) => {
  try {
    const userData = getData('userDetails');
    setAuthToken(userData?.token);
    const response = await api.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting data: ${error.message}`);
    throw error;
  }
});

export const createUpdateDataById = createAsyncThunk('common/createUpdateDataById', async ({ endpoint, data, id }) => {
  try {
    const userData = getData('userDetails');
    setAuthToken(userData?.token);
    const response = !!id ? await api.put(`${endpoint}/${id}`, data) : await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error creating/updating data: ${error.message}`);
    throw error;
  }
});

export const getLookUps = createAsyncThunk('common/getLookUps', async ({ endpoint, id }) => {
  try {
    const userData = getData('userDetails');
    setAuthToken(userData?.token);
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
});

// Slice
const commonSlice = createSlice({
  name: 'common',
  initialState: {
    getLookUps: [],
    allData: [],
    dataById: null,
    deleteDataById: null,
    createUpdateDataById: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(getDataById.fulfilled, (state, action) => {
        state.dataById = action.payload;
      })
      .addCase(deleteDataById.fulfilled, (state, action) => {
        state.deleteDataById = action.payload;
      })
      .addCase(createUpdateDataById.fulfilled, (state, action) => {
        state.createUpdateDataById = action.payload;
      })
      .addCase(getLookUps.fulfilled, (state, action) => {
        state.getLookUps = action.payload;
      });
  },
});

export const { reducer: commonReducer } = commonSlice;
export default commonSlice.reducer;
