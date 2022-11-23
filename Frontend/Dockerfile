# module install
FROM node:16.13.0-alpine as module-install-stage
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN apk add yarn
RUN yarn install --production

# build
FROM node:16.13.0-alpine as build-stage
COPY --from=module-install-stage /app/node_modules/ /app/node_modules
WORKDIR /app
COPY . .
ARG BE_URL
ENV REACT_APP_URL_BE $BE_URL
ENV GENERATE_SOURCEMAP=false
RUN yarn build

# serve
FROM node:16.13.0-alpine
COPY --from=build-stage /app/build/ /app/build
RUN npm install -g serve
