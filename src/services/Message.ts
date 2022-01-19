import { ENDPOINTS, requestPostData } from '../api';

export type MessageSetParams = {
  id: number | string;
  author: string;
  text: string;
};

export type MessageGetParams = {
  id?: number | string;
};

export type MessageResult = {
  id: number,
  author: string;
  text: string;
  createUp: string,
  updateUp: string
};

export const setMessage = (
  messageSetParams: MessageSetParams,
  config?: {}, isServer?:boolean
) => requestPostData<MessageSetParams, Array<MessageResult>>(
  ENDPOINTS.MESSAGE,
  messageSetParams,
  config,
  isServer
);

export const getMessages = (
  messageGetParams: MessageGetParams,
  config?: {},
  isServer?: boolean
) => requestPostData<MessageGetParams, Array<MessageResult>>(
  ENDPOINTS.MESSAGE_GET,
  messageGetParams,
  config,
  isServer
);
