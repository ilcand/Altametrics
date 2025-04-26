// server/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();