# Docker: Production Build & Run

This project includes a production-grade Docker setup:

- Multi-stage build with pnpm and cache mounts for fast, reproducible builds
- Static serving with Caddy (non-root, unprivileged port)
- Secure headers and asset caching
- Multi-architecture builds with Docker Buildx (linux/amd64, linux/arm64)

## Quick start

Build and run locally (single-arch):

```sh
# from repo root
docker build -t ritikvirus/portfolio:local .
docker run --rm -p 8080:8080 --name portfolio-test ritikvirus/portfolio:local
```

Test:

```sh
curl -sSf http://localhost:8080 | head -n 1
```

Open http://localhost:8080

## Build and push (Docker Hub)

Push single-arch image to Docker Hub:

```sh
# login first if needed
docker login

# tag and push
docker tag ritikvirus/portfolio:local ritikvirus/portfolio:latest
docker push ritikvirus/portfolio:latest
```

## Multi-arch build

Use Docker Buildx (the Makefile helps set up a builder):

```sh
# create/use a multi-arch builder
make dockerx-create

# build for amd64+arm64 and load locally (no push)
make build IMAGE=ritikvirus/portfolio:dev PLATFORMS=linux/amd64,linux/arm64

# push to Docker Hub (multi-arch)
make push IMAGE=ritikvirus/portfolio:latest PLATFORMS=linux/amd64,linux/arm64
```

If you don't want Makefile:

```sh
docker buildx create --name multiarch-builder --use || true
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t ritikvirus/portfolio:latest \
  --provenance=false --sbom=false \
  --push .
```

## Run in production (Linux server)

HTTP (behind a cloud/edge TLS or for quick start):

```sh
docker run -d \
  --name portfolio \
  --restart unless-stopped \
  -p 80:8080 \
  ritikvirus/portfolio:latest
```

Hardened runtime flags (recommended):

```sh
docker run -d \
  --name portfolio \
  --restart unless-stopped \
  -p 80:8080 \
  --read-only \
  --cap-drop ALL \
  --security-opt no-new-privileges:true \
  --tmpfs /tmp:rw,noexec,nosuid,size=64m \
  ritikvirus/portfolio:latest
```

Notes:
- Container listens on port 8080; mapping host 80→8080 exposes HTTP on port 80.
- For HTTPS, terminate TLS at your reverse proxy (e.g., Nginx/Caddy/Traefik) and proxy to http://127.0.0.1:8080.
- If you want Caddy inside the container to manage TLS certs, you must: (1) change the `Caddyfile` to use your domain instead of `:{$PORT}`, (2) publish ports 80 and 443, (3) provide writable volumes for `/data` and `/config`, and (4) adjust privileges to bind low ports. Using an external proxy is simpler and safer.

Minimal Nginx reverse proxy example:

```nginx
server {
  listen 80;
  server_name yourdomain.com;
  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## Security hardening

Runtime best practices (pass with `docker run` or in your orchestrator):

```sh
docker run \
  --rm \
  -p 8080:8080 \
  --read-only \
  --cap-drop ALL \
  --security-opt no-new-privileges:true \
  --tmpfs /tmp:rw,noexec,nosuid,size=64m \
  ritikvirus/portfolio:latest
```

Notes:
- Container runs as non-root and listens on port 8080.
- TLS is recommended at your ingress/LB. If you prefer in-container TLS, see the note above.
- Adjust CSP in `Caddyfile` if you add third-party scripts/providers.

## CI publishing (optional)

This repo includes a GitHub Actions workflow at `.github/workflows/docker.yml` that builds multi-arch images and pushes to GHCR on each push to `master` or manual dispatch. You can adapt it for Docker Hub by changing the registry, or continue using Docker Hub with local pushes as shown above.
