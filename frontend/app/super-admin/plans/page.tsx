import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Mirrors backend/prisma/seed.ts — kept in sync manually for now. Once a
// /plans admin endpoint exists this should be fetched instead of hardcoded.
const PLANS = [
  {
    key: "novice",
    name: "Novice",
    price: "Free",
    entitlements: [
      "Full Updates feed",
      "One preview lesson per Learning Pathway",
      "Ask a Broker — standard queue (~5 business days)",
      "Public event listings",
    ],
  },
  {
    key: "tier2",
    name: "Tier 2",
    price: "$49/mo",
    entitlements: [
      "Full Updates feed",
      "Full Learning Pathways",
      "Masterclass replay library",
      "Ask a Broker — priority response (~48h)",
      "Public + members-only events",
    ],
  },
  {
    key: "tier3",
    name: "Tier 3",
    price: "$99/mo",
    entitlements: [
      "Everything in Tier 2",
      "Early access to new lessons and masterclasses",
      "Monthly live broker Q&A",
      "1:1 consultation credit",
    ],
  },
];

export default function PlansAndEntitlementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Plans & entitlements</h1>
        <p className="mt-1 text-sm text-slate-500">
          What each plan unlocks. Editing here will write to the database once the
          plans admin API is built — for now this reflects the seeded configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <Card key={plan.key}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                {plan.entitlements.map((e) => (
                  <li key={e} className="flex gap-2">
                    <span className="text-brand-600">•</span>
                    {e}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
