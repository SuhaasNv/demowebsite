# Deploy to Vercel (with persistent pricing)

## 1. Add Upstash Redis (for saving pricing)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → your project
2. Open **Storage** tab (or **Integrations**)
3. Click **Create Database** or **Browse Marketplace**
4. Choose **Upstash Redis** (or "Upstash KV")
5. Create the database (free tier available)
6. **Link** it to your project — Vercel will add the env vars automatically

## 2. Deploy

**Option A: From GitHub**
- Push your code to GitHub
- Go to [vercel.com/new](https://vercel.com/new)
- Import your repo
- Deploy (env vars from Redis integration are added automatically)

**Option B: From CLI**
```bash
npm i -g vercel
vercel
```
Follow the prompts. If you linked Redis in step 1, env vars are already set.

## 3. Local development

For local dev, pricing uses the `data/pricing.json` file (no Redis needed).

To use Redis locally:
1. Copy env vars from Vercel: **Project → Settings → Environment Variables**
2. Create `.env.local` with:
   ```
   UPSTASH_REDIS_REST_URL=your_url
   UPSTASH_REDIS_REST_TOKEN=your_token
   ```
