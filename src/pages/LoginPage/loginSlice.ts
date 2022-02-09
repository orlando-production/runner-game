/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { FETCH_LOGOUT_FILFILLED } from 'actions/logout';
import { FETCH_SIGNUP_FILFILLED } from 'actions/registration';
import {
  FETCH_SIGNIN_PENDING, FETCH_SIGNIN_FILFILLED, FETCH_SIGNIN_REJECTED, FETCH_USER_INFO_PENDING, FETCH_USER_INFO_FILFILLED, FETCH_USER_INFO_REJECTED
} from '../../actions/authentication';
import { ErrorType } from '../../api';

export type Authentication = {
    authStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    isAuthenticated?: boolean;
    error?: ErrorType,
  };

export const authInitialState: Authentication = {
  authStatus: 'idle',
  isAuthenticated: false
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: authInitialState,
  reducers: {
    setAuthentication: (state) => {
      state.isAuthenticated = true;
    }
  },
  extraReducers: {
    [FETCH_SIGNIN_PENDING]: (state) => {
      state.authStatus = 'loading';
    },
    [FETCH_SIGNIN_FILFILLED]: (state) => {
      state.authStatus = 'succeeded';
      state.isAuthenticated = true;
    },
    [FETCH_SIGNIN_REJECTED]: (state, action) => {
      state.authStatus = 'failed';
      state.error = action.payload;
    },
    [FETCH_USER_INFO_PENDING]: (state) => {
      state.authStatus = 'loading';
    },
    [FETCH_USER_INFO_FILFILLED]: (state) => {
      state.authStatus = 'succeeded';
      state.isAuthenticated = true;
    },
    [FETCH_USER_INFO_REJECTED]: (state, action) => {
      state.authStatus = 'failed';
      state.error = action.payload;
    },
    [FETCH_SIGNUP_FILFILLED]: (state) => {
      state.authStatus = 'succeeded';
      state.isAuthenticated = true;
    },
    [FETCH_LOGOUT_FILFILLED]: (state) => {
      state.authStatus = 'failed';
      state.isAuthenticated = false;
    }
  }
});

export const { setAuthentication } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
