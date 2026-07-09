import { SetMetadata } from "@nestjs/common";

export const ENTITLEMENT_KEY = "entitlement";

/**
 * Marks a route as gated behind an atomic Entitlement key (e.g. "content.pathway.full").
 * Every content-gate and API check should test an entitlement, never a plan name directly —
 * that's what lets a Super Admin comp a single user a feature without changing their billing plan.
 *
 * Usage: @RequiresEntitlement('content.pathway.full')
 */
export const RequiresEntitlement = (entitlementKey: string) =>
  SetMetadata(ENTITLEMENT_KEY, entitlementKey);
