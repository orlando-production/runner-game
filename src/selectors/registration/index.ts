import { createSelector } from 'reselect';
import { RootState } from 'store';

const getRegistration = (state: RootState) => state.registration;

export const getRegistrationStatus = createSelector(
  getRegistration,
  ({ registrationStatus }) => registrationStatus
);

export const getRegistrationError = createSelector(
  getRegistration,
  ({ error }) => error
);
