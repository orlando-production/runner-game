import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FETCH_AVATAR, FETCH_SET_USER, FETCH_PASSWORD
} from '../../actions/profile';

import { ErrorType } from '../../api';
import {
  setUserData, setAvatar, setPassword, PasswordParams, UserResult, AvatarParams
} from '../../services/Profile';

export const fetchAvatar = createAsyncThunk(
  FETCH_AVATAR,
  (
    FormData: AvatarParams,
    { rejectWithValue }
  ) => setAvatar(FormData)
    .then(({ data }) => data)
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);

export const fetchProfile = createAsyncThunk(
  FETCH_SET_USER,
  (
    userResult: UserResult,
    { rejectWithValue }
  ) => setUserData(userResult)
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);

export const fetchPassword = createAsyncThunk(
  FETCH_PASSWORD,
  (
    passwordParams: PasswordParams,
    { rejectWithValue }
  ) => setPassword(passwordParams)
    .catch((err: ErrorType) => rejectWithValue(err?.response?.data?.reason))
);
