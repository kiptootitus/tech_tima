# ===============================
# Stage 1: Build dependencies and wheels
# ===============================
FROM python:3.11-slim AS builder

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    build-essential \
    curl \
    netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --prefix=/install -r requirements.txt

COPY . /app

# ===============================
# Stage 2: Final runtime image
# ===============================
FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    HOME=/home/app \
    APP_HOME=/home/app/web \
    PATH="/usr/local/bin:$PATH"

WORKDIR $APP_HOME

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    netcat-openbsd \
    curl && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /install /usr/local
COPY --from=builder /app /home/app

COPY --chown=1000:1000 --from=builder /app/entrypoint.sh /app/start-server.sh /app/
RUN chmod +x /app/entrypoint.sh /app/start-server.sh && \
    sed -i 's/\r$//' /app/entrypoint.sh /app/start-server.sh

# Expose port
EXPOSE 8000

# Optional: Add healthcheck
# HEALTHCHECK CMD curl --fail http://localhost:8000/health/ || exit 1

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["/app/start-server.sh"]
