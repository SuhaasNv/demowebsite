import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Acme AI - AI-Powered Developer Tools</title>
      </Head>
      <main>
        <h1>Acme AI</h1>
        <p className="subtitle">AI-Powered Developer Tools</p>
        <p className="tagline">
          Build faster with intelligent tools designed for developers.
        </p>
        <Link href="/pricing" className="cta">
          View Pricing
        </Link>
      </main>
    </>
  );
}
