# Dockerfile

# --- Estágio 1: Base ---
# Define a imagem base do Node.js
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./

# --- Estágio 2: Dependências de Produção ---
# Instala SOMENTE as dependências de produção
FROM base AS dependencies
RUN npm install --omit=dev

# --- Estágio 3: Builder ---
# Instala TODAS as dependências (incluindo devDeps como 'prisma') e constrói o app
FROM base AS builder
RUN npm install
COPY . .
# Gera o Prisma Client antes de construir
RUN npx prisma generate
# Constrói o app (usando seu script com Turbopack)
RUN npm run build

# --- Estágio 4: Runner (Imagem Final) ---
# Esta é a imagem final que irá para produção
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copia os node_modules de produção do estágio 'dependencies'
COPY --from=dependencies /app/node_modules ./node_modules
# Copia o app construído do estágio 'builder'
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# Copia os arquivos necessários para o Prisma e o 'npm start'
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copia o script de entrypoint (vamos criar abaixo)
COPY ./entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3000

# O entrypoint vai rodar as migrações e DEPOIS iniciar o app
ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "run", "start"]