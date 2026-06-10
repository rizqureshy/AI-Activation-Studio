# Deploying AI Activation Studio

The app is a 100% static site. The Docker image is built on `nginx:alpine`
and serves the HTML/CSS/JS bundled inside. ~25 MB compressed.

---

## Quick start (local)

```bash
docker compose up --build
```

Open <http://localhost:8080>.

To stop: `docker compose down`.

---

## Build the image manually

```bash
# single-arch (your laptop's native arch)
docker build -t gtm-ai-trainer-studio:local .

# multi-arch (amd64 + arm64), e.g. for pushing to a registry
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t gtm-ai-trainer-studio:local \
  .
```

## Run the image

```bash
docker run --rm -p 8080:8080 --name studio gtm-ai-trainer-studio:local
```

The container listens on **port 8080** internally (Cloud Run / App Runner /
GKE friendly). Map it however you like externally.

---

## GHCR (GitHub Container Registry)

The `.github/workflows/docker-publish.yml` workflow builds and pushes on
every push to `main` and on any tag matching `v*.*.*`. Tags published:

- `latest` — only on the default branch
- `main`, `<branch-name>` — branch builds
- `v1.2.3`, `1.2`, `1` — semver tags
- `sha-abc1234` — short-sha for every build

No secrets needed — uses the built-in `GITHUB_TOKEN`. You may need to make
the package public the first time:

```text
GitHub → your profile → Packages → gtm-ai-trainer-studio → Package settings → Change visibility → Public
```

Pull from GHCR:

```bash
docker pull ghcr.io/<owner>/<repo>:latest
docker run --rm -p 8080:8080 ghcr.io/<owner>/<repo>:latest
```

---

## Deploying to common platforms

### Google Cloud Run

```bash
gcloud run deploy gtm-studio \
  --image=ghcr.io/<owner>/<repo>:latest \
  --port=8080 \
  --allow-unauthenticated \
  --region=us-central1
```

Use Cloud Run's IAM gate (`--no-allow-unauthenticated` + IAM role binding)
if you want auth without re-introducing the in-app password.

### AWS App Runner

Point at the image, set port `8080`, default health check `/healthz`. Done.

### Fly.io

```bash
fly launch --image ghcr.io/<owner>/<repo>:latest --no-deploy
# edit fly.toml internal_port = 8080
fly deploy
```

### Plain VM (docker compose)

```bash
git clone <repo>
cd AI-Trainer-Hub
docker compose up -d
```

Put it behind a reverse proxy (Caddy / nginx / Traefik) for HTTPS.

### Kubernetes

Minimal deployment manifest:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gtm-studio
spec:
  replicas: 2
  selector:
    matchLabels: { app: gtm-studio }
  template:
    metadata:
      labels: { app: gtm-studio }
    spec:
      containers:
        - name: studio
          image: ghcr.io/<owner>/<repo>:latest
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet: { path: /healthz, port: 8080 }
          livenessProbe:
            httpGet: { path: /healthz, port: 8080 }
            initialDelaySeconds: 10
          resources:
            requests: { cpu: 10m, memory: 32Mi }
            limits:   { cpu: 200m, memory: 128Mi }
---
apiVersion: v1
kind: Service
metadata:
  name: gtm-studio
spec:
  selector: { app: gtm-studio }
  ports:
    - port: 80
      targetPort: 8080
```

---

## What's inside the image

- nginx 1.27 on Alpine (~25 MB total)
- `nginx.conf` with:
  - SPA-style routing (`try_files $uri $uri/ /index.html`)
  - 1-year `immutable` cache for `css/`, `js/`, fonts, images
  - `no-store` on `index.html` so users always get the latest gate / build
  - gzip compression
  - Security headers (`X-Content-Type-Options`, `X-Frame-Options`,
    `Referrer-Policy`, `Permissions-Policy`)
  - Hidden `Server:` version
  - Health endpoint at `/healthz`
- Read-only filesystem in compose (nginx caches via tmpfs)
- `no-new-privileges` security opt

## Adding auth back later

The in-app password gate was removed. If you need auth, prefer one of these
host-level options — they're real security, unlike a client-side gate:

- **Cloud Run** — IAM bindings, only authenticated invokers
- **Cloudflare Access** — Zero Trust in front of your origin
- **Traefik / Caddy** — basic-auth middleware (works fine for an internal demo)
- **AWS ALB + Cognito** — managed user pool

## Versioning

Tag the repo and the workflow does the rest:

```bash
git tag v0.1.0
git push origin v0.1.0
```

This publishes `ghcr.io/<owner>/<repo>:v0.1.0`, `:0.1`, `:0`, `:latest`, and a
sha-tagged image.
