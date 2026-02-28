import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Acme AI - AI-Powered Developer Tools</title>
      </Head>
      <main>
        <h1>Acme AI</h1>
        <p className="subtitle">AI-Powered Developer Tools</p>

        <section className="pricing-section">
          <div className="pricing-tier">
            <h2>Starter</h2>
            <p className="price">$29</p>
            <p className="period">/month</p>
          </div>
          <div className="pricing-tier">
            <h2>Pro</h2>
            <p className="price">$79</p>
            <p className="period">/month</p>
          </div>
          <div className="pricing-tier">
            <h2>Enterprise</h2>
            <p className="price">$199</p>
            <p className="period">/month</p>
          </div>
        </section>
      </main>
    </>
  );
}
