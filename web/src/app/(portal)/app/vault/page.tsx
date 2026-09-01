import { authed } from "@/lib/api";
import { PageHead } from "@/components/ds/app-shell";
import { Card } from "@/components/ds/primitives";
import { VaultTable } from "@/components/portal/vault-table";

export const metadata = { title: "Compliance vault" };

export default async function Vault() {
  const res = await authed("/api/v1/me/vault");
  return (
    <>
      <PageHead title="Compliance vault" sub="The documents every bid asks for, in one place, with the expiry dates that quietly disqualify you." />
      <Card><VaultTable rows={res.body?.data ?? []} /></Card>
    </>
  );
}
