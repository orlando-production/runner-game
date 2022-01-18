FROM node:14
WORKDIR /var/www
COPY ./ ./
RUN npm install && npm run build
EXPOSE 5000
CMD node dist/server.js