import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute: React.FC<{
    component: React.FC;
    path: string;
    exact: boolean;
}> = ({ path, exact, component }) => {
  /* todo пока заглушку оставил */
  const isAuth = true;
  return isAuth ? (<Route path={path} exact={exact} component={component} />)
    : (<Redirect to="/sign-in" />);
};
export default PrivateRoute;
