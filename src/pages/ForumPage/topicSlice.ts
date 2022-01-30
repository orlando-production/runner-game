/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { ErrorType } from 'api';
import {
  FETCH_TOPIC_FULFILLED,
  FETCH_TOPIC_ALL_FULFILLED,
  FETCH_TOPIC_BY_ID_FULFILLED
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
    [FETCH_TOPIC_FULFILLED]: (state, { payload }) => {
      state.topics.push(payload as never);
    },
    [FETCH_TOPIC_ALL_FULFILLED]: (state, { payload }) => {
      state.topics = payload;
    },
    [FETCH_TOPIC_BY_ID_FULFILLED]: (state, { payload }) => {
      state.topics = payload;
    }
  }
});

export const topicReducer = topicSlice.reducer;
