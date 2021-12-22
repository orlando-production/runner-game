import { ENDPOINTS, requestGetData, requestPostData } from '../api';

export type SignInParams = {
  login: string;
  password: string;
};

export type SignInResult = null;

export const authenticateUser = (
  signInParams: SignInParams,
  isServer?:boolean
) => requestPostData<SignInParams, SignInResult>(ENDPOINTS.SIGNIN, signInParams, {}, isServer);

type UserInfo = null;

export const getUserInfo = (
  isServer?:boolean
) => requestGetData<UserInfo, UserInfo>(ENDPOINTS.USER, null, isServer);
