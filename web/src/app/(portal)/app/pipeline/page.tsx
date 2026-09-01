import { authed } from "@/lib/api";
import { PageHead } from "@/components/ds/app-shell";
import { Card } from "@/components/ds/primitives";
import { PipelineTable } from "@/components/portal/pipeline-table";

export const metadata = { title: "Bid pipeline" };

export default async function Pipeline() {
  const res = await authed("/api/v1/me/bids");
  return (
    <>
      <PageHead title="Bid pipeline" sub="A bid cannot move to submitted while its checklist is incomplete — the server refuses it, not the button." />
      <Card><PipelineTable rows={res.body?.data ?? []} stages={res.body?.meta?.stages ?? []} /></Card>
    </>
  );
}
