import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
/* eslint-disable no-console */
const YANDEX_END_POINT = 'https://ya-praktikum.tech/api/v2/';
const OWN_SERVER_END_POINT = 'http://localhost:5000/';
const API = (isServer: boolean = false) => axios.create({
  baseURL: isServer ? YANDEX_END_POINT : OWN_SERVER_END_POINT,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const TEAM_NAME = 'orlando_production';

export const ENDPOINTS = {
  SIGNIN: 'auth/signin',
  SIGNUP: 'auth/signup',
  LOGOUT: 'auth/logout',
  AVATAR: 'user/profile/avatar',
  AVATARS: 'avatar/*',
  RESOURCES: 'resources',
  USER: 'auth/user',
  PROFILE: 'user/profile',
  PASSWORD: 'user/password',
  LEADERBOARD: 'leaderboard',
  THEMES: 'theme',
  LEADERBOARD_RESULTS: `leaderboard/${TEAM_NAME}`,
  OAUTH_SERVICE: 'oauth/yandex/service-id',
  AUTH_BY_CODE: 'oauth/yandex'
} as const;

export type Endpoint = typeof ENDPOINTS[keyof typeof ENDPOINTS];

export type ErrorType = AxiosError;

export const requestPostData = <P, R>(
  url: Endpoint,
  params?: P,
  config?: {},
  isServer?: boolean
) => API(isServer)
    .post<R, AxiosResponse<R>, P>(url, params, config)
    .then(({ data, headers }) => ({ data, headers }));

export const requestGetData = <R, P>(
  url: Endpoint,
  config?: {},
  isServer?: boolean
) => API(isServer)
    .get<R, AxiosResponse<R>, P>(url, config)
    .then(({ data }) => data);

export const requestPutData = <P, R>(
  url: Endpoint,
  params: P,
  config?: {},
  isServer?: boolean
) => API(isServer)
    .put<R, AxiosResponse<R>, P>(url, params, config)
    .then(({ data, headers }) => ({ data, headers }));
