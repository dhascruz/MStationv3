import { ShieldCheck, Layers, KeyRound, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const STATS = [
  { label: "Admins", value: "3", icon: ShieldCheck, change: "1 super admin" },
  { label: "Active plans", value: "3", icon: Layers, change: "Novice, Tier 2, Tier 3" },
  { label: "Entitlements", value: "11", icon: KeyRound, change: "across all plans" },
  { label: "System status", value: "Healthy", icon: Activity, change: "All services up" },
];

export default function SuperAdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Super admin overview</h1>
        <p className="mt-1 text-sm text-slate-500">
          Platform-wide controls: roles, plans, entitlements, and audit history.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-2xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-1 text-xs font-medium text-emerald-600">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
