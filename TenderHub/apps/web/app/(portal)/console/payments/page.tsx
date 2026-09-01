import { authed } from "@/lib/api";
import { PageHead } from "@/components/ds/app-shell";
import { Card } from "@/components/ds/primitives";
import { PaymentsQueue } from "@/components/portal/payments-queue";

export const metadata = { title: "Payments" };

export default async function Payments() {
  const res = await authed("/api/v1/admin/payments");
  return (
    <>
      <PageHead title="Payments queue" sub="Someone has paid and cannot use what they paid for. This queue decides whether they renew." />
      <Card><PaymentsQueue rows={res.body?.data ?? []} bank={res.body?.meta?.bank ?? {}} /></Card>
    </>
  );
}
