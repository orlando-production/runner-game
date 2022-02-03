import React from 'react';
import { render, screen } from 'utils/testing-library';
import { RouterState } from 'connected-react-router';
import { StaticRouter, StaticRouterContext } from 'react-router';
// @ts-ignore
import { createMemoryHistory } from 'history';
import { LeaderBoard } from 'pages/LeaderboardPage/leaderboardSlice';
import { Themes } from 'components/themeSwitcher/themesSlice';
import FinishScreen from '../FinishScreen';
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

describe('Финиш игры', () => {
  const points = 5;
  beforeEach(() => {
    const setState = jest.fn();

    render(
      <StaticRouter context={context} location={history.location}>
        <FinishScreen setGameState={setState} points={points} />
      </StaticRouter>,
      { preloadedState, history }
    );
  });

  afterEach(() => {
    mockHistoryPush.mockReset();
  });

  it('На экране есть кнопка начала новой игры', () => {
    const startButton = screen.getByRole('button', { name: /Играть еще раз/i });
    expect(startButton).toBeInTheDocument();
  });

  it('На экране есть кнопка перехода в рейтинг', () => {
    const ratingButton = screen.getByRole('button', { name: /Рейтинг/i });
    expect(ratingButton).toBeInTheDocument();
  });

  it('На экране отображаются результаты оконченной игры с собранным количеством подарков', () => {
    const finalText = screen.getByText(
      new RegExp(`Ты помог дедушке собрать ${points} подарков`, 'i')
    );
    expect(finalText).toBeInTheDocument();
  });
});
