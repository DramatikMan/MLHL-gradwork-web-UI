FROM node:19-slim AS base
SHELL ["/bin/bash", "-c"]
WORKDIR /app

COPY .npmrc package.json package-lock.json* ./
RUN npm ci
COPY gwui gwui

##################
FROM base AS builder
COPY tsconfig.json vite.config.ts vite.tsconfig.json .eslintrc.json .prettierrc.json ./
RUN bash -c 'if [[ "$build_env" == "dev" ]]; then npm run build:dev; else npm run build; fi'

##################
FROM nginxinc/nginx-unprivileged:1.23.3-alpine-slim AS server
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
