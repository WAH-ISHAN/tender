import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Badge, Card, CardBody } from "@/components/ds/primitives";

export const metadata = { title: "Pricing" };

export default async function Pricing() {
  const res = await apiFetch("/api/v1/taxonomy/plans");
  const plans = res.body?.data ?? {};

  const tiers = [
    { key: "free", price: "Free", period: "", cta: ["Create a free account", "/bidder/signup"],
      points: ["Every notice, its category, district, value band and closing date", "Five full notice views", "Alert profiles and the in-app feed"] },
    { key: "business", price: "Rs. 24,000", period: "per year · or Rs. 7,500 a quarter", highlight: true, cta: ["Subscribe", "/bidder/signup"],
      points: ["Unlimited notice views, buyer names and full descriptions", "Mirrored bidding documents on expiring signed links", "Electronic submission with a timestamped receipt", "Bid pipeline and compliance vault"] },
    { key: "publish", price: "Free", period: "while we build supply", cta: ["Open a workspace", "/company/signup"],
      points: ["Draft, approve and publish tenders and auctions", "Sell documents, answer clarifications, issue addenda", "Sealed bids and a dual-control opening ceremony", "Committee evaluation, award and the evidence pack"] },
    { key: "enterprise", price: "Negotiated", period: "", cta: ["Talk to us", "/company/signup"],
      points: ["Everything in Publisher", "The partner API — cursor-paged feed and webhooks", "More seats, custom approval thresholds"] },
  ];

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-14">
      <div className="max-w-2xl">
        <h1 className="text-[32px] font-semibold tracking-tight text-ink-900">Pricing</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
          Undercutting the incumbent&rsquo;s flat Rs. 40,000 is deliberate, and the quarterly option exists because
          a contractor&rsquo;s cash flow is seasonal. Publishing is free and will stay free until supply is dense —
          a paywall on publishing kills the only asset that compounds.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-4">
        {tiers.map((t) => (
          <Card key={t.key} className={t.highlight ? "ring-2 ring-brand-600" : ""}>
            <CardBody>
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-semibold text-ink-900">{plans[t.key]?.label ?? t.key}</h2>
                {t.highlight ? <Badge tone="brand">Most bidders</Badge> : null}
              </div>
              <p className="mt-3 font-mono text-[26px] font-semibold text-ink-900">{t.price}</p>
              <p className="mt-0.5 h-8 text-[12px] text-ink-500">{t.period}</p>
              <ul className="mt-4 space-y-2">
                {t.points.map((p) => (
                  <li key={p} className="flex gap-2 text-[13px] leading-snug text-ink-600"><span className="mt-0.5 text-brand-600">✓</span>{p}</li>
                ))}
              </ul>
              <Link href={t.cta[1] as any}
                className={`mt-5 block rounded-[8px] px-4 py-2.5 text-center text-[13px] font-medium ${t.highlight ? "bg-brand-600 text-white hover:bg-brand-700" : "bg-white text-ink-800 ring-1 ring-inset ring-ink-300 hover:bg-ink-50"}`}>
                {t.cta[0]}
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="mt-10">
        <CardBody>
          <h3 className="text-[15px] font-semibold text-ink-900">How payment works today</h3>
          <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-ink-600">
            Bank transfer, with the slip sent by WhatsApp or e-mail and confirmed by our team — because that is how
            business is actually done here. The claim is a database row, the confirmation is an audited act with a
            named reviewer and a timestamp, and your term starts the moment it is confirmed. When a card gateway
            arrives it writes the same rows and confirms itself; nothing else in the system changes.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
