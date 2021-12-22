/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import './reset.css';
import './constants.css';
import {
  Route,
  Switch
} from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import routes from 'routes';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoData } from 'selectors/authentication';
import { fetchUserInfo } from 'thunks/authentication';
import { PrivateRoute } from './privateRoute/PrivateRoute';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getUserInfoData);
  console.log('isAuthenticated from App');
  console.log(isAuthenticated);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  return (
    <div>
      <Switch>
        {routes.map(({
          path, type, ...props
        }) => (
          type !== 'error'
            ? (
              <PrivateRoute
                key={path}
                path={path}
                type={type}
                isAuthenticated={isAuthenticated}
                {...props}
              />
            )
            : (
              <Route
                key={path}
                path={path}
                type={type}
                {...props}
              />
            )
        ))}
      </Switch>
    </div>
  );
}

const Component = hot(App);

export { Component as App };
