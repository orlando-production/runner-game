import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2/',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export const ENDPOINTS = {
  SIGNIN: 'auth/signin',
  SIGNUP: 'auth/signup',
  LOGOUT: 'auth/logout',
  AVATAR: 'user/profile/avatar',
  USER: 'auth/user',
  PROFILE: 'user/profile',
  PASSWORD: 'user/password',
  LEADERBOARD: 'leaderboard'
} as const;

type Endpoint = typeof ENDPOINTS[keyof typeof ENDPOINTS];

export type ErrorType = AxiosError;

export const requestPostData = <P, R>(
  url: Endpoint,
  params?: P
) => API.post<R, AxiosResponse<R>, P>(url, params).then(({ data }) => data);

export const requestGetData = <R>(url: Endpoint) => API.get<R>(url).then(({ data }) => data);

export const requestPutData = <P, R>(url: Endpoint, params: P) => API.put<R, AxiosResponse<R>, P>(url, params).then(({ data }) => data);
