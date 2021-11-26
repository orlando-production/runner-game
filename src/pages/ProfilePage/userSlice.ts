/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { UserResult } from 'services/Profile';
import {
  FETCH_USER_PENDING,
  FETCH_USER_FILFILLED,
  FETCH_USER_REJECTED,
  FETCH_AVATAR_FILFILLED,
  FETCH_AVATAR_REJECTED,
  FETCH_PASSWORD_FILFILLED,
  FETCH_PASSWORD_REJECTED,
  FETCH_PASSWORD_PENDING
} from '../../actions/profile';
import { ErrorType } from '../../api';

export type User = {
    user: UserResult,
    statusProfile: 'invisible' | 'error' | 'success',
    statusPassword: 'invisible' | 'error' | 'success',
    messagePassword: string,
    error?: ErrorType,
};

const initialState: User = {
  user: {
    id: null,
    login: '',
    first_name: '',
    second_name: '',
    email: '',
    phone: '',
    display_name: '',
    avatar: '',
    status: null
  },
  error: null,
  statusProfile: 'invisible',
  statusPassword: 'invisible',
  messagePassword: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [FETCH_USER_PENDING]: (state) => {
      state.statusProfile = 'invisible';
    },
    [FETCH_USER_FILFILLED]: (state, action) => {
      state.user = action?.payload;
    },
    [FETCH_USER_REJECTED]: (state, action) => {
      state.statusProfile = 'error';
      state.error = action.payload;
    },
    [FETCH_AVATAR_FILFILLED]: (state, action) => {
      state.user = action?.payload;
    },
    [FETCH_AVATAR_REJECTED]: (state, action) => {
      state.error = action.payload;
    },
    [FETCH_PASSWORD_REJECTED]: (state, action) => {
      state.statusPassword = 'error';
      state.messagePassword = action?.payload;
    },
    [FETCH_PASSWORD_FILFILLED]: (state) => {
      state.statusPassword = 'success';
      state.messagePassword = 'Пароль сохранен';
    },
    [FETCH_PASSWORD_PENDING]: (state) => {
      state.messagePassword = '...';
    }
  }
});

export const userReducer = userSlice.reducer;
