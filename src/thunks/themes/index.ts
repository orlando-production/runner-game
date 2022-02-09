import { createAsyncThunk } from '@reduxjs/toolkit';
import { setThemeId } from 'components/themeSwitcher/themesSlice';
import { setAuthentication } from 'pages/LoginPage/loginSlice';
import { setUser } from 'pages/ProfilePage/userSlice';
import { getUserInfo } from 'services/Auth';
import { UserResult } from 'services/Profile';
import {
  FETCH_ALL_THEMES,
  FETCH_THEMES,
  FETCH_USER_THEMES
} from '../../actions/themes';

import { ErrorType } from '../../api';
import { getTheme, setTheme, ThemesParams } from '../../services/Themes';

export const fetchGetTheme = createAsyncThunk(
  FETCH_THEMES,
  ({ id }: UserResult, { rejectWithValue, dispatch }) => getTheme({
    params: { id }
  })
    .then(({ themeId }) => {
      dispatch(setThemeId(themeId));
    })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);

export const fetchAllThemes = createAsyncThunk(FETCH_ALL_THEMES, () => getTheme());

export const fetchUserAndTheme = createAsyncThunk(
  FETCH_USER_THEMES,
  (dispatch?: any): Promise<boolean> => new Promise((resolve) => {
    getUserInfo()
      .then(async (result: UserResult) => {
        dispatch(setAuthentication());
        dispatch(setUser(result));
        if (result) {
          await dispatch(fetchGetTheme(result));
          resolve(true);
        }
      })
      .catch(() => resolve(false));
  })
);

export const fetchSetTheme = createAsyncThunk(
  FETCH_THEMES,
  (themesParams: ThemesParams, { rejectWithValue }) => setTheme(themesParams).catch((err: ErrorType) => rejectWithValue(err?.response?.data?.reason))
);
