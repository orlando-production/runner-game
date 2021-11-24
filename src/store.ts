import { configureStore } from '@reduxjs/toolkit';
import { registrationReducer } from './pages/SignUpPage/registrationSlice';
import { authenticationReducer } from './pages/LoginPage/loginSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    registration: registrationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
