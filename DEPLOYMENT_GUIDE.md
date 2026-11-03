# RedSavior Production Deployment Guide

This document describes how to deploy RedSavior to production platforms (Vercel, Node.js Docker containers, VPS, or cloud Kubernetes).

---

## 1. Deploying to Vercel (Recommended)

Next.js App Router works natively on Vercel:

1. Push your repository to GitHub or GitLab.
2. Sign in to [Vercel](https://vercel.com) and import the repository.
3. Configure the Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (e.g. `https://redsavior.org`)
   - `NEXT_PUBLIC_DEFAULT_LOCALE` (`bn`)
   - `NEXT_PUBLIC_TIMEZONE` (`Asia/Dhaka`)
4. Click **Deploy**.
5. Once deployed, add custom domain `redsavior.org` in Vercel settings with automatic SSL.

---

## 2. Docker Container Deployment

Create a `Dockerfile` for self-hosted container deployments:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build project
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Run application
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t redsavior:latest .
docker run -p 3000:3000 --env-file .env.local redsavior:latest
```

---

## 3. Production Verification Checklist

- [ ] All 32 routes build cleanly (`npm run build`).
- [ ] Automated tests pass (`npm test`).
- [ ] HTTPS enabled with valid TLS/SSL certificates.
- [ ] Supabase Row-Level Security (RLS) enabled on all exposed tables.
- [ ] No production secrets committed to client bundles.
- [ ] CDN caching enabled for static brand assets.
