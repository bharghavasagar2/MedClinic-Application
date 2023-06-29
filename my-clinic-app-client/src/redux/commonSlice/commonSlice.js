import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api.js';

// Works for both getRecordById and get all data
export const getAllData = (name, url) => {
  return createAsyncThunk(name, async (id, thunkAPI) => {
    console.log(id)
    try {
      console.log(url, id)
      const response = await api.get(id ? `${url}/${id}` : url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
};

// Async thunk action creator for create
export const create = (name, url) => {
  return createAsyncThunk(name, async (data, thunkAPI) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
  );
}



// Async thunk action creator for deleteById
export const deleteById = (name, url) => {
  return createAsyncThunk(name, async (id, thunkAPI) => {
    console.log(id)
    try {
      await api.delete(`${url}/${id}`);
      return id; // Return the deleted id
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
  );
}

// Async thunk action creator for updateById
export const updateById = (name, url) => {
  return createAsyncThunk(name, async ({ id, data }, thunkAPI) => {
    console.log(id)
    try {
      const response = await api.put(`${url}/${id}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
  );
}


