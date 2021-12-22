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
) =>
  requestPostData<SignInParams, SignInResult>(
    ENDPOINTS.SIGNIN,
    signInParams,
    {},
    isServer
  );

type UserInfo = null;

export const getUserInfo = (isServer?: boolean) =>
  requestGetData<UserInfo, UserInfo>(ENDPOINTS.USER, null, isServer);

export const getServiceId = (redirect_uri: string) =>
  requestGetData<string, OAuthServiceConfig>(`${ENDPOINTS.OAUTH_SERVICE}`, {
    params: { redirect_uri }
  });
export const authByCode = (code: string, redirect_uri: string) =>
  requestPostData<CodeAuthParams, undefined>(`${ENDPOINTS.AUTH_BY_CODE}`, {
    code,
    redirect_uri
  });
