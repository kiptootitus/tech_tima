# ------------------------
# Build stage (only for production)
# ------------------------
  FROM node:20 AS builder
  WORKDIR /home/app/web
  
  # Enable Yarn 4
  RUN corepack enable && corepack prepare yarn@4.9.1 --activate
  
  # Copy minimal files first to leverage cache
  COPY package.json yarn.lock ./
  
  # Set linking strategy
  RUN yarn config set nodeLinker node-modules
  
  # Install deps
  RUN yarn install --immutable
  
  # Copy full project
  COPY . .
  
  # Set build mode
  ARG ENVIRONMENT=production
  ENV NODE_ENV=$ENVIRONMENT
  
  # Run build only in production
  RUN if [ "$ENVIRONMENT" = "production" ]; then yarn build || (echo "Build failed" && exit 1); fi
  
  # ------------------------
  # Runtime stage
  # ------------------------
  FROM node:20-slim
  WORKDIR /home/app/web
  
  # Install useful CLI tools (for debugging)
  RUN apt-get update && apt-get install -y \
      bash \
      curl \
      nano \
      git \
      vim \
      && rm -rf /var/lib/apt/lists/*
  
  # Enable Yarn 4
  RUN corepack enable && corepack prepare yarn@4.9.1 --activate
  
  # Copy deps and runtime essentials
  COPY --from=builder /home/app/web/package.json /home/app/web/yarn.lock ./
  COPY --from=builder /home/app/web/.yarnrc.yml ./
  COPY --from=builder /home/app/web/public ./public
  COPY --from=builder /home/app/web/app ./app
  COPY --from=builder /home/app/web/src ./src
  COPY --from=builder /home/app/web/next.config.js ./next.config.js
  COPY --from=builder /home/app/web/tailwind.config.ts ./tailwind.config.ts
  COPY --from=builder /home/app/web/tsconfig.json ./tsconfig.json
  COPY --from=builder /home/app/web/node_modules ./node_modules
  
  # Copy build output only if it exists (e.g. in production)
  COPY --from=builder /home/app/web/.next ./.next
  
  # Set environment
  ARG ENVIRONMENT=local
  ENV NODE_ENV=$ENVIRONMENT
  ENV CHOKIDAR_USEPOLLING=true
  
  EXPOSE 3000
  
  # Automatically switch between dev and prod
  CMD ["bash", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then yarn start; else yarn dev; fi"]
  