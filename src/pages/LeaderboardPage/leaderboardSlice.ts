/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import {
  FETCH_LEADERBOARD_FILFILLED,
  FETCH_LEADERBOARD_PENDING,
  FETCH_LEADERBOARD_REJECTED
} from 'actions/leaderboard';
import { ErrorType } from 'api';
import { LeaderboardAddResult } from 'services/Leaderboard';

export type Authentication = {
  leaderBoardList: LeaderboardAddResult[];
  loadStatus: 'loading' | 'succeeded' | 'failed' | 'noLoading';
  error: ErrorType;
};

export const leaderBoardInitialState: Authentication = {
  leaderBoardList: [],
  loadStatus: 'noLoading',
  error: null
};

export const leaderboardSlice = createSlice({
  name: 'authentication',
  initialState: leaderBoardInitialState,
  reducers: {},
  extraReducers: {
    [FETCH_LEADERBOARD_PENDING]: (state) => {
      state.loadStatus = 'loading';
    },
    [FETCH_LEADERBOARD_FILFILLED]: (state, action) => {
      state.loadStatus = 'succeeded';
      state.leaderBoardList = action.payload;
    },
    [FETCH_LEADERBOARD_REJECTED]: (state, action) => {
      state.loadStatus = 'failed';
      state.error = action.payload;
    }
  }
});

export const leaderboardnReducer = leaderboardSlice.reducer;
