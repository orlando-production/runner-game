import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_LOGOUT } from '../../actions/logout';

import { ErrorType } from '../../api';
import { logoutUser } from '../../services/Logout';

export type FetchLogoutParams = {removeCookie: (name?: string) => void, navigate: () => void};

export const fetchLogout = createAsyncThunk(
  FETCH_LOGOUT,
  ({
    removeCookie, navigate
  }: FetchLogoutParams, { rejectWithValue }) => logoutUser()
    .then(() => {
      removeCookie('auth');
      navigate();
    })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);
