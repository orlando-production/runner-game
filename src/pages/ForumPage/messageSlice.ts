/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { ErrorType } from 'api';
import {
  FETCH_MESSAGE_FULFILLED,
  FETCH_MESSAGE_LIST_FULFILLED
} from '../../actions/message';

export type Message = {
  messages: []
  error?: ErrorType,
};

export const messageInitialState: Message = {
  messages: []
};

export const messageSlice = createSlice({
  name: 'messages',
  initialState: messageInitialState,
  reducers: {},
  extraReducers: {
    [FETCH_MESSAGE_FULFILLED]: (state, { payload }) => {
      state.messages.push(payload);
    },
    [FETCH_MESSAGE_LIST_FULFILLED]: (state, { payload }) => {
      state.messages = payload;
    }
  }
});

export const messageReducer = messageSlice.reducer;
