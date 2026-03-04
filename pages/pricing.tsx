import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

type PricingData = {
  starter: number;
  pro: number;
  enterprise: number;
};

export default function Pricing() {
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pricing")
      .then((res) => res.json())
      .then((data) => {
        setPricing(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>Pricing - Acme AI</title>
      </Head>
      <main>
        <nav className="nav">
          <Link href="/">Acme AI</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <h1>Pricing</h1>
        <p className="subtitle">Choose the plan that fits your team</p>

        <section className="pricing-section">
          {loading ? (
            <p className="subtitle">Loading...</p>
          ) : pricing ? (
            <>
              <div className="pricing-tier">
                <h2>Starter</h2>
                <p className="price">${pricing.starter}</p>
                <p className="period">/month</p>
              </div>
              <div className="pricing-tier">
                <h2>Pro</h2>
                <p className="price">${pricing.pro}</p>
                <p className="period">/month</p>
              </div>
              <div className="pricing-tier">
                <h2>Enterprise</h2>
                <p className="price">${pricing.enterprise}</p>
                <p className="period">/month</p>
              </div>
            </>
          ) : (
            <p className="subtitle">Unable to load pricing</p>
          )}
        </section>
      </main>
    </>
  );
}
