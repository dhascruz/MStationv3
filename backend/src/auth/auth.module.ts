import { Module } from "@nestjs/common";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "./strategies/jwt.strategy";

type SignOptions = NonNullable<JwtModuleOptions["signOptions"]>;

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => ({
        secret: config.get<string>("JWT_SECRET") || "dev-secret",
        signOptions: {
          // JWT_EXPIRES_IN is a free-form env value (e.g. "1d", "3600").
          // jsonwebtoken's stricter SignOptions typing wants a template-literal
          // "StringValue" or a number; cast since this is validated at runtime
          // by jsonwebtoken itself, not by our config layer.
          expiresIn: (config.get<string>("JWT_EXPIRES_IN") || "1d") as SignOptions["expiresIn"],
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
