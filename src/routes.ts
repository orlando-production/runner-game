import { AsyncThunkAction } from '@reduxjs/toolkit';
import { RouteType } from 'components/privateRoute/PrivateRoute';
import ForumPage from 'pages/ForumPage';
import ForumTopicPage from 'pages/ForumTopicPage';
import GamePage from 'pages/GamePage';
import LeaderboardPage from 'pages/LeaderboardPage';
import LoginPage from 'pages/LoginPage';
import MainPage from 'pages/MainPage';
import NotFoundPage from 'pages/NotFoundPage';
import ProfilePage from 'pages/ProfilePage';
import SignUpPage from 'pages/SignUpPage';
import { Dispatch } from 'react';
import { match } from 'react-router';
import { fetchUserInfo } from 'thunks/authentication';
import { fetchLeaderboardList } from 'thunks/leaderboard';

export type ReduxAction<T = any, P = any> = {
  type: T;
  payload?: P;
};

export type RouterFetchDataArgs = {
  dispatch: Dispatch<AsyncThunkAction<void, void, {}>>;
  match: match<{ slug: string }>;
  cookies: string;
};

export type RouterFetchData = ({ dispatch }: RouterFetchDataArgs) => void;

export type RoutesType = {
  path: string;
  component?: React.FunctionComponent<any>;
  exact?: boolean;
  type?: RouteType;
  fetchData?: RouterFetchData;
}[];

const routes: RoutesType = [
  {
    path: '/',
    component: MainPage,
    exact: true,
    type: 'private',
    fetchData({ dispatch }: RouterFetchDataArgs) {
      return dispatch(fetchUserInfo());
    }
  },
  {
    path: '/sign-in',
    component: LoginPage,
    exact: true,
    type: 'public',
    fetchData({ dispatch }: RouterFetchDataArgs) {
      return dispatch(fetchUserInfo());
    }
  },
  {
    path: '/sign-up',
    component: SignUpPage,
    exact: true,
    type: 'public',
    fetchData({ dispatch }: RouterFetchDataArgs) {
      return dispatch(fetchUserInfo());
    }
  },
  {
    path: '/game',
    component: GamePage,
    exact: true,
    type: 'private',
    fetchData({ dispatch }: RouterFetchDataArgs) {
      return dispatch(fetchUserInfo());
    }
  },
  {
    path: '/leaderboard',
    component: LeaderboardPage,
    exact: true,
    type: 'private',
    fetchData({ dispatch }: RouterFetchDataArgs) {
      return [dispatch(fetchUserInfo()), dispatch(fetchLeaderboardList())];
    }
  },
  {
    path: '/forum',
    component: ForumPage,
    exact: true,
    type: 'private',
    fetchData({ dispatch }: RouterFetchDataArgs) {
      return dispatch(fetchUserInfo());
    }
  },
  {
    path: '/forum/:topicId',
    component: ForumTopicPage,
    exact: false,
    type: 'private',
    fetchData({ dispatch }: RouterFetchDataArgs) {
      return dispatch(fetchUserInfo());
    }
  },
  {
    path: '/profile',
    component: ProfilePage,
    exact: true,
    type: 'private',
    fetchData({ dispatch }: RouterFetchDataArgs) {
      return dispatch(fetchUserInfo());
    }
  },
  {
    path: '/404',
    component: NotFoundPage,
    exact: false,
    type: 'error'
  }
  // {
  //   path: '*',
  //   component: NotFoundPage,
  //   exact: false,
  //   type: 'error'
  // }
];

export default routes;
