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
import type { Registration } from '../registrationSlice';
import type { Authentication } from '../../LoginPage/loginSlice';
import SignUpPage from '../SignUpPage';
import { Topic } from '../../ForumPage/topicSlice';
import { Message } from '../../ForumPage/messageSlice';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

const mockRegisterUser = jest.fn();

jest.mock('../../../services/Registration', () => ({
  registerUser: (...args: any[]) => mockRegisterUser(...args)
}));

const history = createMemoryHistory({ initialEntries: ['/sign-up'] });
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
  router: {} as RouterState,
  theme: {} as Themes,
  topics: {} as Topic,
  messages: {} as Message
};

describe('SignUpPage', () => {
  let submitButton: HTMLElement;

  beforeEach(async () => {
    mockHistoryPush.mockReset();
    mockRegisterUser.mockReset();

    render(
      <StaticRouter context={context} location={history.location}>
        <SignUpPage />
      </StaticRouter>,
      { preloadedState, history }
    );

    await act(async () => {
      const loginInput = screen.getByLabelText(/login/i);
      const passInput = screen.getByLabelText(/password/i);
      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const phoneInput = screen.getByLabelText(/phone/i);

      fireEvent.change(loginInput, { target: { value: 'admin' } });
      await screen.findByDisplayValue(/admin/i);

      fireEvent.change(passInput, { target: { value: '123456' } });
      await screen.findByDisplayValue(/123456/i);

      fireEvent.change(firstNameInput, { target: { value: 'john' } });
      await screen.findByDisplayValue(/john/i);

      fireEvent.change(lastNameInput, { target: { value: 'doe' } });
      await screen.findByDisplayValue(/doe/i);

      fireEvent.change(emailInput, { target: { value: 'jd@yandex.ru' } });
      await screen.findByDisplayValue(/jd@yandex.ru/i);

      fireEvent.change(phoneInput, { target: { value: '89007006050' } });
      await screen.findByDisplayValue(/89007006050/i);

      submitButton = screen.getByRole('button', { name: /sign up/i });
    });
  });

  describe('???????????????? ???? ?????????????? ????????????????', () => {
    it('???????? ???????????? ?????????????? ??????????', async () => {
      mockRegisterUser.mockReturnValue(Promise.resolve());

      fireEvent.click(submitButton);

      await waitFor(() => expect(mockRegisterUser).toHaveBeenCalledWith({
        login: 'admin',
        password: '123456',
        first_name: 'john',
        second_name: 'doe',
        email: 'jd@yandex.ru',
        phone: '89007006050'
      }));

      return waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
    });
  });

  describe('???????????????????? ?????????????????? ???? ????????????', () => {
    it('???????? ???????????? ?????????????????? ???????????? ????????????????', async () => {
      mockRegisterUser.mockReturnValue(Promise.reject());

      fireEvent.click(submitButton);

      await waitFor(() => expect(mockRegisterUser).toHaveBeenCalledWith({
        login: 'admin',
        password: '123456',
        first_name: 'john',
        second_name: 'doe',
        email: 'jd@yandex.ru',
        phone: '89007006050'
      }));

      return waitFor(() => expect(screen.getByText(/Data is incorrect/i)).toBeInTheDocument());
    });
  });
});
