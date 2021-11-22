import type { State } from 'reducers';
import { createSelector } from 'reselect';

const getAuthentication = (state: State) => state.authentication;

export const getAuthStatus = createSelector(
  getAuthentication,
  ({ authStatus }) => authStatus
);

export const getAuthError = createSelector(
  getAuthentication,
  ({ error }) => error
);
