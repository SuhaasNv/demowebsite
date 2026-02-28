import Head from "next/head";
import Link from "next/link";

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing - Acme AI</title>
      </Head>
      <main>
        <nav className="nav">
          <Link href="/">Acme AI</Link>
        </nav>
        <h1>Pricing</h1>
        <p className="subtitle">Choose the plan that fits your team</p>

        <section className="pricing-section">
          <div className="pricing-tier">
            <h2>Starter</h2>
            <p className="price">$49</p>
            <p className="period">/month</p>
          </div>
          <div className="pricing-tier">
            <h2>Pro</h2>
            <p className="price">$99</p>
            <p className="period">/month</p>
          </div>
          <div className="pricing-tier">
            <h2>Enterprise</h2>
            <p className="price">$219</p>
            <p className="period">/month</p>
          </div>
        </section>
      </main>
    </>
  );
}
