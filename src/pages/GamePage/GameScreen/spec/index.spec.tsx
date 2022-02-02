import React from 'react';
import { render, screen } from 'utils/testing-library';
import userEvent from '@testing-library/user-event';
import { RouterState } from 'connected-react-router';
import { StaticRouter, StaticRouterContext } from 'react-router';
import { createMemoryHistory } from 'history';
import { LeaderBoard } from 'pages/LeaderboardPage/leaderboardSlice';
import { Themes } from 'components/themeSwitcher/themesSlice';
import GameScreen from '../GameScreen';
import type { Logout } from '../../../ProfilePage/logoutSlice';
import type { User } from '../../../ProfilePage/userSlice';
import type { Registration } from '../../../SignUpPage/registrationSlice';
import type { Authentication } from '../../../LoginPage/loginSlice';
import { Topic } from '../../../ForumPage/topicSlice';
import { Message } from '../../../ForumPage/messageSlice';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

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
  router: {} as RouterState,
  theme: {} as Themes,
  topics: {} as Topic,
  messages: {} as Message
};

describe('Процесс игры', () => {
  beforeEach(() => {
    const setState = jest.fn();

    render(
      <StaticRouter context={context} location={history.location}>
        <GameScreen
          setGameState={setState}
          setFooterVisible={setState}
          points={0}
          setPoints={setState}
        />
      </StaticRouter>,
      { preloadedState, history }
    );
  });

  afterEach(() => {
    mockHistoryPush.mockReset();
  });

  it('На экране есть игровое полотно(canvas)', () => {
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('На экране есть таймер', () => {
    const timer = screen.getByLabelText('таймер');
    expect(timer).toBeInTheDocument();
  });

  it('На экране отображается количество очков игрока', () => {
    const points = screen.getByLabelText('подарки');
    expect(points).toBeInTheDocument();
  });

  it('На экране есть кнопка паузы', () => {
    const pauseButton = screen.getByAltText('pause');
    expect(pauseButton).toBeInTheDocument();
  });

  it('При клике на паузу появляется надпись "ПАУЗА"', () => {
    const pauseButton = screen.getByAltText('pause');
    userEvent.click(pauseButton);
    const pauseCapture = screen.getByText(/ПАУЗА/i);
    expect(pauseCapture).toBeInTheDocument();
  });
});
