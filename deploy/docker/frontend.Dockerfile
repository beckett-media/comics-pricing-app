FROM node:16-alpine AS builder
WORKDIR /scratch
COPY package.json yarn.lock ./
RUN yarn install
COPY tsconfig.json tailwind.config.js ./
COPY ./src/ ./src/
COPY ./public/ ./public/
RUN yarn build

FROM nginx:alpine
COPY --from=builder /scratch/build/ /usr/share/nginx/html/
