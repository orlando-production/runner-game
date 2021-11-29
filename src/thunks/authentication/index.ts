import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_SIGNIN } from '../../actions/authentication';

import { ErrorType } from '../../api';
import { authenticateUser, SignInParams } from '../../services/Auth';

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
