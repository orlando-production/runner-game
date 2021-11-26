import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_AVATAR, FETCH_USER, FETCH_PASSWORD } from '../../actions/profile';

import { ErrorType } from '../../api';
import {
  getUser, setUserData, setAvatar, setPassword, PasswordParams, UserResult, AvatarParams
} from '../../services/Profile';

export const fetchAvatar = createAsyncThunk(
  FETCH_AVATAR,
  (FormData: AvatarParams, { rejectWithValue }) => setAvatar(FormData)
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);

export const fetchProfile = createAsyncThunk(
  FETCH_USER,
  ({
    first_name, second_name, email, phone, display_name, login
  }: UserResult, { rejectWithValue }) => setUserData({
    first_name, second_name, email, phone, display_name, login
  })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);

export const fetchPassword = createAsyncThunk(
  FETCH_PASSWORD,
  ({ newPassword, oldPassword }: PasswordParams, { rejectWithValue }) => setPassword({ newPassword, oldPassword })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.data?.reason))
);

// не уверне что тут правильно
export const fetchUser = createAsyncThunk(
  FETCH_USER,
  () => getUser()
    .catch((err: ErrorType) => (err?.response?.status))
);
