import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Bootstraps the NestJS application.
 */
async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Read port from environment or use default
  const port = process.env.PORT || 3002;

  // Start listening for incoming requests
  await app.listen(port);

  // Log successful startup
  console.log(`API running on port: ${port}`);
}

bootstrap();
