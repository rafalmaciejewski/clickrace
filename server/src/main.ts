import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new IoAdapter(app));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  await app.listen(parseInt(process.env.PORT) || 3001);
  new ConsoleLogger().log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
