import { redirect } from "next/navigation";
import Link from "next/link";
import { authed } from "@/lib/api";
import { readSession } from "@/lib/session";
import { lkr, dateTime } from "@/lib/format";
import { Badge, Card, CardBody, CardHead, KeyValue } from "@/components/ds/primitives";
import { ClaimForm } from "@/components/portal/claim-form";

export const metadata = { title: "Subscription" };

export default async function SubscriptionPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const session = await readSession();
  if (!session) redirect("/bidder/signin?next=/subscription");

  const res = await authed("/api/v1/me/subscription");
  const d = res.body?.data ?? {};
  const bank = res.body?.meta?.bank ?? {};
  const terms = res.body?.meta?.terms ?? {};

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      {sp.reason === "quota" ? (
        <div className="mb-6 rounded-[10px] border border-amber-200 bg-warn-50 px-4 py-3">
          <p className="text-[14px] font-medium text-warn-600">You have used your five free notice views.</p>
          <p className="mt-1 text-[13px] text-ink-600">
            The catalogue, every closing date and your alert profiles stay open. A subscription adds the buyer,
            the full scope, the documents and the contact officer — what you need to actually bid.
          </p>
        </div>
      ) : null}

      <h1 className="text-[26px] font-semibold tracking-tight text-ink-900">Subscription</h1>
      <p className="mt-2 text-[13px] text-ink-500">
        Bank transfer, confirmed by our team. Your term starts the moment the transfer is confirmed, not when you
        file the claim.
      </p>

      <Card className="mt-6">
        <CardHead
          title="Your account"
          right={<Badge tone={d.status === "active" ? "ok" : d.status === "pending" ? "warn" : "neutral"}>
            {d.status === "active" ? "Active" : d.status === "pending" ? "Awaiting confirmation" : "Free"}
          </Badge>}
        />
        <CardBody>
          <KeyValue items={[
            ["Organisation", session.org.name],
            ["Plan", d.plan ?? session.org.plan],
            ["Renews", d.renews_at ? dateTime(d.renews_at) : "—"],
          ]} />
        </CardBody>
      </Card>

      {d.status === "active" ? (
        <Card className="mt-4 border-ok-600/30 bg-ok-50/40">
          <CardBody>
            <p className="text-[14px] font-medium text-ok-600">Your subscription is active.</p>
            <Link href="/app" className="mt-3 inline-block rounded-[8px] bg-brand-600 px-4 py-2.5 text-[13px] font-medium text-white hover:bg-brand-700">
              Go to the portal →
            </Link>
          </CardBody>
        </Card>
      ) : d.open_claim ? (
        <Card className="mt-4 border-amber-200 bg-warn-50/50">
          <CardHead title="Your claim is with our team" sub="One open claim at a time. The claim form is not the subscription — access starts when the transfer is confirmed." />
          <CardBody>
            <KeyValue items={[
              ["Amount", <span key="a" className="font-mono">{lkr(Number(d.open_claim.amount))}</span>],
              ["Bank", d.open_claim.bank ?? "—"],
              ["Slip reference", <span key="s" className="font-mono">{d.open_claim.slip_ref ?? "—"}</span>],
              ["Filed", dateTime(d.open_claim.created_at)],
            ]} />
          </CardBody>
        </Card>
      ) : (
        <>
          <Card className="mt-4">
            <CardHead title="Transfer to this account" sub="These details come from one config object, so they cannot disagree across two screens." />
            <CardBody>
              <KeyValue items={[
                ["Account name", bank.account_name],
                ["Bank", bank.bank],
                ["Branch", bank.branch],
                ["Account number", <span key="n" className="font-mono text-[15px] font-medium">{bank.account_number}</span>],
                ["Send the slip to", bank.send_slip_to],
                ["Or WhatsApp", bank.whatsapp],
              ]} />
              <p className="mt-4 rounded-[8px] bg-ink-50 px-3 py-2 text-[12px] text-ink-600">{bank.reference_hint}</p>
            </CardBody>
          </Card>

          <Card className="mt-4">
            <CardHead title="Then file your claim" sub="So there is a record of who activated the account, on what evidence, and when." />
            <ClaimForm terms={terms} />
          </Card>
        </>
      )}
    </div>
  );
}
