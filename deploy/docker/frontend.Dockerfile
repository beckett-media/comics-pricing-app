FROM node:16-alpine AS builder
ARG REACT_APP_API_URL
WORKDIR /scratch
COPY package.json yarn.lock ./
RUN yarn install
COPY tsconfig.json tailwind.config.js ./
COPY ./src/ ./src/
COPY ./public/ ./public/
RUN REACT_APP_API_URL="$REACT_APP_API_URL" yarn build

FROM nginx:alpine
COPY --from=builder /scratch/build/ /usr/share/nginx/html/
