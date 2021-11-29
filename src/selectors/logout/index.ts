import { createSelector } from 'reselect';
import { RootState } from 'store';

const getLogout = (state: RootState) => state.logout;

export const getLogoutStatus = createSelector(
  getLogout,
  ({ logoutStatus }) => logoutStatus
);

export const getLogoutError = createSelector(
  getLogout,
  ({ error }) => error
);
