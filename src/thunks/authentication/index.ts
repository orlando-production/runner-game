import type { Dispatch } from 'redux';
import type { Actions } from 'actions/authentication';
import type { SignInParams } from 'services/Auth';
import type { ErrorType } from 'api';
import { authenticateUser } from 'services/Auth';
import { fetch, fetchSucceeded, fetchFailed } from 'actions/authentication';

export const fetchSignIn = (params: SignInParams) => (dispatch: Dispatch<Actions>) => {
  dispatch(fetch());

  return authenticateUser(params)
    .then(() => dispatch(fetchSucceeded()))
    .catch((err: ErrorType) => dispatch(fetchFailed(err)));
};
