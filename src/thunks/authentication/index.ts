import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_SIGNIN } from '../../actions/authentication';

import { ErrorType } from '../../api';
import { authenticateUser, SignInParams } from '../../services/Auth';

export type FetchSignInParams = SignInParams & {navigate: () => void};

export const fetchSignIn = createAsyncThunk(
  FETCH_SIGNIN,
  ({ login, password, navigate }: FetchSignInParams, { rejectWithValue }) => authenticateUser({ login, password })
    .then(() => { navigate(); })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);
