import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureValidation } from './validation';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  configureValidation(app);
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
