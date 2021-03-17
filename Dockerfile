FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn run build

FROM nginx

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
WORKDIR /usr/share/nginx/html
