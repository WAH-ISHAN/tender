import { authed } from "@/lib/api";
import { PageHead } from "@/components/ds/app-shell";
import { AlertProfileEditor } from "@/components/portal/alert-profiles";

export const metadata = { title: "Alert profiles" };

export default async function Alerts() {
  const [profiles, cats, dists] = await Promise.all([
    authed("/api/v1/me/alert-profiles"),
    authed("/api/v1/taxonomy/categories"),
    authed("/api/v1/taxonomy/districts"),
  ]);

  return (
    <>
      <PageHead
        title="Alert profiles"
        sub="Preview a profile against thirty days of real history before you trust it with your attention. A profile that never fires is worse than no profile."
      />
      <AlertProfileEditor
        profiles={profiles.body?.data ?? []}
        categories={cats.body?.data ?? []}
        districts={dists.body?.data ?? []}
      />
    </>
  );
}
