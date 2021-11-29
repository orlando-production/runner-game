import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor
} from 'utils/testing-library';

import LoginPage from '../LoginPage';

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

describe('LoginPage', () => {
  let submitButton: HTMLElement;

  beforeEach(async () => {
    mockHistoryPush.mockReset();
    mockAuthenticateUser.mockReset();

    render(<LoginPage />);

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

  describe('редиректит на страницу с игрой', () => {
    it('если логин и пароль введены верно', async () => {
      mockAuthenticateUser.mockReturnValue(Promise.resolve());

      fireEvent.click(submitButton);

      await waitFor(() => expect(mockAuthenticateUser).toHaveBeenCalledWith({
        login: 'admin',
        password: '123456'
      }));

      return waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/game'));
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
