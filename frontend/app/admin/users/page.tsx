import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const USERS = [
  { name: "Nora Novice", email: "novice@mortgagestation.example", role: "USER", plan: "Novice" },
  { name: "Tara TierTwo", email: "tier2@mortgagestation.example", role: "USER", plan: "Tier 2" },
  { name: "Theo TierThree", email: "tier3@mortgagestation.example", role: "USER", plan: "Tier 3" },
  { name: "Alex Admin", email: "admin@mortgagestation.example", role: "ADMIN", plan: "—" },
  { name: "Sam SuperAdmin", email: "superadmin@mortgagestation.example", role: "SUPER_ADMIN", plan: "—" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Users</h1>
        <p className="mt-1 text-sm text-slate-500">
          The seeded demo accounts for this environment.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All members</CardTitle>
          <CardDescription>Read-only view — user management API is not wired up yet.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-t border-border text-xs uppercase tracking-wide text-slate-400">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Plan</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((u) => (
                <tr key={u.email} className="border-t border-border">
                  <td className="px-6 py-3 font-medium text-slate-900">{u.name}</td>
                  <td className="px-6 py-3 text-slate-500">{u.email}</td>
                  <td className="px-6 py-3">
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-slate-500">{u.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
