/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import compression from 'compression';
import 'babel-polyfill';
import serverRenderMiddleware from './server-render-middleware';

const app = express();

const port = process.env.PORT || 3000;

app.use(compression())
  .use(express.static(path.resolve(__dirname, '../static')));

app.get('/*', serverRenderMiddleware);

app.listen(port, () => console.log(`Listening on port ${port}`));

export { app };
