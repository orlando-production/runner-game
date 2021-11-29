/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { FETCH_SIGNUP_PENDING, FETCH_SIGNUP_FILFILLED, FETCH_SIGNUP_REJECTED } from '../../actions/registration';
import { ErrorType } from '../../api';

export type Registration = {
    registrationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: ErrorType,
  };

const initialState: Registration = {
  registrationStatus: 'idle'
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: {
    [FETCH_SIGNUP_PENDING]: (state) => {
      state.registrationStatus = 'loading';
    },
    [FETCH_SIGNUP_FILFILLED]: (state) => {
      state.registrationStatus = 'succeeded';
    },
    [FETCH_SIGNUP_REJECTED]: (state, action) => {
      state.registrationStatus = 'failed';
      state.error = action.payload;
    }
  }
});

export const registrationReducer = registrationSlice.reducer;
