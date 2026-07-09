import { Module } from "@nestjs/common";
import { EntitlementsService } from "./entitlements.service";
import { EntitlementsGuard } from "../auth/guards/entitlements.guard";

@Module({
  providers: [EntitlementsService, EntitlementsGuard],
  exports: [EntitlementsService, EntitlementsGuard],
})
export class EntitlementsModule {}
