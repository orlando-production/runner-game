/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { Cookies } from 'react-cookie';
import { withCookies } from 'react-cookie';
import { Route, Redirect } from 'react-router-dom';

type RouteType = 'private' | 'public';

type PrivateRouteProps = {
    component?: React.FunctionComponent<any>;
    path?: string;
    exact?: boolean;
    type?: RouteType;
    cookies?: Cookies;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { type, cookies } = props;
  // eslint-disable-next-line react/destructuring-assignment
  let isAuth = false;

  const allCookies = cookies.getAll();
  if (allCookies?.auth) {
    isAuth = true;
  }

  if (type === 'public' && isAuth) {
    return <Redirect to="/game" />;
  } if (type === 'private' && !isAuth) {
    return <Redirect to="/sign-in" />;
  }
  return <Route {...props} />;
};

const WithCookies = withCookies(PrivateRoute);

export default WithCookies;
