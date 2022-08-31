import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import GlobalPipesArray from './global-pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: '*',
  });
  app.useGlobalPipes(...GlobalPipesArray);

  await app.listen(80);
}
bootstrap();
