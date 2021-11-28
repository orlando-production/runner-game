import { configureStore } from '@reduxjs/toolkit';
import { authenticationReducer } from './pages/LoginPage/loginSlice';
import { userReducer } from './pages/ProfilePage/userSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    user: userReducer,
    statusProfile: userReducer,
    statusPassword: userReducer,
    messagePassword: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
