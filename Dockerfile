# syntax=docker/dockerfile:1.6

########################################
# 1) Builder: Install deps and build    #
########################################
FROM node:20-alpine AS deps
WORKDIR /app

# Ensure compatibility with native deps (sharp, etc.)
RUN apk add --no-cache libc6-compat

# Enable pnpm via corepack
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable

# Leverage Docker layer caching for pnpm store
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile


FROM node:20-alpine AS build
WORKDIR /app
ENV NODE_ENV=production

# Enable pnpm via corepack
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable

# Copy deps from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Astro site (static output)
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm build


########################################################
# 2) Runtime: Caddy static server (non-root by default) #
########################################################
FROM caddy:2.8-alpine AS runner

LABEL org.opencontainers.image.title="ritikvirus-portfolio" \
    org.opencontainers.image.description="Ritik's portfolio built with Astro, served via Caddy" \
    org.opencontainers.image.source="https://github.com/ritikvirus/ritikvirus-portfolio" \
    org.opencontainers.image.licenses="MIT"

# Use non-privileged port for security (no NET_BIND caps needed)
ENV PORT=8080

# Create a non-root runtime user
RUN addgroup -g 10001 web && adduser -D -H -u 10001 -G web web

# Copy artifacts (client output) and Caddy config
COPY --from=build --chown=web:web /app/dist/client /srv
COPY --chown=web:web Caddyfile /etc/caddy/Caddyfile

# Expose unprivileged port
EXPOSE 8080
USER web

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget -q -O - http://127.0.0.1:${PORT}/ >/dev/null 2>&1 || exit 1

# Run Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
