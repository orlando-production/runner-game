import { ENDPOINTS, requestPostData } from '../api';

export type ForumParams = {
  title: string,
  text: string
};

export type ForumResult = {
  id: number | string,
};

export type ForumGetParams = {
  id?: number | string,
};

export type ForumGetResult = {
  id: number,
  title: string,
  text: string
};

export const setForum = (
  forumParams: ForumParams,
  config?: {}, isServer?:boolean
) => requestPostData<ForumParams, ForumResult>(ENDPOINTS.TOPIC, forumParams, config, isServer);

export const getForums = (
  forumParams?: ForumGetParams,
  config?: {}, isServer?:boolean
) => requestPostData<ForumGetParams, ForumGetResult>(ENDPOINTS.TOPIC_GET, forumParams, config, isServer);
