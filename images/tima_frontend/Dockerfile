# ------------------------
# Build stage
# ------------------------
  FROM node:20 AS builder
  WORKDIR /home/app/web
  
  # Enable and prepare Yarn 4
  RUN corepack enable && corepack prepare yarn@4.9.1 --activate
  
  # Copy all application code first
  COPY . .
  
  # Install dependencies and build
  RUN yarn config set nodeLinker node-modules
  RUN yarn install --immutable
  RUN yarn build || (echo "Build failed" && exit 1)
  
  # Build app if ENVIRONMENT=production
  ARG ENVIRONMENT=local
  RUN if [ "$ENVIRONMENT" = "production" ]; then yarn build; else echo "Development mode - skipping yarn build"; fi
  
  # ------------------------
  # Runtime stage
  # ------------------------
  FROM node:20-slim
  WORKDIR /home/app/web
  
  # 🛠️ Install bash, vim, curl, git for terminal access
  RUN apt-get update && apt-get install -y \
      bash \
      vim \
      nano \
      curl \
      git \
      && rm -rf /var/lib/apt/lists/*
  
  # Enable and prepare Yarn 4
  RUN corepack enable && corepack prepare yarn@4.9.1 --activate
  
  # Copy only what’s needed for runtime
  COPY --from=builder /home/app/web/package.json /home/app/web/yarn.lock ./
  # COPY --from=builder /home/app/web/.yarn .yarn # Uncomment if using Yarn zero-installs
  COPY --from=builder /home/app/web/.yarnrc.yml .yarnrc.yml
  COPY --from=builder /home/app/web/public ./public
  COPY --from=builder /home/app/web/app ./app
  # COPY --from=builder /home/app/web/src ./src # Remove if src is not needed at runtime
  COPY --from=builder /home/app/web/next.config.js ./next.config.js
  COPY --from=builder /home/app/web/tailwind.config.ts ./tailwind.config.ts
  COPY --from=builder /home/app/web/tsconfig.json ./tsconfig.json
  COPY --from=builder /home/app/web/.next ./.next
  COPY --from=builder /home/app/web/node_modules ./node_modules
  
  EXPOSE 3000
  
  # Define ENVIRONMENT for runtime stage
  ARG ENVIRONMENT=local
  ENV NODE_ENV=$ENVIRONMENT
  
  # Start command with JSON syntax (best practice)
  CMD ["bash", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then yarn start; else yarn dev; fi"]