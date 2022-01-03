FROM node:13

COPY . .

RUN npm install && npm run build

EXPOSE 5000

CMD node dist/server.js
