import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_TOPIC, FETCH_TOPIC_ALL, FETCH_TOPIC_BY_ID } from '../../actions/topic';

import { ErrorType } from '../../api';
import {
  getTopicAll, getTopicById, setTopic, TopicGetParams, TopicParams
} from '../../services/Topic';

export const fetchGetTopicAll = createAsyncThunk(
  FETCH_TOPIC_ALL,
  () => getTopicAll()
    .then(({ data }) => data)
);

export const fetchGetTopicById = createAsyncThunk(
  FETCH_TOPIC_BY_ID,
  (
    topicGetParams?: TopicGetParams
  ) => getTopicById(topicGetParams)
    .then(({ data }) => data)
);

export const fetchSetTopic = createAsyncThunk(
  FETCH_TOPIC,
  (
    topicSetParams: TopicParams,
    { rejectWithValue }
  ) => setTopic(topicSetParams)
    .then(({ data }) => data)
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);
