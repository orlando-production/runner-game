/* eslint-disable no-console */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_LEADERBOARD } from 'actions/leaderboard';
import { LOAD_LIMIT } from 'pages/LeaderboardPage/LeaderboardPage';
import { getLeaderboardResults } from 'services/Leaderboard';

export const fetchLeaderboardList = createAsyncThunk(
  FETCH_LEADERBOARD,
  () => getLeaderboardResults(
    { ratingFieldName: 'presents', cursor: 0, limit: LOAD_LIMIT },
    {}
  )
    .then((res) => res.data)
);
