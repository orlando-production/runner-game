/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export type RouteType = 'private' | 'public' | 'error';

type PrivateRouteProps = {
    component?: React.FunctionComponent<any>;
    path?: string;
    exact?: boolean;
    type?: RouteType;
    isAuthenticated?: boolean;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { type, isAuthenticated } = props;

  console.log('isAuthenticated from PrivateRoute');
  console.log(isAuthenticated);

  if (type === 'public' && isAuthenticated) {
    return <Redirect to="/game" />;
  } if (type === 'private' && !isAuthenticated) {
    return <Redirect to="/sign-in" />;
  }
  return <Route {...props} />;
};
