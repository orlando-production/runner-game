import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAllThemes, setThemeId } from 'components/themeSwitcher/themesSlice';
import { setAuthentication } from 'pages/LoginPage/loginSlice';
import { setUser } from 'pages/ProfilePage/userSlice';
import { Dispatch, Reducer } from 'react';
import { getUserInfo } from 'services/Auth';
import { FETCH_THEMES, FETCH_USER_THEMES } from '../../actions/themes';

import { ErrorType } from '../../api';
import { getTheme, setTheme, ThemesParams } from '../../services/Themes';

export const fetchGetTheme = createAsyncThunk(
  FETCH_THEMES,
  (
    {
      id,
      dispatch
    }: ThemesParams & {
      dispatch: Dispatch<Reducer>;
    },
    { rejectWithValue }
  ) => getTheme({
    params: { id }
  })
    .then(({ themeId }) => {
      dispatch(setThemeId(themeId));
    })
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);

export const fetchUserAndTheme = createAsyncThunk(
  FETCH_USER_THEMES,
  (dispatch?: any): Promise<boolean> => new Promise((resolve) => {
    getUserInfo()
      .then((result) => {
        dispatch(setAuthentication());
        dispatch(setUser(result));
        // Временный костыль, через два thunk не получается
        getTheme().then((themeList) => {
          dispatch(setAllThemes(themeList));
          getTheme({
            params: { id: result.id }
          }).then(({ themeId }) => {
            dispatch(setThemeId(themeId));
            resolve(true);
          });
        });
        // dispatch(fetchGetTheme({ ...result, dispatch }));
      })
      .catch(() => {
        getTheme().then((themeList) => {
          dispatch(setAllThemes(themeList));
          resolve(true);
        });
      });
  })
);

export const fetchSetTheme = createAsyncThunk(
  FETCH_THEMES,
  (themesParams: ThemesParams, { rejectWithValue }) => setTheme(themesParams).catch((err: ErrorType) => rejectWithValue(err?.response?.data?.reason))
);
