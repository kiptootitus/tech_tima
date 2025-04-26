# Build stage
FROM node:20 AS builder
WORKDIR /home/app/web
RUN corepack enable && corepack prepare yarn@4.9.1 --activate
COPY package.json yarn.lock ./
COPY .yarnrc.yml .yarnrc.yml  # Include Yarn config if it exists
RUN yarn config set nodeLinker node-modules
RUN yarn install --frozen-lockfile
COPY . .
ARG ENVIRONMENT=local
RUN if [ "$ENVIRONMENT" = "production" ]; then yarn build; fi

# Runtime stage
FROM node:20-slim
WORKDIR /home/app/web
RUN corepack enable && corepack prepare yarn@4.9.1 --activate
COPY --from=builder /home/app/web/package.json /home/app/web/yarn.lock ./
# Conditionally copy .next only if ENVIRONMENT is production
ARG ENVIRONMENT=local
RUN if [ "$ENVIRONMENT" = "production" ]; then mkdir -p .next; fi
COPY --from=builder /home/app/web/.next/ ./.next/ --chmod=644 || true
COPY --from=builder /home/app/web/public ./public
COPY --from=builder /home/app/web/next.config.js ./next.config.js
COPY --from=builder /home/app/web/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /home/app/web/tsconfig.json ./tsconfig.json
RUN yarn install --frozen-lockfile --production
EXPOSE 3000
ENV NODE_ENV=${ENVIRONMENT}
CMD if [ "$NODE_ENV" = "production" ]; then yarn start; else yarn dev; fi