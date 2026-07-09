import { SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";

export const ROLES_KEY = "roles";

/**
 * Marks a route as restricted to specific Roles (who you are: USER / BROKER / ADMIN / SUPER_ADMIN).
 * Unrelated to what a user pays for — see RequiresEntitlement for plan-driven feature access.
 *
 * Usage: @Roles(Role.ADMIN, Role.SUPER_ADMIN)
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
