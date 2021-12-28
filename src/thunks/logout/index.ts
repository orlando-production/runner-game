import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_LOGOUT } from '../../actions/logout';

import { ErrorType } from '../../api';
import { logoutUser } from '../../services/Logout';

export type FetchLogoutParams = {navigate: () => void};

export const fetchLogout = createAsyncThunk(
  FETCH_LOGOUT,
  ({
    navigate
  }: FetchLogoutParams, { rejectWithValue }) => logoutUser()
    .then(() => {
      navigate();
    })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);
