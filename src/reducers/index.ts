import type { Immutable } from 'immer';
import produce from 'immer';
import { combineReducers } from 'redux-immer';
import type { Authentication } from './authentication';
import { authentication } from './authentication';

export type State = Immutable<{
  authentication: Authentication
}>;

export const rootReducer = combineReducers(produce, {
  authentication
});
