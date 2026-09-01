import { Suspense } from "react";
import { Catalogue } from "@/components/catalog/catalogue";
import { Skeleton, Card } from "@/components/ds/primitives";

export const metadata = { title: "Property and vehicle auctions in Sri Lanka" };

export default async function AuctionsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-8">
      <h1 className="text-[26px] font-semibold tracking-tight text-ink-900">Auctions</h1>
      <p className="mt-1 mb-2 max-w-2xl text-[13px] text-ink-500">
        Parate execution, mortgage foreclosure, vehicle recovery and disposal sales. For an auction the closing
        time is the auction time — there is no separate sealed submission beforehand.
      </p>
      <p className="mb-6 rounded-[8px] bg-warn-50 px-3 py-2 text-[12px] text-warn-600 ring-1 ring-inset ring-amber-200">
        TenderHub never holds any part of a purchase price. Deposits settle to the auctioneer&rsquo;s own account
        and we record only that they were lodged.
      </p>
      <Suspense fallback={<Card><div className="space-y-3 p-5">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-14" />)}</div></Card>}>
        <Catalogue kind="auction" sp={sp} />
      </Suspense>
    </div>
  );
}
