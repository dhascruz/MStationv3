import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UsersService } from "./users.service";
import { EntitlementsService } from "../entitlements/entitlements.service";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly entitlementsService: EntitlementsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async me(@Req() req: any) {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) return null;
    const { passwordHash, ...safeUser } = user;

    const entitlements = await this.entitlementsService.getUserEntitlementKeys(user.id);

    return { ...safeUser, entitlements: Array.from(entitlements) };
  }
}
