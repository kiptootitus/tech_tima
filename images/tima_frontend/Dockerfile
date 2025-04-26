# =========================
# Build Stage
# =========================
FROM node:20 AS builder
WORKDIR /home/app/web

# Enable Corepack and Yarn
RUN corepack enable && corepack prepare yarn@4.9.1 --activate

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn config set nodeLinker node-modules
RUN yarn install --frozen-lockfile

# Copy project files
COPY . .

# Build project if ENV is production
ARG ENVIRONMENT=local
RUN if [ "$ENVIRONMENT" = "production" ]; then yarn build; fi

# =========================
# Runtime Stage
# =========================
FROM node:20-slim
WORKDIR /home/app/web

# Enable Corepack and Yarn
RUN corepack enable && corepack prepare yarn@4.9.1 --activate

# Copy essentials
COPY --from=builder /home/app/web/package.json /home/app/web/yarn.lock ./

# Environment variable
ARG ENVIRONMENT=local

# Copy built frontend ONLY if it exists
RUN if [ -d "/home/app/web/.next" ]; then cp -r /home/app/web/.next ./.next; fi

# Copy static files and configs
COPY --from=builder /home/app/web/public ./public
COPY --from=builder /home/app/web/next.config.js ./next.config.js
COPY --from=builder /home/app/web/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /home/app/web/tsconfig.json ./tsconfig.json

# Install production dependencies
RUN yarn workspaces focus --production --immutable
# Expose app port
EXPOSE 3000

# Set environment and start
ENV NODE_ENV=${ENVIRONMENT}

CMD if [ "$NODE_ENV" = "production" ]; then yarn start; else yarn dev; fi
