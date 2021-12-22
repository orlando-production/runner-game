import { createSelector } from 'reselect';
import { RootState } from 'store';

const getAuthentication = (state: RootState) => state.authentication;

export const getAuthStatus = createSelector(
  getAuthentication,
  ({ authStatus }) => authStatus
);

export const getAuthError = createSelector(
  getAuthentication,
  ({ error }) => error
);

export const getUserInfoData = createSelector(
  getAuthentication,
  ({ isAuthenticated }) => isAuthenticated || false
);
