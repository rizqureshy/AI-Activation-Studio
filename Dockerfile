# syntax=docker/dockerfile:1.7
# ─────────────────────────────────────────────────────────────
#  AI Activation Studio — production image
#  Pure static site → served by nginx:alpine. No build step needed.
# ─────────────────────────────────────────────────────────────

FROM nginx:1.27-alpine

# Drop the default site config; install ours
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static files — only the runtime assets, no source clutter
COPY index.html  /usr/share/nginx/html/
COPY css/        /usr/share/nginx/html/css/
COPY js/         /usr/share/nginx/html/js/
COPY README.md   /usr/share/nginx/html/

# Cloud-Run / App-Runner-friendly port. Map :8080 externally.
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1

# nginx:alpine already CMD's nginx -g "daemon off;"
