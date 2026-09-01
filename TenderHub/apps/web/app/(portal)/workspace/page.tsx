import { authed } from "@/lib/api";
import { PageHead } from "@/components/ds/app-shell";
import { Card } from "@/components/ds/primitives";
import { WorkspaceTenders } from "@/components/portal/workspace-tenders";

export const metadata = { title: "Tenders" };

export default async function WorkspaceHome() {
  const res = await authed("/api/v1/authority/tenders");
  return (
    <>
      <PageHead
        title="Tenders"
        sub="Draft, approve, publish, sell, open, evaluate, award. Every control below the line is refused by the API, not hidden in the interface."
      />
      <Card><WorkspaceTenders rows={res.body?.data ?? []} stages={res.body?.meta?.stages ?? []} /></Card>
    </>
  );
}
