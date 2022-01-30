import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import { IS_DEV } from '../../webpack/env';
/* eslint-disable no-console */
const YANDEX_END_POINT = 'https://ya-praktikum.tech/api/v2/';
const OWN_SERVER_END_POINT = 'http://localhost:5000/';
const PROD_SERVER = 'https://runner-game.ya-praktikum.tech/api/';
const SERVER_ENDPOINT = IS_DEV ? OWN_SERVER_END_POINT : PROD_SERVER;
const API = (isServer: boolean = false) => axios.create({
  baseURL: isServer ? YANDEX_END_POINT : SERVER_ENDPOINT,
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
  AUTH_BY_CODE: 'oauth/yandex',
  TOPIC: 'topic',
  TOPIC_ALL: 'topic/all',
  TOPIC_BY_ID: 'topic/id',
  MESSAGE: 'message',
  MESSAGE_GET: 'message/list'
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
