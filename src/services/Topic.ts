import { ENDPOINTS, requestPostData } from '../api';

export type TopicParams = {
  id: number | string;
  author: string;
  text: string;
};

export type topicMessagesParams = {
  id?: number | string;
};

export type topicGetMessages = [];

export const setMessage = (
  topicParams: TopicParams,
  config?: {}, isServer?:boolean
) => requestPostData<TopicParams, topicGetMessages>(ENDPOINTS.MESSAGE, topicParams, config, isServer);

export const getMessages = (
  topicMessages: topicMessagesParams,
  config?: {},
  isServer?: boolean
) => requestPostData<topicMessagesParams, topicGetMessages[]>(
  ENDPOINTS.MESSAGE_GET,
  topicMessages,
  config,
  isServer
);
