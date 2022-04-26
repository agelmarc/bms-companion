import { join } from "path";

import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { WinstonModule } from "nest-winston";
import { format, transports } from "winston";

import { AppModule } from "./app.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

const myFormat = format.printf(({ context, level, timestamp, message }) => {
  const time = new Date(timestamp);
  return `${time.toLocaleDateString("de")}, ${time.toLocaleTimeString(
    "de"
  )}:${time.getMilliseconds()} ${
    context ? `[${context}]` : "|"
  } ${level}: ${message}`;
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      format: format.combine(format.timestamp(), format.ms(), myFormat),
      transports: [
        new transports.Console({ level: "info" }),
        new transports.File({
          filename: "data/error.log",
          level: "warn",
        }),
        new transports.File({
          filename: "data/debug.log",
          level: "debug",
        }),
      ],
    }),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    })
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useStaticAssets(join(__dirname, "../../public"), {
    prefix: "/public/",
    setHeaders: (res, path, stat) => {
      res.set("Access-Control-Allow-Origin", "*");
    },
  });
  app.disable("x-powered-by");
  app.disable("etag");
  app.enableCors({ origin: "*" });
  await app.listen(3001);
}
bootstrap();
