import { createSlice } from '@reduxjs/toolkit';
import { create_Update_ById, create_Record } from '../commonSlice/commonSlice';


const login = create_Record('authentication/login', '/login');
const logOut = create_Update_ById('authentication/logOut', '/logout');
const initialState = {
  loggedIn: false,
  userId: null,
  token: null,
  error: null,
};



const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loggedIn = false;
        state.userId = null;
        state.token = null;
        state.error = action.payload.message;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loggedIn = false;
        state.userId = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  }

});

export { login, logOut }
export default authenticationSlice.reducer;
