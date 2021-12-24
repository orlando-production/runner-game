import React from 'react';
import { renderToString } from 'react-dom/server';
import type { Request, Response } from 'express';
import { matchPath, StaticRouter, StaticRouterContext } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import configureAppStore, { getInitialState } from 'store';
import Helmet, { HelmetData } from 'react-helmet';
import routes from 'routes';
import url from 'url';
import { App } from './components/App';

function getHtml(reactHtml: string, reduxState = {}, helmetData: HelmetData) {
  return `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Runner</title>
            <link href="/main.css" rel="stylesheet">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
          </head>
          <body>
            <div id="root">${reactHtml}</div>
            <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
            </script>
            <script src="/main.js"></script>
          </body>
          </html>`;
}

export default (req: Request, res: Response) => {
  const { cookies } = res.locals;
  const location = req.url;

  const context: StaticRouterContext = {};
  const { store } = configureAppStore(getInitialState(), location);

  const renderApp = () => {
    const jsx = (
      <ReduxProvider store={store}>
        <StaticRouter context={context} location={location}>
          <App />
        </StaticRouter>
      </ReduxProvider>
    );
    const reactHtml = renderToString(jsx);
    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();

    if (context.url) {
      res.redirect(context.url);
      return;
    }

    res.status(context.statusCode || 200).send(getHtml(reactHtml, reduxState, helmetData));
  };

  const dataRequirements: any = [];

  routes.some((route) => {
    const { fetchData } = route;
    const match = matchPath<{ slug: string }>(
      url.parse(location).pathname as string,
      route
    );

    console.log('match');
    console.log(match);

    if (match && fetchData) {
      dataRequirements.push(fetchData({ dispatch: store.dispatch, cookies, match }));
    }

    return Boolean(match);
  });

  return Promise.all(dataRequirements)
    .then(() => {
      renderApp();
    })
    .catch((err) => {
      throw err;
    });
};
