import { ENDPOINTS, requestPostData } from '../api';

export type SignUpParams = {
  login: string,
  password: string,
  first_name: string,
  second_name: string,
  email: string,
  phone: string
};

export type SignUpResult = null;

export const registerUser = (signUpParams: SignUpParams) => requestPostData<SignUpParams, SignUpResult>(ENDPOINTS.SIGNUP, signUpParams);
