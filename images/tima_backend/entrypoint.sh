#!/bin/sh

set -e  # Exit on any error

if [ "$DATABASE" = "tech_tima" ]
then
    echo "Waiting for PostgreSQL..."

    while ! nc -z "$POSTGRES_HOST" "$POSTGRES_PORT"; do
      sleep 0.1
    done

    echo "PostgreSQL started 🚀"
fi

echo "Applying database migrations..."
python manage.py migrate

echo "Starting server..."
exec "$@"
