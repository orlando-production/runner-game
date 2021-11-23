import { configureStore } from '@reduxjs/toolkit';
import { authenticationReducer } from './pages/LoginPage/loginSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
