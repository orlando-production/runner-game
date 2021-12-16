import { configureStore } from '@reduxjs/toolkit';
import { RouterState } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import {
  Registration,
  registrationReducer,
} from './pages/SignUpPage/registrationSlice';
import {
  Authentication,
  authenticationReducer,
} from './pages/LoginPage/loginSlice';
import { Logout, logoutReducer } from './pages/ProfilePage/logoutSlice';
import { User, userReducer } from './pages/ProfilePage/userSlice';

export const rootReducer = (history: History) =>
  combineReducers({
    authentication: authenticationReducer,
    registration: registrationReducer,
    logout: logoutReducer,
    user: userReducer,
    statusProfile: userReducer,
    statusPassword: userReducer,
    messagePassword: userReducer,
    messageProfile: userReducer,
    router: connectRouter(history),
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
};

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
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
    preloadedState,
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    // по не придумала что надо заменять на rootReducer, у нас нет отдельной папки с редьюсерами
    // module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return { store, history };
}

const userInitialState: User = {
  user: {
    avatar: '',
    display_name: 'admin',
    email: 'jd@yandex.ru',
    first_name: 'john',
    id: null,
    login: 'admin',
    phone: '89007006050',
    second_name: 'doe',
    status: null,
  },
  error: null,
  statusProfile: 'invisible',
  statusPassword: 'invisible',
  messagePassword: '',
};

// сейчас isAuthenticated: true всегда, но надо как-то получать эту инфу с сервера наверно
export const getInitialState = (pathname: string = '/'): RootState => ({
  authentication: {
    isAuthenticated: true,
    authStatus: 'idle',
  },
  registration: {
    registrationStatus: 'idle',
  },
  logout: {
    logoutStatus: 'idle',
  },
  user: userInitialState,
  statusProfile: userInitialState,
  statusPassword: userInitialState,
  messagePassword: userInitialState,
  messageProfile: userInitialState,
  router: {
    location: { pathname, search: '', hash: '', key: '' },
    action: 'POP',
  } as RouterState,
});
