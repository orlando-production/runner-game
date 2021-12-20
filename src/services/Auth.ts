import { ENDPOINTS, requestPostData } from '../api';

export type SignInParams = {
  login: string;
  password: string;
};

export type SignInResult = null;

export const authenticateUser = (signInParams: SignInParams, isServer?:boolean) =>
  requestPostData<SignInParams, SignInResult>(ENDPOINTS.SIGNIN, signInParams, {}, isServer);
