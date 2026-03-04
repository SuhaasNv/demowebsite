import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

type PricingData = {
  starter: number;
  pro: number;
  enterprise: number;
};

type FormValues = {
  starter: string;
  pro: string;
  enterprise: string;
};

export default function Admin() {
  const [formValues, setFormValues] = useState<FormValues>({
    starter: "",
    pro: "",
    enterprise: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/pricing")
      .then((res) => res.json())
      .then((data: PricingData) =>
        setFormValues({
          starter: String(data.starter),
          pro: String(data.pro),
          enterprise: String(data.enterprise),
        })
      )
      .catch(() => setError("Failed to load pricing"));
  }, []);

  const handleSave = async () => {
    const pricing: PricingData = {
      starter: formValues.starter === "" ? 0 : Number(formValues.starter) || 0,
      pro: formValues.pro === "" ? 0 : Number(formValues.pro) || 0,
      enterprise:
        formValues.enterprise === "" ? 0 : Number(formValues.enterprise) || 0,
    };
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pricing),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setFormValues({
        starter: String(pricing.starter),
        pro: String(pricing.pro),
        enterprise: String(pricing.enterprise),
      });
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save pricing");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin - Acme AI</title>
      </Head>
      <main>
        <nav className="nav">
          <Link href="/">Acme AI</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        <h1>Pricing Admin</h1>
        <p className="subtitle">Edit pricing and click Save to update the live site</p>

        <div className="admin-form">
          <div className="admin-field">
            <label htmlFor="starter">Starter ($/month)</label>
            <input
              id="starter"
              type="number"
              min={0}
              value={formValues.starter}
              onChange={(e) =>
                setFormValues((p) => ({ ...p, starter: e.target.value }))
              }
            />
          </div>
          <div className="admin-field">
            <label htmlFor="pro">Pro ($/month)</label>
            <input
              id="pro"
              type="number"
              min={0}
              value={formValues.pro}
              onChange={(e) =>
                setFormValues((p) => ({ ...p, pro: e.target.value }))
              }
            />
          </div>
          <div className="admin-field">
            <label htmlFor="enterprise">Enterprise ($/month)</label>
            <input
              id="enterprise"
              type="number"
              min={0}
              value={formValues.enterprise}
              onChange={(e) =>
                setFormValues((p) => ({ ...p, enterprise: e.target.value }))
              }
            />
          </div>

          {error && <p className="admin-error">{error}</p>}
          {saved && <p className="admin-success">Saved! Changes are live.</p>}

          <button
            className="admin-save"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        <section className="pricing-section admin-preview">
          <p className="admin-preview-label">Live preview</p>
          <div className="pricing-tier">
            <h2>Starter</h2>
            <p className="price">
              ${formValues.starter === "" ? "—" : formValues.starter}
            </p>
            <p className="period">/month</p>
          </div>
          <div className="pricing-tier">
            <h2>Pro</h2>
            <p className="price">
              ${formValues.pro === "" ? "—" : formValues.pro}
            </p>
            <p className="period">/month</p>
          </div>
          <div className="pricing-tier">
            <h2>Enterprise</h2>
            <p className="price">
              ${formValues.enterprise === "" ? "—" : formValues.enterprise}
            </p>
            <p className="period">/month</p>
          </div>
        </section>
      </main>
    </>
  );
}
