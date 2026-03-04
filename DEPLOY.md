# Deploy to Vercel (with persistent pricing)

## 1. Connect to your project

If you have an existing Vercel project, link it locally:

```bash
vercel link
```

If starting fresh, create a new project at [vercel.com/new](https://vercel.com/new) and import your repo.

## 2. Add Upstash Redis

1. In [Vercel Dashboard](https://vercel.com/dashboard) → your project
2. Go to **Storage** (or **Integrations**)
3. **Create Database** → choose **Upstash Redis** (or "Upstash KV")
4. Create the database (free tier available)
5. **Connect to a project** — link it to your project so Vercel adds env vars automatically

## 3. Pull environment variables locally

```bash
vercel env pull .env.local
```

This pulls the latest env vars (including Redis credentials) for local development.

## 4. Install the Upstash Redis SDK

```bash
npm install @upstash/redis
```

(Already in this project.)

## 5. Deploy

```bash
vercel
```

Or push to GitHub — Vercel will auto-deploy if the repo is connected.

---

**Local dev without Redis:** The API falls back to `data/pricing.json` when Redis env vars are missing, so you can run `npm run dev` without setting up Redis.
