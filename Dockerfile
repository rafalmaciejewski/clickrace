FROM node:16.13.0 as build

ENV NODE_ENV production

COPY client/package.json client/package-lock.json /app/client/

WORKDIR /app/client

RUN npm install

COPY client /app/client

RUN npm run build && npm run export

COPY server/package.json server/package-lock.json /app/server/

WORKDIR /app/server

RUN npm install

COPY server /app/server

RUN npm run build

FROM node:16.13.0-alpine

WORKDIR /app/server

COPY --from=build /app/server /app/server

ENV NODE_ENV=production \
    PORT=8088

EXPOSE 8088

CMD npm run start:prod
