FROM node:16-alpine AS builder
WORKDIR /scratch
COPY package.json yarn.lock ./
RUN yarn install
COPY tsconfig.json ./
COPY ./src/ ./src/
RUN yarn build

FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /scratch/package.json ./
COPY --from=builder /scratch/build/ ./build/
RUN yarn install
CMD ["node", "build/index.js"]
