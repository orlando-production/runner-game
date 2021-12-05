/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { Cookies } from 'react-cookie';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RootState } from 'store';

type RouteType = 'private' | 'public';

type PrivateRouteProps = {
    component?: React.FunctionComponent<any>;
    path?: string;
    exact?: boolean;
    type?: RouteType;
    isAuthenticated?: boolean;
    cookies?: Cookies;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { type, cookies, isAuthenticated } = props;
  // eslint-disable-next-line react/destructuring-assignment
  let isAuth = isAuthenticated;

  const allCookies = cookies?.getAll();
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

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.authentication.isAuthenticated
});
const Connected = connect(mapStateToProps)(PrivateRoute);

const WithCookies = withCookies(Connected);

export default WithCookies;
