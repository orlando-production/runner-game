/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getUserInfoData } from 'selectors/authentication';
import { fetchUserInfo } from 'thunks/authentication';

export type RouteType = 'private' | 'public' | 'error';

type PrivateRouteProps = {
  component?: React.FunctionComponent<any>;
  path?: string;
  exact?: boolean;
  type?: RouteType;
  isAuthenticated?: boolean;
};

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { type } = props;
  const isAuthenticated = useSelector(getUserInfoData);

  if (type === 'public' && isAuthenticated) {
    return <Redirect to='/game' />;
  }
  if (type === 'private' && !isAuthenticated) {
    return <Redirect to='/sign-in' />;
  }
  return <Route {...props} />;
};
