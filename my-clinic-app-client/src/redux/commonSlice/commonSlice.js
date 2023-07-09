import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api.js';
import { getData } from '../../security/sessionStorage.js';
import { useSelector } from 'react-redux';
import { globalState } from '../../commonConfig/commonConfig.js';
//import { token } from '../../pages/Dashboard/DashboardComponent.js';





console.log(globalState)

const setAuthToken = (userToken) => {

  let tokenAuth = getData('userDetails')?.token || userToken;
  if (tokenAuth) {
    api.defaults.headers.common['Authorization'] = `Bearer ${tokenAuth}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
// Works for both getRecordById and get all data
export const getAllData = (name, url) => {
  return createAsyncThunk(name, async (id, thunkAPI) => {
    console.log(id)
    try {
      const userData = getData('userDetails');
      setAuthToken(userData?.token);
      const response = await api.get(id ? `${url}/${id}` : url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
};




// Async thunk action creator for deleteById
export const deleteById = (name, url) => {
  return createAsyncThunk(name, async (id, thunkAPI) => {
    console.log(id)
    try {
      const userData = getData('userDetails');
      setAuthToken(userData?.token);
      await api.delete(`${url}/${id}`);
      return id; // Return the deleted id
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
  );
}

// Async thunk action creator for create
// export const create = (name, url) => {
//   return createAsyncThunk(name, async (data, thunkAPI) => {
//     try {
//       const response = await api.post(url, data);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
//   );
// }


export const create_Record = (name, url) => {
  return createAsyncThunk(name, async ({ data }, thunkAPI) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.error ?? error.message);
    }
  }
  );
}

// Async thunk action creator for create_UpdateById
export const create_Update_ById = (name, url) => {
  return createAsyncThunk(name, async ({ id, data }, thunkAPI) => {
    try {
      const userData = getData('userDetails');
      setAuthToken(userData?.token);
      const response = !!id ? await api.put(`${url}/${id}`, data) : await api.post(url, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
  );
}


