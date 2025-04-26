# ========================
# Single Dockerfile for Local or Production
# ========================
FROM node:20-slim

# If you want to build for local dev, you control it with ENV vars (docker-compose env)
ARG ENVIRONMENT=local
ENV NODE_ENV=${ENVIRONMENT}

WORKDIR /home/app/web

RUN corepack enable
RUN corepack prepare yarn@4.9.1 --activate

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# Hot reload tweak
ENV CHOKIDAR_USEPOLLING=true

# Expose Next.js port
EXPOSE 3000

# 🔥 Define startup logic depending on ENVIRONMENT
CMD if [ "$NODE_ENV" = "production" ]; then yarn build && yarn export && yarn start; else yarn dev; fi
