import { ENDPOINTS, requestPostData } from '../api';

export const logoutUser = (isServer?: boolean) => requestPostData(ENDPOINTS.LOGOUT, null, {}, isServer);
