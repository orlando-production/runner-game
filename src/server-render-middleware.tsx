import React from 'react';
import { renderToString } from 'react-dom/server';
import type { Request, Response } from 'express';
import { App } from './components/App';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';

function getHtml(reactHtml: string) {
  return `
          <!DOCTYPE html>
          <html lang="en">
          
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Runner</title>
          </head>
          
          <body>
            <div id="root">${reactHtml}</div>
            <script src="/main.js"></script>
          </body>
          </html> 
      `;
}

export default (req: Request, res: Response) => {
  const context: StaticRouterContext = {};
  const location=req.url;

  const jsx = (
    <StaticRouter context={context} location={location}>
      <App />
    </StaticRouter>
  );
  const reactHtml = renderToString(jsx);

  res.send(getHtml(reactHtml));
};
