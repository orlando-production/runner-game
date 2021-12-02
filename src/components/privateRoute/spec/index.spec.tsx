import React from 'react';
import {
  render
} from 'utils/testing-library';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import ForumPage from 'pages/ForumPage';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { PrivateRoute } from '../PrivateRoute';

describe('PrivateRoute', () => {
  describe('со страницы логина производим редирект на страницу игры', () => {
    it('если пользователь авторизован', async () => {
      const history = createMemoryHistory({ initialEntries: ['/sign-in'] });

      const mapStateToProps = () => ({
        isAuthenticated: true
      });
      const Connected = connect(mapStateToProps)(PrivateRoute);

      const RouteWithCookies = withCookies(Connected);

      render(
        <Router history={history}>
          <RouteWithCookies path="/sign-in" component={LoginPage} type="public" />
        </Router>
      );

      expect(history.location.pathname).toBe('/game');
    });
  });

  describe('со страницы форума производим редирект на страницу входа', () => {
    it('если пользователь не авторизован', async () => {
      const history = createMemoryHistory({ initialEntries: ['/forum'] });

      const mapStateToProps = () => ({
        isAuthenticated: false
      });
      const Connected = connect(mapStateToProps)(PrivateRoute);

      const RouteWithCookies = withCookies(Connected);

      render(
        <Router history={history}>
          <RouteWithCookies path="/forum" component={ForumPage} exact type="private" />
        </Router>
      );

      expect(history.location.pathname).toBe('/sign-in');
    });
  });
});
