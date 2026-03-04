import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export type PricingData = {
  starter: number;
  pro: number;
  enterprise: number;
};

const getDataPath = () => path.join(process.cwd(), "data", "pricing.json");

function readPricing(): PricingData {
  const filePath = getDataPath();
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return { starter: 59, pro: 99, enterprise: 159 };
  }
}

function writePricing(data: PricingData): void {
  const filePath = getDataPath();
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const pricing = readPricing();
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
    writePricing(pricing);
    return res.status(200).json(pricing);
  }

  res.setHeader("Allow", ["GET", "PUT"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
