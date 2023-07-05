import { createSlice } from '@reduxjs/toolkit';
import { create_Update_ById, create_Record } from '../commonSlice/commonSlice';


const login = create_Record('authentication/login', '/login');
const logOut = create_Update_ById('authentication/logOut', '/logout');
const initialState = {
  loggedIn: false,
  userId: null,
  token: null,
  error: null,
  role: null,
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
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loggedIn = false;
        state.token = null;
        state.role = null;
        state.userId = null;
        console.log(action.payload)
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loggedIn = false;
        state.userId = null;
        state.token = null;
        state.error = null;
        state.role = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  }

});

export { login, logOut }
export default authenticationSlice.reducer;
