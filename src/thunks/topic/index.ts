import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_TOPIC, FETCH_TOPIC_LIST } from '../../actions/topic';

import { ErrorType } from '../../api';
import {
  getTopic, setTopic, TopicGetParams, TopicParams
} from '../../services/Topic';

export const fetchGetTopic = createAsyncThunk(
  FETCH_TOPIC_LIST,
  (
    topicGetParams?: TopicGetParams
  ) => getTopic(topicGetParams)
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
