# ========================
# Stage 1: Local Dev (Hot reload)
# ========================
FROM node:18-bullseye-slim AS local

ENV ENVIRONMENT=local
ENV NODE_ENV=development

WORKDIR /home/app/web

RUN corepack enable
RUN corepack prepare yarn@4.9.1 --activate

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

ENV CHOKIDAR_USEPOLLING=true

EXPOSE 3000

CMD ["yarn", "dev"]

# ========================
# Stage 2: Production Build (Static Export)
# ========================
FROM node:18-bullseye-slim AS build

ENV ENVIRONMENT=production
ENV NODE_ENV=production

WORKDIR /home/app/web

RUN corepack enable
RUN corepack prepare yarn@4.9.1 --activate

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build && yarn export

EXPOSE 3000
