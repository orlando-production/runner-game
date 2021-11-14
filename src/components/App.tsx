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

// TODO
// Add Main Page + Routing

export function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route path="/sign-in">
            <LoginPage />
          </Route>
          <Route path="/game">
            <GamePage />
          </Route>
          <Route path="/sign-up">
            <SignUpPage />
          </Route>
          <Route path="/leaderboard">
            <LeaderboardPage />
          </Route>
          <Route path="/forum" exact>
            <ForumPage />
          </Route>
          <Route path="/forum/:topicId">
            <ForumTopicPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/404">
            <NotFoundPage />
          </Route>
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
}
