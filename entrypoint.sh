#!/bin/sh
# entrypoint.sh

# Aborta o script se qualquer comando falhar
set -e

# 1. Executa as migrações do Prisma
echo "Running Prisma migrations..."
npx prisma migrate deploy

# 2. Executa o comando principal do contêiner (o CMD do Dockerfile)
echo "Starting the application..."
exec "$@"