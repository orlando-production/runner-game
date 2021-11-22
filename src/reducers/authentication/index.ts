/* eslint-disable no-param-reassign */

import type { Actions } from 'actions/authentication';
import type { ErrorType } from 'api';
import {
  FETCH_SIGNIN,
  FETCH_SIGNIN_SUCCEEDED,
  FETCH_SIGNIN_FAILED
} from 'actions/authentication';

export type Authentication = {
  authStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: ErrorType,
};

const initialState: Authentication = {
  authStatus: 'idle'
};

export const authentication = (state = initialState, action: Actions) => {
  switch (action.type) {
    case FETCH_SIGNIN:
      state.authStatus = 'loading';
      break;

    case FETCH_SIGNIN_SUCCEEDED:
      state.authStatus = 'succeeded';
      break;

    case FETCH_SIGNIN_FAILED:
      state.authStatus = 'failed';
      state.error = action.payload;
      break;

    default:
      return state;
  }

  return state;
};
