import React from 'react';
import {
  render
} from 'utils/testing-library';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import ForumPage from 'pages/ForumPage';
import { PrivateRoute } from '../PrivateRoute';

describe('PrivateRoute', () => {
  describe('со страницы логина производим редирект на страницу игры', () => {
    it('если пользователь авторизован', async () => {
      const history = createMemoryHistory({ initialEntries: ['/sign-in'] });

      render(
        <Router history={history}>
          <PrivateRoute path="/sign-in" component={LoginPage} type="public" isAuthenticated />
        </Router>
      );

      expect(history.location.pathname).toBe('/game');
    });
  });

  describe('со страницы форума производим редирект на страницу входа', () => {
    it('если пользователь не авторизован', async () => {
      const history = createMemoryHistory({ initialEntries: ['/forum'] });

      render(
        <Router history={history}>
          <PrivateRoute path="/forum" component={ForumPage} exact type="private" isAuthenticated={false} />
        </Router>
      );

      expect(history.location.pathname).toBe('/sign-in');
    });
  });
});
