import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor
} from 'utils/testing-library';

import ProfilePage from '../ProfilePage';

const mockHistoryPush = jest.fn();
const mockSetUserData = jest.fn();
const mockSetPassword = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

jest.mock('../../../services/Profile', () => ({
  setUserData: (...args: any[]) => mockSetUserData(...args)
}));

jest.mock('../../../services/Profile', () => ({
  setPassword: (...args: any[]) => mockSetPassword(...args)
}));

describe('ProfilePage', () => {
  beforeEach(async () => {
    mockHistoryPush.mockReset();
    mockSetUserData.mockReset();
    mockSetPassword.mockReset();
    render(<ProfilePage />);
  });

  describe('добавляем данные в профиль', () => {
    let submitSetUserButton: HTMLElement;

    beforeEach(async () => {
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

    it('если данные введены верно', async () => {
      mockSetUserData.mockReturnValue(Promise.resolve({
        login: 'admin',
        first_name: 'john',
        display_name: 'admin',
        second_name: 'doe',
        email: 'jd@yandex.ru',
        phone: '89007006050',
        avatar: '',
        id: null,
        status: null
      }));

      fireEvent.click(submitSetUserButton);

      await waitFor(() => expect(mockSetUserData)
        .toHaveBeenCalledWith({
          login: 'admin',
          first_name: 'john',
          display_name: 'admin',
          second_name: 'doe',
          email: 'jd@yandex.ru',
          phone: '89007006050',
          avatar: '',
          id: null,
          status: null
        }));

      return waitFor(() => expect(screen.getByText(/профиль сохранен/i))
        .toBeInTheDocument());
    });

    it('если формат введенных данных неверный', async () => {
      mockSetUserData.mockReturnValue(Promise.reject());

      fireEvent.click(submitSetUserButton);

      await waitFor(() => expect(mockSetUserData)
        .toHaveBeenCalledWith({
          login: 'admin',
          first_name: 'john',
          display_name: 'admin',
          second_name: 'doe',
          email: 'jd@yandex.ru',
          phone: '89007006050',
          avatar: '',
          id: null,
          status: null
        }));

      return waitFor(() => expect(screen.getByText(/Data is incorrect/i))
        .toBeInTheDocument());
    });
  });

  describe('сохраняем пароль', () => {
    let submitSavePasswordButton: HTMLElement;

    beforeEach(async () => {
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

    it('если данные введены верно', async () => {
      mockSetPassword.mockReturnValue(Promise.resolve());

      fireEvent.click(submitSavePasswordButton);

      await waitFor(() => expect(mockSetPassword)
        .toHaveBeenCalledWith({
          oldPassword: '111',
          newPassword: '222'
        }));

      return waitFor(() => expect(screen.getByText(/пароль сохранен/i))
        .toBeInTheDocument());
    });
    it('если данные введены неверно', async () => {
      mockSetPassword.mockReturnValue(Promise.resolve());

      fireEvent.click(submitSavePasswordButton);

      await waitFor(() => expect(mockSetPassword)
        .toHaveBeenCalledWith({
          oldPassword: '111',
          newPassword: '222'
        }));

      return waitFor(() => expect(screen.getByText(/пароль сохранен/i))
        .toBeInTheDocument());
    });
  });
});
