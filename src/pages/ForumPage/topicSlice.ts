/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { ErrorType } from 'api';
import {
  FETCH_TOPIC_FILFILLED,
  FETCH_TOPIC_LIST_FILFILLED
} from '../../actions/topic';

export type Topic = {
  topics: []
  error?: ErrorType,
};

export const topicInitialState: Topic = {
  topics: []
};

export const topicSlice = createSlice({
  name: 'topics',
  initialState: topicInitialState,
  reducers: {},
  extraReducers: {
    [FETCH_TOPIC_FILFILLED]: (state, { payload }) => {
      state.topics.push(payload);
    },
    [FETCH_TOPIC_LIST_FILFILLED]: (state, { payload }) => {
      state.topics = payload;
    }
  }
});

export const topicReducer = topicSlice.reducer;
