FROM node:18-alpine3.17

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

ARG PORT=8080
ENV PORT $PORT

EXPOSE $PORT
ENV NODE_ENV "production"

CMD yarn start
