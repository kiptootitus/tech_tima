# ========================
# Stage 1: Local Dev (Hot reload)
# ========================
FROM node:20-slim AS local

ENV ENVIRONMENT=local
ENV NODE_ENV=development

WORKDIR /home/app/web

RUN corepack enable
RUN corepack prepare yarn@4.9.1 --activate

COPY package.json yarn.lock .dockerignore ./
RUN yarn install --frozen-lockfile

COPY . .

ENV CHOKIDAR_USEPOLLING=true

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

CMD ["yarn", "dev"]

# ========================
# Stage 2: Production Build (Static Export)
# ========================
FROM node:20-slim AS build

ENV ENVIRONMENT=production
ENV NODE_ENV=production

WORKDIR /home/app/web

RUN corepack enable
RUN corepack prepare yarn@4.9.1 --activate

COPY package.json yarn.lock .dockerignore ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build && yarn export

EXPOSE 3000
