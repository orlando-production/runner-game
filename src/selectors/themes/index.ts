import { RootState } from 'store';

export const getThemeId = (state: RootState) => state.theme.theme;
export const getAllThemes = (state: RootState) => state.theme.allThemes;
