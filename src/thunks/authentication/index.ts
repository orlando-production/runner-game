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
  setCookie: (name?: string, value?: string) => void;
  navigate: () => void;
};

export type SignInByCodeParams = CodeAuthParams & {
  setCookie: (name?: string, value?: string) => void;
  navigate: void;
};

export const fetchSignIn = createAsyncThunk(
  FETCH_SIGNIN,
  (
    {
      login, password, setCookie, navigate
    }: FetchSignInParams,
    { rejectWithValue }
  ) => authenticateUser({ login, password })
    .then(() => {
      setCookie('auth', login);
      navigate();
    })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);

export const signInByCode = createAsyncThunk(
  SIGN_IN_BY_CODE,
  (
    {
      code, redirect_uri, setCookie, navigate
    }: SignInByCodeParams,
    { rejectWithValue }
  ) => authByCode(code, redirect_uri)
    .then(() => {
      navigate();
      setCookie('auth');
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
