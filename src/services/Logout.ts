import { ENDPOINTS, requestPostData } from '../api';

export const logoutUser = () => requestPostData(ENDPOINTS.LOGOUT);
