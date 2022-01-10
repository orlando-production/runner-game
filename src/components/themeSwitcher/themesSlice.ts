/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import {
  FETCH_THEMES_PENDING
} from 'actions/themes';

export type Themes = {
  theme: null | string,
};

export const themesInitialState: Themes = {
  theme: null
};

export const themesSlice = createSlice({
  name: 'theme',
  initialState: themesInitialState,
  reducers: {},
  extraReducers: {
    [FETCH_THEMES_PENDING]: (state, action) => {
      /* TODO тут надо будет проверить в каком виде с бека приходит */
      state.theme = action?.payload?.theme;
    }
  }
});

export const themesReducer = themesSlice.reducer;
