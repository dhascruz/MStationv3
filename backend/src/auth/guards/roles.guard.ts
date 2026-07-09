import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { ROLES_KEY } from "../decorators/roles.decorator";

/**
 * Enforces @Roles(...) metadata — who you are in the system.
 * Must run after JwtAuthGuard so request.user is populated.
 *
 * @UseGuards(JwtAuthGuard, RolesGuard)
 * @Roles(Role.ADMIN, Role.SUPER_ADMIN)
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // route has no @Roles() restriction
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException("Not authenticated");
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(`Role '${user.role}' is not permitted to access this resource`);
    }
    return true;
  }
}
