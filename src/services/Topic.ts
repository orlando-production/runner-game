import { ENDPOINTS, requestPostData } from '../api';

export type TopicParams = {
  title: string,
  text: string
};

export type TopicGetParams = {
  id?: number | string,
};

export type TopicResult = {
  id: number,
  title: string,
  text: string,
  createdAt: string,
  updatedAt: string
};

export const setTopic = (
  topicSetParams: TopicParams,
  config?: {}, isServer?:boolean
) => requestPostData<TopicParams, TopicResult>(ENDPOINTS.TOPIC, topicSetParams, config, isServer);

export const getTopicById = (
  topicGetParams?: TopicGetParams,
  config?: {}, isServer?:boolean
) => requestPostData<TopicGetParams, TopicResult>(ENDPOINTS.TOPIC_BY_ID, topicGetParams, config, isServer);

export const getTopicAll = (
  config?: {}, isServer?:boolean
) => requestPostData(ENDPOINTS.TOPIC_ALL, config, isServer);
