import { ENDPOINTS, requestPostData } from '../api';

export type LeaderboardAddResultParams = {
  data: any;
  ratingFieldName: string;
  teamName: string;
};

export type LeaderboardGetResultsParams = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type LeaderboardGetResult = {
  data: {
    name: string;
    avatar: string;
    presents: number;
    id: number;
  };
};

export type LeaderboardAddResult = null;

export const addLeaderboardResult = (
  leaderboardParams: LeaderboardAddResultParams,
  isServer?: boolean
) => requestPostData<LeaderboardAddResultParams, LeaderboardAddResult>(
  ENDPOINTS.LEADERBOARD,
  leaderboardParams,
  {},
  isServer
);

export const getLeaderboardResults = (
  leaderBoardParams: LeaderboardGetResultsParams,
  config?: { [param: string]: unknown },
  isServer?: boolean
) => requestPostData<LeaderboardGetResultsParams, LeaderboardGetResult[]>(
  ENDPOINTS.LEADERBOARD_RESULTS,
  leaderBoardParams,
  config,
  isServer
);
