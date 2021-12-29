/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import compression from 'compression';
import 'babel-polyfill';
import {
  authByCode,
  authenticateUser,
  getServiceId,
  getUserInfo
} from 'services/Auth';
import {
  addLeaderboardResult,
  getLeaderboardResults
} from 'services/Leaderboard';
import { logoutUser } from 'services/Logout';
import { setUserData, setAvatar, setPassword } from 'services/Profile';
import { ENDPOINTS } from 'api';
import { registerUser } from 'services/Registration';
import { getAvatars } from 'services/Avatars';
import serverRenderMiddleware from './server-render-middleware';

const busboy = require('connect-busboy');
const FormData = require('form-data');

const app = express();
const api = express.Router();

let cookies = '';

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(busboy({ immediate: true }));

const parseCookies = (cookie: string) => cookie
  .split(/;\s+/)
  .filter(
    (token) => token.startsWith('authCookie') || token.startsWith('uuid')
  );

const setCookies = (
  newCookies: string,
  res: Response<any, Record<string, any>, number>
) => {
  newCookies.split(';').forEach((cookie) => {
    res.cookie(
      `${cookie.split('=')[0]}`,
      `${cookie.split('=')[1]}`,
      {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        secure: true
      }
    );
  });
};

app.post(`/${ENDPOINTS.SIGNIN}`, (req, res) => {
  authenticateUser(req.body, true)
    .then(({ headers }) => {
      cookies = parseCookies(headers['set-cookie'].join('; ')).slice(1).join('; ');
      setCookies(cookies, res);
      return res.sendStatus(200);
    })
    .catch(({ response }) => {
      res.status(response.status || 500).json(response.data);
    });
});

app.post(`/${ENDPOINTS.SIGNUP}`, (req, res) => {
  registerUser(req.body, true)
    .then(({ headers }) => {
      cookies = parseCookies(headers['set-cookie'].join('; ')).join('; ');
      setCookies(cookies, res);
      return res.sendStatus(200);
    })
    .catch(({ response }) => {
      res.status(response.status || 500).json(response.data);
    });
});

app.post(`/${ENDPOINTS.LEADERBOARD}`, (req, res) => {
  addLeaderboardResult(req.body, true)
    .then(() => res.sendStatus(200))
    .catch(({ response }) => console.error(response.data));
});

app.post(`/${ENDPOINTS.LEADERBOARD_RESULTS}`, (req, res) => {
  const config = {
    headers: {
      Cookie: cookies
    }
  };
  getLeaderboardResults(req.body, config, true)
    .then(({ data }) => {
      res.send(data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.post(`/${ENDPOINTS.LOGOUT}`, (req, res) => {
  const config = {
    headers: {
      Cookie: cookies
    }
  };

  logoutUser(config, true)
    .then(() => res.sendStatus(200))
    .catch(() => {
      res.sendStatus(500);
    });
});

app.post(`/${ENDPOINTS.AUTH_BY_CODE}`, (req, res) => {
  authByCode(req.body.code, req.body.redirect_uri, true)
    .then(({ headers }) => {
      cookies = parseCookies(headers['set-cookie'].join('; '));
      setCookies(cookies, res);
      return res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.get(`/${ENDPOINTS.OAUTH_SERVICE}`, (req, res) => {
  getServiceId(req.query.redirect_uri, true)
    .then(({ service_id }) => {
      res.send(service_id);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.get(`/${ENDPOINTS.USER}`, async (req, res) => {
  const config = {
    headers: {
      Cookie: cookies
    }
  };

  getUserInfo(config, true)
    .then((result) => {
      res.send(result);
    })
    .catch(({ response }) => {
      res.status(response.status || 500).json(response.data);
    });
});

app.put(`/${ENDPOINTS.PROFILE}`, (req, res) => {
  const config = {
    headers: {
      Cookie: cookies
    },
    withCredentials: true
  };

  setUserData(req.body, config, true)
    .then(({ data }) => res.send(data))
    .catch(({ response }) => {
      res.status(response.status || 500).json(response.data);
    });
});

app.put(`/${ENDPOINTS.PASSWORD}`, (req, res) => {
  const config = {
    headers: {
      Cookie: cookies
    }
  };

  setPassword(req.body, config, true)
    .then(({ data }) => res.send(data))
    .catch(({ response }) => {
      res.status(response.status || 500).json(response.data);
    });
});

// eslint-disable-next-line consistent-return
app.put(`/${ENDPOINTS.AVATAR}`, (req, res) => {
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
      .then(({ data }) => {
        res.send(data);
      })
      .catch(({ response }) => {
        res.status(response.status || 500).json(response.data);
      });
  });
});

app.get(`/${ENDPOINTS.AVATARS}`, (req: {[index: string]:any}, res) => {
  const config = {
    headers: {
      Cookie: cookies
    },
    responseType: 'stream'
  };
  return getAvatars(`${req.params[0]}`, config, true)
    .then((result) => result.pipe(res));
});

app
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../static')))
  .use('/api', api);

app.get('/*', serverRenderMiddleware);

app.listen(port, () => console.log(`Listening on port ${port}`));
export { app };
