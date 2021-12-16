import React from 'react';
import {
  render
} from 'utils/testing-library';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import ForumPage from 'pages/ForumPage';
import type { Authentication } from 'pages/LoginPage/loginSlice';
import type { Registration } from 'pages/SignUpPage/registrationSlice';
import type { Logout } from 'pages/ProfilePage/logoutSlice';
import type { User } from 'pages/ProfilePage/userSlice';
import PrivateRoute from '../PrivateRoute';

describe('PrivateRoute', () => {
  describe('со страницы логина производим редирект на страницу игры', () => {
    it('если пользователь авторизован', async () => {
      const history = createMemoryHistory({ initialEntries: ['/sign-in'] });

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
        messageProfile: {} as User
      };

      render(
        <Router history={history}>
          <PrivateRoute path="/sign-in" component={LoginPage} type="public" />
        </Router>,
        { preloadedState }
      );

      expect(history.location.pathname).toBe('/game');
    });
  });

  describe('со страницы форума производим редирект на страницу входа', () => {
    it('если пользователь не авторизован', async () => {
      const history = createMemoryHistory({ initialEntries: ['/forum'] });

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
        messageProfile: {} as User
      };

      render(
        <Router history={history}>
          <PrivateRoute path="/forum" component={ForumPage} exact type="private" />
        </Router>,
        { preloadedState }
      );

      expect(history.location.pathname).toBe('/sign-in');
    });
  });
});
