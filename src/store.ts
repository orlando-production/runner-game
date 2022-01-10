import { configureStore } from '@reduxjs/toolkit';
import { RouterState, connectRouter } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory, History } from 'history';
import { combineReducers } from 'redux';
import { Themes, themesInitialState, themesReducer } from './components/themeSwitcher/themesSlice';
import {
  LeaderBoard,
  leaderBoardInitialState,
  leaderboardReducer
} from './pages/LeaderboardPage/leaderboardSlice';
import {
  Registration,
  registrationInitialState,
  registrationReducer
} from './pages/SignUpPage/registrationSlice';
import {
  Authentication,
  authenticationReducer,
  authInitialState
} from './pages/LoginPage/loginSlice';
import {
  Logout,
  logoutInitialState,
  logoutReducer
} from './pages/ProfilePage/logoutSlice';
import {
  User,
  userInitialState,
  userReducer
} from './pages/ProfilePage/userSlice';

export const rootReducer = (history: History) => combineReducers({
  authentication: authenticationReducer,
  registration: registrationReducer,
  logout: logoutReducer,
  user: userReducer,
  statusProfile: userReducer,
  statusPassword: userReducer,
  messagePassword: userReducer,
  messageProfile: userReducer,
  leaderboard: leaderboardReducer,
  theme: themesReducer,
  router: connectRouter(history)
});

export type RootState = {
  authentication: Authentication;
  registration: Registration;
  logout: Logout;
  user: User;
  statusProfile: User;
  statusPassword: User;
  messagePassword: User;
  messageProfile: User;
  router: RouterState;
  leaderboard: LeaderBoard;
  theme: Themes;
};

export const isServer = !(
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
);

export default function configureAppStore(
  preloadedState: RootState,
  url = '/'
) {
  const history = isServer
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  const store = configureStore({
    reducer: rootReducer(history),
    preloadedState
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    // попробовала вынести отдельно, но вся сборка глобально сломалась, вернусь к этому чуть позже
    // module.hot.accept('./slices', () => store.replaceReducer(rootReducer(history)));
  }

  return { store, history };
}

export const getInitialState = (pathname: string = '/'): RootState => ({
  authentication: authInitialState,
  registration: registrationInitialState,
  logout: logoutInitialState,
  user: userInitialState,
  statusProfile: userInitialState,
  statusPassword: userInitialState,
  messagePassword: userInitialState,
  messageProfile: userInitialState,
  leaderboard: leaderBoardInitialState,
  theme: themesInitialState,
  router: {
    location: {
      pathname,
      search: '',
      hash: '',
      key: ''
    },
    action: 'POP'
  } as RouterState
});
