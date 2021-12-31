import React from 'react';
import { render, screen } from 'utils/testing-library';
import userEvent from '@testing-library/user-event';
import { RouterState } from 'connected-react-router';
import { StaticRouter, StaticRouterContext } from 'react-router';
import { createMemoryHistory } from 'history';
import { LeaderBoard } from 'pages/LeaderboardPage/leaderboardSlice';
import StartScreen from '../StartScreen';
import type { Logout } from '../../../ProfilePage/logoutSlice';
import type { User } from '../../../ProfilePage/userSlice';
import type { Registration } from '../../../SignUpPage/registrationSlice';
import type { Authentication } from '../../../LoginPage/loginSlice';

const history = createMemoryHistory({ initialEntries: ['/game'] });
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
  router: {} as RouterState
};

describe('Начало игры', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(() => [0, setState]);
  beforeEach(() => {
    render(
      <StaticRouter context={context} location={history.location}>
        <StartScreen setGameState={setState} />
      </StaticRouter>,
      { preloadedState, history }
    );
  });
  it('На экране есть кнопка начала игры', () => {
    const startButton = screen.getByRole('button', { name: /Старт!/i });
    expect(startButton).toBeInTheDocument();
  });

  it('При клике на кнопку старта переходит на следующий экран', () => {
    const startButton = screen.getByRole('button', { name: /Старт!/i });
    userEvent.click(startButton);
    expect(setState).toHaveBeenCalledWith(1);
  });
});
