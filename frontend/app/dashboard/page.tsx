import {
  GraduationCap,
  Calculator,
  TrendingUp,
  CalendarClock,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const STATS = [
  {
    label: "Lessons completed",
    value: "12 / 20",
    icon: GraduationCap,
    change: "+3 this week",
  },
  {
    label: "Calculators used",
    value: "8",
    icon: Calculator,
    change: "+2 this week",
  },
  {
    label: "Borrowing capacity",
    value: "$620,000",
    icon: TrendingUp,
    change: "Updated today",
  },
  {
    label: "Next consultation",
    value: "Jul 10, 10:00 AM",
    icon: CalendarClock,
    change: "with Jerry Santos",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here&apos;s where you left off in your financial education journey.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 text-2xl font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-1 text-xs font-medium text-emerald-600">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Continue learning</CardTitle>
            <CardDescription>Pick up your next lesson</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Understanding Loan-to-Value Ratio",
              "How Interest Rates Affect Repayments",
              "First Home Buyer Grants Explained",
            ].map((lesson) => (
              <div
                key={lesson}
                className="flex items-center justify-between rounded-md border border-border px-4 py-3 hover:bg-slate-50"
              >
                <span className="text-sm font-medium text-slate-700">
                  {lesson}
                </span>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your broker</CardTitle>
            <CardDescription>Kuya Jerry Financial Services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                JS
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Jerry Santos
                </p>
                <p className="text-xs text-slate-500">
                  Senior Mortgage Broker
                </p>
              </div>
            </div>
            <button className="mt-4 w-full rounded-md bg-brand-600 py-2 text-sm font-medium text-white hover:bg-brand-700">
              Book a consultation
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
