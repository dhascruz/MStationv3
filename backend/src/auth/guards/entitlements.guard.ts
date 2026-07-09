import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ENTITLEMENT_KEY } from "../decorators/requires-entitlement.decorator";
import { EntitlementsService } from "../../entitlements/entitlements.service";

/**
 * Enforces @RequiresEntitlement(key) — what a user's Plan (or an override) grants them.
 * Must run after JwtAuthGuard. Never checks a plan name directly, only the entitlement key,
 * so a comped override behaves identically to a plan-granted entitlement.
 *
 * @UseGuards(JwtAuthGuard, EntitlementsGuard)
 * @RequiresEntitlement('content.pathway.full')
 */
@Injectable()
export class EntitlementsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private entitlementsService: EntitlementsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredEntitlement = this.reflector.getAllAndOverride<string>(ENTITLEMENT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredEntitlement) {
      return true; // route has no @RequiresEntitlement() restriction
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException("Not authenticated");
    }

    const hasIt = await this.entitlementsService.hasEntitlement(user.userId, requiredEntitlement);
    if (!hasIt) {
      throw new ForbiddenException(
        `Your current plan does not include the '${requiredEntitlement}' entitlement`,
      );
    }
    return true;
  }
}
