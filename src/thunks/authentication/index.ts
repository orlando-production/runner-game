import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AUTH_BY_CODE,
  FETCH_SIGNIN,
  FETCH_USER_INFO
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

export const fetchUserInfo = createAsyncThunk(FETCH_USER_INFO, () => getUserInfo());

export const fetchSignIn = createAsyncThunk(
  FETCH_SIGNIN,
  ({ login, password, navigate }: FetchSignInParams, { rejectWithValue, dispatch }) => authenticateUser({ login, password })
    .then(() => {
      dispatch(fetchUserInfo());
      navigate();
    })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);

type AuthByCodeThunk = (code: string, dispatch?: any) => any;

export const authByCodeThunk: AuthByCodeThunk = createAsyncThunk(
  AUTH_BY_CODE,
  (code: string, dispatch: any) => authByCode(code, 'http://localhost:5000').then(() => dispatch(fetchUserInfo()))
);
