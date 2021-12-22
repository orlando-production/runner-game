/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import './reset.css';
import './constants.css';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import routes from 'routes';
import { PrivateRoute } from './privateRoute/PrivateRoute';

function App() {
  return (
    <div>
      <Switch>
        {routes.map(({ path, type, ...props }) =>
          type !== 'error' ? (
            <PrivateRoute key={path} path={path} type={type} {...props} />
          ) : (
            <Route key={path} path={path} type={type} {...props} />
          )
        )}
      </Switch>
    </div>
  );
}

const Component = hot(App);

export { Component as App };
