/* eslint-disable no-console */
import { ENDPOINTS, requestGetData, requestPostData } from '../api';

export type SignInParams = {
  login: string;
  password: string;
};

export type CodeAuthParams = {
  code: string;
  redirect_uri: string;
};
export type OAuthServiceConfig = {
  params: {
    redirect_uri: string;
  };
};

export type SignInResult = null;

export const authenticateUser = (
  signInParams: SignInParams,
  isServer?: boolean
) => requestPostData<SignInParams, SignInResult>(
  ENDPOINTS.SIGNIN,
  signInParams,
  {},
  isServer
);

type UserInfo = null;

export const getUserInfo = (config?: {}, isServer?: boolean) => requestGetData<UserInfo, UserInfo>(ENDPOINTS.USER, config, isServer);

export const getServiceId = (redirect_uri: string, isServer?: boolean) => requestGetData<string, OAuthServiceConfig>(
  `${ENDPOINTS.OAUTH_SERVICE}`,
  {
    params: { redirect_uri }
  },
  isServer
);
export const authByCode = (
  code: string,
  redirect_uri: string,
  isServer?: boolean
) => requestPostData<CodeAuthParams, undefined>(
  `${ENDPOINTS.AUTH_BY_CODE}`,
  {
    code,
    redirect_uri
  },
  {},
  isServer
);
