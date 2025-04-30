# ====================================
# Stage 1: Build dependencies and wheels
# ====================================
FROM python:3.11-slim AS builder

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

# Set up working directory
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    default-libmysqlclient-dev \
    build-essential \
    curl \
    netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Install pip packages into a temporary dir
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --prefix=/install -r requirements.txt

# Copy project code
COPY . /app

# ========================================
# Stage 2: Final lightweight production image
# ========================================
FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    HOME=/home/app \
    APP_HOME=/home/app/web \
    PATH="/usr/local/bin:$PATH"

WORKDIR $APP_HOME

# Install only required runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    default-libmysqlclient-dev \
    netcat-openbsd \
    curl && \
    rm -rf /var/lib/apt/lists/*

# Copy only installed Python packages from builder
COPY --from=builder /install /usr/local

# Copy application code
COPY --from=builder /app /home/app

# Set proper permissions
COPY --chown=1000:1000 --from=builder /app/entrypoint.sh /app/start-server.sh /app/
RUN chmod +x /app/entrypoint.sh /app/start-server.sh && \
    sed -i 's/\r$//' /app/entrypoint.sh /app/start-server.sh

# Expose the default Django port
EXPOSE 8000

# (Optional) Switch to non-root user for security
# RUN useradd -m appuser && chown -R appuser /home/app
# USER appuser

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["/app/start-server.sh"]
