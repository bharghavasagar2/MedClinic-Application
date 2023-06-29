import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../rootReducer/rootReducer.js.js';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
