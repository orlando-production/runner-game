import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_SIGNIN, FETCH_USER_INFO } from '../../actions/authentication';

import { ErrorType } from '../../api';
import { authenticateUser, getUserInfo, SignInParams } from '../../services/Auth';

export type FetchSignInParams = SignInParams & {setCookie: (name?: string, value?: string) => void, navigate: () => void};

export const fetchSignIn = createAsyncThunk(
  FETCH_SIGNIN,
  ({
    login, password, setCookie, navigate
  }: FetchSignInParams, { rejectWithValue }) => authenticateUser({ login, password })
    .then(() => {
      setCookie('auth', login);
      navigate();
    })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);

export const fetchUserInfo = createAsyncThunk(
  FETCH_USER_INFO,
  (props, { rejectWithValue }) => getUserInfo()
    .then(() => {
      console.log('getUserInfo');
    })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);
