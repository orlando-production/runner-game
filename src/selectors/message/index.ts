import { createSelector } from 'reselect';
import { RootState } from 'store';

const getMessages = (state: RootState) => state.messages;

export const getMessagesData = createSelector(
  getMessages,
  ({ messages }) => messages
);
