import { createSelector } from 'reselect';
import { RootState } from 'store';

const getUser = (state: RootState) => state.user;
const getStatusProf = (state: RootState) => state.statusProfile;
const getStatusPass = (state: RootState) => state.statusPassword;
const getMessagePass = (state: RootState) => state.messagePassword;
const getMessageProf = (state: RootState) => state.messageProfile;

export const getUserData = createSelector(
  getUser,
  ({ user }) => user || {}
);

export const getAvatarSrc = createSelector(
  getUser,
  ({ user }) => user?.avatar
);

export const getMessageProfile = createSelector(
  getMessageProf,
  ({ messageProfile }) => messageProfile
);

export const getMessagePassword = createSelector(
  getMessagePass,
  ({ messagePassword }) => messagePassword
);

export const getStatusProfile = createSelector(
  getStatusProf,
  ({ statusProfile }) => statusProfile
);

export const getStatusPassword = createSelector(
  getStatusPass,
  ({ statusPassword }) => statusPassword
);

export const getUserError = createSelector(
  getUser,
  ({ error }) => error
);
