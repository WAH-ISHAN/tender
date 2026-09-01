import { authed } from "@/lib/api";
import { PageHead } from "@/components/ds/app-shell";
import { Card } from "@/components/ds/primitives";
import { SuppliersTable } from "@/components/portal/suppliers-table";

export const metadata = { title: "Suppliers" };

export default async function Suppliers() {
  const res = await authed("/api/v1/authority/suppliers");
  return (
    <>
      <PageHead title="Suppliers" sub="Ratings inform an evaluation committee. They are never an automatic disqualification — debarment is a legal act, not a platform score." />
      <Card><SuppliersTable rows={res.body?.data ?? []} /></Card>
    </>
  );
}
