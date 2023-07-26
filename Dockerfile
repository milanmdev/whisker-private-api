FROM node:lts

LABEL org.opencontainers.image.description "An API to expose a Ting sensor's information for use Home Assistant"
LABEL org.opencontainers.image.source "https://github.com/milanmdev/whisker-private-api"

WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
CMD yarn start