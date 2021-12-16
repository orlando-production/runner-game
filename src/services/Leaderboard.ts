import { ENDPOINTS, requestPostData } from '../api';

export type LeaderboardAddResultParams = {
  data: any;
  ratingFieldName: string;
  teamName: string;
};

export type LeaderboardAddResult = null;

export const addLeaderboardResult = (
  leaderboardParams: LeaderboardAddResultParams
) => requestPostData<LeaderboardAddResultParams, LeaderboardAddResult>(
  ENDPOINTS.LEADERBOARD,
  leaderboardParams
);