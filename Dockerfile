FROM node:10-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

ARG SEARCH
ARG API
ARG DESKTOP_WEB
ARG KEYCLOAK_URL
ARG KEYCLOAK_REALM
ARG KEYCLOAK_CLIENT_ID
ARG TOKEN_VALID_DURATION_S

ENV REACT_APP_SEARCH=$SEARCH
ENV REACT_APP_API=$API
ENV REACT_APP_DESKTOP_WEB=$DESKTOP_WEB
ENV REACT_APP_KEYCLOAK_URL=$KEYCLOAK_URL
ENV REACT_APP_KEYCLOAK_REALM=$KEYCLOAK_REALM
ENV REACT_APP_KEYCLOAK_CLIENT_ID=$KEYCLOAK_CLIENT_ID
ENV REACT_APP_TOKEN_VALID_DURATION_S=$TOKEN_VALID_DURATION_S

RUN npm run build

FROM nginx:mainline
COPY --from=build-step /app/build/ /usr/share/nginx/html
