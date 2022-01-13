import { ENDPOINTS, requestGetData, requestPutData } from '../api';

export type ThemesParams = {
  id: number;
  themeId?: number;
};

export const getThemes = (
  config?: {},
  isServer?: boolean
) => requestGetData(ENDPOINTS.THEMES, config, isServer);

export const setThemes = (
  themesParams: ThemesParams,
  config?: {},
  isServer?: boolean
) => requestPutData(ENDPOINTS.THEMES, themesParams, config, isServer);
