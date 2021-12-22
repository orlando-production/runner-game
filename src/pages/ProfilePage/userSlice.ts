/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { UserResult } from 'services/Profile';
import {
  FETCH_GET_USER_PENDING,
  FETCH_GET_USER_FILFILLED,
  FETCH_GET_USER_REJECTED,
  FETCH_SET_USER_PENDING,
  FETCH_SET_USER_FILFILLED,
  FETCH_SET_USER_REJECTED,
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
    messageProfile: string,
    error?: ErrorType,
};

export const userInitialState: User = {
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
  messagePassword: '',
  messageProfile: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {},
  extraReducers: {
    [FETCH_GET_USER_PENDING]: (state) => {
      state.statusProfile = 'invisible';
      state.messageProfile = '...';
    },
    [FETCH_GET_USER_FILFILLED]: (state, action) => {
      state.user = action?.payload;
    },
    [FETCH_GET_USER_REJECTED]: (state, action) => {
      state.statusProfile = 'error';
      state.error = action.payload;
    },
    [FETCH_SET_USER_PENDING]: (state) => {
      state.statusProfile = 'invisible';
      state.messageProfile = '...';
    },
    [FETCH_SET_USER_FILFILLED]: (state, action) => {
      state.user = action?.payload;
      state.statusProfile = 'success';
      state.messageProfile = 'Профиль сохранен';
    },
    [FETCH_SET_USER_REJECTED]: (state, action) => {
      state.statusProfile = 'error';
      state.error = action.payload;
      state.messageProfile = 'Data is incorrect';
    },
    [FETCH_AVATAR_FILFILLED]: (state, action) => {
      state.user = action?.payload;
    },
    [FETCH_AVATAR_REJECTED]: (state, action) => {
      state.error = action.payload;
    },
    [FETCH_PASSWORD_REJECTED]: (state) => {
      state.statusPassword = 'error';
      state.messagePassword = 'Data is incorrect';
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
