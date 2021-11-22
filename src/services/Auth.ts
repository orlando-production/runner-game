import { requestPostData, ENDPOINTS } from 'api';

export type SignInParams = {
  login: string;
  password: string;
};

export type SignInResult = null;

export const authenticateUser = (signInParams: SignInParams) => requestPostData<SignInParams, SignInResult>(ENDPOINTS.SIGNIN, signInParams);
