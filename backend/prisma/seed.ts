// Plain `ts-node prisma/seed.ts` does NOT load .env on its own — only Prisma
// CLI commands (migrate dev, studio, db seed) auto-load it. Without this,
// PrismaClient silently uses whatever DATABASE_URL (if any) is already in
// your shell's environment instead of the one in backend/.env, which is the
// most common reason a seed appears to run but no users show up.
import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcryptjs";

function maskDatabaseUrl(url?: string): string {
  if (!url) return "(not set — check backend/.env)";
  try {
    const u = new URL(url);
    return `${u.hostname}:${u.port || "5432"}${u.pathname}`;
  } catch {
    return "(unparsable DATABASE_URL)";
  }
}

console.log("Seeding against DATABASE_URL host/db:", maskDatabaseUrl(process.env.DATABASE_URL));

const prisma = new PrismaClient();

const DEMO_PASSWORD = "Password123!";

const ENTITLEMENTS = [
  { key: "content.updates.full", description: "Full Updates feed" },
  { key: "content.pathway.preview", description: "One preview lesson per Learning Pathway" },
  { key: "content.pathway.full", description: "Full Learning Pathways — all pillars, all lessons" },
  { key: "content.pathway.early_access", description: "Early access to new lessons and masterclasses" },
  { key: "content.masterclass.replay", description: "Masterclass replay library" },
  { key: "broker.standard_queue", description: "Ask a Broker — standard queue (~5 business days)" },
  { key: "broker.priority_response", description: "Ask a Broker — priority response (~48h)" },
  { key: "broker.live_qna", description: "Monthly live broker Q&A access" },
  { key: "broker.consultation_credit", description: "1:1 consultation credit" },
  { key: "events.public", description: "Public event listings" },
  { key: "events.members_only", description: "Members-only event sessions" },
] as const;

const PLANS = [
  {
    key: "novice",
    displayName: "Novice",
    priceMonthlyCents: null as number | null,
    sortOrder: 0,
    entitlements: ["content.updates.full", "content.pathway.preview", "broker.standard_queue", "events.public"],
  },
  {
    key: "tier2",
    displayName: "Tier 2",
    priceMonthlyCents: 4900,
    sortOrder: 1,
    entitlements: [
      "content.updates.full",
      "content.pathway.full",
      "content.masterclass.replay",
      "broker.priority_response",
      "events.public",
      "events.members_only",
    ],
  },
  {
    key: "tier3",
    displayName: "Tier 3",
    priceMonthlyCents: 9900,
    sortOrder: 2,
    entitlements: [
      "content.updates.full",
      "content.pathway.full",
      "content.pathway.early_access",
      "content.masterclass.replay",
      "broker.priority_response",
      "broker.live_qna",
      "broker.consultation_credit",
      "events.public",
      "events.members_only",
    ],
  },
];

// One demo account per Role, plus one User per paid Plan so every tier and
// portal is immediately testable after seeding.
const DEMO_USERS = [
  { name: "Sam SuperAdmin", email: "superadmin@mortgagestation.example", role: Role.SUPER_ADMIN, planKey: null },
  { name: "Alex Admin", email: "admin@mortgagestation.example", role: Role.ADMIN, planKey: null },
  { name: "Nora Novice", email: "novice@mortgagestation.example", role: Role.USER, planKey: "novice" },
  { name: "Tara TierTwo", email: "tier2@mortgagestation.example", role: Role.USER, planKey: "tier2" },
  { name: "Theo TierThree", email: "tier3@mortgagestation.example", role: Role.USER, planKey: "tier3" },
  // Original single demo account from the first pass — kept for backward compatibility.
  { name: "Demo User", email: "demo@mortgagestation.com", role: Role.USER, planKey: "novice" },
] as const;

async function main() {
  console.log("Seeding entitlements...");
  const entitlementByKey = new Map<string, string>();
  for (const e of ENTITLEMENTS) {
    const rec = await prisma.entitlement.upsert({
      where: { key: e.key },
      update: { description: e.description },
      create: e,
    });
    entitlementByKey.set(e.key, rec.id);
  }

  console.log("Seeding plans...");
  const planByKey = new Map<string, string>();
  for (const p of PLANS) {
    const plan = await prisma.plan.upsert({
      where: { key: p.key },
      update: { displayName: p.displayName, priceMonthlyCents: p.priceMonthlyCents, sortOrder: p.sortOrder },
      create: { key: p.key, displayName: p.displayName, priceMonthlyCents: p.priceMonthlyCents, sortOrder: p.sortOrder },
    });
    planByKey.set(p.key, plan.id);

    for (const entKey of p.entitlements) {
      const entitlementId = entitlementByKey.get(entKey)!;
      await prisma.planEntitlement.upsert({
        where: { planId_entitlementId: { planId: plan.id, entitlementId } },
        update: {},
        create: { planId: plan.id, entitlementId },
      });
    }
  }

  console.log(`Seeding demo accounts (password for all: "${DEMO_PASSWORD}")...`);
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  for (const u of DEMO_USERS) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role },
      create: { name: u.name, email: u.email, role: u.role, passwordHash },
    });

    if (u.planKey) {
      const planId = planByKey.get(u.planKey)!;
      await prisma.subscription.upsert({
        where: { userId: user.id },
        update: { planId, status: "active" },
        create: {
          userId: user.id,
          planId,
          stripeCustomerId: `seed_${user.id}`,
          stripeSubscriptionId: `seed_${user.id}`,
          status: "active",
          currentPeriodEnd: new Date("2099-01-01"),
        },
      });
    }
  }

  console.log(`\nDone. Demo logins (password for all: "${DEMO_PASSWORD}"):`);
  for (const u of DEMO_USERS) {
    console.log(`  ${u.role.padEnd(11)} ${u.email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
