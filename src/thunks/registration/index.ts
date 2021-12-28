import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_SIGNUP } from '../../actions/registration';

import { ErrorType } from '../../api';
import { registerUser, SignUpParams } from '../../services/Registration';

export type FetchSignUpParams = SignUpParams & {navigate: () => void};

export const fetchSignUp = createAsyncThunk(
  FETCH_SIGNUP,
  ({
    first_name,
    second_name,
    email,
    phone,
    login,
    password,
    navigate
  }: FetchSignUpParams, { rejectWithValue }) => registerUser({
    first_name,
    second_name,
    email,
    phone,
    login,
    password
  })
    .then(() => {
      navigate();
    })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);
