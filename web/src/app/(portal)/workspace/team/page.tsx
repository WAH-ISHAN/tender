import { authed } from "@/lib/api";
import { PageHead } from "@/components/ds/app-shell";
import { Card, CardBody, CardHead, Badge } from "@/components/ds/primitives";
import { dateTime } from "@/lib/format";

export const metadata = { title: "Team" };

export default async function Team() {
  const res = await authed("/api/v1/authority/team");
  const d = res.body?.data ?? {};
  const meta = res.body?.meta ?? {};

  return (
    <>
      <PageHead title="Team and roles" sub={meta.note} />
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHead title="Members" sub={`${(d.members ?? []).length} people`} />
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50 text-[11px] uppercase tracking-wide text-ink-500">
                <th className="px-[var(--card-p)] py-2 font-semibold">Name</th>
                <th className="px-3 py-2 font-semibold">Role</th>
                <th className="px-[var(--card-p)] py-2 text-right font-semibold">Last seen</th>
              </tr>
            </thead>
            <tbody>
              {(d.members ?? []).map((m: any) => (
                <tr key={m.id} className="border-b border-ink-100 last:border-0" style={{ height: "var(--row-h)" }}>
                  <td className="px-[var(--card-p)]">
                    <p className="text-[13px] font-medium text-ink-900">{m.name}</p>
                    <p className="row-meta text-[11px] text-ink-400">{m.email}</p>
                  </td>
                  <td className="px-3"><Badge tone={m.role === "owner" ? "brand" : "neutral"}>{m.role}</Badge></td>
                  <td className="px-[var(--card-p)] text-right font-mono text-[12px] text-ink-500">{m.last_login_at ? dateTime(m.last_login_at) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHead title="Roles" />
            <CardBody>
              <ul className="space-y-2 text-[13px]">
                {[["owner", "Full access, including billing and members"],
                  ["officer", "Creates and runs tenders"],
                  ["approver", "Approves tenders above the threshold"],
                  ["evaluator", "Scores bids on committees they are assigned to"],
                  ["finance", "Sees fees and payments only"],
                  ["observer", "Read-only, for internal audit"]].map(([r, t]) => (
                  <li key={r}><span className="font-medium text-ink-900">{r}</span> <span className="text-ink-500">— {t}</span></li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-[12px] leading-relaxed text-ink-500">
              <p className="font-medium text-ink-700">Two guards worth knowing</p>
              <p className="mt-1.5">An organisation must keep at least one owner — demoting the last one is refused, because there would be nobody left with the right to add one back.</p>
              <p className="mt-2">Past actions keep the role they were taken under. Changing someone to observer today does not remove the approval they signed last month.</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
