// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // Set a global prefix for your API routes (optional)
  app.setGlobalPrefix('api');

// Set up Swagger options
  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API Description')
    .setVersion('1.0')
    .addBearerAuth() // Enable Bearer Token authentication
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, options);

  // Set up Swagger UI
  SwaggerModule.setup('api', app, document);

  // Set up global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove non-whitelisted properties
      forbidNonWhitelisted: true, // throw an error on non-whitelisted properties
      transform: true, // transform incoming data to match the DTO's types
      transformOptions: { enableImplicitConversion: true },
      validationError: { target: false }, // return entire validation error object
    }),
  );



  await app.listen(3000);
}
bootstrap();
