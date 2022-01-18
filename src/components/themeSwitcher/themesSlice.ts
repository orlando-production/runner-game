/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

export type Themes = {
  theme: number;
  allThemes: { themeId: number; themeName: string }[];
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
  extraReducers: {}
});
export const { setThemeId, setAllThemes } = themesSlice.actions;
export const themesReducer = themesSlice.reducer;
