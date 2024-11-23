import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger(AppModule.name);
  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Duocode')
    .setDescription('The Duocode API description')
    .setVersion('1.0')
    .addTag('duocode')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  const port = configService.get('PORT');

  await app.listen(port);

  logger.log(`Server is running on port ${port}`);
}

bootstrap();
