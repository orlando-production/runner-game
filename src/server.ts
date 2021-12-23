/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import compression from 'compression';
import 'babel-polyfill';
import { authenticateUser, getUserInfo, SignInParams } from 'services/Auth';
import {
  addLeaderboardResult,
  LeaderboardAddResultParams
} from 'services/Leaderboard';
import { logoutUser } from 'services/Logout';
import {
  getUser,
  setUserData,
  setAvatar,
  setPassword,
  PasswordParams,
  ProfileParams
} from 'services/Profile';
import { ENDPOINTS } from 'api';
import serverRenderMiddleware from './server-render-middleware';

const busboy = require('connect-busboy');
const FormData = require('form-data');

const app = express();
const api = express.Router();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(busboy({ immediate: true }));

let cookies = '';

const parseCookies = (cookie: string) => cookie
  .split(/;\s+/)
  .filter(
    (token) => token.startsWith('authCookie') || token.startsWith('uuid')
  )
// возвращает 2 куки 'uuid', первую вырезаем
  .slice(1)
  .join('; ');

app.post(`/${ENDPOINTS.SIGNIN}`, (req, res) => {
  authenticateUser(req.body, true)
    .then(({ headers }) => {
      cookies = parseCookies(headers['set-cookie'].join('; '));
      return res.sendStatus(200);
    });
});

app.get(`/${ENDPOINTS.USER}`, (req, res) => {
  const config = {
    headers: {
      Cookie: cookies
    }
  };

  console.log('auth.user');
  getUserInfo(config, true)
    .then(({ data }) => {
      console.log('success');
      res.send(data);
    })
    .catch(({ response }) => console.error(response));
});

// app.post(`/${ENDPOINTS.LEADERBOARD}`, (req, res) => {
//   const leaderboard = {
//     data: {},
//     ratingFieldName: 'Oleg',
//     teamName: 'OlegTeam'
//   } as LeaderboardAddResultParams;
//
//   addLeaderboardResult(leaderboard, true)
//     .then(() => res.sendStatus(200))
//     .catch(({ response }) => console.error(response.data));
// });
//
// app.post(`/${ENDPOINTS.LOGOUT}`, (req, res) => {
//   logoutUser(true)
//     .then(() => res.sendStatus(200))
//     .catch(({ response }) => console.error(response));
// });

// app.put(`/${ENDPOINTS.PROFILE}`, (req, res) => {
//   const profile = {
//     login: 'login',
//     first_name: 'first_name',
//     second_name: 'second_name',
//     email: 'email@gmail.com',
//     phone: '88003555335',
//     display_name: 'display_name',
//     status: null,
//     avatar: null
//   } as ProfileParams;
//
//   const config = {
//     headers: {
//       Cookie: cookies
//     },
//     withCredentials: true
//   };
//
//   setUserData(profile, config, true)
//     .then(({ data }) => res.send(data))
//     .catch(({ response }) => console.error(response));
// });
//
// app.put(`/${ENDPOINTS.PASSWORD}`, (req, res) => {
//   const passwords = {
//     newPassword: '111',
//     oldPassword: '1111'
//   } as PasswordParams;
//
//   const config = {
//     headers: {
//       Cookie: cookies
//     }
//   };
//
//   setPassword(passwords, config, true)
//     .then(({ data }) => res.send(data))
//     .catch(({ response }) => console.error(response));
// });
//
// // eslint-disable-next-line consistent-return
// app.put(`/${ENDPOINTS.AVATAR}`, (req, res) => {
//   if (!req.busboy) {
//     return res.sendStatus(500);
//   }
//
//   req.busboy.on('file', (fieldName: string, file: any, filename: string) => {
//     const formData = new FormData();
//
//     formData.append('avatar', file, { filename });
//
//     const config = {
//       headers: {
//         Cookie: cookies,
//         ...formData.getHeaders()
//       }
//     };
//
//     setAvatar(formData, config, true)
//       .then(({ data }: {}) => res.send(data))
//       .catch(({ response }) => console.error(response));
//   });
// });

app
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../static')))
  .use('/api', api);

app.get('/*', serverRenderMiddleware);

app.listen(port, () => console.log(`Listening on port ${port}`));
export { app };
