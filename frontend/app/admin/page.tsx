import { Users, GraduationCap, MessageCircleQuestion, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const STATS = [
  { label: "Total members", value: "1,284", icon: Users, change: "+18 this week" },
  { label: "Active lessons", value: "42", icon: GraduationCap, change: "3 in draft" },
  { label: "Ask a Broker (open)", value: "9", icon: MessageCircleQuestion, change: "2 overdue" },
  { label: "New signups", value: "27", icon: UserPlus, change: "past 7 days" },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Admin overview</h1>
        <p className="mt-1 text-sm text-slate-500">
          A snapshot of member activity and content across the platform.
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

      <Card>
        <CardContent className="p-6 text-sm text-slate-500">
          Member management, content publishing, and the Ask a Broker inbox will surface
          here as those backend endpoints come online. This overview currently shows
          illustrative data.
        </CardContent>
      </Card>
    </div>
  );
}
