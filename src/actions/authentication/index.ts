import type { Action } from 'actions/type';
import type { ErrorType } from 'api';

export const FETCH_SIGNIN = 'auth/SIGNIN';
export const FETCH_SIGNIN_SUCCEEDED = 'auth/SIGNIN_SUCCEEDED';
export const FETCH_SIGNIN_FAILED = 'tickets/SIGNIN_FAILED';

export type FetchAction = Action<typeof FETCH_SIGNIN>;
export type SucceededAction = Action<typeof FETCH_SIGNIN_SUCCEEDED>;
export type FailedAction = Action<typeof FETCH_SIGNIN_FAILED, ErrorType>;

export const fetch = () => ({
  type: FETCH_SIGNIN
} as FetchAction);

export const fetchSucceeded = () => ({
  type: FETCH_SIGNIN_SUCCEEDED
} as SucceededAction);

export const fetchFailed = (payload: ErrorType) => ({
  type: FETCH_SIGNIN_FAILED,
  payload
} as FailedAction);

export type Actions = FetchAction | SucceededAction | FailedAction;
