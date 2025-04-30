# ------------------------
# Build stage
# ------------------------
FROM node:20 AS builder
WORKDIR /home/app/web

# Enable and prepare Yarn 4
RUN corepack enable && corepack prepare yarn@4.9.1 --activate

# Copy only package metadata and yarn config first
COPY package.json yarn.lock ./
COPY .yarn .yarn
COPY .yarnrc.yml .yarnrc.yml

# Use node_modules linker and install deps
RUN yarn config set nodeLinker node-modules
RUN yarn install --immutable

# Copy rest of the application code
COPY . .

# Build app if ENVIRONMENT=production
ARG ENVIRONMENT=local
RUN if [ "$ENVIRONMENT" = "production" ]; then NEXT_DISABLE_ESLINT=true yarn build; else echo "Development mode - skipping yarn build"; fi

# ------------------------
# Runtime stage
# ------------------------
FROM node:20-slim
WORKDIR /home/app/web

# Enable and prepare Yarn 4
RUN corepack enable && corepack prepare yarn@4.9.1 --activate

# Copy only what’s needed for runtime
COPY --from=builder /home/app/web/package.json /home/app/web/yarn.lock ./
COPY --from=builder /home/app/web/.yarn .yarn
COPY --from=builder /home/app/web/.yarnrc.yml .yarnrc.yml
COPY --from=builder /home/app/web/public ./public
COPY --from=builder /home/app/web/next.config.js ./next.config.js
COPY --from=builder /home/app/web/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /home/app/web/tsconfig.json ./tsconfig.json
COPY --from=builder /home/app/web/.next ./.next
COPY --from=builder /home/app/web/node_modules ./node_modules

# Do NOT run yarn install again — deps are copied from builder

# Expose and start app
EXPOSE 3000
ENV NODE_ENV=${ENVIRONMENT}
CMD if [ "$NODE_ENV" = "production" ]; then yarn start; else yarn dev; fi
