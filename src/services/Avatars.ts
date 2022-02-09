import { Endpoint, ENDPOINTS, requestGetData } from '../api';

type AvatarsEndpoint = Endpoint & {'AVATAR_FULL_PATH': string};

export const getAvatars = (url: string, config?: {}, isServer?: boolean) => requestGetData(
    `${ENDPOINTS.RESOURCES}/${url}` as AvatarsEndpoint,
    config,
    isServer
);
