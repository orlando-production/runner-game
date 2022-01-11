/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */
import path from 'path';
import express, { Request, Response } from 'express';
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
import { Stream } from 'form-data';
import { startApp } from 'db';
import serverRenderMiddleware from './server-render-middleware';

const busboy = require('connect-busboy');
const FormData = require('form-data');

const app = express();
const api = express.Router();

let cookies = '';

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(busboy({ immediate: true }));

const parseCookies = (cookie: string) => cookie
  .split(/;\s+/)
  .filter(
    (token) => token.startsWith('authCookie') || token.startsWith('uuid')
  );

const setCookies = (newCookies: string, res: Response) => {
  newCookies.split(';').forEach((cookie) => {
    res.cookie(`${cookie.split('=')[0]}`, `${cookie.split('=')[1]}`, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      secure: true
    });
  });
};

app.post(`/${ENDPOINTS.SIGNIN}`, (req: Request, res: Response) => {
  authenticateUser(req.body, true)
    .then(({ headers }) => {
      cookies = parseCookies(headers['set-cookie'].join('; '))
        .slice(1)
        .join('; ');
      setCookies(cookies, res);
      return res.sendStatus(200);
    })
    .catch(({ response }) => {
      res.status(response.status || 500).json(response.data);
    });
});

app.post(`/${ENDPOINTS.SIGNUP}`, (req: Request, res: Response) => {
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

app.post(`/${ENDPOINTS.LEADERBOARD}`, (req: Request, res: Response) => {
  addLeaderboardResult(req.body, true)
    .then(() => res.sendStatus(200))
    .catch(({ response }) => console.error(response.data));
});

app.post(`/${ENDPOINTS.LEADERBOARD_RESULTS}`, (req: Request, res: Response) => {
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

app.post(`/${ENDPOINTS.LOGOUT}`, (_req: Request, res: Response) => {
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

app.post(`/${ENDPOINTS.AUTH_BY_CODE}`, (req: Request, res: Response) => {
  authByCode(req.body.code, req.body.redirect_uri, true)
    .then(({ headers }) => {
      cookies = parseCookies(headers['set-cookie'].join('; '))
        .slice(1)
        .join('; ');
      setCookies(cookies, res);
      return res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.get(`/${ENDPOINTS.OAUTH_SERVICE}`, (req: Request, res: Response) => {
  getServiceId((req as any).query.redirect_uri, true)
    .then(({ service_id }: any) => {
      res.send(service_id);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.get(`/${ENDPOINTS.USER}`, async (_req: Request, res: Response) => {
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

app.put(`/${ENDPOINTS.PROFILE}`, (req: Request, res: Response) => {
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

app.put(`/${ENDPOINTS.PASSWORD}`, (req: Request, res: Response) => {
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
app.put(`/${ENDPOINTS.AVATAR}`, (req: Request, res: Response) => {
  if (!(req as any).busboy) {
    return res.sendStatus(500);
  }
  (req as any).busboy.on(
    'file',
    (_fieldName: string, file: any, filename: string) => {
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
    }
  );
});

app.get(`/${ENDPOINTS.AVATARS}`, (req: Request, res: Response) => {
  const config = {
    headers: {
      Cookie: cookies
    },
    responseType: 'stream'
  };

  return getAvatars(`${req.params[0]}`, config, true).then((result: Stream) => result.pipe(res));
});

app
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../static')))
  .use('/api', api);

app.get('/*', serverRenderMiddleware);

// ВРЕМЕННЫЙ КОСТЫЛЬ
startApp();
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
export { app };
