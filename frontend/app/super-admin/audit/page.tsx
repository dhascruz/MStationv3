import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AUDIT_ENTRIES = [
  { at: "2026-07-08 09:12", actor: "superadmin@mortgagestation.example", action: "Updated Tier 2 entitlements" },
  { at: "2026-07-07 16:40", actor: "admin@mortgagestation.example", action: "Published lesson: Loan-to-Value Ratio" },
  { at: "2026-07-06 11:05", actor: "superadmin@mortgagestation.example", action: "Granted override entitlement to user" },
];

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Audit log</h1>
        <p className="mt-1 text-sm text-slate-500">
          Illustrative entries — wire this to a real AuditLog table when that model is added.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
          <CardDescription>Most recent first</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-t border-border text-xs uppercase tracking-wide text-slate-400">
                <th className="px-6 py-3 font-medium">When</th>
                <th className="px-6 py-3 font-medium">Actor</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {AUDIT_ENTRIES.map((entry, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-6 py-3 text-slate-500">{entry.at}</td>
                  <td className="px-6 py-3 text-slate-900">{entry.actor}</td>
                  <td className="px-6 py-3 text-slate-500">{entry.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
