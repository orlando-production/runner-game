import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_MESSAGE, FETCH_MESSAGE_LIST } from '../../actions/message';

import { ErrorType } from '../../api';
import {
  getMessages, setMessage, MessageGetParams, MessageSetParams
} from '../../services/Message';

export const fetchGetMessage = createAsyncThunk(
  FETCH_MESSAGE_LIST,
  (
    messageGetParams?: MessageGetParams
  ) => getMessages(messageGetParams)
    .then(({ data }) => data)
);

export const fetchSetMessage = createAsyncThunk(
  FETCH_MESSAGE,
  (
    messageSetParams: MessageSetParams,
    { rejectWithValue }
  ) => setMessage(messageSetParams)
    .then(({ data }) => data)
    .catch((err: ErrorType) => rejectWithValue(err?.response?.status))
);
