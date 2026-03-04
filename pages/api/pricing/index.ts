import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { Redis } from "@upstash/redis";

export type PricingData = {
  starter: number;
  pro: number;
  enterprise: number;
};

const DEFAULT_PRICING: PricingData = {
  starter: 59,
  pro: 99,
  enterprise: 159,
};

const PRICING_KEY = "pricing";

function getJsonPath() {
  return path.join(process.cwd(), "data", "pricing.json");
}

function readFromFile(): PricingData {
  const filePath = getJsonPath();
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return DEFAULT_PRICING;
  }
}

function writeToFile(data: PricingData): void {
  const filePath = getJsonPath();
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function getRedis() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (url && token) {
    return new Redis({ url, token });
  }
  return null;
}

async function getPricing(): Promise<PricingData> {
  const redis = getRedis();
  if (redis) {
    const data = await redis.get<PricingData>(PRICING_KEY);
    return data ?? DEFAULT_PRICING;
  }
  return readFromFile();
}

async function setPricing(data: PricingData): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(PRICING_KEY, data);
  } else {
    writeToFile(data);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const pricing = await getPricing();
    return res.status(200).json(pricing);
  }

  if (req.method === "PUT") {
    const starter = Number(req.body.starter);
    const pro = Number(req.body.pro);
    const enterprise = Number(req.body.enterprise);

    if (isNaN(starter) || isNaN(pro) || isNaN(enterprise)) {
      return res.status(400).json({ error: "Invalid pricing data" });
    }

    const pricing: PricingData = { starter, pro, enterprise };
    await setPricing(pricing);
    return res.status(200).json(pricing);
  }

  res.setHeader("Allow", ["GET", "PUT"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
