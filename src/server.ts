/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import compression from 'compression';
import 'babel-polyfill';
import { authenticateUser, getUserInfo, SignInParams } from 'services/Auth';
import { addLeaderboardResult, LeaderboardAddResultParams } from 'services/Leaderboard';
import { logoutUser } from 'services/Logout';
import {
  getUser, setUserData, setAvatar, setPassword, PasswordParams, ProfileParams
} from 'services/Profile';
import serverRenderMiddleware from './server-render-middleware';

const busboy = require('connect-busboy');
const FormData = require('form-data');

const app = express();
const api = express.Router();

const port = process.env.PORT || 3000;

api.use(express.json());
api.use(busboy({ immediate: true }));

let cookies = '';

const parseCookies = (cookie: string) => cookie
  .split(/;\s+/)
  .filter((token) => token.startsWith('authCookie') || token.startsWith('uuid'))
  // возвращает 2 куки 'uuid', первую вырезаем
  .slice(1)
  .join('; ');

api.post('/signin', (req, res) => {
  const user = {
    login: 'login',
    password: 'pass'
  } as SignInParams;

  authenticateUser(user, true)
    .then(({ headers }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cookies = parseCookies(headers['set-cookie'].join('; '));
      return res.sendStatus(200);
    })
    .catch(({ response }) => console.error(response.data));
});

api.post('/leaderboard', (req, res) => {
  const leaderboard = {
    data: {},
    ratingFieldName: 'Oleg',
    teamName: 'OlegTeam'
  } as LeaderboardAddResultParams;

  addLeaderboardResult(leaderboard, true)
    .then(() => res.sendStatus(200))
    .catch(({ response }) => console.error(response.data));
});

api.post('/logout', (req, res) => {
  logoutUser(true)
    .then(() => res.sendStatus(200))
    .catch(({ response }) => console.error(response));
});

api.post('/user', (req, res) => {
  getUser(true)
    .then(({ data }) => res.send(data))
    .catch(({ response }) => console.error(response));
});

api.post('/profile', (req, res) => {
  const profile = {
    login: 'login',
    first_name: 'first_name',
    second_name: 'second_name',
    email: 'email@gmail.com',
    phone: '88003555335',
    display_name: 'display_name',
    status: null,
    avatar: null
  } as ProfileParams;

  const config = {
    headers: {
      Cookie: cookies
    },
    withCredentials: true
  };

  setUserData(profile, config, true)
    .then(({ data }) => res.send(data))
    .catch(({ response }) => console.error(response));
});

api.post('/password', (req, res) => {
  const passwords = {
    newPassword: '111',
    oldPassword: '1111'
  } as PasswordParams;

  const config = {
    headers: {
      Cookie: cookies
    }
  };

  setPassword(passwords, config, true)
    .then(({ data }) => res.send(data))
    .catch(({ response }) => console.error(response));
});

// eslint-disable-next-line consistent-return
api.post('/avatar', (req, res) => {
  if (!req.busboy) {
    return res.sendStatus(500);
  }

  req.busboy.on('file', (fieldName: string, file: any, filename: string) => {
    const formData = new FormData();

    formData.append('avatar', file, { filename });

    const config = {
      headers: {
        Cookie: cookies,
        ...formData.getHeaders()
      }
    };

    setAvatar(formData, config, true)
      .then(({ data }: {}) => res.send(data))
      .catch(({ response }) => console.error(response));
  });
});

api.get('/auth/user', (req, res) => {
  getUserInfo(true)
    .then(({ data }) => {
      res.send(data);
    })
    .catch(({ response }) => console.error(response));
});

app.use(compression())
  .use(express.static(path.resolve(__dirname, '../static')))
  .use('/api', api);
app.get('/*', serverRenderMiddleware);

app.listen(port, () => console.log(`Listening on port ${port}`));
export { app };
