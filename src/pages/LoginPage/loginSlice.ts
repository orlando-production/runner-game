/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface IAuthentication {
  isProcessingRequest: boolean;
}

const initialState: IAuthentication = {
  isProcessingRequest: false
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    start: (state) => ({
      ...state,
      isProcessingRequest: true
    }),
    success: (state, action: PayloadAction<any>) => ({
      ...state,
      isProcessingRequest: false
    }),
    error: (state, action: PayloadAction<string>) => ({
      ...state,
      isProcessingRequest: false
    })
  }
});

export const selectAuthentication = (state: RootState) => state.authentication;
export const authenticationReducer = authenticationSlice.reducer;
