import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_THEMES } from '../../actions/themes';

import { ErrorType } from '../../api';
import { getThemes, setThemes, ThemesParams } from '../../services/Themes';

export const fetchGetThemes = createAsyncThunk(
  FETCH_THEMES,
  ({
    id
  }: ThemesParams, { rejectWithValue }) => getThemes({
    id
  })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);

export const fetchSetThemes = createAsyncThunk(
  FETCH_THEMES,
  (
    themesParams: ThemesParams,
    { rejectWithValue }
  ) => setThemes(themesParams)
    .catch((err: ErrorType) => rejectWithValue(err?.response?.data?.reason))
);
