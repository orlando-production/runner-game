import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTheme } from 'components/themeSwitcher/themesSlice';
import { setAuthentication } from 'pages/LoginPage/loginSlice';
import { setUser } from 'pages/ProfilePage/userSlice';
import { Dispatch, Reducer } from 'react';
import { getUserInfo } from 'services/Auth';
import { FETCH_THEMES, FETCH_USER_THEMES } from '../../actions/themes';

import { ErrorType } from '../../api';
import { getThemes, setThemes, ThemesParams } from '../../services/Themes';

export const fetchGetThemes = createAsyncThunk(
  FETCH_THEMES,
  (
    {
      id,
      dispatch
    }: ThemesParams & {
      dispatch: Dispatch<Reducer>;
    },
    { rejectWithValue }
  ) => getThemes({
    params: { id }
  })
    .then(({ themeId }) => {
      console.log('THEME IN FETCH GET THEMES', themeId);
      dispatch(setTheme(themeId));
    })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);

export const fetchUserAndTheme = createAsyncThunk(
  FETCH_USER_THEMES,
  (dispatch?: any) => getUserInfo()
    .then((result) => {
      dispatch(setAuthentication());
      dispatch(setUser(result));
      return result;
    })
    .then((result) => {
      dispatch(fetchGetThemes({ ...result, dispatch }));
    })
);

export const fetchSetThemes = createAsyncThunk(
  FETCH_THEMES,
  (themesParams: ThemesParams, { rejectWithValue }) => setThemes(themesParams).catch((err: ErrorType) => rejectWithValue(err?.response?.data?.reason))
);
