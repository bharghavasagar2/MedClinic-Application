import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  user: null,
  token: null,
  error: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loggedIn = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },

  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
