import { Suspense } from "react";
import { Catalogue } from "@/components/catalog/catalogue";
import { Skeleton, Card } from "@/components/ds/primitives";

export const metadata = { title: "Tenders in Sri Lanka" };

export default async function TendersPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-8">
      <h1 className="text-[26px] font-semibold tracking-tight text-ink-900">Tenders</h1>
      <p className="mt-1 mb-6 max-w-2xl text-[13px] text-ink-500">
        Government, private and donor-funded tender notices from across Sri Lanka. The closing date is never
        masked at any tier — it is the one thing we will not put behind a paywall.
      </p>
      <Suspense fallback={<Card><div className="space-y-3 p-5">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-14" />)}</div></Card>}>
        <Catalogue kind="tender" sp={sp} />
      </Suspense>
    </div>
  );
}
