FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM buster-slim as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
