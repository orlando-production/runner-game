import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor
} from 'utils/testing-library';
import { RouterState } from 'connected-react-router';
import { StaticRouter, StaticRouterContext } from 'react-router';
// @ts-ignore
import { createMemoryHistory } from 'history';
import { LeaderBoard } from 'pages/LeaderboardPage/leaderboardSlice';
import { Themes } from 'components/themeSwitcher/themesSlice';
import type { Logout } from '../../ProfilePage/logoutSlice';
import type { User } from '../../ProfilePage/userSlice';
import type { Registration } from '../../SignUpPage/registrationSlice';
import type { Authentication } from '../loginSlice';
import LoginPage from '../LoginPage';
import { Topic } from '../../ForumPage/topicSlice';
import { Message } from '../../ForumPage/messageSlice';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

const mockAuthenticateUser = jest.fn();

jest.mock('../../../services/Auth', () => ({
  authenticateUser: (...args: any[]) => mockAuthenticateUser(...args)
}));

const history = createMemoryHistory({ initialEntries: ['/sign-in'] });
const context: StaticRouterContext = {};

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
  router: {} as RouterState,
  theme: {} as Themes,
  topics: {} as Topic,
  messages: {} as Message
};

describe('LoginPage', () => {
  let submitButton: HTMLElement;

  beforeEach(async () => {
    mockHistoryPush.mockReset();
    mockAuthenticateUser.mockReset();

    render(
      <StaticRouter context={context} location={history.location}>
        <LoginPage />
      </StaticRouter>,
      { preloadedState, history }
    );

    await act(async () => {
      const loginInput = screen.getByLabelText(/login/i);
      const passInput = screen.getByLabelText(/password/i);

      fireEvent.change(loginInput, { target: { value: 'admin' } });
      await screen.findByDisplayValue(/admin/i);

      fireEvent.change(passInput, { target: { value: '123456' } });
      await screen.findByDisplayValue(/123456/i);

      submitButton = screen.getByRole('button', { name: /sign in/i });
    });
  });

  describe('редиректит на главную страницу', () => {
    it('если логин и пароль введены верно', async () => {
      mockAuthenticateUser.mockReturnValue(Promise.resolve());

      fireEvent.click(submitButton);

      await waitFor(() => expect(mockAuthenticateUser).toHaveBeenCalledWith({
        login: 'admin',
        password: '123456'
      }));

      return waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
    });
  });

  describe('отображает сообщение об ошибке', () => {
    it('если логин или пароль введены неверно', async () => {
      mockAuthenticateUser.mockReturnValue(Promise.reject());

      fireEvent.click(submitButton);

      await waitFor(() => expect(mockAuthenticateUser).toHaveBeenCalledWith({
        login: 'admin',
        password: '123456'
      }));

      return waitFor(() => expect(screen.getByText(/Login or password is incorrect/i)).toBeInTheDocument());
    });
  });
});
