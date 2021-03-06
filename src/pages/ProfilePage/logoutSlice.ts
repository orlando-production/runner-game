/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { FETCH_LOGOUT_PENDING, FETCH_LOGOUT_FILFILLED, FETCH_LOGOUT_REJECTED } from '../../actions/logout';
import { ErrorType } from '../../api';

export type Logout = {
  logoutStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: ErrorType,
  };

export const logoutInitialState: Logout = {
  logoutStatus: 'idle'
};

export const logoutSlice = createSlice({
  name: 'logout',
  initialState: logoutInitialState,
  reducers: {},
  extraReducers: {
    [FETCH_LOGOUT_PENDING]: (state) => {
      state.logoutStatus = 'loading';
    },
    [FETCH_LOGOUT_FILFILLED]: (state) => {
      state.logoutStatus = 'succeeded';
    },
    [FETCH_LOGOUT_REJECTED]: (state, action) => {
      state.logoutStatus = 'failed';
      state.error = action.payload;
    }
  }
});

export const logoutReducer = logoutSlice.reducer;
