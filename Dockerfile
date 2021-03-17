FROM node:12-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY . /usr/src/app

RUN yarn install

ENTRYPOINT yarn start

EXPOSE 3000