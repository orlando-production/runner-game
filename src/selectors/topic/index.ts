import { createSelector } from 'reselect';
import { RootState } from 'store';

const getTopics = (state: RootState) => state.topics;

export const getTopicsData = createSelector(
  getTopics,
  ({ topics }) => topics
);
