# ===========================
# Stage 1: Build Dependencies
# ===========================
FROM python:3.11-slim AS build

# Environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Working directory
WORKDIR /app

# Install system dependencies (mysqlclient, netcat)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      gcc \
      default-libmysqlclient-dev \
      pkg-config \
      curl \
      netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy entrypoint and server start scripts
COPY entrypoint.sh start-server.sh ./
RUN chmod +x /app/entrypoint.sh /app/start-server.sh && \
    sed -i 's/\r$//' /app/entrypoint.sh /app/start-server.sh

# Prepare app folder
ENV HOME=/home/app \
    APP_HOME=/home/app/web

RUN mkdir -p $APP_HOME/static $APP_HOME/media

# Copy project code
COPY . $APP_HOME

# ========================
# Stage 2: Final Production Image
# ========================
FROM python:3.11-slim

# Environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    HOME=/home/app \
    APP_HOME=/home/app/web

# Working directory
WORKDIR $APP_HOME

# Install runtime dependencies (only what we need to RUN the app, no gcc etc)
# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      default-libmysqlclient-dev \
      netcat-openbsd \
      curl && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY --from=build /home/app /home/app
COPY --from=build /app/entrypoint.sh /app/start-server.sh /app/

# Copy entrypoint and server start scripts
RUN chmod +x /app/entrypoint.sh /app/start-server.sh && \
    sed -i 's/\r$//' /app/entrypoint.sh /app/start-server.sh

# Expose Django port
EXPOSE 8000

# Entrypoint for waiting DB + migrations
ENTRYPOINT ["/app/entrypoint.sh"]

# Default command: runserver (can be overridden)
CMD ["/app/start-server.sh"]
