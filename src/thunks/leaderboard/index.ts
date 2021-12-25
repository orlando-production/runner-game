/* eslint-disable no-console */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_LEADERBOARD } from 'actions/leaderboard';
import { ErrorType } from 'api';
import { getLeaderboardResults } from 'services/Leaderboard';

export const fetchLeaderboardList = createAsyncThunk(
  FETCH_LEADERBOARD,
  () => {
    console.log('THUNK LEADER');
    return getLeaderboardResults(
      { ratingFieldName: 'presents', cursor: 0, limit: 10 },
      {}
    )
      .then(() => {
        console.log('thunk leaderboard');
      })
      .catch((err: ErrorType) => {
        console.log('error thunk fetchUserInfo', err?.response?.status);
        throw new Error('error');
      });
  }
);
