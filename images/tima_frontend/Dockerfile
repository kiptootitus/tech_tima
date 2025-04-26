# Build stage
FROM node:20 AS builder
WORKDIR /home/app/web
RUN corepack enable && corepack prepare yarn@4.9.1 --activate

COPY package.json yarn.lock ./
RUN yarn config set nodeLinker node-modules
RUN yarn install --immutable --production

COPY . .

ARG ENVIRONMENT=local
RUN if [ "$ENVIRONMENT" = "production" ]; then yarn build; else echo "Development mode - skipping yarn build"; fi

# Runtime stage
FROM node:20-slim
WORKDIR /home/app/web
RUN corepack enable && corepack prepare yarn@4.9.1 --activate

COPY --from=builder /home/app/web/package.json /home/app/web/yarn.lock ./
COPY --from=builder /home/app/web/public ./public
COPY --from=builder /home/app/web/next.config.js ./next.config.js
COPY --from=builder /home/app/web/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /home/app/web/tsconfig.json ./tsconfig.json
COPY --from=builder /home/app/web/.next/ ./.next/

RUN yarn install --immutable --production

EXPOSE 3000
ENV NODE_ENV=${ENVIRONMENT}
CMD if [ "$NODE_ENV" = "production" ]; then yarn start; else yarn dev; fi
