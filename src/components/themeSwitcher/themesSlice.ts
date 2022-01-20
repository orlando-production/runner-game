/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { FETCH_SET_USER_FULFILLED } from 'actions/themes';

export type ThemeType = {
  themeId: number;
  themeName: string;
};

export type Themes = {
  theme: number;
  allThemes: ThemeType[];
};

export const themesInitialState: Themes = {
  theme: 1,
  allThemes: []
};

export const themesSlice = createSlice({
  name: 'theme',
  initialState: themesInitialState,
  reducers: {
    setThemeId: (state, action) => {
      state.theme = action.payload;
    },
    setAllThemes: (state, action) => {
      state.allThemes = action.payload;
    }
  },
  extraReducers: {
    [FETCH_SET_USER_FULFILLED]: (state, action) => {
      state.allThemes = action.payload;
    }
  }
});
export const { setThemeId, setAllThemes } = themesSlice.actions;
export const themesReducer = themesSlice.reducer;
