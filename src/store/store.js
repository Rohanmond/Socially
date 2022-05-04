import { configureStore } from '@reduxjs/toolkit';
import { authenticationReducer } from '../features/Authentication';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});
