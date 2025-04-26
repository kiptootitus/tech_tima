#!/bin/sh

# Fail if any command fails
set -e

# Wait for postgres to be ready if needed (only if using Postgres/MySQL etc.)
# echo "Waiting for postgres..."
# python manage.py wait_for_db  # <-- Only if you have a custom wait command

# Run migrations automatically (optional but usually recommended)
echo "Applying migrations..."
python manage.py migrate

# Collect static files (if you are serving static files)
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Finally start the Django server
echo "Starting Django server..."
python manage.py runserver 0.0.0.0:8000
