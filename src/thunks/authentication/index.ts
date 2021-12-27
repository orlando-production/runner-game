/* eslint-disable no-console */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FETCH_SIGNIN,
  FETCH_USER_INFO,
  SIGN_IN_BY_CODE
} from '../../actions/authentication';

import { ErrorType } from '../../api';
import {
  authByCode,
  authenticateUser,
  CodeAuthParams,
  getUserInfo,
  SignInParams
} from '../../services/Auth';

export type FetchSignInParams = SignInParams & {
  navigate: () => void;
};

export type SignInByCodeParams = CodeAuthParams & {
  navigate: void;
};

export const fetchSignIn = createAsyncThunk(
  FETCH_SIGNIN,
  (
    {
      login, password, navigate
    }: FetchSignInParams,
    { rejectWithValue }
  ) => authenticateUser({ login, password })
    .then(() => {
      navigate();
    })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);

export const signInByCode = createAsyncThunk(
  SIGN_IN_BY_CODE,
  (
    {
      code, redirect_uri, navigate
    }: SignInByCodeParams,
    { rejectWithValue }
  ) => authByCode(code, redirect_uri)
    .then(() => {
      navigate();
    })
    .catch((err: ErrorType) => {
      rejectWithValue(err?.response.status);
    })
);

export const fetchUserInfo = createAsyncThunk(
  FETCH_USER_INFO,
  () => getUserInfo()
    .then((result) => result)
    .catch(() => {
      throw new Error('Error in FetchUserInfo');
    })
);
