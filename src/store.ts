import { configureStore } from '@reduxjs/toolkit';
import { registrationReducer } from './pages/SignUpPage/registrationSlice';
import { authenticationReducer } from './pages/LoginPage/loginSlice';
import { logoutReducer } from './pages/ProfilePage/logoutSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    registration: registrationReducer,
    logout: logoutReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
