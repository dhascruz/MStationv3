import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  const corsOrigins = (config.get<string>("CORS_ORIGIN") || "http://localhost:3005")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  const port = config.get<number>("PORT") || 4000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Mstation API running on http://localhost:${port}`);
}

bootstrap();
