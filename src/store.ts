import { configureStore } from '@reduxjs/toolkit';
import { registrationReducer } from './pages/SignUpPage/registrationSlice';
import { authenticationReducer } from './pages/LoginPage/loginSlice';
import { logoutReducer } from './pages/ProfilePage/logoutSlice';
import { userReducer } from './pages/ProfilePage/userSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    registration: registrationReducer,
    logout: logoutReducer,
    user: userReducer,
    statusProfile: userReducer,
    statusPassword: userReducer,
    messagePassword: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
