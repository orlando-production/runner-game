import { createSelector } from 'reselect';
import { RootState } from 'store';

const getTheme = (state: RootState) => state.theme;

export const getThemeId = createSelector(getTheme, ({ theme }) => {
  console.log('SELECTOR', theme);
  return theme;
});
