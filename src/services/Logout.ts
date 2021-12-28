import { ENDPOINTS, requestPostData } from '../api';

export const logoutUser = (
  config?: {},
  isServer?: boolean
) => requestPostData(ENDPOINTS.LOGOUT, {}, config, isServer);
