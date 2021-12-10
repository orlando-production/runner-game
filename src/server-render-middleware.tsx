import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { App } from './components/App';

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
  const jsx = <App />;
  const reactHtml = renderToString(jsx);

  res.send(getHtml(reactHtml));
};
