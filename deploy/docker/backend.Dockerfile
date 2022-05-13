FROM node:16-alpine AS builder
WORKDIR /scratch
COPY package.json yarn.lock ./
RUN yarn install
COPY tsconfig.json ./
COPY ./src/ ./src/
RUN yarn start
