import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getUserboard = (state: RootState) => state.leaderboard;

export const getList = createSelector(
  getUserboard,
  ({ leaderBoardList }) => leaderBoardList
);
