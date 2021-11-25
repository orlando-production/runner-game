import React from 'react';
import './reset.css';
import './constants.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ForumPage from '../pages/ForumPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import ForumTopicPage from '../pages/ForumTopicPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProfilePage from '../pages/ProfilePage';
import GamePage from '../pages/GamePage';
import MainPage from '../pages/MainPage';
import PrivateRoute from './privateRoute';

export function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute path="/" component={MainPage} exact type="private" />
          <PrivateRoute path="/sign-in" component={LoginPage} type="public" />
          <PrivateRoute path="/sign-up" component={SignUpPage} type="public" />
          <PrivateRoute path="/game" component={GamePage} type="private" />
          <PrivateRoute path="/leaderboard" component={LeaderboardPage} type="private" />
          <PrivateRoute path="/forum" component={ForumPage} exact type="private" />
          <PrivateRoute path="/forum/:topicId" component={ForumTopicPage} type="private" />
          <PrivateRoute path="/profile" component={ProfilePage} type="private" />
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
}
