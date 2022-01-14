/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

export type Themes = {
  theme: number;
};

export const themesInitialState: Themes = {
  theme: 1
};

export const themesSlice = createSlice({
  name: 'theme',
  initialState: themesInitialState,
  reducers: {
    setTheme: (state, action) => {
      console.log('WAS SETTED THEME', action.payload);
      state.theme = action.payload;
    }
  },
  extraReducers: {}
});
export const { setTheme } = themesSlice.actions;
export const themesReducer = themesSlice.reducer;
