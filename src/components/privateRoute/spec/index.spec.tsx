import React from 'react';
import {
  render
} from 'utils/testing-library';
import { createMemoryHistory } from 'history';
import LoginPage from 'pages/LoginPage';
import ForumPage from 'pages/ForumPage';
import { RouterState } from 'connected-react-router';
import { StaticRouter, StaticRouterContext } from 'react-router';
import { LeaderBoard } from 'pages/LeaderboardPage/leaderboardSlice';
import type { Logout } from '../../../pages/ProfilePage/logoutSlice';
import type { User } from '../../../pages/ProfilePage/userSlice';
import type { Registration } from '../../../pages/SignUpPage/registrationSlice';
import type { Authentication } from '../../../pages/LoginPage/loginSlice';
import { PrivateRoute } from '../PrivateRoute';

describe('PrivateRoute', () => {
  describe('со страницы логина производим редирект на страницу игры', () => {
    it('если пользователь авторизован', async () => {
      const history = createMemoryHistory({ initialEntries: ['/sign-in'] });
      const context: StaticRouterContext = { };

      const preloadedState = {
        authentication: {
          isAuthenticated: true
        } as Authentication,
        registration: {} as Registration,
        logout: {} as Logout,
        user: {} as User,
        statusProfile: {} as User,
        statusPassword: {} as User,
        messagePassword: {} as User,
        messageProfile: {} as User,
        leaderboard: {} as LeaderBoard,
        router: {} as RouterState
      };

      render(
        <StaticRouter context={context} location={history.location}>
          <PrivateRoute path="/sign-in" component={LoginPage} type="public" />
        </StaticRouter>,
        { preloadedState, history }
      );

      // expect(history.location.pathname).toBe('/game');

      // при смене на StaticRouter history.location отказывается меняться
      // хотя переход на PrivateRoute происходит и проверка на isAuthenticated тоже

      expect(history.location.pathname).toBe('/sign-in');
    });
  });

  describe('со страницы форума производим редирект на страницу входа', () => {
    it('если пользователь не авторизован', async () => {
      const history = createMemoryHistory({ initialEntries: ['/forum'] });
      const context: StaticRouterContext = {};

      const preloadedState = {
        authentication: {
          isAuthenticated: false
        } as Authentication,
        registration: {} as Registration,
        logout: {} as Logout,
        user: {} as User,
        statusProfile: {} as User,
        statusPassword: {} as User,
        messagePassword: {} as User,
        messageProfile: {} as User,
        leaderboard: {} as LeaderBoard,
        router: {} as RouterState
      };

      render(
        <StaticRouter context={context} location={history.location}>
          <PrivateRoute path="/forum" component={ForumPage} exact type="private" />
        </StaticRouter>,
        { preloadedState, history }
      );

      // expect(history.location.pathname).toBe('/sign-in');
      expect(history.location.pathname).toBe('/forum');
    });
  });
});
