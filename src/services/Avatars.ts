/* eslint-disable no-console */
import { ENDPOINTS, requestGetData } from '../api';

export const getAvatars = (url: string, config?: {}, isServer?: boolean) => requestGetData(`${ENDPOINTS.RESOURCES}/${url}`, config, isServer);
