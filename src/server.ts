/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */
import path from 'path';
import express, { Request, Response } from 'express';
import compression from 'compression';
import { Model } from 'sequelize-typescript';
import 'babel-polyfill';
import { ThemeType } from 'components/themeSwitcher/themesSlice';
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
import {
  getMessages,
  getTopicsAll,
  getTopicById,
  getAllThemes,
  getUserTheme, setMessage, setTopic, setUserTheme, startApp
} from 'db';
import serverRenderMiddleware from './server-render-middleware';

const busboy = require('connect-busboy');
const FormData = require('form-data');

const app = express();
const api = express.Router();

let cookies: string = '';

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

const checkAccess = () => !!cookies;

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
  const access = checkAccess();
  if (!access) {
    res.sendStatus(401);
    return;
  }
  addLeaderboardResult(req.body, true)
    .then(() => res.sendStatus(200))
    .catch(({ response }) => console.error(response.data));
});

app.post(`/${ENDPOINTS.LEADERBOARD_RESULTS}`, (req: Request, res: Response) => {
  const access = checkAccess();
  if (!access) {
    res.sendStatus(401);
    return;
  }
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
  const access = checkAccess();
  if (!access) {
    res.sendStatus(401);
    return;
  }
  const config = {
    headers: {
      Cookie: cookies
    }
  };
  logoutUser(config, true)
    .then(() => { cookies = ''; return res.sendStatus(200); })
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

app.get(`/${ENDPOINTS.USER}`, async (req: Request, res: Response) => {
  console.log(req.headers.cookie);
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
  console.log(req.headers.cookie);
  const config = {
    headers: {
      Cookie: decodeURI(req.headers.cookie)
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
  const access = checkAccess();
  if (!access) {
    res.sendStatus(401);
    return;
  }
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
  const access = checkAccess();
  if (!access) {
    return res.sendStatus(401);
  }
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
  const access = checkAccess();
  if (!access) {
    return res.sendStatus(401);
  }
  const config = {
    headers: {
      Cookie: cookies
    },
    responseType: 'stream'
  };

  return getAvatars(`${req.params[0]}`, config, true).then((result: Stream) => result.pipe(res));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
app.get(`/${ENDPOINTS.THEMES}`, (req: Request, res: Response) => {
  if ((req as Request).query.id) {
    const access = checkAccess();
    if (!access) {
      res.sendStatus(401);
      return;
    }
    getUserTheme((req as any).query.id).then((themeId: number) => {
      res.send({ themeId });
    });
  } else {
    getAllThemes().then((list: Model<ThemeType, any>[]) => {
      res.send(list);
    });
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
app.put(`/${ENDPOINTS.THEMES}`, (req: Request, res: Response) => {
  const access = checkAccess();
  if (!access) {
    res.sendStatus(401);
    return;
  }
  setUserTheme(req.body.id, req.body.themeId).then(() => {
    res.sendStatus(200);
  });
});

app.post(`/${ENDPOINTS.TOPIC}`, (req: Request, res: Response) => {
  setTopic(req.body.title, req.body.text)
    .then((payload) => {
      res.send(payload);
    })
    .catch(({ response }) => {
      res.status(response.status || 500).json(response.data);
    });
});

app.post(`/${ENDPOINTS.TOPIC_ALL}`, (_req: Request, res: Response) => {
  getTopicsAll()
    .then((payload) => {
      res.send(payload);
    })
    .catch(({ response }) => {
      res.status(response.status || 500).json(response.data);
    });
});

app.post(`/${ENDPOINTS.TOPIC_BY_ID}`, (req: Request, res: Response) => {
  getTopicById(req.body.id)
    .then((payload) => {
      res.send(payload);
    })
    .catch(({ response }) => {
      res.status(response.status || 500).json(response.data);
    });
});

app.post(`/${ENDPOINTS.MESSAGE}`, (req: Request, res: Response) => {
  setMessage(req.body.id, req.body.author, req.body.text)
    .then((payload) => {
      res.send(payload);
    })
    .catch(({ response }) => {
      res.status(response.status || 500).json(response.data);
    });
});

app.post(`/${ENDPOINTS.MESSAGE_GET}`, (req: Request, res: Response) => {
  getMessages(req.body.id)
    .then((payload) => {
      res.send(payload);
    })
    .catch(({ response }) => {
      res.status(response.status || 500).json(response.data);
    });
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
