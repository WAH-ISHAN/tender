import { authed } from "@/lib/api";
import { PageHead } from "@/components/ds/app-shell";
import { Card } from "@/components/ds/primitives";
import { OrganisationsTable } from "@/components/portal/organisations-table";

export const metadata = { title: "Organisations" };

export default async function Organisations() {
  const res = await authed("/api/v1/admin/organisations");
  return (
    <>
      <PageHead title="Organisations" sub="Every account on the platform: type, district, grade, verification, plan, seats and what they have actually done." />
      <Card><OrganisationsTable rows={res.body?.data ?? []} /></Card>
    </>
  );
}
