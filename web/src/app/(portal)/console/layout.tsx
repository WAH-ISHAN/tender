import { redirect } from "next/navigation";
import { PortalShell } from "@/components/ds/app-shell";
import { readSession } from "@/lib/session";

export default async function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const s = await readSession();
  if (!s) redirect("/company/signin");

  return (
    <PortalShell portal="console" orgName="TenderHub" userName={s.user.name}
      nav={[
        { href: "/console", label: "System health" },
        { href: "/console/ingestion", label: "Ingestion" },
        { href: "/console/organisations", label: "Organisations" },
        { href: "/console/payments", label: "Payments" },
      ]}>
      {children}
    </PortalShell>
  );
}
