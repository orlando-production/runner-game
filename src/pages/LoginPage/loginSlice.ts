/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { FETCH_SIGNIN_PENDING, FETCH_SIGNIN_FILFILLED, FETCH_SIGNIN_REJECTED } from '../../actions/authentication';
import { ErrorType } from '../../api';

export type Authentication = {
    authStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    isAuthenticated?: boolean;
    error?: ErrorType,
  };

const initialState: Authentication = {
  authStatus: 'idle',
  isAuthenticated: false
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
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
    }
  }
});

export const { setAuthentication } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
