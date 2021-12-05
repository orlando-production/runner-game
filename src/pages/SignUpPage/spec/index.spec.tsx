import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor
} from 'utils/testing-library';

import SignUpPage from '../SignUpPage';

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

describe('SignUpPage', () => {
  let submitButton: HTMLElement;

  beforeEach(async () => {
    mockHistoryPush.mockReset();
    mockRegisterUser.mockReset();

    render(<SignUpPage />);

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

  describe('редирект на страницу с игрой', () => {
    it('если данные введены верно', async () => {
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

      return waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/game'));
    });
  });

  describe('отображает сообщение об ошибке', () => {
    it('если формат введенных данных неверный', async () => {
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
