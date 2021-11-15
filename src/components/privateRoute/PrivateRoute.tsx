import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps {
    component: React.FunctionComponent;
    path: string;
    exact: boolean;
}

const PrivateRoute = ({ path, exact, component }: PrivateRouteProps) => {
  /* todo пока заглушку оставил */
  const isAuth = true;
  return isAuth ? (<Route path={path} exact={exact} component={component} />)
    : (<Redirect to="/sign-in" />);
};
export default PrivateRoute;
