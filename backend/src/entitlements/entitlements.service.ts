import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

/**
 * Resolves whether a user has a given entitlement, by checking:
 *   1. Their active Subscription's Plan entitlements, and
 *   2. Any UserEntitlementOverride comped directly by a Super Admin.
 * Users with no Subscription row are implicitly on Novice.
 */
@Injectable()
export class EntitlementsService {
  constructor(private prisma: PrismaService) {}

  async getUserEntitlementKeys(userId: string): Promise<Set<string>> {
    const [subscription, overrides] = await Promise.all([
      this.prisma.subscription.findUnique({
        where: { userId },
        include: { plan: { include: { entitlements: { include: { entitlement: true } } } } },
      }),
      this.prisma.userEntitlementOverride.findMany({
        where: { userId },
        include: { entitlement: true },
      }),
    ]);

    const keys = new Set<string>();

    if (subscription) {
      for (const pe of subscription.plan.entitlements) {
        keys.add(pe.entitlement.key);
      }
    } else {
      const novice = await this.prisma.plan.findUnique({
        where: { key: "novice" },
        include: { entitlements: { include: { entitlement: true } } },
      });
      novice?.entitlements.forEach((pe: { entitlement: { key: string } }) => keys.add(pe.entitlement.key));
    }

    for (const o of overrides) {
      keys.add(o.entitlement.key);
    }

    return keys;
  }

  async hasEntitlement(userId: string, entitlementKey: string): Promise<boolean> {
    const keys = await this.getUserEntitlementKeys(userId);
    return keys.has(entitlementKey);
  }
}
