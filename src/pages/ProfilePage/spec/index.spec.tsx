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
import { UserResult } from 'services/Profile';
import { LeaderBoard } from 'pages/LeaderboardPage/leaderboardSlice';
import { Themes } from 'components/themeSwitcher/themesSlice';
import type { Logout } from '../logoutSlice';
import type { User } from '../userSlice';
import type { Registration } from '../../SignUpPage/registrationSlice';
import type { Authentication } from '../../LoginPage/loginSlice';
import ProfilePage from '../ProfilePage';
import { Topic } from '../../ForumPage/topicSlice';
import { Message } from '../../ForumPage/messageSlice';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

const mockSetUserData = jest.fn();
const mockSetPassword = jest.fn();

jest.mock('../../../services/Profile', () => ({
  setPassword: (...args: any[]) => mockSetPassword(...args),
  setUserData: (...args: any[]) => mockSetUserData(...args)
}));

const history = createMemoryHistory({ initialEntries: ['/profile'] });
const context: StaticRouterContext = {};

const user: UserResult = {
  avatar: '11',
  display_name: 'admin',
  email: 'jd@yandex.ru',
  first_name: 'john',
  id: null,
  login: 'admin',
  phone: '89007006050',
  second_name: 'doe',
  status: null
};

const preloadedState = {
  authentication: {
    isAuthenticated: true
  } as Authentication,
  registration: {} as Registration,
  logout: {} as Logout,
  user: {
    user,
    statusProfile: 'success',
    statusPassword: 'success',
    messagePassword: '',
    messageProfile: ''
  } as User,
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

describe('ProfilePage', () => {
  describe('?????????????????? ???????????? ?? ??????????????', () => {
    let submitSetUserButton: HTMLElement;

    beforeEach(async () => {
      mockHistoryPush.mockReset();
      mockSetUserData.mockReset();

      render(
        <StaticRouter context={context} location={history.location}>
          <ProfilePage />
        </StaticRouter>,
        { preloadedState, history }
      );

      await act(async () => {
        const loginInput = screen.getByLabelText(/login/i);
        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const emailInput = screen.getByLabelText(/email/i);
        const phoneInput = screen.getByLabelText(/phone/i);

        fireEvent.change(loginInput, { target: { value: 'admin' } });
        await screen.findByDisplayValue(/admin/i);

        fireEvent.change(firstNameInput, { target: { value: 'john' } });
        await screen.findByDisplayValue(/john/i);

        fireEvent.change(lastNameInput, { target: { value: 'doe' } });
        await screen.findByDisplayValue(/doe/i);

        fireEvent.change(emailInput, { target: { value: 'jd@yandex.ru' } });
        await screen.findByDisplayValue(/jd@yandex.ru/i);

        fireEvent.change(phoneInput, { target: { value: '89007006050' } });
        await screen.findByDisplayValue(/89007006050/i);

        submitSetUserButton = screen.getByRole('button', { name: /save profile/i });
      });
    });

    it('???????? ???????????? ?????????????? ??????????', async () => {
      mockSetUserData.mockReturnValue(Promise.resolve(user));

      fireEvent.click(submitSetUserButton);

      await waitFor(() => expect(mockSetUserData).toHaveBeenCalledWith(user));

      return waitFor(() => expect(screen.getByText(/?????????????? ????????????????/i))
        .toBeInTheDocument());
    });

    it('???????? ???????????? ?????????????????? ???????????? ????????????????', async () => {
      mockSetUserData.mockReturnValue(Promise.reject());

      fireEvent.click(submitSetUserButton);

      await waitFor(() => expect(mockSetUserData)
        .toHaveBeenCalledWith(user));

      return waitFor(() => expect(screen.getByText(/Data is incorrect/i))
        .toBeInTheDocument());
    });
  });

  describe('?????????????????? ????????????', () => {
    let submitSavePasswordButton: HTMLElement;

    beforeEach(async () => {
      mockSetPassword.mockReset();

      render(
        <StaticRouter context={context} location={history.location}>
          <ProfilePage />
        </StaticRouter>,
        { preloadedState, history }
      );

      await act(async () => {
        const oldPasswordInput = screen.getByLabelText(/old password/i);
        const newPasswordInput = screen.getByLabelText(/new password/i);

        fireEvent.change(oldPasswordInput, { target: { value: '111' } });
        await screen.findByDisplayValue(/111/i);

        fireEvent.change(newPasswordInput, { target: { value: '222' } });
        await screen.findByDisplayValue(/222/i);

        submitSavePasswordButton = screen.getByRole('button', { name: /save password/i });
      });
    });

    it('???????? ???????????? ?????????????? ??????????', async () => {
      mockSetPassword.mockReturnValue(Promise.resolve());

      fireEvent.click(submitSavePasswordButton);

      await waitFor(() => expect(mockSetPassword)
        .toHaveBeenCalledWith({
          oldPassword: '111',
          newPassword: '222'
        }));

      return waitFor(() => expect(screen.getByText(/???????????? ????????????????/i))
        .toBeInTheDocument());
    });
    it('???????? ???????????? ?????????????? ??????????????', async () => {
      mockSetPassword.mockReturnValue(Promise.reject());

      fireEvent.click(submitSavePasswordButton);

      await waitFor(() => expect(mockSetPassword)
        .toHaveBeenCalledWith({
          oldPassword: '111',
          newPassword: '222'
        }));

      return waitFor(() => expect(screen.getByText(/Data is incorrect/i))
        .toBeInTheDocument());
    });
  });
});
